/* Copyright (c) 2020, Abacus. All rights reserved. */
/* eslint-disable */
import OlView from 'ol/View'
import { ImageStatic as OlImageStatic } from 'ol/source'
import { Image as OlImageLay } from 'ol/layer'
import { Style as OlStyleStyle, Fill as OlStyleFill, Icon as OlStyleIcon, Text as OlStyleText } from 'ol/style'
import * as proj from 'ol/proj'
let coordinate_ = null
let feature_ = null
let defMultiVision = true
let defResolution = [0.5, 2.0]
let defIsScale = [0.5, 1.0, 2.0]
export function isMultiVision(flag) {
  defMultiVision = flag
  setScale(flag)
}
function setScale(flag) {
  if (flag) {
    defResolution = [0.5, 2.0]
    defIsScale = [0.5, 1.0, 2.0]
  } else {
    defResolution = [1.0, 4.0]
    defIsScale = [0.25, 0.5, 1.0]
  }
}
export function fnHandleDownEvent(evt) {
  var map = evt.map
  var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
    return feature
  })
  if (feature) {
    coordinate_ = evt.coordinate
    feature_ = feature
  }
  return !!feature
}
export function fnHandleDragEvent(evt) {
  var deltaX = evt.coordinate[0] - coordinate_[0]
  var deltaY = evt.coordinate[1] - coordinate_[1]
  var geometry = feature_.getGeometry()
  geometry.translate(deltaX, deltaY)
  coordinate_[0] = evt.coordinate[0]
  coordinate_[1] = evt.coordinate[1]
}
export function fnHandleMoveEvent(evt) {
  if (this.cursor_) {
    var map = evt.map
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
      return feature
    })
    var element = evt.map.getTargetElement()
    if (feature) {
      if (element.style.cursor !== this.cursor_) {
        this.previousCursor_ = element.style.cursor
        element.style.cursor = this.cursor_
      }
    } else if (this.previousCursor_ !== undefined) {
      element.style.cursor = this.previousCursor_
      this.previousCursor_ = undefined
    }
  }
}
export function fnHandleUpEvent(evt, callBack) {
  var map = evt.map
  var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
    return feature
  })
  if (feature) {
    callBack(feature, feature_)
  }
  coordinate_ = null
  feature_ = null
  return false
}
export function fnChangValue(devInfo, value) {
  let txt = value
  let regexr = /^#{.*}/
  if (regexr.test(txt)) {
    txt = txt.replace('#{', '').replace('}', '')
    if (devInfo[txt] !== undefined) {
      txt = devInfo[txt]
    } else {
      txt = value
    }
  }
  return txt
}
function fnPosCenter(w, h) {
  let width = w // $('#map').width() / 2
  let height = h // - $('#map').height() / 2
  if (!defMultiVision) {
    width = w // $('#map').width()
    height = h // - $('#map').height()
  }
  console.log([width, height])
  return [width, height]
}
export function fnMapOption(background, width, height, posX, posY) {
  let extent = [0, 0, width, height]
  let projection = new proj.Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: extent
  })
  let mapView = new OlView({
    projection: projection,
    center: fnPosCenter(posX, posY),
    zoom: 1,
    minResolution: defResolution[0],
    maxResolution: defResolution[1]
  })
  console.log('fnMapOption', defResolution[0], defResolution[1])
  let imageLayer = new OlImageLay({
    id: 'background',
    source: new OlImageStatic({
      url: background,
      projection: projection,
      imageSize: [width, height],
      imageExtent: extent
    })
  })
  return { view: mapView, layer: imageLayer }
}
export function fnRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export function fnStyle(feature, lv) {
  let style = []
  let isScale = defIsScale
  let lvFix = lv.toFixed(1)
  let factor = lvFix > 0.16 ? 2 : lvFix > 0.16 ? 0.9 : lvFix > 0.03 ? 2.5 : lvFix > 0 ? 1.5 : 2.5
  //console.log('fnStyle', factor)
  let scale = ((parseFloat(lv.toFixed(1)) + 0.1) * factor).toFixed(1)
  for (var img of feature.get('features')[0].get('image')) {
    let posx = 0.5
    let posy = 0.5
    if (typeof img['x'] !== 'undefined') {
      posx = img['x']
    }
    if (typeof img['y'] !== 'undefined') {
      posy = img['y']
    }

    let w = 1
    let h = 1
    if (typeof img['w'] !== 'undefined') {
      w = img['w'] + img['w'] * scale
    }
    if (typeof img['h'] !== 'undefined') {
      h = img['h'] + img['h'] * scale
    }
    style.push(
      new OlStyleStyle({
        image: new OlStyleIcon({
          src: img['url'],
          opacity: img['opacity'] ? img['opacity'] : 1.0,
          anchor: [posx, posy],
          size: [w, h],
          scale: scale !== 0 ? scale : 0.3 // isScale[lv]
        })
      })
    )
    //console.log('style', lv, lvFix, scale, posx, posy, w, h)
  }
  for (var txt of feature.get('features')[0].get('text')) {
    let posx = 0
    let posy = 0
    let txtSize = 10
    let txtColor = '#000000'
    let textAlign = 'center'
    if (typeof txt['x'] !== 'undefined') {
      posx = txt['x']
    }
    if (typeof txt['y'] !== 'undefined') {
      posy = txt['y']
    }
    if (typeof txt['size'] !== 'undefined') {
      txtSize = txt['size']
    }
    if (typeof txt['color'] !== 'undefined') {
      txtColor = txt['color']
    }
    if (typeof txt['align'] !== 'undefined') {
      textAlign = txt['align']
    }
    style.push(
      new OlStyleStyle({
        text: new OlStyleText({
          text: txt['value'],
          fill: new OlStyleFill({ color: txtColor }),
          textAlign: textAlign,
          offsetX: posx * isScale[lv],
          offsetY: posy * isScale[lv],
          font: ' ' + txtSize * isScale[lv] + 'px Malgun Gothic'
        })
      })
    )
  }
  return style
}
function fnImageLoad(src) {
  return new Promise((resolve, reject) => {
    let i = new Image()
    console.log('fnImageLoad', i, src)
    i.onload = () => resolve(i)
    i.onerror = e => reject(e)
    i.src = src
  })
}
export async function fnImageLoadSize(src) {
  const res = await fnImageLoad(src).catch(e => {})
  console.log('site initMap', res)
  return res
}
/* eslint-enable */
