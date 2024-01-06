<template>
  <div>
    <!--<h2><a href="#bar">Bar chart</a></h2>-->
    <div class="grid grid-rows-1 grid-cols-9" style="overflow: auto;">
      <!-- 내부 테스트 컨트롤(테마 선택) -->
      <div v-if="use && use.themeSelector" class="col-start-1 col-span-3">
        <!--<select v-model="ChartTheme">
          <option v-for="(item, index) in themeList" :key="index" :value="item.value">{{ item.text }}</option>
        </select>-->
        <themeSelect :id="'echart'" :title="' '" :isSaveLocalStore="false" @change="themeChange" />
      </div>
      <dxButtonList class="col-start-4 col-span-6" v-if="use" :useBtnList="testButtonList" @btnClick="onButtonClick($event)"></dxButtonList>
    </div>
    <!-- 차트 -->
    <echart :style="chartStyle" :ref="chartref" :options="this.options" :theme="ChartTheme" autoresize></echart>

    <!--팝업-->
    <contentPopup
      :title="'차트에디터'"
      class="json_editor"
      :draggable="{ stopDragging: false, isStorePosition: true, resetInitialPos: true, useFixDragIcon: true }"
      :popupID="'testDrag'"
      v-if="showJson"
    >
      <!--@json-change="this.chartOpt = $event"-->
      <JsonEditor :value="this.chartOpt" @json-save="changeOptions($event)"></JsonEditor>
    </contentPopup>
  </div>
</template>
<script>
import envs from '@/envs'
import { uuid } from 'vue-uuid'
/* eslint-disable no-console */
import qs from 'qs'
import * as echarts from 'echarts/core'
// import getChart from './data/bar'
import echart from '@/components/echart/ECharts.vue' // echart 컴포넌트
import _ from 'lodash'
import procApi from '@/utils/processApi.js' // Api 프로세서
import themes from '@/assets/theme/echart/themeList.js' // echart 테마 리스트
import eventBus from '@/utils/eventBus' // event
import contentPopup from '@/components/popup/content' // 팝업 창 컴포넌트
import JsonEditor from '@/components/editor/jsonEditor'
import { dxButtonList } from '@/components/DevExtreme/editors' // 에디터 컴포넌트
import buttonList from './data/button'
import themeSelect from '@/components/themeSelect'

export default {
  name: 'customChart',
  components: {
    echart,
    contentPopup,
    JsonEditor,
    dxButtonList,
    themeSelect
  },
  props: {
    // 응답 처리를 위한 unique 아이디(부모에서 여러개의 차트 설정시 각각 다른이름으로 구분 할것)
    // 해당 차트의 unique id (지정 또는 자동 생성)
    title: {
      type: String,
      default: function() {
        return uuid.v1()
      }
    },
    // api 자동 호출 인터벌
    interval: {
      type: Number,
      default: 0
    },
    request: {
      type: Object
    },
    // api 호출 함수
    apiFunc: {
      type: Function,
      default: null
    },
    chartclass: {
      type: String,
      default: 'chart'
    },
    chartref: {
      type: String,
      default: 'bar'
    },
    charttheme: {
      type: String,
      default: envs.framework.template.pc
    },
    chartStyle: {
      type: String,
      default: 'width:100%; height:100%;'
    },
    options: Object,
    useAutoRotation: {
      type: Boolean,
      default: false
    },
    useMoueHover: {
      type: Boolean,
      default: false
    },
    use: {
      type: Object,
      default: () => {
        return {
          themeSelector: false,
          apiSender: false,
          apiUse: false,
          json: false
        }
      }
    },
    // api 자동 동작 on/off
    useApi: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      apiRef: [],
      refs: ['chart'],
      chartOpt: {},
      themeList: themes.items,
      ChartTheme: '',
      onAction: '',
      showJson: false,
      useAutoApi: true,
      testButtonList: buttonList(),
      chartTypes: [],
      actionTimer: []
    }
  },
  watch: {
    // options: {
    //   deep: true,
    //   handler() {
    //     console.log('options', this.options)
    //      _.merge(this.chartOpt, this.options)
    //   }
    // },
    options() {
      console.log('echart option change', this.options)
      _.merge(this.chartOpt, this.options)
    },
    apiFunc() {
      console.log('apiFunc', this.apiFunc)
    },
    charttheme() {
      this.ChartTheme = this.charttheme
      // console.log('ChartTheme Chanage', this.chartref)
      // this.onT = setInterval(this.setOnClick, 5000)
    },
    ChartTheme() {
      // console.log('ChartTheme Chanage', this.chartref)
      this.onAction = setInterval(this.setOnClick, 1000)
    },
    useApi() {
      this.useAutoApi = this.useApi
      this.setUseApi(this.useAutoApi)
    }
  },
  created() {
    this.ChartTheme = this.charttheme
    // console.log(' this.charttheme', this._uid)
    _.merge(this.chartOpt, this.options)
    // console.log('created', this.testButtonList)
    if (this.use) {
      if (this.use.apiUse) this.testButtonList.list.push({ id: 'useApi' })
      if (this.use.apiSender) this.testButtonList.list.push({ id: 'sendApi' })
      if (this.use.json) this.testButtonList.list.push({ id: 'json' })
    }
  },
  methods: {
    themeChange(theme) {
      this.ChartTheme = theme
      console.log(theme)
    },
    // startActions() {
    //   this.actionTimer = setInterval(() => {
    //     this.options = this.items // getChart() // 차트 데이터 변경
    //   }, 3000)
    // },
    // stopActions() {
    //   clearInterval(this.actionTimer)
    // }
    changeOptions(event) {
      // console.log(this.chartOpt, event)
      _.merge(this.chartOpt, event)
      this.$emit('changeOption', event)
    },
    setOnClick() {
      // 차트의 series 선택시
      this.chartTypes = []
      if (this.chartref) {
        this.chartOpt.series.forEach(element => {
          let unit = this.chartTypes.find(item => element.type === item)
          if (!unit) this.chartTypes.push(element.type)
        })
      }

      this.chartTypes.forEach(element => {
        if (this.$refs[this.chartref].chart) {
          this.$refs[this.chartref].chart.off('click', `series.${element}`, item => {
            this.$emit('clickSeries', item)
          })
          this.$refs[this.chartref].chart.on('click', `series.${element}`, item => {
            // alert('custom chart click', this.chartref)
            this.$emit('clickSeries', item)
          })
          // 차트의 Series hover
          // if (this.useMoueHover) {
          this.$refs[this.chartref].chart.off('mouseover', `series.${element}`, item => {
            // console.log('test')
            this.$emit('hoverSeries', item)
          })
          this.$refs[this.chartref].chart.on('mouseover', `series.${element}`, item => {
            // console.log('test')
            this.$emit('hoverSeries', item)
          })
        }
        // }
      })

      // 차트의 title 선택시
      this.$refs[this.chartref].chart.off('click', `title`, item => {
        // alert('click', this.chartref)
        this.$emit('clickTitle', item)
      })
      this.$refs[this.chartref].chart.on('click', `title`, item => {
        // alert('click', this.chartref)
        this.$emit('clickTitle', item)
      })

      clearInterval(this.onAction)
    },
    // 자동으로 데이터 순차적으로 선택 효과
    startRotations() {
      if (!this.useAutoRotation) return
      const chart = this.$refs[this.chartref]
      if (!chart) return
      if (!chart.options) return
      let dataLen = 0
      let dataIndex = -1

      this.actionTimer.push(
        setInterval(() => {
          // console.log('this.chartTypes', this.chartTypes)
          if (chart.options.series.length > 0 && chart.options.series[0].data) {
            dataLen = chart.options.series[0].data.length
          } else if (chart.options.dataset && chart.options.dataset.source) {
            dataLen = chart.options.dataset.source.length
          }
          if (dataLen > 0) {
            // console.log('actionTimer', this.chartref, dataIndex)
            chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex
            })
            dataIndex = (dataIndex + 1) % dataLen
            chart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex
            })
            chart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex
            })
          }
        }, 3000)
      )
    },
    stopRotations() {
      this.actionTimer.forEach(item => {
        clearInterval(item)
      })
    },
    // 차트 api 호출 응답 함수
    response(res, refs) {
      this.$emit('response', res, this.options, refs.name) // refs._api.getOption()) // 부모로 전달
    },
    sendApi(payload) {
      // console.log('sendApi', `sendChartApi:${this.title}`)
      if (this.apiFunc) procApi.instance(this.apiRef, this.title) // 호출 수동(한번만 또는 특정 신호시)
    },
    sendApiTest() {
      // console.log('sendApiTest', `sendChartApi:${this.title}`)
      eventBus.$emit(`sendChartApi:${this.title}`, '') // 부모에서 이렇게 호출하면 동작됨
    },
    setUseApi(flag) {
      procApi?.setUse(this.apiRef, this.title, flag) // procapi 호출 on/off
    },
    // 버튼 리스트 선택했을 경우
    onButtonClick(e) {
      switch (e.id) {
        case 'sendApi':
          this.sendApiTest()
          break
        case 'useApi':
          this.setUseApi((this.useAutoApi = !this.useAutoApi))
          break
        case 'json':
          this.showJson = !this.showJson
          break
      }
      // console.log(e)
    }
  },
  mounted() {
    eventBus.$on(`sendChartApi:${this.title}`, payload => {
      this.sendApi(payload)
    }) // 각각의 커스텀 차트는 고유한 title(uid)로 구분해서 사용해야 함.
    if (this.use) {
      if (this.use.apiSender) {
        let btnSendApi = this.testButtonList.list.find(item => item.id === 'sendApi')
        btnSendApi.visible = this.use.apiSender
      }
      if (this.use.apiUse) {
        let btnUseApi = this.testButtonList.list.find(item => item.id === 'useApi')
        btnUseApi.visible = this.use.apiUse
      }
      if (this.use.json) {
        let btnJson = this.testButtonList.list.find(item => item.id === 'json')
        btnJson.visible = this.use.json
      }
      // console.log(this.testButtonList.list)
    }

    this.startRotations()
    // console.log(this.chartref)

    // 차트의 Series hover
    // if (this.useMoueHover)
    // {
    //   this.$refs[this.chartref].chart.on('mouseover', `series.${this.chartref}`, item => {
    //     // console.log('test')
    //     this.$emit('hoverSeries', item)
    //   })
    // }

    // api 호출 연결
    if (this.apiFunc) {
      if (this.interval > 0) {
        // console.log(this.apiFunc)
        procApi.pushItem(this.apiRef, {
          name: this.title,
          chart: this.$refs[this.chartref].chart,
          fn: this.response,
          req: this.request,
          api: this.apiFunc,
          interval: this.interval,
          lastTime: 0
        })

        // 사용 유무 설정에 따라 신호 보내는 것을 막을수 있음.
        this.useAutoApi = this.useApi
        this.setUseApi(this.useAutoApi)

        procApi.processes(this.apiRef, 1000) // 호출 자동
      } else {
        procApi.pushItem(this.apiRef, {
          name: this.title,
          chart: this.$refs[this.chartref].chart,
          fn: this.response,
          req: this.request,
          api: this.apiFunc
        })

        // 사용 유무 설정에 따라 신호 보내는 것을 막을수 있음.
        this.useAutoApi = this.useApi
        this.setUseApi(this.useAutoApi)

        procApi.instance(this.apiRef, this.title) // 호출 수동(한번만 또는 특정 신호시)
      }
    }
  },
  beforeDestroy() {
    eventBus.$off(`sendChartApi:${this.title}`)
    procApi.destroy(this.apiRef)
    this.stopRotations()
    this.$refs[this.chartref].chart.dispose()
  }
}
</script>

<style>
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

.json_editor {
  overflow: auto;
  position: absolute;
  float: right;
  width: 400px;
  background: white;
  height: 590px;
  top: 80px;
  right: 260px;
}
</style>
