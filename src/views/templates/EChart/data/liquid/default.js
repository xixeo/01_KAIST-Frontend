export default {
  series: [
    {
      type: 'liquidFill',
      data: [
        0.5,
        0.4,
        {
          value: 0.3,
          itemStyle: {
            color: 'red',
            opacity: 0.6
          },
          emphasis: {
            itemStyle: {
              opacity: 0.9
            }
          }
        }
      ]
    }
  ],
  tooltip: {
    show: true
  }
}
