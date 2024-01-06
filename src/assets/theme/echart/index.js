import envs from '@/envs'
import _ from 'lodash'

var target = _.find(envs.framework.template.pcThemes, { id: envs.framework.template.pc })

// Echart
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart, MapChart, RadarChart, ScatterChart, EffectScatterChart, LinesChart } from 'echarts/charts'
import {
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent
} from 'echarts/components'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import 'echarts-liquidfill/index'
const { use, registerMap, registerTheme } = echarts
use([
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
  CanvasRenderer,
  SVGRenderer
])

// Map of China
import chinaMap from '@/assets/theme/echart/map/china.json'
import worldMap from '@/assets/theme/echart/map/world.json'
// registering map data
registerMap('china', chinaMap)
registerMap('world', worldMap)

// default theme
import 'echarts/theme/azul'
import 'echarts/theme/bee-inspired'
import 'echarts/theme/blue'
import 'echarts/theme/caravan'
import 'echarts/theme/carp'
import 'echarts/theme/cool'
import 'echarts/theme/dark-blue'
import 'echarts/theme/dark-bold'
import 'echarts/theme/dark-digerati'
import 'echarts/theme/dark-fresh-cut'
import 'echarts/theme/dark-mushroom'
import 'echarts/theme/eduardo'
import 'echarts/theme/forest'
import 'echarts/theme/fresh-cut'
import 'echarts/theme/gray'
import 'echarts/theme/green'
import 'echarts/theme/helianthus'
import 'echarts/theme/infographic'
import 'echarts/theme/inspired'
import 'echarts/theme/jazz'
import 'echarts/theme/london'
import 'echarts/theme/macarons'
import 'echarts/theme/macarons2'
import 'echarts/theme/mint'
import 'echarts/theme/red'
import 'echarts/theme/red-velvet'
import 'echarts/theme/roma'
import 'echarts/theme/royal'
import 'echarts/theme/sakura'
import 'echarts/theme/shine'
import 'echarts/theme/tech-blue'
import 'echarts/theme/vintage'

// custom theme
registerTheme(target.echart, require('@/assets/theme/echart/' + 'themeB' + '.json'))
// registerTheme(target.echart, require('@/assets/theme/echart/' + target.echart + '.json'))
