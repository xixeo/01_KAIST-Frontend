export default function getData () {
    function random () {
      return Math.round(300 + Math.random() * 700) / 10
    }
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['항목1', '항목2', '항목3', '항목4', '항목5']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['1번', '2번', '3번', '4번', '5번']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '항목1',
        type: 'line',
        stack: 'line차트',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [random(1), random(1), random(1), random(1), random(1), random(1)]
      },
      {
        name: '항목2',
        type: 'line',
        stack: 'line차트',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [random(2), random(2), random(2), random(2), random(2), random(2)]
      },
      {
        name: '항목3',
        type: 'line',
        stack: 'line차트',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [random(3), random(3), random(3), random(3), random(3), random(3)]
      },
      {
        name: '항목4',
        type: 'line',
        stack: 'line차트',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [random(4), random(4), random(4), random(4), random(4), random(4)]
      },
      {
        name: '항목5',
        type: 'line',
        stack: 'line차트',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [random(5), random(5), random(5), random(5), random(5), random(5)]
      }
    ]
  }
}
