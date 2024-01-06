<template>
  <div>
    <div>
      Custom 차트
    </div>
    <!--테마 선택-->
    <div class="dx-fieldset">
      <div class="dx-field">
        <!-- <themeSelect :id="'devExtreme'" /> -->
      </div>
    </div>
    <!--Editing Sample-->
    <div class="flex w-full">
      <div class="dx-field" style="width:50%">
        <div class="dx-field-label">
          chart sample view
          <devCustomChart
            :chartType="sampleChart.chartType"
            :title="sampleChart.title"
            :option="sampleChart.option"
            :apiFunc="apiFunc"
            :request="paramSample"
            @response="responseChart"
          ></devCustomChart>
        </div>
      </div>
      <div style="width:50%">
        <div class="dx-field-label">json</div>
        <div class="dx-field-value">
          <JsonEditor :value="this.sampleChart" @json-save="onClick($event, 'sample')" class="w-full h-full"></JsonEditor>
        </div>
      </div>
    </div>

    <!--barLineChart(막대, 라인) 차트샘플-->
    <h2 style="margin-top: 100px">barLineChart(막대, 라인) 차트샘플</h2>
    <div style="padding: 10px; float: right;">
      <dxButton :options="btnBarLineChart" @btnClick="onButtonClick(btnBarLineChart.id)"></dxButton>
    </div>
    <!-- json 에디터 -->
    <div style="width:100%">
      <div
        :title="'에디터'"
        class="json_editor"
        :draggable="{ stopDragging: false, isStorePosition: true, resetInitialPos: true, useFixDragIcon: true }"
        :popupID="'barLineChartEditor'"
        v-if="showBarLineJson"
      >
        <JsonEditor :value="this.barLineChart" @json-save="onClick($event, 'barLine')"></JsonEditor>
      </div>
    </div>
    <div>
      <devCustomChart
        :chartType="barLineChart.chartType"
        :title="barLineChart.title"
        :option="barLineChart.option"
        :apiFunc="apiFunc"
        :request="paramBarLine"
        @response="responseChart"
      ></devCustomChart>
    </div>

    <!--Doughnut(파이, 도넛) 차트샘플-->
    <h2 style="margin-top: 100px">Doughnut(파이, 도넛) 차트샘플</h2>
    <div style="flex w-full padding: 10px; float: right;">
      <dxButton :options="btnPieDoughnutChart" @btnClick="onButtonClick(btnPieDoughnutChart.id)"></dxButton>
    </div>
    <!-- json 에디터 -->
    <div style="width:100%">
      <div
        :title="'에디터'"
        class="json_editor"
        :draggable="{ stopDragging: false, isStorePosition: true, resetInitialPos: true, useFixDragIcon: true }"
        :popupID="'pieDoughnutChartEditor'"
        v-if="showPieDoughnutJson"
      >
        <JsonEditor :value="this.pieDoughnutChart" @json-save="onClick($event, 'pieDoughnut')"></JsonEditor>
      </div>
    </div>
    <div>
      <devCustomChart
        :chartType="pieDoughnutChart.chartType"
        :title="pieDoughnutChart.title"
        :option="pieDoughnutChart.option"
        :apiFunc="apiFunc"
        :request="paramPieDoughnut"
        @response="responseChart"
      ></devCustomChart>
    </div>

    <!--Point(포인트) 차트샘플-->
    <h2 style="margin-top: 100px">Point 차트샘플</h2>
    <div style="flex w-full padding: 10px; float: right;">
      <dxButton :options="btnPoint" @btnClick="onButtonClick(btnPoint.id)"></dxButton>
    </div>
    <!-- json 에디터 -->
    <div style="width:100%">
      <div
        :title="'에디터'"
        class="json_editor"
        :draggable="{ stopDragging: false, isStorePosition: true, resetInitialPos: true, useFixDragIcon: true }"
        :popupID="'pointChartEditor'"
        v-if="showPointJson"
      >
        <JsonEditor :value="this.pointChart" @json-save="onClick($event, 'point')"></JsonEditor>
      </div>
    </div>
    <div>
      <devCustomChart
        :chartType="pointChart.chartType"
        :title="pointChart.title"
        :option="pointChart.option"
        :apiFunc="apiFunc"
        :request="paramPoint"
        @response="responseChart"
      ></devCustomChart>
    </div>

    <!--Multi(멀티차트 type1) 차트샘플-->
    <h2 style="margin-top: 100px">Multi 차트샘플</h2>
    <div style="flex w-full padding: 10px; float: right;">
      <dxButton :options="btnMulti" @btnClick="onButtonClick(btnMulti.id)"></dxButton>
    </div>
    <!-- json 에디터 -->
    <div style="width:100%">
      <div
        :title="'에디터'"
        class="json_editor"
        :draggable="{ stopDragging: false, isStorePosition: true, resetInitialPos: true, useFixDragIcon: true }"
        :popupID="'multiChartEditor'"
        v-if="showMultiJson"
      >
        <JsonEditor :value="this.multiChart" @json-save="onClick($event, 'multi')"></JsonEditor>
      </div>
    </div>
    <div>
      <devCustomChart
        :chartType="multiChart.chartType"
        :title="multiChart.title"
        :option="multiChart.option"
        :apiFunc="apiFunc"
        :request="paramMulti"
        @response="responseChart"
      ></devCustomChart>
    </div>

    <!--polarRadar(Polar차트) 차트샘플-->
    <h2 style="margin-top: 100px">Polar 차트샘플</h2>
    <div style="flex w-full padding: 10px; float: right;">
      <dxButton :options="btnPolarRadar" @btnClick="onButtonClick(btnPolarRadar.id)"></dxButton>
    </div>
    <!-- json 에디터 -->
    <div style="width:100%">
      <div
        :title="'에디터'"
        class="json_editor"
        :draggable="{ stopDragging: false, isStorePosition: true, resetInitialPos: true, useFixDragIcon: true }"
        :popupID="'polarRadarChartEditor'"
        v-if="showPolarRadarJson"
      >
        <JsonEditor :value="this.polarRadarChart" @json-save="onClick($event, 'polarRadar')"></JsonEditor>
      </div>
    </div>
    <div>
      <devCustomChart
        :chartType="polarRadarChart.chartType"
        :title="polarRadarChart.title"
        :option="polarRadarChart.option"
        :apiFunc="apiFunc"
        :request="paramPolarRadar"
        @response="responseChart"
      ></devCustomChart>
    </div>
  </div>
</template>

<script>
import btnSample from './data/button.js'
import devCustomChart from '@/components/DevExtreme/devChart/devCustomChart.vue' // 사용자 정의 차트
import sampleChart from './data/devChart.js' // JSON
import getBarLineChart from './data/barLineChart.js' // JSON
import getPieDoughnutChart from './data/pieDoughnutChart.js' // JSON
import getPointChart from './data/pointChart.js' // JSON
import getMultiChart from './data/multiChart.js' // JSON
import getPolarRadarChart from './data/polarRadarChart.js' // JSON
import { getDevStandardData, getDevPieData, getDevPointData, getDevMultiData, getDevPolarRadarData } from '@/api/template/chartTemplate' // api 호출

import JsonEditor from '@/components/editor/jsonEditor' // json 편집기
import { dxButton } from '@/components/DevExtreme/editors' // 에디터 컴포넌트
import themeSelect from '@/components/themeSelect'
// import uuid from 'vue-uuid'

export default {
  components: {
    themeSelect,
    devCustomChart,
    JsonEditor,
    dxButton,
    getBarLineChart,
    getPieDoughnutChart,
    getPointChart,
    getMultiChart,
    getPolarRadarChart
  },
  data() {
    return {
      sampleChart: getPointChart.pointChart,
      barLineChart: getBarLineChart.barLineChart,
      pieDoughnutChart: getPieDoughnutChart.pieDoughnutChart,
      pointChart: getPointChart.pointChart,
      multiChart: getMultiChart.multiChart,
      polarRadarChart: getPolarRadarChart.polarRadarChart,

      standardDatasource: [],
      paramSample: {
        userId: 'admin',
        type: 'point'
      },
      paramBarLine: {
        userId: 'admin',
        type: 'barLine'
      },
      paramPieDoughnut: {
        userId: 'admin',
        type: 'pieDoughnut'
      },
      paramPoint: {
        userId: 'admin',
        type: 'point'
      },
      paramMulti: {
        userId: 'admin',
        type: 'multi'
      },
      paramPolarRadar: {
        userId: 'admin',
        type: 'polarRadar'
      },

      chartSampleEdit: sampleChart.default,

      //버튼속성정의
      btnBarLineChart: {
        kind: 'DevExtreme',
        class: null,
        style: 'width: 120px; margin-top: 0.1%; margin-left: 0.1%; ',
        id: 'barLine',
        type: 'normal',
        content: 'JSON',
        icon: 'check',
        stylingMode: 'contained'
      },
      btnPieDoughnutChart: {
        kind: 'DevExtreme',
        class: null,
        style: 'width: 120px; margin-top: 0.1%; margin-left: 0.1%; ',
        id: 'pieDoughnut',
        type: 'normal',
        content: 'JSON',
        icon: 'check',
        stylingMode: 'contained'
      },
      btnPoint: {
        kind: 'DevExtreme',
        class: null,
        style: 'width: 120px; margin-top: 0.1%; margin-left: 0.1%; ',
        id: 'point',
        type: 'normal',
        content: 'JSON',
        icon: 'check',
        stylingMode: 'contained'
      },
      btnMulti: {
        kind: 'DevExtreme',
        class: null,
        style: 'width: 120px; margin-top: 0.1%; margin-left: 0.1%; ',
        id: 'multi',
        type: 'normal',
        content: 'JSON',
        icon: 'check',
        stylingMode: 'contained'
      },
      btnPolarRadar: {
        kind: 'DevExtreme',
        class: null,
        style: 'width: 120px; margin-top: 0.1%; margin-left: 0.1%; ',
        id: 'polarRadar',
        type: 'normal',
        content: 'JSON',
        icon: 'check',
        stylingMode: 'contained'
      },

      showPieDoughnutJson: false,
      showBarLineJson: false,
      showPointJson: false,
      showMultiJson: false,
      showPolarRadarJson: false,

      changeApi: false
    }
  },
  mounted() {},
  methods: {
    apiFunc(req) {
      console.log('apiFun req -> ', JSON.stringify(req))
      if (req.type == 'barLine') {
        console.log('barLine -> ', JSON.stringify(getDevStandardData(req)))
        return getDevStandardData(req)
      } else if (req.type == 'pieDoughnut') {
        return getDevPieData(req)
      } else if (req.type == 'point') {
        return getDevPointData(req)
      } else if (req.type == 'multi') {
        return getDevMultiData(req)
      } else if (req.type == 'polarRadar') {
        return getDevPolarRadarData(req)
      }
    },
    responseChart(res, refs, title) {
      //console.log('responseChart --> ' + title, JSON.stringify(refs))
      //if (title == 'Dev Doughnut Chart') {
      //  refs.type = "doughnut"
      //  res[0].region = "Asia(Korea)"
      //}
    },
    onClick(e, chartType) {
      //console.log('json save click! --> ', chartType, JSON.stringify(e) )
      switch (chartType) {
        case 'sample':
          //console.log(' $$ this.sampleChart  -->  ' + JSON.stringify(e))
          //차트타입에 맞는 데이터를 입력해야함.
          this.paramSample.type = e.chartType
          this.apiFunc(this.paramSample)
          this.changeApi = true
          this.sampleChart = e
          break
        case 'barLine':
          console.log(' $$ barLine JSON')
          this.barLineChart = e
          break
        case 'pieDoughnut':
          console.log(' $$ pieDoughnut JSON')
          this.pieDoughnutChart = e
          break
        case 'point':
          console.log(' $$ point JSON')
          this.pointChart = e
          break
        case 'multi':
          console.log(' $$ multi JSON')
          this.multiChart = e
          break
        case 'polarRadar':
          console.log(' $$ polarRadar JSON')
          this.polarRadarChart = e
          break
      }
    },
    onButtonClick(e) {
      console.log('btn click! --> ' + JSON.stringify(e))
      switch (e) {
        case 'barLine':
          this.showBarLineJson = !this.showBarLineJson
          //console.log('btn click : barLine --> ' + this.showBarLineJson)
          break
        case 'pieDoughnut':
          this.showPieDoughnutJson = !this.showPieDoughnutJson
          //console.log('btn click : pieDoughnut --> ' + this.showPieDoughnutJson)
          break
        case 'point':
          this.showPointJson = !this.showPointJson
          //console.log('btn click : point --> ' + this.showPointJson)
          break
        case 'multi':
          this.showMultiJson = !this.showMultiJson
          //console.log('btn click : multi --> ' + this.showMultiJson)
          break
        case 'polarRadar':
          this.showPolarRadarJson = !this.showPolarRadarJson
          //console.log('btn click : polarRadar --> ' + this.showPolarRadarJson)
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dx-viewport:not(.dx-theme-ios7) .dx-fieldset {
  width: 100%;
  margin: 30px auto;
}

.dx-viewport:not(.dx-theme-ios7) .dx-fieldset:first-child {
  margin-top: 0px;
}

.dx-viewport:not(.dx-theme-ios7) .dx-fieldset-header {
  font-size: 16px;
}

.dx-viewport:not(.dx-theme-ios7) .dx-field {
  display: inline-block;
  margin-right: 24px;
}
.dx-viewport:not(.dx-theme-ios7) .dx-field-value:not(.dx-widget) > .dx-button {
  float: none;
}

.dx-viewport:not(.dx-theme-ios7) .dx-field-value:not(.dx-switch):not(.dx-checkbox):not(.dx-button),
.dx-viewport:not(.dx-theme-ios7) .dx-field-label {
  float: none;
  width: 100%;
}

.dx-viewport:not(.dx-theme-ios7) .dx-field-label {
  padding-left: 0;
}

.send .dx-button-content .dx-icon {
  font-size: 18px;
}
</style>
