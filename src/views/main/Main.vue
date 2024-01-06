<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->

  <!-- <div class="w-full h-full" style="overflow:visible; width=auto; height=auto"> -->
  <div style="padding:0px;overflow:none">
    <div id="main" class="ml-3 mt-3 mr-3 mb-2 grid grid-rows-5 grid-cols-12 gap-1 justify-evenly">
      <!-- 총 가동현황 -->
      <div class="bg-blue-500 col-span-2 row-span-1 rounded-lg h-full border-gray-200">
        <DxPieChart
          id="pie"
          :data-source="bigadongStatusDatasource.data"
          title="Device 가동현황(전체)"
          type="doughnut"
          palette="Bright"
          :customize-point="customizePoint"
        >
          <DxSeries argument-field="subject">
            <DxLabel :visible="true" :customize-text="formatLabel" position="inside" background-color="transparent">
              <DxFont :size="18" :weight="600" color="white" />
              <DxConnector :visible="false" />
            </DxLabel>
          </DxSeries>
          <DxExport :enabled="false" />
          <DxTitle text=" Device 가동현황(전체) ">
            <DxFont color="white" size="20px" family="Segoe UI Light" />
          </DxTitle>
          <DxLegend :margin="0" horizontal-alignment="right" vertical-alignment="top" />
          <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip">
            <DxFormat type="percent" />
          </DxTooltip>
        </DxPieChart>
      </div>
      <!-- 시간대별 디바이스 가동현황 -->
      <div class="bg-green-300 col-span-4 row-span-1 content-endrounded-lg h-full">
        <DxChart id="time_chart" :data-source="deviceByTimeInfo.dataSource" palette="Violet">
          <DxPane name="top" />
          <DxBorder :visible="true" :width="2" />
          <DxCommonSeriesSettings :type="deviceByTimeInfo.type" argument-field="time" />
          <DxSeries
            :key="deviceByTimeInfo.seriesValue"
            :value-field="deviceByTimeInfo.seriesValue"
            :name="serieseNameByTimeChart"
            color="#ff66ff"
          ></DxSeries>
          <DxSeries
            :key="deviceByTimeInfo.seriesTotalValue"
            :value-field="deviceByTimeInfo.seriesTotalValue"
            :name="serieseTotalDataByTimeChart"
            color="#3399ff"
          ></DxSeries>
          <DxMargin :bottom="20" />
          <DxArgumentAxis :value-margins-enabled="false" discrete-axis-division-mode="crossLabels">
            <DxGrid :visible="true" />
          </DxArgumentAxis>
          <DxValueAxis position="left" :allow-decimals="false" :auto-breaks-enabled="false">
            <DxTitle text="가동 디바이스 수"> <DxFont color="white" size="16px" family="Segoe UI Light"/></DxTitle>
          </DxValueAxis>
          <DxLegend vertical-alignment="bottom" horizontal-alignment="center" item-text-position="bottom" />
          <DxExport :enabled="false" />
          <DxTitle text="데이타 수신 디바이스 현황(분)" style="font-size:12px">
            <DxFont color="white" size="20px" family="Segoe UI Light" />
            <!-- <DxSubtitle text="(현재부터 1시간 간격으로)">
                <DxFont color="lime" />
              </DxSubtitle> -->
          </DxTitle>
          <DxTooltip :enabled="true" :customize-tooltip="customizeTooltipforLinechar" location="edge" />
        </DxChart>
      </div>
      <!-- 디바이스별 최종 수신 정보 그리드 -->
      <div class="bg-green-300 col-span-6 row-span-5 rounded-lg h-full">
        <div>
          <devDataGrid
            :height="DevLastDataGrid.properties.height"
            :gridInfo="DevLastDataGrid.properties"
            :dataSource="DevLastDataGrid.data"
            :ref="DevLastDataGrid.properties.gridName"
          ></devDataGrid>
          <footerText style="padding-right:13px"></footerText>
        </div>
      </div>
      <!-- 그룹별 가동현황 -->
      <div class="bg-green-500 col-span-6 row-span-4 rounded-lg h-3/5">
        <DxChart id="group_chart" :data-source="devicedStatusByGroupoDatasource.data" :rotated="true">
          <DxCommonSeriesSettings argument-field="groupId" type="stackedbar" :bar-padding="0.7" size="1">
            <!-- <Dxlabel visible="true" format="largeNumber"></Dxlabel> -->
          </DxCommonSeriesSettings>
          <DxArgumentAxis :inverted="true">
            <!-- or DxValueAxis, or DxCommonAxisSettings -->
            <!-- <DxLabel :rotation-angle="45" overlapping-behavior="rotate" /> -->
            <!-- <DxLabel :staggering-spacing="10" display-mode="stagger" /> -->
          </DxArgumentAxis>
          <DxValueAxis position="left" :allow-decimals="false">
            <DxTitle text="디바이스 수"> <DxFont color="white" size="16px" family="Segoe UI Light"/></DxTitle>
          </DxValueAxis>
          <DxPane name="top" />
          <DxBorder :visible="true" :width="2" />
          <DxSeries value-field="gadongDeviceCnt" name="가동" color="#1cfc03"> </DxSeries>
          <DxSeries value-field="bigadongDeviceCnt" name="비가동" color="#fca103" />
          <DxLegend vertical-alignment="top" horizontal-alignment="bottom" item-text-position="center" />
          <DxExport :enabled="false" />
          <DxTitle text=" 그룹별 가동현황 ">
            <DxFont color="white" size="20px" family="Segoe UI Light" />
          </DxTitle>
          <DxTooltip :enabled="true" :customize-tooltip="customizeTooltipforBarchar" location="edge"
            ><DxFormat type="fixedPoint" :precision="0"
          /></DxTooltip>
        </DxChart>
      </div>
      <!-- <div class="bg-green-300 col-span-2 rounded-lg h-40"> -->
      <!-- 비가동 목록 그리드 -->
      <!-- <devDataGrid
            :gridInfo="bigadongDevGrid.properties"
            :dataSource="bigadongDevGrid.data"
            :ref="bigadongDevGrid.properties.gridName" >
         </devDataGrid> -->
      <!-- </div> -->
    </div>
  </div>
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import DxChart, {
  DxCommonSeriesSettings,
  DxTitle,
  DxLabel,
  DxLegend,
  DxSeries,
  DxTooltip,
  DxValueAxis,
  DxArgumentAxis,
  DxGrid,
  DxMargin,
  DxSubtitle,
  DxPane,
  DxBorder,
  DxFont,
  DxPoint
} from 'devextreme-vue/chart'

import DxPieChart, { DxFormat, DxConnector, DxExport } from 'devextreme-vue/pie-chart'
import devCustomChart from '@/components/DevExtreme/devChart/devCustomChart.vue' // 사용자 정의 차트
import { devDataGrid } from '@/components/DevExtreme/grid' // 그리드 컴포넌트
import getPieDoughnutChart from './data/pieDoughnutChart.js' // JSON
import { getTotalGadongStatusData } from '@/api/main/totalGadongStatus.js' // 차트 api 호출
import { getBigadongDeviceData } from '@/api/main/BigadongDeviceData.js' //비가동 정보 리스트 api 호출
import { getDeviceLastData } from '@/api/main/DeviceLastData.js' //디바이스 최종 수신 정보 리스트 api 호출
import { getDevicesStatusByTime } from '@/api/main/deviceStatusByTime.js' //시간별 디바이스들의 수량조회 api 호출
import { getDeviceStatusByGroupData } from '@/api/main/deviceSatusByGroup.js' //그룹별 디바이스 상태 정보 조회 api 호출
import getBigadongDeviceGridProperties from './properties/bigadongGridProperty' //비가동 정보 리스트 그리드 속성 정보
import getdeviceLastDataGridProperties from './properties/deviceLastDataGridProperty' //디바이스 최종 수신 그리드 속성 정보
import footerText from '../components/footer' //하단 소속명 추가
var moment = require('moment')

//test
// import { areas } from './data/test/pieData.js'
//import service from './data/test/barchartData.js'
import deviceByTime from './data/test/devStatusByTime.js'
import { List } from 'echarts/core'

export default {
  name: 'Main.vue',
  components: {
    footerText,
    devCustomChart,
    DxPieChart,
    DxFormat,
    DxConnector,
    DxExport,
    DxPoint,
    //
    DxChart,
    DxCommonSeriesSettings,
    DxTitle,
    DxLabel,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxValueAxis,
    devDataGrid,
    //
    DxArgumentAxis,
    DxGrid,
    DxMargin,
    DxSubtitle,
    DxPane,
    DxBorder,
    DxFont
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created() {
    this.timer = setInterval(this.RefreshScreenEventsList, 10000) //5초마다 refresh 처리
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },
    serieseNameByTimeChart() {
      return '분당 가동 디바이스 수 (총 디바이스의 수 : ' + this.currentTotalGadongCnt + ' 개)'
    }
  },
  data() {
    return {
      timer: '',
      paramMulti: {},
      piechartProperties: getPieDoughnutChart(),
      deviceByTimeInfo: {
        dataSource: [],
        type: 'line',
        seriesName: '시간별 디바이스 수',
        seriesValue: 'count',
        seriesTotalValue: 'totalCount'
      },
      // 가동, 비가동 수 조회
      bigadongStatusDatasource: { data: [] },
      //그룹별 디바이스 상태 정보
      devicedStatusByGroupoDatasource: {
        data: []
      },
      // 비가동 그리드 정보
      bigadongDevGrid: {
        properties: {}, // 그리드 설정 정보
        data: [] // 그리드 데이터
      },
      // 디바이스별 최종 수신 정보
      DevLastDataGrid: {
        properties: {}, // 그리드 설정 정보
        data: [] // 그리드 데이터
      },
      currentTotalGadongCnt: 0,
      totalRecvDataCount: 0, //분당 직전 토탈 데이타 수
      serieseTotalDataByTimeChart: '분당 총 수신 데이타'
    }
  },
  beforeMount() {
    //console.log(getBigadongDeviceGridProperties().BigadongDeviceGridProperties)

    this.bigadongDevGrid.properties = getBigadongDeviceGridProperties().BigadongDeviceGridProperties
    this.DevLastDataGrid.properties = getdeviceLastDataGridProperties().deviceLastDataGridProperties
    console.log('beformount')
  },
  mounted() {
    this.RefreshScreenEventsList()
  },
  watch: {
    totalRecvDataCount: {
      deep: true,
      handler() {
        //console.log('watch --> ', this.totalRecvDataCount)
        //시간별 마지막 분당 총 데이타 수와 마지막 가동현황의 데이타와의 동기화 처리
        //console.log(this.deviceByTimeInfo.dataSource[0].totalCount != undefined ? this.deviceByTimeInfo.dataSource[0].totalCount : '')
        if (
          this.deviceByTimeInfo.dataSource[0].totalCount != undefined &&
          this.deviceByTimeInfo.dataSource.length > 0 &&
          this.deviceByTimeInfo.dataSource[0].totalCount != 0 &&
          this.deviceByTimeInfo.dataSource[0].totalCount != this.totalRecvDataCount
        )
          this.deviceByTimeInfo.dataSource[0].totalCount = this.totalRecvDataCount
      }
    }
  },
  methods: {
    customizePoint(pointInfo) {
      //console.log(pointInfo)
      //console.log('xxxxxxxxxxxx')
      return pointInfo.argument == '가동' ? { color: '#41AFFF' } : { color: '#FF5660' }
    },
    apiFunc(req) {
      // 호출할 API 함수를 apiFunc과 연결
      console.log('getGadongStatusData')
      return getGadongStatusData(req)
    },
    responseChart(res, refs, name) {
      console.log('response########', res, refs, name)
      // // API 호출 후 받은 res 값, 차트 refs 정보
      //초기화 후 함수 호출
      // refs.series[0].data[0].value = []
      // refs.series[0].data[1].value = []
      // refs.series[0].data[0].value = res[0].run
      // refs.series[0].data[1].value = res[0].stop
    },
    pointClickHandler() {
      //this.toggleVisibility(e.target)
    },
    legendClickHandler() {
      // let arg = e.target,
      //   item = e.component.getAllSeries()[0].getPointsByArg(arg)[0]
      // this.toggleVisibility(item)
    },
    toggleVisibility() {
      // item.isVisible() ? item.hide() : item.show()
    },
    customizeTooltip({ percent }) {
      return {
        text: `${(percent * 100).toFixed(2)}%`
      }
    },
    customizeTooltipforBarchar(pointInfo) {
      return {
        text: `${pointInfo.argumentText}  \r\n 전체 : ${pointInfo.total} \r\n ${pointInfo.seriesName} : ${pointInfo.valueText}`
      }
    },
    //시간별 custom tooltip
    customizeTooltipforLinechar(pointInfo) {
      let unitText = '대'
      if (pointInfo.seriesName == this.serieseTotalDataByTimeChart) unitText = '건'
      return {
        text: `${pointInfo.argumentText}  \r\n ${pointInfo.seriesName} : ${pointInfo.valueText} ` + unitText
      }
    },
    formatLabel(pointInfo) {
      //console.log(pointInfo)
      //return `${pointInfo.argument} : ${pointInfo.valueText} (${pointInfo.percentText})`
      return `${pointInfo.argument} : ${pointInfo.valueText} `
    },
    // [ 가동, 비가동 정보 조회 api호출]
    totalGadongStatusData() {
      var receivedData = []

      var totalGadongCount = 0
      // console.log('##totalGadongStatusData', this.param)
      getTotalGadongStatusData().then(res => {
        //console.log(JSON.stringify(res))
        res.list.forEach((item, index) => {
          item.id = index + 1
          //item.device_id = item.device_id + '(' + item.device_unique_id + ')'
          receivedData.push(item)
          //total count 구하기
          if (item.subject == '가동' || item.subject == '비가동') totalGadongCount += Number(item.val)
        })

        if (totalGadongCount != this.currentTotalGadongCnt) this.currentTotalGadongCnt = totalGadongCount
        //console.log(this.bigadongDevGrid.data)
        //this.bigadongDevGrid.data = res.list
        //this.searchedGridData = res.list
        //notify(this.$t('msg.search_success'), 'success', 1000)

        if (this.bigadongStatusDatasource.data.length == 0 || JSON.stringify(receivedData) != JSON.stringify(this.bigadongStatusDatasource.data)) {
          console.log('totalGadongStatusData 데이타 변경')

          this.bigadongStatusDatasource.data = []
          this.bigadongStatusDatasource.data = receivedData
          //
        }

        //console.log(JSON.stringify(this.bigadongStatusDatasource.data))
      })
    },
    // [ 비가동 디바이스 Grid 조회 api호출 ]
    bigadongDeviceGridListData() {
      var receivedData = []
      // console.log('##bigadongDeviceGridListData', this.param)

      getBigadongDeviceData().then(res => {
        //console.log(JSON.stringify(res))
        res.list.forEach((item, index) => {
          item.id = index + 1
          //item.device_id = item.device_id + '(' + item.device_unique_id + ')'
          receivedData.push(item)
        })

        this.bigadongDevGrid.data = receivedData
        //console.log(this.bigadongDevGrid.data)
        //this.bigadongDevGrid.data = res.list
        //this.searchedGridData = res.list
        //notify(this.$t('msg.search_success'), 'success', 1000)
      })
    },
    // [ 그룹별 디바이스 상태 정보 조회 api호출 ]
    deviceStatusByGroup() {
      var receivedData = []
      // console.log('##deviceStatusByGroup', this.param)
      getDeviceStatusByGroupData().then(res => {
        //console.log(JSON.stringify(res))
        res.list.forEach((item, index) => {
          item.id = index + 1
          //item.device_id = item.device_id + '(' + item.device_unique_id + ')'
          item.groupId = item.groupNm + ' (' + item.groupId + ')'
          receivedData.push(item)
        })

        if (
          this.devicedStatusByGroupoDatasource.data.length == 0 ||
          JSON.stringify(receivedData) != JSON.stringify(this.devicedStatusByGroupoDatasource.data)
        ) {
          console.log('deviceStatusByGroup 데이타 change!!')

          this.devicedStatusByGroupoDatasource.data = []
          this.devicedStatusByGroupoDatasource.data = receivedData
        }
        //console.log(this.bigadongDevGrid.data)
        //this.bigadongDevGrid.data = res.list
        //this.searchedGridData = res.list
        //notify(this.$t('msg.search_success'), 'success', 1000)
      })
    },
    //
    // [ 디바이스별 최종 가동정보 api 호출 처리 ]
    //
    deviceLastDataGridListData() {
      var param = {
        devGrpID: '',
        devID: ''
      }
      var receivedData = []
      let lastRecvTime = undefined
      // console.log('##deviceLastDataGridListData', this.param)
      getDeviceLastData(param).then(res => {
        //total recevied data count calculation!
        this.totalRecvDataCount = 0
        if (res.list != undefined) {
          var arrExistMeasureTime = res.list.filter(function(x) {
            return x.countMaesureTime != ''
          })
          if (arrExistMeasureTime.length > 0)
            lastRecvTime = arrExistMeasureTime.reduce((a, b) => (moment(a.countMaesureTime).isAfter(moment(b.countMaesureTime)) ? a : b))
              .countMaesureTime
          res.list.forEach(el => {
            if (el.countMaesureTime == lastRecvTime) this.totalRecvDataCount += el.countPerMinute
          })
        }
        console.log('직전 분당 총 카운트 : ' + this.totalRecvDataCount)
        console.log('lastRecvTime : ' + lastRecvTime)
        res.list.forEach((item, index) => {
          item.id = index + 1
          item.no = index + 1
          //item.device_id = item.device_id + '(' + item.device_unique_id + ')'
          item.device_groupstr = item.device_grp_nm + ' (' + item.device_grp_id + ')'
          item.status = item.running
          item.deviceTimeout = item.deviceTimeout == null || item.deviceTimeout == 0 ? 60 : item.deviceTimeout
          let rateFloat = (item.countPerMinute / this.totalRecvDataCount) * 100
          item.countPerMinute =
            item.countPerMinute != 0 && this.totalRecvDataCount != 0 && item.countMaesureTime == lastRecvTime
              ? item.countPerMinute + ' / ' + this.totalRecvDataCount + ' (' + parseFloat(rateFloat).toFixed(2) + '%) '
              : // + moment(item.countMaesureTime).format('YYYY-MM-DD hh:mm')
                ''
          receivedData.push(item)
        })

        this.DevLastDataGrid.data = receivedData
        //console.log(this.bigadongDevGrid.data)
        //this.bigadongDevGrid.data = res.list
        //this.searchedGridData = res.list
        //notify(this.$t('msg.search_success'), 'success', 1000)
      })
    },
    //
    // [ 시간별 데이타베이스 수량 api 호출 처리 ]
    ///
    devicesStatusByTimeData() {
      var receivedData = []

      var today = new Date()

      // for (var i = 0; i < 7; i++) {
      //   var hours = ('0' + (today.getHours() - i)).slice(-2) + 'h'
      //   receivedData.push({ id: i, time: hours, count: 0 })
      // }

      // console.log('##devicesStatusByTimeData', this.param)
      getDevicesStatusByTime().then(res => {
        res.list.forEach((item, index) => {
          // console.log(JSON.stringify(item))
          //item.id = index + 1
          //item.device_id = item.device_id + '(' + item.device_unique_id + ')'
          item.time = item.time.substring(11, 16) + 'm'
          //receivedData.find(x => x.time == item.time).count = item.count
          receivedData.push(item)
        })

        //total count 구하기
        // var currentGadongTotalCnt = 0
        // getTotalGadongStatusData().then(res => {
        //   res.list.forEach((item, index) => {
        //     item.id = index + 1
        //     if (item.subject == '가동') currentGadongTotalCnt += Number(item.val)
        //   })

        //   //receivedData.push({ time: 'now', count: currentGadongTotalCnt })

        // })

        //receivedData.reverse()
        // console.log('시간에 의한 가동수 조회 :' + JSON.stringify(receivedData))
        if (JSON.stringify(receivedData) != JSON.stringify(this.deviceByTimeInfo.dataSource)) this.deviceByTimeInfo.dataSource = receivedData

        //console.log(this.bigadongDevGrid.data)
        //this.bigadongDevGrid.data = res.list
        //this.searchedGridData = res.list
        //notify(this.$t('msg.search_success'), 'success', 1000)
      })
    },
    RefreshScreenEventsList() {
      //console.log('reload screen!!!!' + Date.now())

      this.deviceStatusByGroup()
      this.bigadongDeviceGridListData()
      this.totalGadongStatusData()
      this.devicesStatusByTimeData()
      this.deviceLastDataGridListData()
    },
    cancelAutoUpdate() {
      clearInterval(this.timer)
    }
  },
  beforeDestroy() {
    this.cancelAutoUpdate()
  }
}
</script>

<style>
#pie {
  width: auto;
  height: auto;
}

#pie * {
  margin: 0 auto;
}
#time_chart {
  width: auto;
  height: auto;
}

#group_chart {
  width: auto;
  height: auto;
}
</style>
