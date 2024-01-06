<template>
  <div>
    <!-- pie 차트 -->
    <div>
      <h2 id="pie">
        <a href="#pie">Pie chart</a>
      </h2>
      <echart :style="chartStyle" :ref="chartref" :options="pie" :theme="charttheme" autoresize></echart>
    </div>
  </div>
</template>
<script>
import envs from '@/envs'
/* eslint-disable no-console */
import qs from 'qs'
import * as echarts from 'echarts/core'
import pie from './data/pie/default'
import echart from '@/components/echart/ECharts.vue' // echart 컴포넌트

export default {
  components: {
    echart
  },
  props: {
    chartclass: String,
    chartref: String,
    chartoptions: Object,
    charttheme: String,
    chartStyle: String
  },
  data() {
    return {
      pie
    }
  },
  methods: {
    startActions() {
      let dataIndex = -1
      const pie = this.$refs.pie
      if (!pie) return
      const dataLen = pie.options.series[0].data.length

      this.actionTimer = setInterval(() => {
        pie.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex
        })
        dataIndex = (dataIndex + 1) % dataLen
        pie.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex
        })
        pie.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex
        })
      }, 3000)
    },
    stopActions() {
      clearInterval(this.actionTimer)
    }
  },
  mounted() {
    this.startActions()
    this.$refs['pie'].chart.on('click', 'series.pie', item => {
      alert('pie click')
    })
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
</style>
