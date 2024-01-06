export default {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'rgba(0,0,0,0.2)',
        width: 1,
        type: 'solid'
      }
    }
  },

  legend: {
    data: ['DQ', 'TY', 'SS', 'QG', 'SY', 'DD'],
    textStyle: { color: '#fff' }
  },

  singleAxis: {
    top: 50,
    bottom: 50,
    axisTick: {},
    axisLabel: {},
    type: 'time',
    axisPointer: {
      animation: true,
      label: {
        show: true
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        opacity: 0.2
      }
    }
  },

  series: [
    {
      type: 'themeRiver',
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.8)'
        }
      },
      data: [
        ['2021/04/08', 10, 'DQ'],
        ['2021/04/09', 15, 'DQ'],
        ['2021/04/10', 35, 'DQ'],
        ['2021/04/11', 38, 'DQ'],
        ['2021/04/12', 22, 'DQ'],
        ['2021/04/13', 16, 'DQ'],
        ['2021/04/14', 7, 'DQ'],
        ['2021/04/15', 2, 'DQ'],
        ['2021/04/16', 17, 'DQ'],
        ['2021/04/17', 33, 'DQ'],
        ['2021/04/18', 40, 'DQ'],
        ['2021/04/19', 32, 'DQ'],
        ['2021/04/20', 26, 'DQ'],
        ['2021/04/21', 35, 'DQ'],
        ['2021/04/22', 40, 'DQ'],
        ['2021/04/23', 32, 'DQ'],
        ['2021/04/24', 26, 'DQ'],
        ['2021/04/25', 22, 'DQ'],
        ['2021/04/26', 16, 'DQ'],
        ['2021/04/27', 22, 'DQ'],
        ['2021/04/28', 10, 'DQ'],
        ['2021/04/08', 35, 'TY'],
        ['2021/04/09', 36, 'TY'],
        ['2021/04/10', 37, 'TY'],
        ['2021/04/11', 22, 'TY'],
        ['2021/04/12', 24, 'TY'],
        ['2021/04/13', 26, 'TY'],
        ['2021/04/14', 34, 'TY'],
        ['2021/04/15', 21, 'TY'],
        ['2021/04/16', 18, 'TY'],
        ['2021/04/17', 45, 'TY'],
        ['2021/04/18', 32, 'TY'],
        ['2021/04/19', 35, 'TY'],
        ['2021/04/20', 30, 'TY'],
        ['2021/04/21', 28, 'TY'],
        ['2021/04/22', 27, 'TY'],
        ['2021/04/23', 26, 'TY'],
        ['2021/04/24', 15, 'TY'],
        ['2021/04/25', 30, 'TY'],
        ['2021/04/26', 35, 'TY'],
        ['2021/04/27', 42, 'TY'],
        ['2021/04/28', 42, 'TY'],
        ['2021/04/08', 21, 'SS'],
        ['2021/04/09', 25, 'SS'],
        ['2021/04/10', 27, 'SS'],
        ['2021/04/11', 23, 'SS'],
        ['2021/04/12', 24, 'SS'],
        ['2021/04/13', 21, 'SS'],
        ['2021/04/14', 35, 'SS'],
        ['2021/04/15', 39, 'SS'],
        ['2021/04/16', 40, 'SS'],
        ['2021/04/17', 36, 'SS'],
        ['2021/04/18', 33, 'SS'],
        ['2021/04/19', 43, 'SS'],
        ['2021/04/20', 40, 'SS'],
        ['2021/04/21', 34, 'SS'],
        ['2021/04/22', 28, 'SS'],
        ['2021/04/23', 26, 'SS'],
        ['2021/04/24', 37, 'SS'],
        ['2021/04/25', 41, 'SS'],
        ['2021/04/26', 46, 'SS'],
        ['2021/04/27', 47, 'SS'],
        ['2021/04/28', 41, 'SS'],
        ['2021/04/08', 10, 'QG'],
        ['2021/04/09', 15, 'QG'],
        ['2021/04/10', 35, 'QG'],
        ['2021/04/11', 38, 'QG'],
        ['2021/04/12', 22, 'QG'],
        ['2021/04/13', 16, 'QG'],
        ['2021/04/14', 7, 'QG'],
        ['2021/04/15', 2, 'QG'],
        ['2021/04/16', 17, 'QG'],
        ['2021/04/17', 33, 'QG'],
        ['2021/04/18', 40, 'QG'],
        ['2021/04/19', 32, 'QG'],
        ['2021/04/20', 26, 'QG'],
        ['2021/04/21', 35, 'QG'],
        ['2021/04/22', 40, 'QG'],
        ['2021/04/23', 32, 'QG'],
        ['2021/04/24', 26, 'QG'],
        ['2021/04/25', 22, 'QG'],
        ['2021/04/26', 16, 'QG'],
        ['2021/04/27', 22, 'QG'],
        ['2021/04/28', 10, 'QG'],
        ['2021/04/08', 10, 'SY'],
        ['2021/04/09', 15, 'SY'],
        ['2021/04/10', 35, 'SY'],
        ['2021/04/11', 38, 'SY'],
        ['2021/04/12', 22, 'SY'],
        ['2021/04/13', 16, 'SY'],
        ['2021/04/14', 7, 'SY'],
        ['2021/04/15', 2, 'SY'],
        ['2021/04/16', 17, 'SY'],
        ['2021/04/17', 33, 'SY'],
        ['2021/04/18', 40, 'SY'],
        ['2021/04/19', 32, 'SY'],
        ['2021/04/20', 26, 'SY'],
        ['2021/04/21', 35, 'SY'],
        ['2021/04/22', 4, 'SY'],
        ['2021/04/23', 32, 'SY'],
        ['2021/04/24', 26, 'SY'],
        ['2021/04/25', 22, 'SY'],
        ['2021/04/26', 16, 'SY'],
        ['2021/04/27', 22, 'SY'],
        ['2021/04/28', 10, 'SY'],
        ['2021/04/08', 10, 'DD'],
        ['2021/04/09', 15, 'DD'],
        ['2021/04/10', 35, 'DD'],
        ['2021/04/11', 38, 'DD'],
        ['2021/04/12', 22, 'DD'],
        ['2021/04/13', 16, 'DD'],
        ['2021/04/14', 7, 'DD'],
        ['2021/04/15', 2, 'DD'],
        ['2021/04/16', 17, 'DD'],
        ['2021/04/17', 33, 'DD'],
        ['2021/04/18', 4, 'DD'],
        ['2021/04/19', 32, 'DD'],
        ['2021/04/20', 26, 'DD'],
        ['2021/04/21', 35, 'DD'],
        ['2021/04/22', 40, 'DD'],
        ['2021/04/23', 32, 'DD'],
        ['2021/04/24', 26, 'DD'],
        ['2021/04/25', 22, 'DD'],
        ['2021/04/26', 16, 'DD'],
        ['2021/04/27', 22, 'DD'],
        ['2021/04/28', 10, 'DD']
      ]
    }
  ]
}