import chartData from './mock/chartData.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'
import { complaintsData } from '@/api/template/mock/devChartData.js'
import { populationByRegions } from '@/api/template/mock/devDoughnutChartData.js'
import { pointChartData } from '@/api/template/mock/devPointChartData.js'
import { multiChartData } from '@/api/template/mock/devMultiChartData.js'
import { polarRadarChartData } from '@/api/template/mock/devPolarRadarChartData.js'

// bar 차트 조회(목업)
export function getBarData(param) {
  return new Promise(function(resolve, reject) {
    let res = []
    if (param.test === '1') res = chartData.bar
    resolve(res)
  })
}

// line 차트 조회(목업)
export function getLineData(param) {
  return new Promise(function(resolve, reject) {
    let res = []
    if (param.test === '2') res = chartData.line
    resolve(res)
  })
}

// line 차트 조회(목업)
export function getMultiData(param) {
  return new Promise(function(resolve, reject) {
    let res = []
    if (param.test === '3') res = chartData.multi
    resolve(res)
  })
}

// dev standard 차트 조회(목업)
export function getDevStandardData(param) {
  return new Promise(function(resolve, reject) {
    let res = []
    res = complaintsData
    resolve(res)
  })
}

// dev pie 차트 조회(목업)
export function getDevPieData(param) {
  return new Promise(function(resolve, reject) {
    let res = []
    res = populationByRegions
    //console.log( '@@@getDevPieData : ' + JSON.stringify(param))
    resolve(res)
  })
}

// dev point 차트 조회(목업)
export function getDevPointData(param) {
  return new Promise(function(resolve, reject) {
    let res = []
    res = pointChartData
    //console.log( '@@@getDevPieData : ' + JSON.stringify(param))
    resolve(res)
  })
}

// dev multi 차트 조회(목업)
export function getDevMultiData(param) {
  return new Promise(function(resolve, reject) {
    let res = []
    res = multiChartData
    //console.log( '@@@getDevMultiData : ' + JSON.stringify(res))
    resolve(res)
  })
}

// dev PolarRadar 차트 조회(목업)
export function getDevPolarRadarData(param) {
  return new Promise(function(resolve, reject) {
    let res = []
    res = polarRadarChartData
    //console.log( '@@@polarRadarChartData : ' + JSON.stringify(res))
    resolve(res)
  })
}
