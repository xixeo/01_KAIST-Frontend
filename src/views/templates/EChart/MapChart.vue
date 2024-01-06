<template>
  <div>
    <!-- map 차트 -->
    <div>
      <h2 id="map">
        <a href="#map">Map chart</a>
      </h2>
      <echart :style="chartStyle" :ref="chartref" :options="map" :theme="charttheme" autoresize></echart>
    </div>
  </div>
</template>
<script>
import envs from '@/envs'
/* eslint-disable no-console */
import qs from 'qs'
import * as echarts from 'echarts/core'
import map from './data/map/default'
import echart from '@/components/echart/ECharts.vue' // echart 컴포넌트

export default {
  components: {
    echart
  },
  props: {
    chartclass: String,
    chartref: String,
    charttheme: String,
    chartStyle: String
  },
  data() {
    return {
      map
    }
  },
  mounted() {
    this.$refs['map'].chart.on('click', 'series.map', item => {
      alert('map click')
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
