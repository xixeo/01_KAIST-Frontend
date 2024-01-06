<template>
  <div>
    <!-- connect 차트 -->
    <div>
      <h2 id="connect">
        <a href="#connect">Connect chart</a>
      </h2>
      <div class="d-flex">
        <echart :style="chartStyle" :ref="chartref[0]" :options="c1" :theme="charttheme" autoresize></echart>
        <echart :style="chartStyle" :ref="chartref[1]" :options="c2" :theme="charttheme" autoresize></echart>
      </div>
    </div>
  </div>
</template>
<script>
import envs from '@/envs'
/* eslint-disable no-console */
import qs from 'qs'
import * as echarts from 'echarts/core'
import { c1, c2 } from './data/connect'
import echart from '@/components/echart/ECharts.vue' // echart 컴포넌트

export default {
  components: {
    echart
  },
  props: {
    chartclass: String,
    chartref: Array,
    charttheme: String,
    chartStyle: String
  },
  data() {
    return {
      c1,
      c2
    }
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
