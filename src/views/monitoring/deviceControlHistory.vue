<template>
  <!-- HTML 정의하는 부분 -->
  <div class="layout-wrapper" style="padding:10px">
    <div class="container-fluid">
      <!-- 타이틀, buttonList -->
      <layout-title buttonKind="dxButton" :useButtonList="buttonUseList" @btnSearch="btnSearch()" />
      <!-- 조회조건 -->
      <div class="editor-card-theme ">
        <editorsLayout ref="deviceControlHistCondition" :layoutData="editorOptionData" @onValueChanged="valueChanged"></editorsLayout>
      </div>
      <div style="padding-top:10px">
        <!-- 그리드 영역 -->
        <devDataGrid :ref="grdMainNm" height="calc(100vh - 260px)" :gridInfo="gridProperties" :dataSource="grdMainData" />
      </div>
      <footerText></footerText>
      <!-- json 팝업 -->
      <jsonPopup ref="jsonPopup" @close="closeJsonPopup" :value="selJsonData" :popupTitle="jsonPopupTitle" style="z-index: 1;" />
    </div>
  </div>
</template>

<script>
import layoutTitle from '@/components/layoutTitle' // title component
import { devDataGrid } from '@/components/DevExtreme/grid' // 그리드 컴포넌트
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import { color } from 'echarts/core'
import getEditorOptions from './optionData/devControlHistEditorOptions' // 에디터 옵션 데이터
import { getDeviceControlHistory } from '@/api/monitoring/deviceControlHistory' //api
import notify from 'devextreme/ui/notify' // message
import EventBus from '@/components/event-bus' // 그리드 이벤트
import jsonPopup from './popup/jsonPopup' // json editor 팝업
import moment from 'moment'
import { faHourglass } from '@fortawesome/free-regular-svg-icons'
import footerText from '../components/footer' //하단 소속명 추가

export default {
  name: 'deviceControlHistory.vue',
  components: {
    footerText,
    layoutTitle,
    devDataGrid,
    editorsLayout,
    jsonPopup
  },
  data() {
    return {
      // 도메인코드
      userDomainCd: 'A00001',
      buttonUseList: {
        group: null,
        options: {
          type: 'default',
          content: '',
          icon: '',
          searchModeOption: 'containted',
          style: 'background-color: #ea7c69; width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'btnSearch' }]
      },

      jsonPopupTitle: '전송데이타(JSON)',
      selJsonData: null,

      //검색조건
      broker_client_id: '',
      editorOptionData: getEditorOptions().groupCodeData,
      param: {
        clientId: '',
        topic: '',
        startDt: '',
        endDt: ''
      },

      //grid
      grdMainNm: 'grdMain',
      grdMainData: [], // grid data
      gridProperties: {} //grid colum

      //pageSizes: [1, 5, 10]
    }
  },
  computed: {
    grdMain: function() {
      return this.$refs[this.grdMainNm].dataGrid //Main Grid
    }
  },
  async created() {
    console.log('create')
    //defalut startDT, EndDt

    var today = new Date()
    var year = today.getFullYear()
    var month = ('0' + (today.getMonth() + 1)).slice(-2)
    var day = ('0' + today.getDate()).slice(-2)
    var hours = ('0' + today.getHours()).slice(-2)
    var minutes = ('0' + today.getMinutes()).slice(-2)
    var seconds = ('0' + today.getSeconds()).slice(-2)

    this.editorOptionData.editorList[2].value[0] = year + '-' + month + '-' + day + ' 00:00:00'
    this.editorOptionData.editorList[2].value[1] = year + '-' + month + '-' + day + ' 23:59:59'

    this.param.startDt = year + month + day + '000000'
    this.param.endDt = year + month + day + '235959'

    // 그리드 button 클릭 이벤트
    console.log('test/////////////' + this.$route.name + '_' + this.grdMainNm + '_btnClick')
    EventBus.$on(this.$route.name + '_' + this.grdMainNm + '_btnClick', e => {
      console.log('test')
      this.btnClick(e)
    })

    // 도메인 그리드 조회
    await this.btnSearch()
  },
  beforeMount() {
    this.gridProperties = {
      gridName: this.grdMainNm,
      selectionMode: 'single', //selection_mode : single, multiple      Default : none
      selectionCheckbox: 'none', //selection_checkbox : none, onClick, onLongTap, always       Default : onClick
      seleectionAllMode: 'page', //selectionAll_mode : selection page ( page, allPages)  allPages : 페이지경우 모든 페이지 다 선택됨  Default: allPages
      colresize: true, //colresize : column resize     Default : false
      colreorder: true, //colreorder : column reorder    Default : false
      editing: false, //editing
      editingMode: 'cell', //editing_mode : row, batch, cell, form, popup     Default : row
      sortingMode: 'multiple', //sortingMode : none, single, multiple   Default : single
      selectTextOnEditStart: true, //selectTextOnEditStart
      startEditAction: 'click', //startEditAction : click, dblClick
      filterRow: false, //filterRow
      filterPanel: false, //filterPanel
      headerFilter: true, //headerFilter
      colChooser: false, //ColumnChooser
      colFixing: false, //Fixing
      columnAuto: true, //columnAuto
      icon: 'search',

      //Grid Page여부 및 Page Size (조회 Row 수)
      paging: true,
      pagingSize: 11,
      scrollMode: 'none', //none, virtual, infinite (무한스크롤) 생성
      addbtn: false, //Grid 추가버튼

      //Grid Col Info
      pageSizes: this.pageSizes,
      width: 'auto',
      gridColinfos: [
        {
          headcaption: 'no',
          field: 'no',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '100',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          visible: true,
          displayRowNumber: true
        },
        {
          headcaption: 'label.send_dtm',
          field: 'insertDt',
          fieldtype: 'date',
          format: 'yyyy-MM-dd HH:mm:ss',
          alignment: 'center',
          width: '180',
          max: 10,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: 'label.client_id',
          field: 'clientId',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '200',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: 'label.qos',
          field: 'qos',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '220',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: 'label.topic',
          field: 'topic',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '200',
          max: 10,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: 'label.result',
          field: 'result',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '130',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: 'label.cause',
          field: 'cause',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '*',
          max: 400,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: 'label.send_data',
          value: 'view',
          field: 'sendData',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '140',
          max: 20,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          button: true
        }
      ]
    }
  },
  methods: {
    // data 조회
    btnSearch() {
      console.log('btnSearch')

      this.grdMainData = []

      if (this.param.startDt == '00') {
        notify(this.$t('시작일시를 입력하세요.'), 'alert', 300)
        return
      } else if (this.param.endDt === '00') {
        notify(this.$t('종료일시를 입력하세요'), 'alert', 300)
        return
      }

      this.openLoading('msg.searching')

      //parameter setting

      console.log(JSON.stringify(this.param))

      getDeviceControlHistory(JSON.stringify(this.param))
        .then(response => {
          notify(this.$t('Search.success'), 'success', 300)
          response.list.forEach((element, index) => {
            element.id = index + 1 //element.insertDt
            element.no = index + 1
            this.grdMainData.push(element)
          })
          // console.log(this.grdMainData)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.endLoading()
        })
    },
    // 그리드 내 수정버튼 클릭 시
    async btnClick(e) {
      console.log('ssssssssss윤주 view 보기 클릭')
      console.log(e.row.data.payload)
      this.selJsonData = e.row.data.payload //JSON.parse(e.row.data.payload)
      this.$refs.jsonPopup.open() // 팝업 열기
    },
    // json editor 팝업 닫기
    closeJsonPopup(...arg) {
      //
    },
    // input box 값 변경
    valueChanged(...arg) {
      var controlVal = arg[0][1].value

      console.log(arg)
      console.log('######' + arg[0][0] + '-->' + arg[0][1].value)
      if (controlVal == null) controlVal = ''
      if (arg[0][0] === 'client_id') this.param.clientId = controlVal
      if (arg[0][0] === 'topic') this.param.topic = controlVal
      if (arg[0][0] === 'start') this.param.startDt = controlVal.replace('T', '') + '00'
      if (arg[0][0] === 'end') this.param.endDt = controlVal.replace('T', '') + '00'

      console.log(this.param)
    },
    // 데이터 로딩
    openLoading(msg) {
      this.$vToastify.loader({
        title: this.$t('msg.working'),
        body: this.$t(msg)
      })
    },
    // 로딩 종료
    endLoading() {
      this.$vToastify.stopLoader()
    }
  }
}
</script>
