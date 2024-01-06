export default {
  sample1: {
    title: {
      text: '未来一周气温变化',
      subtext: '纯属虚构'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['2011년', '2012년']
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        name: '2011년',
        type: 'bar',
        data: [10, 11, 13, 11, 12, 12, 9],
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: '平均值' }]
        }
      },
      {
        name: '2012년',
        type: 'bar',
        data: [1, -2, 2, 5, 3, 2, 0],
        markPoint: {
          data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
        },
        markLine: {
          data: [
            { type: 'average', name: '平均值' },
            [
              {
                symbol: 'none',
                x: '90%',
                yAxis: 'max'
              },
              {
                symbol: 'circle',
                label: {
                  position: 'start',
                  formatter: '最大值'
                },
                type: 'max',
                name: '最高点'
              }
            ]
          ]
        }
      }
    ]
  },
  devicebar: {
    title: {
      show: true,
      text: ' ',
      textStyle: {
        fontFamily: 'hhiMedium',
        fontWeight: 'bolder',
        fontSize: '40',
        color: '#fff'
      },
      left: 20,
      top: 10
    },
    legend: {
      show: true,
      orient: 'vertical',
      bottom: '1%',
      left: '3%'
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(v) {
        // console.log(v, v.name, v.value, v.seriesName)
        let itemName = v.seriesName === '비가동' ? v.seriesName : '가동'
        return `${v.name.split(' ')[0]} ${itemName} ${v.value}대`
      }
    },
    angleAxis: {
      splitNumber: 2,
      axisLabel: { show: true },
      axisLine: {
        lineStyle: {
          // Property 'lineStyle' controls line styles
          color: 'transparent'
        } // 설비별 가동현황 동그라미선 색상 추가
      },
      axisTick: {
        show: false
      },
      splitArea: {
        show: false
      }
    },

    radiusAxis: {
      show: true,
      type: 'category',
      z: 10, // 100
      axisLabel: {
        interval: 0,
        fontSize: 12,
        color: '#eee',
        formatter: function(v) {
          if (v) {
            // console.log(v)
            let item = v.split(',')
            let devName = item[0].split(' ')
            return `{name|${devName[0]}:}{percent| ${devName[2]}대 가동(${item[1]}%)}  \n{line|}{circle|●}`
          } else return v
        },
        // backgroundColor: '#37385f', // '#eee',
        // borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 4,
        fontOffsetY: -100,
        // shadowBlur: 1,
        // shadowOffsetX: -2,
        // shadowOffsetY: -100,
        shadowColor: '#999',
        rich: {
          line: {
            width: 120,
            height: 2,
            backgroundColor: {
              image:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAACCAYAAACE7KJkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzc5MjA2MTdGNzJGMTFFQUIxRjJEQkVERDIzQzhBQzgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Nzc5MjA2MThGNzJGMTFFQUIxRjJEQkVERDIzQzhBQzgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NzkyMDYxNUY3MkYxMUVBQjFGMkRCRUREMjNDOEFDOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NzkyMDYxNkY3MkYxMUVBQjFGMkRCRUREMjNDOEFDOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgrDTEQAAAAwSURBVHja7MfBDQAgDAOxlv13DhViAsTTfiS6TlLjzOj7Wmuttdb6sVcBAPDVFmAARk+ZAe0FnY0AAAAASUVORK5CYII='
              // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAAOBAMAAAB6G1V9AAAAD1BMVEX////Kysrk5OTj4+TJycoJ0iFPAAAAG0lEQVQ4y2MYBaNgGAMTQQVFOiABhlEwCugOAMqzCykGOeENAAAAAElFTkSuQmCC'
            }
          },
          percent: {
            color: '#ffffff',
            fontSize: 14
          },
          bd: {
            color: '#ccc',
            padding: [0, 5],
            fontSize: 14
          }
        }
      },
      axisLine: {
        lineStyle: {
          // Property 'lineStyle' controls line styles
          // color: '#FFF'
        } // 설비별 가동현황 세로선 색상 추가
      },
      data: []
    },
    polar: {
      center: ['60%', '50%'],
      radius: ['0%', '70%']
    },
    series: [
      {
        type: 'bar',
        name: '제습기',
        stack: 'a',
        coordinateSystem: 'polar',
        data: [],
        color: '#fa8072'
      },
      {
        type: 'bar',
        name: 'A.H.U',
        stack: 'a',
        coordinateSystem: 'polar',
        data: [],
        color: '#dc143c'
      },
      {
        type: 'bar',
        name: '보일러',
        stack: 'a',
        coordinateSystem: 'polar',
        data: [],
        color: '#b8860b'
      },
      {
        type: 'bar',
        name: '가스유량계',
        stack: 'a',
        coordinateSystem: 'polar',
        data: [],
        color: '#00ced1'
      },
      {
        type: 'bar',
        name: '냉동기',
        stack: 'a',
        coordinateSystem: 'polar',
        data: [],
        color: '#32cd32'
      },
      {
        type: 'bar',
        name: '온습도계',
        stack: 'a',
        coordinateSystem: 'polar',
        data: [],
        color: '#4169e1'
      },
      {
        type: 'bar',
        name: 'VOCs저감설비',
        stack: 'a',
        coordinateSystem: 'polar',
        data: [],
        color: 'gray'
      },
      {
        type: 'bar',
        name: '가스히터',
        stack: 'a',
        coordinateSystem: 'polar',
        data: [],
        color: 'gray'
      },
      {
        type: 'bar',
        name: '비가동',
        stack: 'a',
        coordinateSystem: 'polar',
        data: [],
        color: 'gray'
      }
    ]
  }
}
