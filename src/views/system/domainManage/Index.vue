<template>
  <!-- HTML 정의하는 부분 -->
  <div class="layout-wrapper" style="padding:10px">
    <div class="container-fluid">
      <!-- 타이틀 및 button -->
      <layoutTitle
        buttonKind="dxButton"
        :useButtonList="buttonUseList"
        @btnSearch="btnSearch()"
        @btnAdd="btnAdd()"
        @btnDelete="btnDelete()"
        @btnExportXlsx="btnExportXlsx()"
      />
    </div>
    <!-- 조회조건 -->
    <div class="editor-card-theme">
      <editorsLayout ref="domain" :layoutData="domainData" @onValueChanged="valueChanged"></editorsLayout>
    </div>
    <div style="padding-top:10px">
      <!-- 그리드 영역 -->
      <devDataGrid
        height="calc(100vh - 250px)"
        :gridInfo="domainGrid.properties"
        :dataSource="domainGrid.data"
        :ref="domainGrid.properties.gridName"
      ></devDataGrid>
    </div>
    <RowInfoPopup
      ref="rowInfoPopup"
      :popupData="popup.data"
      :editorData="popup.editorData"
      @complete="savePopupData"
      @onBtnClick="onBtnClick"
      @onValueChanged="onValueChanged"
      @onContentReady="onContentReady"
    />
  </div>
</template>

<script>
import layoutTitle from '@/components/layoutTitle' // Title & Button 컴포넌트
import { devDataGrid } from '@/components/DevExtreme/grid' // 그리드 컴포넌트
import { dxButtonList } from '@/components/DevExtreme/editors' // 에디터 컴포넌트
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import getEditorOptions from './data/editorOptions' // 에디터 옵션 데이터
import getPopupEditorOptions from './data/popupEditorOptions' // 팝업 에디터 옵션 데이터
import getDomainGrid from './data/domainGrid' // 그리드 옵션 데이터
import { getCmCode } from '@/api/system/cmCodeManage' // 공통코드 api 호출
import { getDomainListData, getDomainData, updateDomainData, deleteDomainData } from '@/api/system/domainManage' // 도메인 리스트 api 호출
import EventBus from '@/components/event-bus' // 그리드 이벤트
import { RowInfoPopup } from '@/components/DevExtreme/popups' // Info 팝업
import notify from 'devextreme/ui/notify' // message
import { getDomainCd } from '@/utils/token'
import envs from '@/envs'
var moment = require('moment')
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'domainManage',
  components: {
    layoutTitle,
    editorsLayout,
    devDataGrid,
    dxButtonList,
    RowInfoPopup
  },
  data() {
    return {
      userDomainCd: '', //로그인시 도메인 코드
      cardVisible: true, // 조회 조건 card visible
      // layoutTitle 버튼 리스트
      buttonUseList: {
        group: null,
        options: {
          type: 'default',
          searchModeOption: 'containted',
          content: '',
          icon: '',
          style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'btnSearch' }, { id: 'btnAdd' }, { id: 'btnDelete' }, { id: 'btnExportXlsx' }]
      },
      // 그리드 정보
      domainGrid: {
        properties: [], // 그리드 설정 정보
        data: [] // 그리드 데이터
      },
      addrApiKey: 0,
      popupAddress: false,
      domainData: getEditorOptions().domainData, // 도메인 editor list 정보
      domainCodeList: [], // 전체 도메인 코드 리스트
      statusList: [], // 상태 리스트
      // 그리드 검색 파라미터
      param: {
        domainStatusCd: '',
        domainCd: ''
      },
      // 팝업 정보
      popup: {
        data: {
          title: 'label.domain_info',
          panelButton: {
            group: {
              stylingMode: 'outlined',
              selectionMode: 'single', // 하나만 선택 가능
              selectedKeys: [this.$t('basic_info')] // 버튼 리스트 중 선택된 key
            },
            options: {
              type: 'default',
              stylingMode: 'containted',
              content: '',
              style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
            },
            list: [{ id: 'basic_info' }, { id: 'etc_info' }]
          },
          width: '60%', // 팝업 가로
          height: '90%', // 팝업 높이
          valiData: false, // 데이터 검증
          count: 0 // watch
        },
        editorData: getPopupEditorOptions().popupData
      },
      validation: [], // validation 데이터
      validationCount: 0, // watch로 validation 값을 받음
      saveData: {}
    }
  },
  watch: {
    validationCount: {
      deep: true,
      handler() {
        console.log('watch:', this.saveData, this.validation)
        if (this.saveData.domainCd && this.validation.length < 1) {
          this.saveDataList() // 데이터 저장
          this.validation = [] // validation 초기화
        } else if (this.saveData.domainCd && this.validation.length > 0) {
          notify(this.$t('msg.no_save'), 'warning', 1000)
        }
        this.saveData = {}
      }
    }
  },
  computed: {
    domainList() {
      return this.$refs[this.domainGrid.properties.gridName].dataGrid // domain dataGrid
    }
  },
  async created() {
    this.userDomainCd = getDomainCd() // 세션정보에서 현재사용자 도메인 세팅
    await this.compareDomain() // master 도메인과 현재사용자 도메인 비교
    await this.getStatusSelectBox() // 상태 select Box 데이터 받아옴
    await this.btnSearch() // 도메인 그리드 조회
    // 그리드 cell 클릭 이벤트
    EventBus.$on(this.$route.name + '_' + this.domainGrid.properties.gridName + '_CellClick', e => {
      this.cellClick(e)
    })
  },
  beforeMount() {
    this.domainGrid.properties = getDomainGrid().domainGridProperties // dataGrid Column 정보
  },
  mounted() {},
  methods: {
    // master 도메인과 현재사용자 도메인 비교
    compareDomain() {
      // 도메인이 같지않을 때
      if (envs.masterDomain !== getDomainCd()) {
        this.cardVisible = false
        this.param.domainCd = this.userDomainCd
      }
    },
    // 도메인 상태 데이터 호출
    getStatusSelectBox() {
      let param = { domainCd: 'a', level: '1', prntsCd: 'B001', useYn: 'Y' } // 도메인 코드는 추후 변경되어야 함
      // 조직형식 Select Box 데이터 생성
      getCmCode(param)
        .then(res => {
          let statusList = [{ value: '', label: '전체' }]
          let popupStatusList = []
          res.list.forEach(item => {
            statusList.push({
              value: item.codeCd,
              label: item.codeNm
            })
            popupStatusList.push({
              value: item.codeCd,
              label: item.codeNm
            })
          })
          this.domainData.editorList[0].itemList = statusList
          this.popup.editorData.basic_info.editorList[2].itemList = popupStatusList
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 그리드 cell 클릭 시
    cellClick(e) {
      // 클릭한 cell 정보 조회
      if (e.key && e.columnIndex !== 0) {
        this.popup.editorData.basic_info.editorList[15].option.options.content = 'btnUpdate' // ok 버튼 라벨
        this.popup.editorData.etc_info.editorList[5].option.options.content = 'btnUpdate' // ok 버튼 라벨
        this.popup.editorData.basic_info.editorList[0].validation.asyncList = [] // 도메인코드 validation 초기화
        this.popup.editorData.basic_info.editorList[0].readOnly = true // 코드 수정 불가
        this.$refs.rowInfoPopup.open(e.row.data)
        this.popup.data.count++ // watch에 걸기
        this.popup.data.panelButton.list.forEach(panel => {
          this.popup.editorData[panel.id].editorList.forEach(data => {
            if (data.id === 'joined_period') {
              data.value = ['', '']
              data.value[0] = e.row.data['serviceStartDt']
              data.value[1] = e.row.data['serviceEndDt']
              data.validation[0].maxDate = e.row.data['serviceEndDt']
            } else {
              data.value = ''
              data.value = e.row.data[data.id]
            }
          })
        })
      }
    },
    // 도메인 select Box 데이터 받아옴
    domainListSelect(param) {
      // api 호출
      if (param) {
        // 도메인 이름 select box 데이터 추가
        getDomainListData(param)
          .then(res => {
            let domainSelectBox = this.$refs.domain.$options.propsData.layoutData.editorList[1]
            domainSelectBox.itemList = [{ value: '', label: '전체' }]
            res.list.forEach(item => {
              domainSelectBox.itemList.push({
                value: item.domainCd,
                label: item.domainNm
              })
            })
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        // 도메인 중복 체크를 위한 데이터 셋
        getDomainListData({ domainStatusCd: '', domainCd: '' })
          .then(res => {
            res.list.forEach(item => {
              this.domainCodeList.push(item.domainCd)
            })
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    // 도메인 그리드 조회
    btnSearch() {
      this.openLoading('msg.searching')
      this.domainGrid.data = []
      getDomainData(this.param)
        .then(res => {
          res.list.forEach(item => {
            item.id = item.domainCd // id 값 추가
          })
          notify(this.$t('msg.search_success'), 'success', 1000)
          this.domainGrid.data = res.list
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.endLoading()
          this.domainListSelect() // 도메인 중복 체크를 위한 데이터 받아옴
          this.domainListSelect(this.param) // 도메인 select Box 데이터 받아옴
        })
    },
    // Row 추가
    btnAdd() {
      this.popup.editorData.basic_info.editorList[15].option.options.content = 'btnAdd' // ok 버튼 라벨
      this.popup.editorData.etc_info.editorList[5].option.options.content = 'btnAdd' // ok 버튼 라벨
      this.popup.editorData.basic_info.editorList[0].validation.asyncList = this.domainCodeList // 도메인 코드 중복 체크
      this.popup.data.panelButton.list.forEach(panel => {
        this.popup.editorData[panel.id].editorList.forEach(item => {
          if (item.id === 'domainCd') {
            item.option.readOnly = false // 도메인 코드 수정 가능
          }
          item.value = ''
        })
      }) // 팝업 데이터 초기화
      this.popup.data.count++ // watch에 걸기
      this.$refs.rowInfoPopup.open('new')
    },
    // select box 값 변경
    valueChanged(...arg) {
      if (arg[0][0] === 'domainStatusCd') {
        this.param.domainStatusCd = arg[0][1].value
        this.domainData.editorList[0].value = arg[0][1].value
        this.domainListSelect(this.param) // 도메인 select Box 데이터 받아옴
      }
      if (arg[0][0] === 'domainCd') {
        this.param.domainCd = arg[0][1].value
        this.domainData.editorList[1].value = arg[0][1].value
        // this.getStatusSelectBox()
      }
    },
    // 수정, 추가 버튼 (저장)
    savePopupData(...arg) {
      console.log('savePopupData', arg)
      this.saveData = {}
      this.popup.data.panelButton.list.forEach(panel => {
        this.popup.editorData[panel.id].editorList.forEach(item => {
          if (item.id === 'joined_period') {
            this.saveData.serviceStartDt = moment(item.value[0]).format('YYYY-MM-DD')
            this.saveData.serviceEndDt = moment(item.value[1]).format('YYYY-MM-DD')
          } else {
            this.saveData[item.id] = item.value
          }
        })
      })
      if (arg[0] === 'new') {
        this.saveData.__created__ = true
      } else {
        this.saveData.__modified__ = true
      }
    },
    saveDataList() {
      // 데이터 검증
      let dataList = [] // 수정/추가될 ROW 리스트
      if (this.verification(this.saveData)) {
        dataList.push(this.saveData)
        // api 호출
        updateDomainData(dataList)
          .then(res => {
            notify(this.$t('msg.save_success'), 'success', 1000)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.btnSearch()
          })
      }
    },
    // 데이터 검증
    verification(saveData) {
      console.log('domainSave', saveData)
      if (!saveData.__created__) {
        this.$refs.rowInfoPopup.onClose() // 성공
        return true // 성공
      } else {
        if (this.domainCodeList.some(element => element === saveData.domainCd)) {
          // 중복 체크
          this.$vToastify.warning({ body: this.$t('msg.duplicate_check') + ' - ' + this.$t('label.domain_cd') }) // 에러 메시지 출력
          return false // 실패
        } else {
          this.$refs.rowInfoPopup.onClose() // 성공
          return true // 성공
        }
      }
    },
    // 삭제
    btnDelete() {
      let selectedRows = this.domainList.getSelectedRowsData() // 체크된 Row 체크
      if (selectedRows.length > 0) {
        this.$vToastify // 삭제확인 메세지
          .prompt({
            body: this.$t('msg.delete_qustion'),
            answers: { Yes: true, No: false },
            mode: 'prompt'
          })
          .then(value => {
            if (value) {
              // api 호출
              deleteDomainData(selectedRows)
                .then(res => {
                  notify(this.$t('msg.delete_success'), 'success', 1000)
                })
                .catch(error => {
                  console.log(error)
                })
                .finally(() => {
                  this.btnSearch()
                })
            }
          })
      } else {
        this.$vToastify.warning(this.$t('msg.delete_no_checked')) // 에러 메시지 출력
      }
    },
    // 팝업 editor box 값 변경
    onValueChanged(...arg) {
      console.log('onValueChanged', arg[0][0])
      let argData = arg[0][0]
      this.popup.data.panelButton.list.forEach(panel => {
        this.popup.editorData[panel.id].editorList.forEach(data => {
          if (data.id === argData[0]) data.value = argData[1].value // popup 데이터 변경
          if (data.id === 'joined_period') {
            if (argData[0] === 'start') data.value[0] = argData[1].value
            if (argData[0] === 'end') {
              data.value[1] = argData[1].value
              data.validation[0].maxDate = argData[1].value
            }
          }
        })
      })
    },
    onBtnClick(...arg) {
      let argData = arg[0][0]
      console.log('클릭', argData)
      if (argData.id === 'addressSearch') this.getAddress()
    },
    // Address 받아오는 부분
    getAddress() {
      // daum address 윈도우 호출
      let adressBox = this.popup.editorData.basic_info.editorList
      var width = 500 //팝업의 너비
      var height = 600 //팝업의 높이
      console.log('getAddress ', window.screen.width, window.screen.width / 2 - width / 2)
      new window.daum.Postcode({
        width: width,
        height: height,
        oncomplete: data => {
          // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          let extraRoadAddr = '' // 도로명 조합형 주소 변수 // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName
          } // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')'
          } // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
          adressBox[6].value = data.zonecode //5자리 새우편번호 사용
          adressBox[8].value = data.roadAddress // 도로명 주소 변수
          adressBox[10].value = extraRoadAddr
        }
      }).open({
        left: window.screen.width / 2 - width / 2,
        top: window.screen.height / 2 - height / 2
      })
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
    // summary 리스트 준비
    onContentReady(...arg) {
      let argData = arg[0][0]
      this.validation = argData // validaiton 리스트 추가
      this.validationCount++ // watch
    },
    // Excel export
    btnExportXlsx() {
      this.$refs[this.domainGrid.properties.gridName].onExporting(this.domainList, 'DomainList.xlsx')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/styles/themeB/variables.scss';
</style>
