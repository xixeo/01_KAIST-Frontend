export default {
    title: {
      text: 'lineChart'
    },
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
      top: '15%',
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
        data: []
      },
      {
        name: '항목2',
        type: 'line',
        stack: 'line차트',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: '항목3',
        type: 'line',
        stack: 'line차트',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: '항목4',
        type: 'line',
        stack: 'line차트',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: []
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
        data: []
      }
    ]
}
