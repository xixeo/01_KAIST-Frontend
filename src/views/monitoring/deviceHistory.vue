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
        <devDataGridExt
          v-if="renderComponent"
          :ref="grdMainNm"
          height="calc(100vh - 260px)"
          :gridInfo="gridProperties"
          :gridColinfos="gridColinfos"
          :dataSource="paramDatasource"
          @viewClick="btnClick"
        />
      </div>
      <footerText></footerText>
      <!-- json 팝업 -->
      <jsonPopup ref="jsonPopup" @close="closeJsonPopup" :value="selJsonData" :popupTitle="jsonPopupTitle" style="z-index: 1;" />
    </div>
  </div>
</template>

<script>
import layoutTitle from '@/components/layoutTitle' // title component
import { devDataGridExt } from '@/components/DevExtreme/grid' // 그리드 컴포넌트 //2021-10-08 by lyj
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import { color } from 'echarts/core'
import getEditorOptions from './optionData/devHistEditorOptions' // 에디터 옵션 데이터
import { getDeviceHistory } from '@/api/monitoring/deviceHistory' //api
import { getDevGroupData, getDisplayFormat } from '@/api/monitoring/form/formData' //api
import notify from 'devextreme/ui/notify' // message
import EventBus from '@/components/event-bus' // 그리드 이벤트
import jsonPopup from './popup/jsonPopup' // json editor 팝업
import moment from 'moment'
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons'
import footerText from '../components/footer' //하단 소속명 추가

export default {
  name: 'deviceHistory.vue',
  components: {
    footerText,
    layoutTitle,
    devDataGridExt,
    editorsLayout,
    jsonPopup
  },

  data() {
    return {
      // 도메인코드
      renderComponent: true,
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

      jsonPopupTitle: '수신데이타(JSON)',
      selJsonData: null,

      //검색조건
      broker_client_id: '',
      editorOptionData: getEditorOptions().groupCodeData,
      param: {
        groupId: '',
        deviceId: '',
        startDt: '',
        endDt: '',
        limitCnt: 0
      },

      //grid
      grdMainNm: 'grdMain',
      grdMainData: [], // grid data
      gridProperties: {}, //grid colum

      //dynamic column format
      foramatGubnParam: {
        dispGubn: 'default',
        dispGubnCode: 'default'
      },
      grdcolDispFormats: []

      //pageSizes: [] //[1, 5, 10]
    }
  },
  //   watch: {
  //     grdcolDispFormats: {
  //       deep: true,
  //       handler() {
  //         //this.$refs[this.grdMainNm].dataGrid.option('dataSource', [])

  //         //this.$refs[this.grdMainNm].dataClear()
  //         this.gridProperties.gridColinfos = this.grdcolDispFormats
  //       }
  //     }
  //   },
  computed: {
    grdMain: function() {
      return this.$refs[this.grdMainNm].dataGrid //Main Grid
    },
    gridColinfos: function() {
      //this.$refs[this.grdMainNm].dataClear()
      console.log('gridColinfos start')
      console.log(this.grdcolDispFormats)
      console.log('gridColinfos end')
      return this.grdcolDispFormats
    },
    paramDatasource: function() {
      console.log('paramDatasource')
      return this.grdMainData
    }
  },
  async created() {
    console.log('created')

    //this.getDataFormatInfo(this.foramatGubnParam)

    // // 그리드 button 클릭 이벤트
    // console.log('test/////////////' + this.$route.name + '_' + this.grdMainNm + '_btnClick')
    // EventBus.$on(this.$route.name + '_' + this.grdMainNm + '_btnClick', e => {
    //   console.log('test')
    //   this.btnClick(e)
    // })

    this.createDevGroupList()

    //defalut startDT, EndDt

    var initStartDt = moment().format('YYYY-MM-DD') + ' 00:00:00'
    var initEndDt = moment().format('YYYY-MM-DD') + ' 23:59:59'
    //initStartDt = '2021-09-01' + ' 00:00:00'
    this.editorOptionData.editorList[2].value.push(initStartDt)
    this.editorOptionData.editorList[2].value.push(initEndDt)
    this.param.startDt = initStartDt
    this.param.endDt = initEndDt

    await this.btnSearch() // 도메인 그리드 조회
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
      editingMode: 'row', //editing_mode : row, batch, cell, form, popup     Default : row
      sortingMode: 'multiple', //sortingMode : none, single, multiple   Default : single
      selectTextOnEditStart: false, //selectTextOnEditStart
      startEditAction: 'click', //startEditAction : click, dblClick
      filterRow: false, //filterRow
      filterPanel: false, //filterPanel
      headerFilter: true, //headerFilter
      colChooser: false, //ColumnChooser
      colFixing: false, //Fixing
      columnAuto: false, //columnAuto

      //Grid Page여부 및 Page Size (조회 Row 수)
      paging: true,
      pagingSize: 11,
      scrollMode: 'none', //none, virtual, infinite (무한스크롤) 생성
      addbtn: false, //Grid 추가버튼
      width: 'auto',

      //Grid Col Info
      pageSizes: this.pageSizes

      //gridColinfos: this.grdcolDispFormats
    }
  },
  methods: {
    forceRerender() {
      // Remove my-component from the DOM
      this.renderComponent = false

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true
      })
    },
    // data 조회
    searchData(bShowMessage) {
      console.log('searchData')
      if (bShowMessage) this.openLoading('msg.searching')

      //parameter setting
      var today = new Date()
      var year = today.getFullYear()
      var month = ('0' + (today.getMonth() + 1)).slice(-2)
      var day = ('0' + today.getDate()).slice(-2)
      var hours = ('0' + today.getHours()).slice(-2)
      var minutes = ('0' + today.getMinutes()).slice(-2)
      var seconds = ('0' + today.getSeconds()).slice(-2)
      console.log(JSON.stringify(this.param))

      getDeviceHistory(JSON.stringify(this.param))
        .then(response => {
          this.grdMainData = []
          notify(this.$t('Search.success'), 'success', 300)
          response.list.forEach((element, index) => {
            element.id = index + 1
            element.no = index + 1 //element.device_id + element.groupId + element.time
            //element.groupingStr = element.device_grp_nm + ' (' + element.device_grp_id + ')'
            this.grdMainData.push(element)
          })
          console.log('검색데이타 : ' + this.grdMainData.length + '건')
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          if (bShowMessage) this.endLoading()
        })
      //this.forceRerender()
    },
    // 조회 버튼 클릭시
    btnSearch() {
      if (this.param.device_id != undefined) {
        this.foramatGubnParam.dispGubn = 'DEVICE'
        this.foramatGubnParam.dispGubnCode = this.param.device_id
      } else if (this.param.groupId != undefined && this.param.groupId != '') {
        this.foramatGubnParam.dispGubn = 'GROUP'
        this.foramatGubnParam.dispGubnCode = this.param.groupId
      } else {
        this.foramatGubnParam.dispGubn = 'default'
        this.foramatGubnParam.dispGubnCode = 'default'
      }

      this.getDataFormatInfo(this.foramatGubnParam)

      console.log(JSON.stringify(this.grdcolDispFormats))
      //디폴트 컬럼 표시
      // if (this.grdcolDispFormats.length <= 0) {
      //   console.log('포맷 정보 없음')
      //   this.foramatGubnParam.dispGubn = 'default'
      //   this.foramatGubnParam.dispGubnCode = 'default'
      //   this.getDataFormatInfo(this.foramatGubnParam)
      //   //this.getDefaultDataFormatInfo()
      // }
    },
    // 그리드 내 수정버튼 클릭 시
    async btnClick(e) {
      console.log('ssssssssss윤주 view 보기 클릭')
      console.log(e.row.data.jsondata)
      this.selJsonData = e.row.data.jsondata //JSON.parse(e.row.data.jsondata)
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
      if (arg[0][0] === 'devGroup') this.param.groupId = controlVal
      if (arg[0][0] === 'devID') this.param.deviceId = controlVal
      if (arg[0][0] === 'start') this.param.startDt = controlVal
      if (arg[0][0] === 'end') this.param.endDt = controlVal

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
    },
    // 디바이스 그룹 정보 조회  for  셀렉트 박스
    createDevGroupList() {
      getDevGroupData().then(res => {
        {
          let popupItemSelectBox = this.editorOptionData.editorList[0]
          popupItemSelectBox.itemList = [{ value: '', label: '전체' }]

          res.list.forEach(item => {
            //   console.log(JSON.stringify(item))
            popupItemSelectBox.itemList.push({
              value: item.deviceGrpId,
              label: item.deviceGrpNm
            })

            //sort
          })
        }
      })
    },
    // 디스플레이 컬럼 포맷 조회
    getDataFormatInfo(param, bShowLoading) {
      let Newformats = []

      console.log(param.dispGubn + '/' + param.dispGubnCode + ' 일반 포맷 조회')

      getDisplayFormat(param).then(res => {
        {
          //console.log(res.list)
          //this.grdcolDispFormats = []

          Newformats.push({
            headcaption: 'no',
            field: 'no',
            fieldtype: 'string',
            format: '',
            alignment: 'center',
            width: '100',
            max: 50,
            editoroptions: { format: '' },
            required: false,
            fixed: true,
            visible: true,
            displayRowNumber: true
          })

          res.list.forEach(item => {
            //if (item.fieldtype == 'string')
            {
              Newformats.push({
                headcaption: item.displayColNm,
                field: item.displayCol,
                fieldtype: item.fieldtype,
                format: item.format,
                alignment: item.alignment,
                width: item.width,
                max: item.max == null ? 20 : parseInt(item.max),
                editoroptions: { format: '' },
                required: item.required,
                fixed: item.fixed,
                visible: true, //item.visible,
                visibleIndex: item.displayOrder
              })
            }
          })

          if (Newformats.length > 1) {
            Newformats.push({
              headcaption: 'JSON 원본',
              value: 'view',
              field: 'jsondata',
              fieldtype: 'string',
              format: '',
              alignment: 'center',
              width: '110',
              max: 20,
              editoroptions: { format: '' },
              required: false,
              fixed: false,
              button: true
            })
          } else {
            this.foramatGubnParam.dispGubn = 'default'
            this.foramatGubnParam.dispGubnCode = 'default'

            getDisplayFormat(this.foramatGubnParam).then(res => {
              res.list.forEach(item => {
                if (item.fieldtype == 'string') {
                  Newformats.push({
                    headcaption: item.displayColNm,
                    field: item.displayCol,
                    fieldtype: item.fieldtype,
                    format: item.format,
                    alignment: item.alignment,
                    width: item.width,
                    max: item.max == null ? 20 : parseInt(item.max),
                    editoroptions: { format: '' },
                    required: false,
                    fixed: item.fixed,
                    visible: true, //item.visible,
                    visibleIndex: item.displayOrder
                  })
                }
              })
              if (Newformats.length > 0) {
                Newformats.push({
                  headcaption: 'JSON 원본',
                  value: 'view',
                  field: 'jsondata',
                  fieldtype: 'string',
                  format: '',
                  alignment: 'center',
                  width: '110',
                  max: 20,
                  editoroptions: { format: '' },
                  required: false,
                  fixed: false,
                  button: true
                })
              }
            })
          }

          this.grdcolDispFormats = Newformats
          this.searchData()
          this.forceRerender()
          //this.$refs[this.grdMainNm].ResetColumns(this.grdcolDispFormats, Newformats)

          //console.log(JSON.stringify(this.grdcolDispFormats))
          //this.gridProperties.gridColinfos = this.grdcolDispFormats
        }
      })

      return Newformats
    },
    //디폴트 디스플레이 조회
    getDefaultDataFormatInfo() {
      console.log('디폴트 컬럼 포맷')
      this.grdcolDispFormats = [
        {
          headcaption: '디바이스 ID',
          field: 'device_id',
          fieldtype: 'string',
          format: null,
          alignment: 'center',
          width: '120',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: '디바이스명',
          field: 'device_nm',
          fieldtype: 'string',
          format: null,
          alignment: 'center',
          width: '200',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: '디바이스 그룹명',
          field: 'device_grp_nm',
          fieldtype: 'string',
          format: null,
          alignment: 'center',
          width: '200',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: '디바이스 유니크 ID',
          field: 'device_unique_id',
          fieldtype: 'string',
          format: null,
          alignment: 'center',
          width: '200',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: '디바이스 타입',
          field: 'device_type',
          fieldtype: 'string',
          format: null,
          alignment: 'center',
          width: '170',
          max: 20,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: '데이타',
          field: 'message',
          fieldtype: 'string',
          format: null,
          alignment: 'center',
          width: '*',
          max: 20,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: '수신일시',
          field: 'time',
          fieldtype: 'date',
          format: 'yyyy-MM-dd HH:mm:ss',
          alignment: 'center',
          width: '150',
          max: 10,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: '측정일시',
          field: 'measure_dtm',
          fieldtype: 'string',
          format: null,
          alignment: 'center',
          width: '100',
          max: 20,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: 'label.send_data',
          value: 'view',
          field: 'jsondata',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '110',
          max: 20,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          button: true
        }
      ]
      /*[
        {
          headcaption: 'label.devID',
          field: 'device_id',
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
          headcaption: 'label.devNM',
          field: 'device_nm',
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
          headcaption: 'label.devUniqueID',
          field: 'device_unique_id',
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
          headcaption: 'label.devType',
          field: 'device_type',
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
          headcaption: 'label.devGroupNM',
          field: 'device_grp_nm',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '200',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        // {
        //   headcaption: 'label.recvTime',
        //   field: 'time',
        //   fieldtype: 'date',
        //   format: 'yyyy-MM-dd HH:mm:ss',
        //   alignment: 'center',
        //   width: '150',
        //   max: 10,
        //   editoroptions: { format: '' },
        //   required: false,
        //   fixed: false
        // },
        {
          headcaption: 'label.send_data',
          value: 'view',
          field: 'sendData',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '110',
          max: 20,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          button: true
        }
      ]
*/
      var param = {
        dispGubn: 'default',
        dispGubnCode: 'default'
      }

      this.searchData()

      // getDisplayFormat(param).then(res => {
      //   {
      //     this.grdcolDispFormats = []
      //     res.list.forEach(item => {
      //       this.grdcolDispFormats.push({
      //         headcaption: item.displayColNm,
      //         field: item.displayCol,
      //         fieldtype: item.fieldtype,
      //         format: item.format,
      //         alignment: item.alignment,
      //         width: item.width,
      //         max: item.max == null ? 20 : parseInt(item.max),
      //         editoroptions: { format: '' },
      //         required: false,
      //         fixed: item.fixed,
      //         visible: item.visible
      //       })
      //     })
      //   }
      // })

      //console.log(JSON.stringify(this.grdcolDispFormats))
      //this.gridProperties.gridColinfos = this.grdcolDispFormats
      //return this.grdcolDispFormats
    }
  }
}
</script>
<style scoped></style>
