export default {
  title: {
    text: 'Funnel'
    // subtext: ''
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    data: ['1', '2', '3', '4', '5'],
    textStyle: { color: '#fff' }
  },

  series: [
    {
      name: 'test',
      type: 'funnel',
      left: '10%',
      top: 60,
      //x2: 80,
      bottom: 60,
      width: '80%',
      // height: {totalHeight} - y - y2,
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: [
        { value: 60, name: '1' },
        { value: 40, name: '2' },
        { value: 20, name: '3' },
        { value: 80, name: '4' },
        { value: 100, name: '5' }
      ]
    }
  ]
}
