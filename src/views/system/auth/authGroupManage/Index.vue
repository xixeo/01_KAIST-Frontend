<template>
  <!-- HTML 정의하는 부분 -->
  <div class="layout-wrapper" style="padding: 10px">
    <div class="container-fluid">
      <!-- 타이틀 및 button -->
      <layoutTitle
        buttonKind="dxButton"
        :useButtonList="buttonUseList"
        @btnSearch="btnSearch()"
        @btnAdd="btnAdd()"
        @btnDelete="btnDelete()"
        @btnExportXlsx="exportExcel()"
      />
    </div>
    <!-- 조회조건 -->
    <div class="editor-card-theme">
      <editorsLayout ref="authgrp" :layoutData="authgrpData" @onValueChanged="valueChanged"></editorsLayout>
    </div>
    <div style="padding-top: 10px">
      <!-- 그리드 영역 -->
      <devDataGrid
        height="calc(100vh - 250px)"
        :gridInfo="authgrpGrid.properties"
        :dataSource="authgrpGridData"
        :ref="authgrpGrid.properties.gridName"
      ></devDataGrid>
    </div>
    <RowInfoPopup
      ref="rowInfoPopup"
      :popupData="popup.data"
      :editorData="popup.editorData"
      @complete="savePopupData"
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
import getAuthGroupManageGrid from './data/AuthGroupManageGrid' // 그리드 옵션 데이터
import { getDomainListData } from '@/api/system/domainManage' // 도메인 리스트 api 호출
import { getAuthgrpListData, getAuthGroupData, getAuthTypeList, updateAuthGroupData, deleteAuthGroupData } from '@/api/system/authGroupManage' // 권한그룹 api 호출
import EventBus from '@/components/event-bus' // 그리드 이벤트
import { RowInfoPopup } from '@/components/DevExtreme/popups' // Info 팝업
import notify from 'devextreme/ui/notify' // message
import { getDomainCd } from '@/utils/token'
import envs from '@/envs'
var moment = require('moment')
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'authGroupManage',
  components: {
    layoutTitle,
    editorsLayout,
    devDataGrid,
    dxButtonList,
    RowInfoPopup
  },
  data() {
    return {
      userDomainCd: '', // 로그인시 도메인 코드
      // 버튼 리스트
      buttonUseList: {
        group: null,
        options: {
          type: 'default',
          searchModeOption: 'containted',
          content: '',
          icon: '',
          style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'btnExportXlsx' }, { id: 'btnSearch' }, { id: 'btnAdd' }, { id: 'btnDelete' }]
      },
      // 그리드 정보
      authgrpGrid: {
        properties: [], // 그리드 설정 정보
        data: [] // 그리드 데이터
      },
      authgrpGridData: [],
      authgrpData: getEditorOptions().authgrpData, // 도메인 editor list 정보
      //그리드 검색 파라미터
      param: {
        domainStatusCd: '',
        domainCd: '',
        authgrpCd: '',
        authgrpNm: '',
        prntsCd: 'A002'
      },
      // 팝업 정보
      popup: {
        data: {
          title: 'authgrpManage.title',
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
              icon: '',
              style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
            },
            list: [{ id: 'basic_info' }]
          },
          width: '60%', // 팝업 가로
          height: '80%', // 팝업 높이
          okButtonLabel: '', // ok버튼
          valiData: false, // 데이터 검증
          count: 0 // watch
        },
        editorData: getPopupEditorOptions().popupData
      },
      popupBasicInfoList: [],
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
    authgrpList() {
      return this.$refs[this.authgrpGrid.properties.gridName].dataGrid // domain dataGrid
    }
  },
  async created() {
    this.userDomainCd = getDomainCd() // 세션정보에서 현재사용자 도메인 세팅
    await this.compareDomain() // master 도메인과 현재사용자 도메인 비교
    await this.domainListSelect(this.param.authgrpCd) // 도메인 select Box 데이터 받아옴
    await this.authgrpListSelect() // 조회조건 권한 그룹 코드, 이름 select box 데이터 받아옴
    await this.btnSearch() // 도메인 그리드 조회
    // 그리드 cell 클릭 이벤트
    this.popupBasicInfoList = this.popup.editorData.basic_info.editorList
    EventBus.$on(this.$route.name + '_' + this.authgrpGrid.properties.gridName + '_CellClick', e => {
      this.cellClick(e)
    })
  },
  beforeMount() {
    this.authgrpGrid.properties = getAuthGroupManageGrid().authgrpGridProperties // dataGrid Column 정보
  },
  mounted() {},
  methods: {
    // master 도메인과 현재사용자 도메인 비교
    compareDomain() {
      // 도메인이 같지않을 때
      if (envs.masterDomain !== getDomainCd()) {
        this.authgrpData.editorList[0].value = this.userDomainCd
        this.authgrpData.editorList[0].option.visible = false
        this.authgrpData.editorList[1].position.col = [1, 3]
        this.authgrpData.editorList[2].position.col = [4, 3]
      }
    },
    // 그리드 cell 클릭 시
    cellClick(e) {
      // 클릭한 cell 정보 조회
      if (e.key && e.columnIndex !== 0) {
        this.popupBasicInfoList[9].option.options.content = 'btnUpdate' // ok 버튼 라벨
        this.$refs.rowInfoPopup.open(e.row.data)
        this.popup.data.count++ // watch에 걸기
        this.popup.data.panelButton.list.forEach(panel => {
          this.popup.editorData[panel.id].editorList.forEach(data => {
            data.value = e.row.data[data.id] //에디터 항목에 그리드 데이터 set

            if (data.id === 'domainCd') {
              this.param.domainCd = this.popupBasicInfoList[0].value
              // this.popupAuthgrpListSelect()
              this.popupAuthgrpTypeListSelect()
              data.option.readOnly = true
            } else if (data.id === 'authgrpCd') {
              data.validation.asyncList = []
              data.option.readOnly = true
            } else if (data.id === 'authgrpNm') {
              data.validation.asyncList = []
            }
          })
        })
      }
    },
    // 도메인 select Box 데이터 받아옴
    domainListSelect() {
      getDomainListData(this.param).then(res => {
        let domainSelectBox = this.$refs.authgrp.$options.propsData.layoutData.editorList[0]
        let popupDomainSelectBox = this.popupBasicInfoList[0]
        domainSelectBox.itemList = [{ value: '', label: '전체' }]
        popupDomainSelectBox.itemList = []
        res.list.forEach(item => {
          // 도메인 이름 select box 데이터 추가
          domainSelectBox.itemList.push({
            value: item.domainCd,
            label: item.domainNm
          })
          // 팝업 도메인 select box 데이터 추가
          popupDomainSelectBox.itemList.push({
            value: item.domainCd,
            label: item.domainNm
          })
        })
      })
    },
    // 그룹권한 select Box 데이터 받아옴
    authgrpListSelect() {
      getAuthgrpListData(this.param)
        .then(res => {
          console.log(this.param.domainCd)
          console.log('getAuthgrpListData res.list: ', res.list)
          //검색조건의 셀렉트박스 중 한개를 선택
          let authgrpCdSelectBox = this.$refs.authgrp.$options.propsData.layoutData.editorList[1]
          let authgrpNmSelectBox = this.$refs.authgrp.$options.propsData.layoutData.editorList[2]
          // console.log("authgrp RES : ", res)
          authgrpCdSelectBox.itemList = [{ value: '', label: '전체' }]
          authgrpNmSelectBox.itemList = [{ value: '', label: '전체' }]
          res.list.forEach(item => {
            // 도메인 이름 select box 데이터 추가
            authgrpCdSelectBox.itemList.push({
              value: item.authgrpCd,
              label: item.authgrpCd
            })
            authgrpNmSelectBox.itemList.push({
              value: item.authgrpNm,
              label: item.authgrpNm
            })
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    validationAuthgrpList() {
      getAuthgrpListData(this.param)
        .then(res => {
          // console.log('valiList : ' ,res.list)
          let authgrpCdValidation = []
          res.list.forEach(authgrp => {
            authgrpCdValidation.push(authgrp.authgrpCd)
          })
          this.popupBasicInfoList[1].validation.asyncList = authgrpCdValidation
        })
        .catch(error => {
          console.log(error)
        })
    },
    //팝업 권한 유형 selectbox List
    popupAuthgrpTypeListSelect() {
      getAuthTypeList(this.param).then(res => {
        let popupAuthTypeList = []
        res.list.forEach(authType => {
          popupAuthTypeList.push({
            value: authType.codeCd,
            label: authType.codeNm
          })
        })
        this.popupBasicInfoList[3].itemList = popupAuthTypeList
      })
    },
    // 도메인 그리드 조회
    btnSearch() {
      this.openLoading('msg.searching')
      this.param.domainCd = this.authgrpData.editorList[0].value
      getAuthGroupData(this.param)
        .then(res => {
          console.log('res :', res.list)
          res.list.forEach((item, index) => {
            item.id = index //itme.id = 그리드 row id
            if (item.useYn === 'y') item.useYn = this.$t('label.use')
            if (item.useYn === 'n') item.useYn = this.$t('label.un_used')
          }) //id 값 추가
          notify(this.$t('msg.search_success'), 'success', 500)
          this.authgrpGridData = res.list
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.endLoading()
        })
    },
    // Row 추가
    btnAdd() {
      this.popupBasicInfoList[9].option.options.content = 'btnAdd' // ok 버튼 라벨
      this.popup.data.panelButton.list.forEach(panel => {
        this.popup.editorData[panel.id].editorList.forEach(item => {
          if (item.id === 'domainCd') {
            item.option.readOnly = false
            // this.popupAuthgrpListSelect()
            item.value = this.authgrpData.editorList[0].value //조회 조건 도메인 가져오기
            // this.param.domainCd = item.value // 파라미터에 변경된 domainCd 셋팅
            this.validationAuthgrpList()
            this.popupAuthgrpTypeListSelect()
          } else if (item.id === 'authgrpCd') {
            item.option.readOnly = false
            item.value = ''
          } else if (item.id === 'useYn') {
            item.value = 'Y'
          } else {
            item.value = ''
          }
        })
      }) // 팝업 데이터 초기화
      this.popup.data.count++ // watch에 걸기
      this.$refs.rowInfoPopup.open('new')
    },
    paramReset() {
      ;(this.param.domainStatusCd = ''), (this.param.domainCd = ''), (this.param.authgrpCd = ''), (this.param.authgrpNm = '')
    },
    // select box 값 변경
    valueChanged(...arg) {
      // console.log("arg : ", arg)
      if (arg[0][0] === 'domainCd') {
        this.paramReset()
        this.param.domainCd = arg[0][1].value
        this.authgrpData.editorList[0].value = arg[0][1].value
        this.authgrpData.editorList[1].value = ''
        this.authgrpData.editorList[2].value = ''
        this.authgrpListSelect() // 도메인 select Box 데이터 받아옴
      }
      // if (arg[0][0] === 'domainCd') this.param.domainCd = arg[0][1].value
      if (arg[0][0] === 'authgrpCd') {
        this.param.authgrpCd = arg[0][1].value
        this.authgrpData.editorList[1].value = arg[0][1].value
      }
      if (arg[0][0] === 'authgrpNm') {
        this.param.authgrpNm = arg[0][1].value
        this.authgrpData.editorList[2].value = arg[0][1].value
      }
    },
    // 수정, 추가 버튼
    savePopupData(...arg) {
      this.saveData = {} // 수정/추가될 ROW

      this.popup.data.panelButton.list.forEach(panel => {
        this.popup.editorData[panel.id].editorList.forEach(item => {
          // if (item.id === 'useYn' && item.value === this.$t('label.use')) item.value = 'Y'
          // if (item.id === 'useYn' && item.value === this.$t('label.un_used')) item.value = 'N'
          this.saveData[item.id] = item.value
        })
      })
      if (arg[0] === 'new') {
        this.saveData.__created__ = true
      } else {
        this.saveData.__modified__ = true
      }
    },
    saveDataList() {
      let dataList = [] // 수정/추가될 ROW 리스트
      dataList.push(this.saveData)
      // api 호출
      updateAuthGroupData(dataList)
        .then(res => {
          notify(this.$t('msg.save_success'), 'success', 300)
        })
        .catch(error => {
          notify(this.$t('msg.no_save'), 'success', 300)
          console.log(error)
        })
        .finally(() => {
          this.$refs.rowInfoPopup.onClose()
          this.btnSearch()
          this.authgrpListSelect()
        })
    },
    // 데이터 검증
    // verification(saveData) {
    //   if (saveData) {
    //     this.popup.data.valiData = false
    //     let list = []
    //     let msg = ''
    //     if (saveData.domainCd === '') list.push(this.$t('authgrpManage.domain_cd'))
    //     if (saveData.domainNm === '') list.push(this.$t('authgrpManage.domain_nm'))
    //     if (saveData.authgrpCd === '') list.push(this.$t('authgrpManage.authgrp_cd'))
    //     if (saveData.authgrpNm === '') list.push(this.$t('authgrpManage.authgrp_nm'))
    //     if (saveData.authgrpType === '') list.push(this.$t('authgrpManage.type'))
    //     if (saveData.useYn === '') list.push(this.$t('authgrpManage.use_yn'))
    //     if (list.length > 0) {
    //       list.forEach((item, index) => {
    //         msg += item
    //         if (list.length - 1 !== index) msg += ', '
    //       })
    //       this.$vToastify.warning({ body: msg + this.$t('msg.required_item') })
    //       return false // 에러 메시지 출력
    //     } else {
    //       this.popup.data.valiData = true
    //       return true // 성공
    //     }
    //   }
    // },
    //엑셀 다운로드
    exportExcel(param) {
      let context = this.$refs[this.authgrpGrid.properties.gridName].dataGrid
      this.$refs[this.authgrpGrid.properties.gridName].onExporting(context, 'authgrpManage.xlsx')
    },
    // 삭제
    btnDelete() {
      let selectedRows = this.authgrpList.getSelectedRowsData() // 체크된 Row 체크
      console.log(selectedRows)
      //삭제확인 메세지
      this.$vToastify
        .prompt({
          body: this.$t('msg.delete_qustion'),
          answers: { Yes: true, No: false },
          mode: 'prompt'
        })
        .then(value => {
          if (value) {
            // api 호출
            deleteAuthGroupData(selectedRows)
              .then(res => {
                notify(this.$t('msg.delete_success'), 'success', 300)
              })
              .catch(error => {
                console.log(error)
              })
              .finally(() => {
                this.btnSearch()
                this.authgrpListSelect()
              })
          }
        })
    },
    // 팝업 editor box 값 변경
    onValueChanged(...arg) {
      console.log('onValueChanged', arg[0][0])
      let argData = arg[0][0]
      this.popup.data.panelButton.list.forEach(panel => {
        this.popup.editorData[panel.id].editorList.forEach(item => {
          console.log('###onValueChanged item:', this.$refs.rowInfoPopup)
          if (item.id === argData[0]) {
            // if(item.id === 'authgrpCd'){
            //   console.log('####:',this.popupBasicInfoList[1])
            // }
            if (item.id === 'domainCd') {
              item.value = argData[1].value // popup 데이터 변경
              this.param.domainCd = item.value
              this.popupAuthgrpTypeListSelect()
              if (item.option.readOnly === false) {
                //도메인및 그룹코드가 readonly이면 async체크 불필요
                this.validationAuthgrpList()
                this.popupBasicInfoList[1].value = ''
                this.popupBasicInfoList[2].value = ''
              }
              // this.popupAuthgrpListSelect()
            } else {
              item.value = argData[1].value // popup 데이터 변경
            }
          }
        })
      })
    },
    onClick(e) {
      console.log('onClick', e.id)
      this.authgrpGrid.properties = getAuthGroupManageGrid(e.id).authgrpGridProperties // dataGrid Column 정보
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
      console.log('summary Ready:', argData)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/styles/themeB/variables.scss';
</style>
