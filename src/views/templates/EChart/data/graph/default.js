import graph from './les-miserables.json'

export default {
  tooltip: {},
  legend: [
    {
      data: graph.categories.map(function(a) {
        return a.name
      }),
      textStyle: { color: '#fff' }
    }
  ],
  series: [
    {
      name: 'Les Miserables',
      type: 'graph',
      layout: 'none',
      data: graph.nodes,
      links: graph.links,
      categories: graph.categories,
      roam: true,
      label: {
        show: true,
        position: 'right',
        formatter: '{b}'
      },
      labelLayout: {
        hideOverlap: true
      },
      scaleLimit: {
        min: 0.4,
        max: 2
      },
      lineStyle: {
        color: 'source',
        curveness: 0.3
      }
    }
  ]
}
