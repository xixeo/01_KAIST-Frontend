<template>
  <!-- 기본차트(막대, 라인) -->
  <div v-if="chartType == 'barLine'">
    <DxChart :id="title" :data-source="dataSource" palette="Harmony Light" :title="title">
      <DxCommonSeriesSettings :type="option.options.type" argument-field="complaint" />

      <!--시리즈 칼러값 사용자정의 가능 :color="objSeries.color" -->
      <DxSeries
        v-for="(objSeries, i) in option.series"
        :key="'series' + i"
        :name="objSeries.name"
        :value-field="objSeries.valueField"
        :axis="objSeries.axis"
        :type="objSeries.type"
      >
        <DxLabel :visible="objSeries.labelVisivle" />
      </DxSeries>

      <DxArgumentAxis>
        <DxLabel overlapping-behavior="stagger" />
      </DxArgumentAxis>

      <!--y축-->
      <DxValueAxis
        v-for="(objAxis, i) in option.axis"
        :key="'axis' + i"
        :tick-interval="objAxis.interval"
        :name="objAxis.name"
        :position="objAxis.position"
      >
      </DxValueAxis>

      <!-- 기준선
        <DxLabel :customize-text="customizePercentageText"/>
        <DxConstantLine
          :value="60"
          :width="2"
          color="#fc3535"
          dash-style="dash"
          :visible="false"
        >
        <DxLabel :visible="false"/>
        </DxConstantLine>
        -->

      <DxExport :enabled="option.options.export" />

      <DxTooltip :enabled="true" :shared="true" />

      <DxLegend :vertical-alignment="option.legend.vertical" :horizontal-alignment="option.legend.horizontal" :visible="option.legend.visible" />
    </DxChart>
  </div>

  <!-- 도넛차트 -->
  <div v-else-if="chartType == 'pieDoughnut'">
    <DxPieChart
      :id="title"
      :data-source="dataSource"
      :title="title"
      palette="Bright"
      @point-click="pointClickHandler($event)"
      @legend-click="legendClickHandler($event)"
    >
      <DxSeries argument-field="subject" value-field="count">
        <DxLabel :visible="true">
          <DxConnector :visible="true" />
        </DxLabel>
      </DxSeries>
      <DxSize :width="500" />
      <DxExport :enabled="option.options.export" />
      <DxLegend
        :margin="option.legend.margin"
        :horizontal-alignment="option.legend.horizontal"
        :vertical-alignment="option.legend.vertical"
        :visible="option.legend.visible"
      />
      <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip">
        <!-- <DxFormat type="millions" /> -->
      </DxTooltip>
    </DxPieChart>
  </div>

  <!-- 포인트 차트 -->
  <div v-else-if="chartType == 'point'">
    <DxChart :id="title" :data-source="dataSource" :title="title" @series-click="seriesClick">
      <DxCommonSeriesSettings :type="option.options.seriesType" />

      <!--시리즈-->
      <DxSeries
        v-for="(objSeries, i) in option.series"
        :key="'series' + i"
        :name="objSeries.name"
        :value-field="objSeries.valueField"
        :argument-field="objSeries.argumentField"
        :size-field="objSeries.sizeField"
        :tag-field="objSeries.tagField"
      />

      <DxArgumentAxis :title="option.axis.xAxisTitle">
        <DxLabel :customize-text="customizeText" />
      </DxArgumentAxis>

      <DxValueAxis :title="option.axis.yAxisTitle">
        <DxLabel :customize-text="customizeText" />
      </DxValueAxis>

      <DxLegend
        :visible="option.legend.visible"
        :position="option.legend.position"
        :vertical-alignment="option.legend.vertical"
        :horizontal-alignment="option.legend.horizontal"
      >
      </DxLegend>

      <DxLegend :vertical-alignment="option.legend.vertical" :horizontal-alignment="option.legend.horizontal" :visible="option.legend.visible" />

      <DxTooltip :customize-tooltip="customizeTooltip" :enabled="true" location="edge" />

      <DxExport :enabled="option.options.export" />
    </DxChart>
  </div>

  <!-- 멀티 차트 -->
  <div v-else-if="chartType == 'multi'">
    <DxChart :id="title" :data-source="dataSource" default-pane="bottom">
      <DxCommonSeriesSettings argument-field="month" />

      <DxSeries
        v-for="(objSeries, i) in option.series"
        :key="'series' + i"
        :name="objSeries.name"
        :value-field="objSeries.valueField"
        :pane="objSeries.pane"
        :type="objSeries.type"
      >
      </DxSeries>

      <DxPane name="top" />
      <DxPane name="bottom" />

      <DxArgumentAxis>
        <DxLabel display-mode="stagger" />
      </DxArgumentAxis>

      <DxValueAxis :tick-interval="option.axis.topTickInterval" pane="top">
        <DxGrid :visible="option.axis.topGridVisible" />
        <DxTitle :text="option.axis.topAxisTitle" />
      </DxValueAxis>

      <DxValueAxis :tick-interval="option.axis.bottomTickInterval" pane="bottom">
        <DxGrid :visible="option.axis.bottomGridVisible" />
        <DxTitle :text="option.axis.bottomAxisTitle" />
      </DxValueAxis>

      <DxLegend :vertical-alignment="option.legend.vertical" :horizontal-alignment="option.legend.horizontal" :visible="option.legend.visible" />
      <DxExport :enabled="option.options.export" />
      <DxTooltip :enabled="true" />
      <DxTitle :text="title" />
    </DxChart>
  </div>

  <!-- polar 차트 -->
  <div v-else-if="chartType == 'polarRadar'">
    <DxPolarChart :id="title" :data-source="dataSource" :palette="option.options.palette" :title="title" @legend-click="onPolarLegendClick">
      <DxCommonSeriesSettings type="stackedbar" />
      <DxSeries v-for="seriesData in option.series" :key="seriesData.value" :value-field="seriesData.value" :name="seriesData.name" />
      <DxMargin :bottom="50" :left="100" />
      <DxArgumentAxis
        :inverted="option.axis.inverted"
        :start-angle="option.axis.startAngle"
        :tick-interval="option.axis.tickInterval"
        :first-point-on-start-angle="true"
        discrete-axis-division-mode="crossLabels"
      />
      <DxValueAxis :value-margins-enabled="false" />
      <DxExport :enabled="option.options.export" />
      <DxLegend :visible="option.legend.visible" />
    </DxPolarChart>
  </div>
</template>

<script>
import DxChart, {
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxPane,
  DxGrid,
  DxTitle,
  DxLabel,
  DxLegend,
  DxSeries,
  DxTooltip,
  DxValueAxis,
  DxConstantLine
} from 'devextreme-vue/chart'

import DxPieChart, { DxFormat, DxConnector, DxExport } from 'devextreme-vue/pie-chart'

import { DxPolarChart, DxMargin } from 'devextreme-vue/polar-chart'

import { uuid } from 'vue-uuid'
import procApi from '@/utils/processApi.js' // Api 프로세서

export default {
  name: 'devCustomChart',
  components: {
    DxChart,
    DxPane,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    DxLabel,
    DxGrid,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxTitle,
    DxValueAxis,
    DxConstantLine,
    DxPieChart,
    DxFormat,
    DxConnector,
    DxExport,
    DxPolarChart,
    DxMargin
  },
  props: {
    chartType: {
      type: String
    },
    title: {
      type: String,
      default: function() {
        return uuid.v1()
      }
    },
    apiFunc: {
      type: Function,
      default: function() {
        return ''
      }
    },
    option: {
      type: Object
    },
    request: {
      type: Object
    },
    constantLine: {
      type: Object
    },
    changeApi: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      apiRef: [],
      dataSource: '',
      palette: ['#00ced1', '#008000', '#ffd700', '#ff7f50'],
      seriesData: []
    }
  },
  watch: {
    apiFunc() {
      console.log(' @@ watch -> apiFunc ', this.apiFunc)
    },
    chartType() {
      console.log(' @@ watch -> chartType ', this.chartType)
      this.procApuInstance()
    },
    series: {
      deep: true,
      handler() {
        this.seriesData = this.series
      }
    }
  },
  methods: {
    customizeTooltip(pointInfo) {
      return {}
    },

    //바 차트 관련 함수
    customizePercentageText({ valueText }) {
      return `${valueText}%`
    },
    seriesClick(e) {
      const series = e.target
      if (series.isVisible()) {
        series.hide()
      } else {
        series.show()
      }
    },

    //파이 차트 관련 함수
    pointClickHandler(e) {
      this.toggleVisibility(e.target)
    },
    legendClickHandler(e) {
      let arg = e.target,
        item = e.component.getAllSeries()[0].getPointsByArg(arg)[0]

      this.toggleVisibility(item)
    },
    toggleVisibility(item) {
      item.isVisible() ? item.hide() : item.show()
    },

    //포인트 차트 관련 함수
    customizeText(e) {
      return `${e.value}M`
    },

    //polar차트 관련 함수
    onPolarLegendClick({ target: series }) {
      if (series.isVisible()) {
        series.hide()
      } else {
        series.show()
      }
    },

    // 차트 api 호출 응답 함수
    response(res, refs) {
      console.log(' chart response --> ', this.title, res, this.option)
      this.$emit('response', res, this.option, this.title) // refs._api.getOption()) // 부모로 전달
      this.dataSource = res
    },
    procApuInstance() {
      if (this.apiFunc) {
        procApi.pushItem(this.apiRef, {
          name: this.title,
          fn: this.response,
          req: this.request,
          api: this.apiFunc,
          dt: this.dataSource,
          use: true
        })
        console.log('procApuInstance 호출')
        procApi.instance(this.apiRef, this.title, this.request) // 호출 수동(한번만 또는 특정 신호시)
      }
    }
  },
  mounted() {
    console.log('<-- devCustomChart mounted --> ' + this.chartType + ' : ' + this.apiRef)
    this.procApuInstance()
  }
}
</script>

<style></style>
