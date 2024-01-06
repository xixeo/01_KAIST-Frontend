<template>
  <div>
    <div class="d-flex">
      <div class="w-64"><h2>EChart 템플릿</h2></div>
      <div class="w-1/4">
        <themeSelect :id="'echart'" :title="'Theme'" @change="themeChange" />
      </div>
    </div>
    <!-- template 차트 -->
    <div class="w-full flex p-5" style="height: 500px;">
      <div class="w-1/2 h-full">
        <div class="w-full">
          <editorsLayout ref="themeInfo" :layoutData="templateSelectLayout" @onValueChanged="changeTemplate" />
        </div>
        <div class="w-full">
          <customChart
            :title="'testChart1'"
            chartclass="chart"
            :chartref="chartItmes.ref[0]"
            :chartStyle="'width:100%;height:400px'"
            :charttheme="ChartTheme"
            :options="selectedTemplate"
            :useAutoRotation="true"
            :use="{ themeSelector: true, apiSender: false, json: false, apiUse: false }"
            @clickSeries="clickSeries"
            autoresize
          />
        </div>
      </div>
      <div class="w-1/2 bg-gray-300" style="overflow:auto; height: 500px;">
        <JsonEditor :value="selectedTemplate" :mode="'code'" @json-save="onSaveClick($event)" class="h-full" id="jeditor" />
      </div>
    </div>
    <div class="dx-fieldset">
      <div class="dx-field flex">
        <!-- customChart 컴포넌트 사용 -->
        <div>
          <!-- bar 차트 -->
          <customChart
            :title="'testChart1'"
            chartclass="chart"
            :chartref="chartItmes.ref[0]"
            :chartStyle="ChartStyle"
            :charttheme="ChartTheme"
            :options="chartItmes.options.bar"
            :interval="5000"
            :useAutoRotation="true"
            :request="chartItmes.req.bar"
            :apiFunc="apiFunc"
            :use="{ themeSelector: true, apiSender: true }"
            @response="responseChart"
            @clickSeries="clickSeries"
            autoresize
          ></customChart>
        </div>
        <div>
          <!-- line 차트 -->
          <customChart
            :title="'testChart2'"
            chartclass="chart"
            :chartref="chartItmes.ref[1]"
            :chartStyle="ChartStyle"
            :charttheme="ChartTheme"
            :options="chartItmes.options.line"
            :useAutoRotation="true"
            :interval="5000"
            :request="chartItmes.req.line"
            :apiFunc="apiFunc"
            :use="{ themeSelector: true, apiSender: true, apiUse: true, changeStyle: true }"
            @response="responseChart"
            @clickSeries="clickSeries"
            @changeOption="chartItmes.options.line = $event"
            autoresize
          ></customChart>
        </div>
        <div>
          <!-- 복합 차트 -->
          <customChart
            :title="'testChart3'"
            chartclass="chart"
            :chartref="chartItmes.ref[2]"
            :chartStyle="ChartStyle"
            :charttheme="ChartTheme"
            :options="chartItmes.options.multi"
            :interval="5000"
            :request="chartItmes.req.multi"
            :apiFunc="apiFunc"
            :use="{ themeSelector: true, apiSender: true, apiUse: true, changeStyle: true }"
            @response="responseChart"
            @clickSeries="clickSeries"
            @changeOption="chartItmes.options.line = $event"
            autoresize
          ></customChart>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <!-- connect 차트 -->
      <div>
        <connectChart chartclass="chart" :chartref="connect" :charttheme="ChartTheme" :chartStyle="ChartStyle" autoresize></connectChart>
        <p>
          <label>
            <input type="checkbox" v-model="connected" />
            Connected
          </label>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import envs from '@/envs'
/* eslint-disable no-console */
import qs from 'qs'
import * as echarts from 'echarts/core'

import connectChart from './ConnectChart'
import echart from '@/components/echart/ECharts.vue' // echart 컴포넌트
import customChart from '@/components/echart/customChart' // 사용자 정의 차트
import { getBarData, getLineData, getMultiData } from '@/api/template/chartTemplate' // api 호출
import getBar from './data/bar/barChart.js'
import getLine from './data/line/lineChart.js'
import getMulti from './data/multi/multiChart.js'
import themeSelect from '@/components/themeSelect'
import themes from '@/assets/theme/echart/themeList.js'
import localStore from '@/utils/localStore'
import templateChart from './data/index.js'
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import layout from './data/layout' // 레이아웃 정보
import JsonEditor from '@/components/editor/jsonEditor' // json 편집기
// import uuid from 'vue-uuid'

export default {
  components: {
    connectChart,
    customChart,
    themeSelect,
    editorsLayout,
    JsonEditor
  },
  data() {
    const options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
      templateSelectLayout: layout(),
      templates: templateChart,
      selectedTemplate: {},
      // customChart 컴포넌트 데이터
      chartItmes: {
        ref: ['bar', 'line', 'multi'],
        options: { bar: getBar, line: getLine, multi: getMulti },
        req: {
          bar: { test: '1' }, // bar api 파라미터
          line: { test: '2' }, // line api 파라미터
          multi: { test: '3' } // multi api 파라미터
        }
      },
      ChartStyle: 'width: 420px;height: 220px;', // 차트 스타일
      options,
      initOptions: {
        renderer: options.renderer || 'canvas'
      },
      ChartTheme: envs.framework.template.pc, // envs에 정의된 테마
      // Theme: envs.framework.template.pc, // envs에 정의된 테마
      connect: ['c1', 'c2'],
      connected: true,
      themeList: themes.items,
      // 시계 전용
      timeUpdatedStatus: {
        second: false,
        minute: false,
        hour: false
      }
    }
  },
  created() {
    let localTheme = localStore.get('theme-echart')
    if (localTheme) {
      this.ChartTheme = localTheme
    }
    for (var item in this.templates) {
      this.templateSelectLayout?.editorList[0].itemList.push({ value: item, label: item })
    }
    this.selectedTemplate = this.templates['polar']
  },
  mounted() {
    console.log('echart theme list', this.themeList)
  },
  beforeDestroy() {
    clearInterval(this.clockt)
  },
  methods: {
    changeTemplate(e) {
      clearInterval(this.clockt)
      console.log(e[1].value)
      console.log(this.templates[e[1].value])
      this.selectedTemplate = this.templates[e[1].value]

      if (e[1].value === 'clock') this.startClock()
    },
    apiFunc(req) {
      // 호출할 API 함수를 apiFunc과 연결
      if (req.test === '1') return getBarData(req)
      else if (req.test === '2') return getLineData(req)
      else if (req.test === '3') return getMultiData(req)
    },
    responseChart(res, refs, name) {
      console.log('responseChart', name, refs, res)
      // // API 호출 후 받은 res 값, 차트 refs 정보
      if (name === 'testChart1') {
        refs.series[0].data = res['2011']
        refs.series[1].data = res['2012']
      } else if (name === 'testChart2') {
        refs.series.forEach((item, index) => {
          refs.series[index].data = res['항목' + String(index + 1)]
        })
      } else if (name === 'testChart3') {
        refs.series[0].data = res.bar['2011']
        refs.series[1].data = res.bar['2012']
        refs.series[2].data = res.line['항목1']
        refs.series[3].data = res.line['항목2']
      }
    },
    clickSeries(res) {
      console.log('click', res)
    },
    themeChange(theme) {
      this.ChartTheme = theme
      console.log(theme)
    },
    onSaveClick(event) {
      this.selectedTemplate = event
    },
    // 시계 전용
    updateSeries(time, series, type) {
      var isCritical = Math.floor(time) === 0 || (type === 'second' && time === 1)
      if (isCritical && this.timeUpdatedStatus[type] === true) {
        this.timeUpdatedStatus[type] = false
        series.data[0].value = 0
        series.clockwise = true
        this.selectedTemplate.animationDurationUpdate = 0
        // myChart.setOption(option, true);
      }
      series.data[0].value = time
      series.clockwise = true
      if (time === 0) {
        this.timeUpdatedStatus[type] = true
        series.clockwise = false
      }
    },
    startClock() {
      this.clockt = setInterval(() => {
        var date = new Date()
        var second = date.getSeconds()
        var minute = date.getMinutes() + second / 60
        var hour = (date.getHours() % 12) + minute / 60

        // console.log(this.selectedTemplate)
        this.updateSeries(second, this.selectedTemplate.series[2], 'second')
        this.updateSeries(minute, this.selectedTemplate.series[1], 'minute')
        this.updateSeries(hour, this.selectedTemplate.series[0], 'hour')
        this.selectedTemplate.animationDurationUpdate = 300
        // myChart.setOption(option, true)
        date = null
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
#jeditor {
  color: #4fc08d;
  &.jsoneditor-vue {
    height: 100%;
  }
}
button,
select {
  border: 1px solid #4fc08d;
  border-radius: 2em;
  background-color: #fff;
  color: #42b983;
  cursor: pointer;
  font: inherit;
  padding: 0 0.5em;
  transition: opacity 0.3s;
  -webkit-appearance: none;
  transition: all 0.2s;
}
</style>
