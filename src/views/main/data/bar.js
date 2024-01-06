export default function getData () {
    function random () {
      return Math.round(300 + Math.random() * 700) / 10
    }
    return {
      textStyle: {
        // fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif'
      },
      dataset: {
        dimensions: ['Product', '2015', '2016', '2017'],
        source: [
          {
            Product: 'Matcha Latte',
            '2015': random(),
            '2016': random()
          },
          {
            Product: 'Milk Tea',
            '2015': random(),
            '2016': random()
          }
        ]
      },
      grid: {
        top: '10%'
        // bottom: '5%'
      },
      xAxis: { type: 'category' },
      yAxis: {},
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
        show: false,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      dataZoom: [
        {
          show: false,
          start: 0,
          end: 100
        },
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          show: false,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 30,
          height: '80%',
          showDataShadow: false,
          left: '93%'
        }
      ],
      series: [{ type: 'bar' }, { type: 'bar' }]
    }
}
