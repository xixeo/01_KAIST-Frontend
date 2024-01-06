<template>
  <DxChart
    id="chart"
    :data-source="dataSource"
    palette="Harmony Light"
    :title="title"
  >
    <DxCommonSeriesSettings argument-field="complaint"/>

    <!--시리즈-->
    <DxSeries v-for="(obj, i) in series" :key="i"
      :name="obj.name"
      :value-field="obj.valueField"
      :axis="obj.axis"
      :type="obj.type"
      :color="obj.color"
    />

    <DxArgumentAxis>
      <DxLabel overlapping-behavior="stagger"/>
    </DxArgumentAxis>

    <DxValueAxis
      :tick-interval="300"
      name="frequency"
      position="left"
    />
    
    <DxValueAxis
      :tick-interval="20"
      :show-zero="true"
      :value-margins-enabled="false"
      name="percentage"
      position="right"
    >
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
    </DxValueAxis>

    <DxTooltip
      :enabled="true"
      :shared="true"
      :customize-tooltip="customizeTooltip"
    />

    <DxLegend
      vertical-alignment="top"
      horizontal-alignment="center"
    />
    
  </DxChart>
</template>
<script>

import DxChart, {
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxLabel,
  DxLegend,
  DxSeries,
  DxTooltip,
  DxValueAxis,
  DxConstantLine
} from 'devextreme-vue/chart';

import { complaintsData } from './data/standardBarData.js';
import { uuid } from 'vue-uuid'


export default {
  name: 'standardChart',
  components: {
    DxChart,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    DxLabel,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxValueAxis,
    DxConstantLine
  },
  props: {
    title: {
      type: String,
      default: function() {
        return uuid.v1()
      }
    },
    series: {
      type: Array
    },
    constantLine: {
      type: Object
    }
  },
  data() {
    return {
      dataSource: complaintsData,
    };
  },

  methods: {
    customizeTooltip(pointInfo) {
      return {
      };
    },
    customizePercentageText({ valueText }) {
      return `${valueText}%`;
    },
  }
};
</script>
<style>
#chart {
    height: 440px;
}

.tooltip-header {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 5px;
    border-bottom: 1px solid #c5c5c5;
}

.tooltip-body {
    width: 170px;
}

.tooltip-body .series-name {
    font-weight: normal;
    opacity: 0.6;
    display: inline-block;
    line-height: 1.5;
    padding-right: 10px;
    width: 126px;
}

.tooltip-body .value-text {
    display: inline-block;
    line-height: 1.5;
    width: 30px;
}
</style>
