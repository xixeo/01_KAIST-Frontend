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
        @btnExportXlsx="exportExcel()"
      />
    </div>
    <!-- 조회조건 -->
    <div class="editor-card-theme">
      <editorsLayout ref="userManage" :layoutData="userManageData" @onValueChanged="valueChanged"></editorsLayout>
    </div>
    <div style="padding-top:10px">
      <!-- 그리드 영역 -->
      <devDataGrid
        height="calc(100vh - 250px)"
        :gridInfo="userManageGrid.properties"
        :dataSource="userManageGrid.data"
        :ref="userManageGrid.properties.gridName"
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
import { getCmCode } from '@/api/system/cmCodeManage' // 공통코드 api 호출
import layoutTitle from '@/components/layoutTitle' // Title & Button 컴포넌트
import { devDataGrid } from '@/components/DevExtreme/grid' // 그리드 컴포넌트
import { dxButtonList } from '@/components/DevExtreme/editors' // 에디터 컴포넌트
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import getEditorOptions from './data/editorOptions' // 에디터 옵션 데이터
import getPopupEditorOptions from './data/popupEditorOptions' // 팝업 에디터 옵션 데이터
import userManageGrid from './data/userManageGrid' // 그리드 옵션 데이터
import { getDomainListData } from '@/api/system/domainManage' // 도메인 리스트 api 호출
import {
  getUserManageListData,
  getUserManageData,
  getAsgnListData,
  getuserTypeListData,
  checkAdminPass,
  updateUserPass,
  updateUserManageData,
  deleteUserManageData
} from '@/api/system/userManage' // 도메인 리스트 api 호출
import EventBus from '@/components/event-bus' // 그리드 이벤트
import { RowInfoPopup } from '@/components/DevExtreme/popups' // Info 팝업
import notify from 'devextreme/ui/notify' // message
import { getUserId, getDomainCd } from '@/utils/token'
import envs from '@/envs'

var moment = require('moment')
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'userManage',
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
      nowUserId: '',
      // layoutTitle 버튼 리스트
      buttonUseList: {
        group: null,
        options: {
          type: 'default',
          searchModeOption: 'containted',
          content: '',
          icon: '',
          listStyle: ''
        },
        list: [{ id: 'btnExportXlsx' }, { id: 'btnSearch' }, { id: 'btnAdd' }, { id: 'btnDelete' }]
      },
      // 그리드 정보
      userManageGrid: {
        properties: [], // 그리드 설정 정보
        data: [] // 그리드 데이터
      },
      userManageData: getEditorOptions().userManageData, // 도메인 editor list 정보
      // 그리드 검색 파라미터
      param: {
        userId: '',
        userNm: '',
        userPw: '',
        asgnCd: '',
        domainStatusCd: '',
        domainCd: '',
        prntsCd: 'T001'
      },
      // 팝업 정보
      popup: {
        data: {
          title: 'userManage.userInfo',
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
            list: [{ id: 'basic_info' }, { id: 'etc_info' }, { id: 'change_pass' }]
          },
          width: '60%', // 팝업 가로
          height: '90%', // 팝업 높이
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
    userManageList() {
      return this.$refs[this.userManageGrid.properties.gridName].dataGrid // domain dataGrid
    }
  },
  async created() {
    this.userDomainCd = getDomainCd() // 세션정보에서 현재사용자 도메인 세팅
    this.nowUserId = getUserId()
    await this.compareDomain() // master 도메인과 현재사용자 도메인 비교
    await this.domainListSelect(this.param.domainStatusCd) // 도메인 select Box 데이터 받아옴
    await this.userManageListSelect(this.param.domainCd)
    await this.btnSearch() // 도메인 그리드 조회
    this.popupBasicInfoList = this.popup.editorData.basic_info.editorList
    // 그리드 cell 클릭 이벤트
    EventBus.$on(this.$route.name + '_' + this.userManageGrid.properties.gridName + '_CellClick', e => {
      this.cellClick(e)
    })
  },
  beforeMount() {
    this.userManageGrid.properties = userManageGrid().userManageGridProperties // dataGrid Column 정보
  },
  mounted() {},
  methods: {
    // master 도메인과 현재사용자 도메인 비교
    compareDomain() {
      // 도메인이 같지않을 때
      if (envs.masterDomain !== getDomainCd()) {
        this.userManageData.editorList[0].value = this.userDomainCd
        this.userManageData.editorList[0].option.visible = false
        this.userManageData.editorList[1].position.col = [1, 2]
        this.userManageData.editorList[2].position.col = [3, 2]
      }
    },
    // 그리드 cell 클릭 시
    cellClick(e) {
      // 클릭한 cell 정보 조회
      if (e.key && e.columnIndex !== 0) {
        // this.popup.data.okButtonLabel = 'btnUpdate' // ok 버튼 라벨
        this.popup.editorData.basic_info.editorList[9].option.options.content = 'btnUpdate' // ok 버튼 라벨
        this.popup.editorData.etc_info.editorList[6].option.options.content = 'btnUpdate' // ok 버튼 라벨
        this.popupBasicInfoList[1].validation.asyncList = [] //userId 중복리스트 초기화
        this.$refs.rowInfoPopup.open(e.row.data)
        this.popup.data.count++ // watch에 걸기
        this.popup.data.panelButton.list.forEach(panel => {
          if (panel.id !== 'change_pass') {
            this.popup.editorData[panel.id].editorList.forEach(data => {
              // console.log(data)
              data.value = e.row.data[data.id] //에디터 항목에 그리드 데이터 set
              if (data.id === 'domainCd') {
                this.param.domainCd = this.popup.editorData.basic_info.editorList[0].value
                this.userAsgnListSelect()
                data.value = e.row.data[data.id] //에디터 항목에 그리드 데이터 set
                data.option.readOnly = true
              } else if (data.id === 'userId') {
                data.option.readOnly = true
              }
            })
          } else {
            this.resetChangePassPanel() // 비밀번호 변경 패널 리셋
            this.popup.editorData['change_pass'].editorList[3].option.options.disabled = false
            this.popup.editorData['change_pass'].editorList[0].option.disabled = false
          }
        })
      }
      // this.paramReset()
    },
    resetChangePassPanel() {
      //추가/수정 팝업 오픈시 관리자 비밀번호확인로직 먼저 보이도록 리셋
      this.popup.editorData['change_pass'].editorList.forEach(data => {
        // console.log('resetChangePassPanel:',data)
        if (data.id === 'checkPass') data.option.visible = true
        else if (data.id === 'changePass') data.option.visible = false
        else if (data.id === 'verifyPass') data.option.visible = false
        else if (data.option.options.id === 'btnCheckPass') data.option.visible = true
        else if (data.option.options.id === 'btnChangePass') data.option.visible = false
      })
    },
    //조회조건 도메인 select Box 데이터 받아옴
    domainListSelect() {
      getDomainListData(this.param).then(res => {
        let domainSelectBox = this.$refs.userManage.$options.propsData.layoutData.editorList[0]
        let popupDomainSelectBox = this.popup.editorData.basic_info.editorList[0] //팝업 도메인셀렉트박스
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
    //조회조건 아이디, 이름 select Box 데이터 받아옴
    userManageListSelect() {
      // api 호출
      getUserManageListData(this.param)
        .then(res => {
          let userIdSelectBox = this.$refs.userManage.$options.propsData.layoutData.editorList[1]
          let userNmSelectBox = this.$refs.userManage.$options.propsData.layoutData.editorList[2]
          userIdSelectBox.itemList = [{ value: '', label: '전체' }]
          userNmSelectBox.itemList = [{ value: '', label: '전체' }]
          res.list.forEach(item => {
            // 도메인 이름 select box 데이터 추가
            userIdSelectBox.itemList.push({
              value: item.userId,
              label: item.userId
            })
            userNmSelectBox.itemList.push({
              value: item.userNm,
              label: item.userNm
            })
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    //팝업 조직코드 selecxBox 셋팅
    userAsgnListSelect() {
      //api호출
      let param = { domainCd: 'A00001', level: '1', prntsCd: 'A001', useYn: 'Y' }
      getCmCode(param)
        .then(res => {
          // console.log('getAsgnListData @@@@',res)
          let userAsgnSelectBox = this.popup.editorData.basic_info.editorList[2]
          userAsgnSelectBox.itemList = []
          res.list.forEach(item => {
            userAsgnSelectBox.itemList.push({
              value: item.codeCd,
              label: item.codeNm
            })
          })
          // console.log('@@@@@',userAsgnSelectBox)
          this.userTypeListSelect()
        })
        .catch(error => {
          console.log(error)
          this.userTypeListSelect()
        })
    },
    //팝업 사용자 타입 selecxBox 셋팅
    userTypeListSelect() {
      //api호출
      let param = { domainCd: 'A00001', level: '1', prntsCd: 'A002', useYn: 'Y' }
      getCmCode(param)
        .then(res => {
          // console.log('getuserTypeListData #### : ',res)
          let userTypeSelectBox = this.popup.editorData.basic_info.editorList[6]
          userTypeSelectBox.itemList = []
          res.list.forEach(item => {
            userTypeSelectBox.itemList.push({
              value: item.codeCd,
              label: item.codeNm
            })
          })
          // console.log('#####',this.popup.editorData.basic_info.editorList[6])
        })
        .catch(error => {
          console.log(error)
        })
    },
    validationUserIdList() {
      getUserManageListData(this.param)
        .then(res => {
          let userIdList = []
          res.list.forEach(user => {
            userIdList.push(user.userId)
          })
          this.popupBasicInfoList[1].validation.asyncList = userIdList
          // console.log('validationUserIdList : ',this.popupBasicInfoList.validation.asyncList)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 도메인 그리드 조회
    btnSearch() {
      this.openLoading('msg.searching')
      this.param.domainCd = this.userManageData.editorList[0].value
      getUserManageData(this.param)
        .then(res => {
          // console.log('getUserManageData',res)
          res.list.forEach((item, index) => {
            item.id = index + 1 // id 값 추가
            console.log(item)
          })
          notify(this.$t('msg.search_success'), 'success', 500)
          this.userManageGrid.data = res.list
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
      this.popup.editorData.basic_info.editorList[9].option.options.content = 'btnAdd' // ok 버튼 라벨
      this.popup.editorData.etc_info.editorList[6].option.options.content = 'btnAdd' // ok 버튼 라벨
      this.popup.data.panelButton.list.forEach(panel => {
        this.popup.editorData[panel.id].editorList.forEach(item => {
          if (item.id === 'domainCd') {
            item.option.readOnly = false
            this.userAsgnListSelect()
            this.validationUserIdList()
            item.value = this.userManageData.editorList[0].value
            // console.log('selectedDoamin after',item)
          } else if (item.id === 'userId') {
            item.option.readOnly = false
            item.value = ''
          } else if (item.id === 'useYn') {
            // console.log(item.value)
            item.value = 'Y'
            // console.log(item.value)
          } else item.value = ''
        })
      }) // 팝업 데이터 초기화
      this.resetChangePassPanel() // 비밀번호 변경 패널 리셋
      this.popup.editorData['change_pass'].editorList[3].option.options.disabled = true
      this.popup.editorData['change_pass'].editorList[0].option.disabled = true
      this.popup.data.count++ // watch에 걸기
      this.$refs.rowInfoPopup.open('new')
    },
    //파라미터 리셋
    paramReset() {
      // console.log('paramReset')
      ;(this.param.domainStatusCd = ''),
        (this.param.domainCd = ''),
        (this.param.userNm = ''),
        (this.param.userId = ''),
        (this.param.userPw = ''),
        (this.param.asgnCd = ''),
        (this.param.authgrpNm = '')
    },
    // select box 값 변경
    valueChanged(...arg) {
      if (arg[0][0] === 'domainCd') {
        this.paramReset()
        // console.log('valueChanged domainCd', arg[0][1].value)
        this.param.domainCd = arg[0][1].value
        this.userManageData.editorList[0].value = arg[0][1].value
        this.userManageData.editorList[1].value = ''
        this.userManageData.editorList[2].value = ''
        this.userManageListSelect() // 사용자 아이디/이름 select Box List 조회
      }
      if (arg[0][0] === 'userId') {
        this.param.userId = arg[0][1].value //파라미터 셋팅
        this.userManageData.editorList[1].value = arg[0][1].value
      }
      if (arg[0][0] === 'userNm') {
        this.param.userNm = arg[0][1].value
        this.userManageData.editorList[2].value = arg[0][1].value
      }
    },
    // 수정, 추가 버튼
    savePopupData(...arg) {
      console.log('savePopupData###', arg)
      this.saveData = {} // 수정/추가될 ROW
      this.popup.data.panelButton.list.forEach(panel => {
        if (panel.id !== 'change_pass') {
          //비밀번호 변경 필드 제외한 값 수정/추가
          this.popup.editorData[panel.id].editorList.forEach(item => {
            this.saveData[item.id] = item.value
          })
        }
      })

      if (arg[0] === 'new') {
        this.saveData.__created__ = true
        // this.saveData.insertId = this.nowUserId
      } else {
        this.saveData.__modified__ = true
        // this.saveData.updateId = this.nowUserId
      }
    },
    saveDataList() {
      //데이터 검증
      let dataList = [] // 수정/추가될 ROW 리스트
      dataList.push(this.saveData)
      // api 호출
      updateUserManageData(dataList)
        .then(res => {
          notify(this.$t('msg.save_success'), 'success', 300)
        })
        .catch(error => {
          notify(this.$t('msg.no_save'), 'success', 300)
          console.log(error)
        })
        .finally(() => {
          this.$refs.rowInfoPopup.onClose()
          this.userManageListSelect()
          this.btnSearch()
        })
    },
    onBtnClick(...arg) {
      let argData = arg[0][0]
      if (argData.content === 'btnCheck' || argData.content === 'btnChange') {
        this.changePass(argData)
      }
    },
    changePass(...arg) {
      let dataList = [] // 수정/추가될 ROW 리스트
      let adminCheck = true
      let changePassPanel = this.popup.editorData['change_pass'].editorList

      let changePass = changePassPanel[1]
      let verifyPass = changePassPanel[2]
      // console.log('btnCheckPass:' ,arg[0][0].id)

      //관리자 비밀번호 체크할때 / 비밀번호 변경할 때 savaData내용 다르게
      if (arg[0].id === 'btnCheckPass') {
        const checkPass = changePassPanel[0]
        this.saveData.domainCd = this.userDomainCd
        this.saveData.userId = this.nowUserId
        this.saveData.userPw = checkPass.value
        adminCheck = true
      } else {
        const domainCd = this.popup.editorData['basic_info'].editorList[0]
        const userId = this.popup.editorData['basic_info'].editorList[1]
        changePass = changePassPanel[1].value
        verifyPass = changePassPanel[2].value
        this.saveData[domainCd.id] = domainCd.value
        this.saveData[userId.id] = userId.value
        this.saveData.userPw = changePass
        // saveData[verifyPass.id] = verifyPass.value
        adminCheck = false
      }
      // 데이터 검증
      dataList.push(this.saveData)
      // api 호출
      if (adminCheck == true) {
        checkAdminPass(dataList)
          .then(res => {
            if (res.code === 200) {
              notify(this.$t('msg.confirm'), 'success', 1500)
              changePassPanel.forEach(item => {
                item.option.visible = !item.option.visible // 패널 에디터 visible 반전
              })
            } else {
              notify(this.$t('msg.checkPassFail'), 'warning', 1500)
            }
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.saveData = {}
            changePassPanel.forEach(item => {
              item.value = ''
            })
          })
      } else {
        if (changePass === verifyPass) {
          updateUserPass(dataList)
            .then(res => {
              notify(this.$t('msg.save_success'), 'success', 1500)
            })
            .finally(() => {
              this.saveData = {}
              changePassPanel.forEach(item => {
                item.value = ''
              })
              adminCheck = true
            })
        } else {
          changePassPanel.forEach(item => {
            item.value = ''
          })
          notify(this.$t('msg.differentPass'), 'warning', 1500)
        }
      }
      // }
    },
    //엑셀 다운로드
    exportExcel(param) {
      let context = this.$refs[this.userManageGrid.properties.gridName].dataGrid
      this.$refs[this.userManageGrid.properties.gridName].onExporting(context, 'userManage.xlsx')
    },
    // 삭제
    btnDelete() {
      let selectedRows = this.userManageList.getSelectedRowsData() // 체크된 Row 체크

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
            deleteUserManageData(selectedRows)
              .then(res => {
                notify(this.$t('msg.delete_success'), 'success', 300)
              })
              .catch(error => {
                console.log(error)
              })
              .finally(() => {
                this.userManageListSelect()
                this.btnSearch()
              })
          }
        })
    },
    // 팝업 editor box 값 변경
    onValueChanged(...arg) {
      let argData = arg[0][0]
      this.popup.data.panelButton.list.forEach(panel => {
        this.popup.editorData[panel.id].editorList.forEach(item => {
          if (item.id === argData[0]) {
            if (item.id === 'domainCd') {
              item.value = argData[1].value
              this.param.domainCd = item.value
              if (item.option.readOnly === false) {
                //도메인및 아이디가 readonly이면 async체크 불필요
                this.validationUserIdList()
                this.popupBasicInfoList[1].value = ''
              }
              this.userAsgnListSelect()
            } else {
              item.value = argData[1].value // popup 데이터 변경
            }
          }
        })
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/styles/themeB/variables.scss';
</style>
