import * as echarts from 'echarts'
import diskData from './disk.tree.json'

function colorMappingChange(value) {
  var levelOption = getLevelOption(value)
  // chart.setOption({
  //     series: [{
  //         levels: levelOption
  //     }]
  // });
}

var formatUtil = echarts.format

function getLevelOption() {
  return [
    {
      itemStyle: {
        borderWidth: 0,
        gapWidth: 5
      }
    },
    {
      itemStyle: {
        gapWidth: 1
      }
    },
    {
      colorSaturation: [0.35, 0.5],
      itemStyle: {
        gapWidth: 1,
        borderColorSaturation: 0.6
      }
    }
  ]
}

export default {
  title: {
    text: 'Disk Usage',
    left: 'center'
  },

  tooltip: {
    formatter: function(info) {
      var value = info.value
      var treePathInfo = info.treePathInfo
      var treePath = []

      for (var i = 1; i < treePathInfo.length; i++) {
        treePath.push(treePathInfo[i].name)
      }

      return [
        '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
        'Disk Usage: ' + formatUtil.addCommas(value) + ' KB'
      ].join('')
    }
  },

  series: [
    {
      name: 'Disk Usage',
      type: 'treemap',
      visibleMin: 300,
      label: {
        show: true,
        formatter: '{b}'
      },
      itemStyle: {
        borderColor: '#fff'
      },
      levels: getLevelOption(),
      data: diskData
    }
  ]
}
