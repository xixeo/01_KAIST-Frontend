<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <div class="svg_back lg:w-4/10 w-full bg-red-0" style="height:800px;">
    <div :id="items.title" class="flex bg-blue-0 w-full h-full zIndex-0"></div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
import store from '@/store'
import OlMap from 'ol/Map'
import OlFeature from 'ol/Feature'
import OlGeomPoint from 'ol/geom/Point'
import { Vector as OlLayerVector } from 'ol/layer'
import { Vector as OlSourceVector, Cluster as OlSourceCluster } from 'ol/source'
import { fnImageLoadSize, fnStyle, fnMapOption } from '@/utils/mapUtil'
export default {
  name: 'openLayerComponent',
  components: {},
  props: {
    items: {
      type: Object,
      default: function() {
        return {
          title: 'ulju',
          src: '/assets/map/map.svg',
          mapData: {}
        }
      }
    }
  },
  data() {
    return {
      fullscreen: false,
      MapViewFull: false,
      map: {},
      clusters: {},
      featuresOri: []
    }
  },
  created() {
    //
  },
  watch: {
    MapViewFull(val) {
      this.reInitMap()
    },
    fullscreen(val) {
      this.reInitMap()
    }
  },
  mounted() {
    console.log('mounted')
    this.initMap(this.items.src)
  },
  beforeDestroy() {
    this.unInitMap()
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 맵 불러오기 및 초기화
    initMap(imgUrl) {
      this.featuresOri = [] // data initialization
      this.map = {}
      this.clusters = {}
      console.log('imgUrl', imgUrl)
      fnImageLoadSize(imgUrl).then(res => {
        console.log('site initMap', res)
        let width = 1920
        let height = 1080
        let xGap = 0 // 보정 수치
        let yGap = 0 // 보정 수치
        if (width <= 1280) {
          width = window.innerWidth
          height = window.innerHeight
          xGap = -40
          yGap = -40
        }
        let option = fnMapOption(imgUrl, width, height, width / 3, height / 2)
        option.view.values_.center = [0, 0]
        option.view.zoomFactor_ = 1000.0
        // console.log(window, window.innerWidth, window.innerHeight)
        this.items.mapData['ulju'].forEach(item => {
          // console.log(Math.floor(item.map.x + xGap), Math.floor(item.map.y + yGap), item.icon.x, item.icon.y)
          let feature = new OlFeature({
            geometry: new OlGeomPoint([Math.floor(item.map.x + xGap), Math.floor(item.map.y + yGap)]),
            title: item.title,
            name: item.name,
            doorHeight: item.info.door.height,
            inHeight: item.info.in.height,
            image: [
              {
                url: '/assets/images/markPoint.png',
                w: item.icon.width,
                h: item.icon.height,
                x: item.icon.x,
                y: item.icon.y,
                scale: 0.1,
                opacity: 0 // 투명하게 패널을 만듦
              }
            ],
            text: []
          })
          this.featuresOri.push(feature)
        })

        // create vectorLayer
        this.clusters = new OlLayerVector({
          source: new OlSourceCluster({
            // distance: parseInt(10, 10),
            source: new OlSourceVector({
              features: this.featuresOri
            })
          }),
          id: this.items.title + '_clusters'
        })
        // map 생성
        this.map = new OlMap({
          id: this.items.title,
          target: document.getElementById(this.items.title),
          layers: [option.layer, this.clusters],
          view: option.view
        })
        this.clusters.setStyle(this.fnClusterStyle)
        console.log(this.map)

        if (this.fullscreen) {
          this.map.getView().setZoom(0.5)
        } else this.map.getView().setZoom(0.001)
        this.map.on('click', this.fnMapClick)
      })
    },
    // 맵 다시 그리기
    reInitMap() {
      this.unInitMap()
      this.initMap(this.items.src)
    },
    // 맵 해제
    unInitMap() {
      this.map.removeOverlay(this.popup)
      let basemap = document.getElementById(this.items.title)
      if (basemap) {
        while (basemap.hasChildNodes()) {
          // console.log(basemap.firstChild)
          basemap.removeChild(basemap.firstChild)
        }
      }
    },
    // 맵 상의 클러스트 Setter styles
    fnClusterStyle(feature) {
      let zoom = this.map.getView().getZoom()
      // console.log(zoom)
      return fnStyle(feature, zoom)
    },
    // 맵 상에 오브젝트 선택시
    fnMapClick(evt) {
      let pix = [0, 0]
      let gap = [40, 50]
      pix[0] = evt.pixel[0] - gap[0]
      pix[1] = evt.pixel[1] - gap[1]
      // console.log('fnMapClick', evt.pixel, pix)
      let feature = this.map.forEachFeatureAtPixel(evt.pixel, function(feature) {
        console.log('find feature', feature)
        return feature
      })
      if (feature) {
        console.log('fnMapClick', evt.pixel[0], evt.pixel[1], evt, feature)
        this.PopupInfo(feature)
      }
    },
    // 팝업 정보 출력
    PopupInfo(feature) {
      let ret = {}
      let item = feature.get('features')[0]
      if (item) {
        ret.title = item.get('title')
        ret.name = item.get('name')
        // ret.data[0].height = item.get('doorHeight')
        // ret.data[1].height = item.get('inHeight')
        // ret.visible = true
        this.$emit('clickItem', ret)
      }
    }
  }
}
</script>
<style lang="less">
.-svg_back {
  --background: linear-gradient(45deg, yellow, red);
  -webkit-transform: scale(1.1); /*  크롬 */
  -moz-transform: scale(1.1); /* FireFox */
  -o-transform: scale(1.1); /* Opera */
  transform: scale(1.1);
  transition: transform 0.35s;
  -o-transition: transform 0.35s;
  -moz-transition: transform 0.35s;
  -webkit-transition: transform 0.35s;
}
@media screen and (min-width: 0px) and (max-width: 800px) {
  .svg_back {
    position: relative;
  }
}
</style>
