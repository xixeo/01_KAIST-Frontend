function randomize() {
  return [0, 1].map(v => {
    if (v === 0) return Math.round(Math.random() * 1000)
    if (v === 1) return Math.round(20 + Math.random() * 10)
  })
}

export default {
  title: {
    text: 'multiChart'
  },
  legend: {
    top: '10%'
  },
  tooltip: {},
  grid: [
    {
      right: '60%'
    },
    {
      left: '60%'
    }
  ],
  dataset: {
    // Provide data.
    source: [
      ['Product', '전기세', '온도'], // legend
      ['1일', ...randomize()],
      ['2일', ...randomize()],
      ['3일', ...randomize()],
      ['4일', ...randomize()],
      ['5일', ...randomize()]
    ]
  },
  // X축 선언
  xAxis: [
    {
      gridIndex: 0,
      type: 'category'
    },
    {
      gridIndex: 1,
      type: 'category'
    }
  ],
  // Y축 선언
  yAxis: [
    {
      gridIndex: 0,
      type: 'value',
      name: '비용',
      min: 0,
      max: 1000,
      interval: 500,
      position: 'left',
      axisLabel: {
        formatter: '{value} 만원'
      },
      axisLine: {}
    },
    {
      gridIndex: 1,
      type: 'value',
      name: '온도',
      min: -20,
      max: 40,
      interval: 30,
      position: 'left',
      axisLabel: {
        formatter: '{value} °C'
      },
      axisLine: {}
    }
  ],
  // Declare several series, each of them mapped to a column of the dataset by default.
  series: [
    {
      xAxisIndex: 0,
      yAxisIndex: 0, // 기준 y축 index
      type: 'bar', // 차트 타입
      label: {
        // 라벨 정보 출력 설정
        name: '전기세',
        show: true, // 차트 수치 표시 (true/false)
        position: 'inside' // 안쪽: inside, 바깥: outside
      },
      showBackground: false
    },
    {
      xAxisIndex: 1,
      yAxisIndex: 1, // 기준 y축 index
      type: 'line', // 차트 타입
      label: {
        // 라벨 정보 출력 설정
        name: '온도',
        show: false, // 차트 수치 표시 (true/false)
        position: 'inside' // 안쪽: inside, 바깥: outside
      }
    }
  ]
}
