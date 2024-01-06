export default {
    title: {
      text: 'barChart'
    },
    grid: {
      // left: '3%',
      // right: '3%',
      // bottom: '3%',
      // width: '70%',
      // height: '70%',
      // containLabel: true
    },
    legend: {
      data: ['2011년', '2012년']
  },
    textStyle: {
      fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif'
    },
    xAxis: { type: 'category', data: ['1번', '2번', '3번', '4번', '5번'] },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true
        }
      }
    },
    toolbox: {
      show: true,
      feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
      }
  },
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 100
      },
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        show: true,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 30,
        height: '80%',
        showDataShadow: false,
        left: '93%'
      }
    ],
    series: [
      // { name: '2011년', type: 'bar', data: [1, 2, 3, 4, 5] },
      // { name: '2012년', type: 'bar', data: [5, 4, 3, 2, 1] }
      { name: '2011년', type: 'bar', data: [0,0,0,0,0] },
      { name: '2012년', type: 'bar', data: [0,0,0,0,0] },
      { name: '2013년', type: 'bar', data: [1,1,1,1,0] }
    ]
  
}
