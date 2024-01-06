<template>
  <!-- HTML 정의하는 부분 -->
  <div class="layout-wrapper" style="padding:10px">
    <div class="container-fluid">
      <!-- 타이틀 및 button -->
      <layoutTitle buttonKind="dxButton" :useButtonList="button.mainList" @btnSearch="btnSearch()" />
    </div>
    <!-- 조회조건 -->
    <div class="editor-card-theme">
      <editorsLayout ref="authUser" :layoutData="authUserData" @changInput="changInput"></editorsLayout>
    </div>
    <div style="padding-top:10px">
      <div class="lg:flex">
        <div class="lg:w-2/5" style="padding-right:0.5rem;">
          <div style="display: flex;justify-content: space-between;">
            <div style="height:40px;" class="col-sm-6 text-white m-1">
              <i class="fas fa-info-circle mr-1" />
              {{ $t('label.authGrp') }}
            </div>
            <div style="height:36px;">
              <dxButtonList
                :useBtnList="button.authGridList"
                @btnClick="onClickAuth($event.options)"
              ></dxButtonList>
            </div>
          </div>
          <!-- 권한그룹 그리드 영역 -->
          <devDataGrid
            height="calc(100vh - 300px)"
            :gridInfo="authGrid.properties"
            :dataSource="authGrid.data"
            :ref="authGrid.properties.gridName"
          ></devDataGrid>
        </div>
        <div class="lg:w-3/5" style="padding-left:0.5rem;">
          <div style="display: flex;justify-content: space-between;">
            <div style="height:40px;" class="col-sm-6 text-white m-1">
              <i class="fas fa-info-circle mr-1" />
              {{ $t('label.userList') }}
            </div>
            <div style="height:36px;">
              <dxButtonList
                :useBtnList="button.userGridList"
                @btnClick="onClickUser($event.options)"
              ></dxButtonList>
            </div>
          </div>
          <!-- 사용자목록 그리드 영역 -->
          <devDataGrid
            height="calc(100vh - 300px)"
            :gridInfo="userGrid.properties"
            :dataSource="userGrid.data"
            :ref="userGrid.properties.gridName"
          ></devDataGrid>
        </div>
      </div>
    </div>
    <AddUserPopup
      ref="addUserPopup"
      :option="popup.option"
      @onSuccess="addPopupData"
      @onClose="onClose"
      @onValueChanged="popupValueChanged"
      @onBtnClick="onBtnClick"
      @btnClick="btnClick"
      @onPanelButton="onPanelButton"
    />
  </div>
</template>

<script>
import layoutTitle from '@/components/layoutTitle' // Title & Button 컴포넌트
import { devDataGrid } from '@/components/DevExtreme/grid' // 그리드 컴포넌트
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import getEditorOptions from './data/editorOptions' // 에디터 옵션 데이터
import getauthUserGrid from './data/authUserGrid' // 그리드 옵션 데이터
import getPopupData from './data/popupData' // 팝업 데이터
import AddUserPopup from './popup/addUserPopup' // 팝업 컴포넌트
import { dxButtonList } from '@/components/DevExtreme/editors' // 버튼 컴포넌트
import { getDomainListData } from '@/api/system/domainManage' // 도메인 api 호출
import { getAuthGroupData } from '@/api/system/authGroupManage' // 권한그룹 api 호출
import { getUserManageListData } from '@/api/system/userManage' // 유저리스트 api 호출
import { getAsgnData } from '@/api/system/asgnManage' // 조직 api 호출
import EventBus from '@/components/event-bus' // 그리드 이벤트
import { getUserAuth, createUserAuth, deleteUserAuth } from '@/api/system/authUserManage' // 권한별 사용자 api 호출
import notify from 'devextreme/ui/notify' // message
import { getDomainCd } from '@/utils/token'
import envs from '@/envs'
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'authUserManage',
  components: {
    layoutTitle,
    devDataGrid,
    editorsLayout,
    dxButtonList,
    AddUserPopup
  },
  data() {
    return {
      userDomainCd: '', // 로그인시 도메인 코드
      // layoutTitle 버튼 리스트
      button: {
        // 메인 타이틀 옆 버튼
        mainList: {
          group: null,
          options: {
            type: 'default',
            searchModeOption: 'containted',
            content: '',
            icon: '',
            listStyle: ''
          }, // 버튼 리스트 옵션
          list: [{ id: 'btnSearch' }] // 리스트
        },
        // 권한그룹 목록 위 버튼
        authGridList: {
          group: {
            stylingMode: 'outlined',
            selectionMode: 'single'
          },
          options: {
            type: 'default',
            stylingMode: 'containted',
            content: '',
            icon: '',
            listStyle: ''
          },
          list: [{ id: 'btnExportXlsx' }]
        },
        // 사용자 목록 위 버튼
        userGridList: {
          group: {
            stylingMode: 'outlined',
            selectionMode: 'single'
          },
          options: {
            type: 'default',
            stylingMode: 'containted',
            content: '',
            icon: '',
            listStyle: ''
          },
          list: [{ id: 'btnAdd' }, { id: 'btnDelete' }, { id: 'btnExportXlsx' }]
        }
      },
      authUserData: getEditorOptions().authUserData, // editor 정보
      // 권한그룹 그리드 정보
      authGrid: {
        properties: [], // 그리드 설정 정보
        data: [] // 그리드 데이터
      },
      // 사용자목록 그리드 정보
      userGrid: {
        properties: [], // 그리드 설정 정보
        data: [] // 그리드 데이터
      },
      groupList: [], // 권한그룹 그리드 데이터
      param: {
        domainCd: '',
        authgrpCd: '',
        authgrpNm: ''
      },
      popup: {
        option: getPopupData().option, // 팝업 데이터
        authgrpCd: '', // 팝업으로 사용자를 추가할 권한그룹코드
        param: {
          userId: '',
          userNm: ''
        }
      },
      userList: [] // 사용자 목록
    }
  },
  computed: {
    authList() {
      return this.$refs[this.authGrid.properties.gridName].dataGrid // 권한별사용자 그리드
    },
    authUserList() {
      return this.$refs[this.userGrid.properties.gridName].dataGrid // 권한별사용자 그리드
    },
    popupUserList() {
      return this.$refs.popupUserGrid.dataGrid // 팝업 사용자 그리드
    }
  },
  async created() {
    this.userDomainCd = getDomainCd() // 세션정보에서 현재사용자 도메인 세팅
    this.authUserData.editorList[0].value = this.userDomainCd
    await this.compareDomain() // master 도메인과 현재사용자 도메인 비교
    await this.initSelectBox() // selectbox 생성
    // 권한그룹 그리드 cell 클릭 이벤트
    EventBus.$on(this.$route.name + '_' + this.authGrid.properties.gridName + '_CellClick', e => {
      this.cellClick(e)
    })
  },
  beforeMount() {
    this.authGrid.properties = getauthUserGrid().authGridProperties // 권한그룹 그리드 정보
    this.userGrid.properties = getauthUserGrid().userGridProperties // 사용자 그리드 정보
  },
  methods: {
    // master 도메인과 현재사용자 도메인 비교
    compareDomain() {
      // 도메인이 같지않을 때
      if (envs.masterDomain !== getDomainCd()) {
        this.authUserData.editorList[0].option.visible = false
        this.authUserData.editorList[1].position.col = [1, 3]
      }
    },
    // 그리드 셀 클릭
    cellClick(e) {
      if (e.key) {
        let param = {
          domainCd: this.param.domainCd,
          authgrpCd: e.key
        }
        this.popup.authgrpCd = e.key // 팝업으로 사용자를 추가할 권한그룹코드 지정
        this.authUserSelect(param) // 사용자목록 그리드 api호출
      }
    },
    authUserSelect(param) {
      // 권한별 사용자목록 그리드 api호출
      getUserAuth(param).then(res => {
        res.list.forEach(item => {
          item.id = item.userId
          if (item.authgrpAsgCls === 'P') item.authgrpAsgCls = this.$t('user_info')
          if (item.authgrpAsgCls === 'A') item.authgrpAsgCls = this.$t('asgn_info')
        })
        this.userGrid.data = res.list // 그리드에 데이터 바인딩
      })
    },
    initSelectBox() {
      // 도메인 select Box 데이터 받아옴
      getDomainListData({ domainStatusCd: '' }).then(res => {
        let domainSelectBox = this.$refs.authUser.$options.propsData.layoutData.editorList[0]
        res.list.forEach(item => {
          domainSelectBox.itemList.push({
            value: item.domainCd,
            label: item.domainNm
          })
        })
        this.param.domainCd = domainSelectBox.value
        this.getGroupListData() // 권한그룹 Select Box 데이터 생성
        this.btnSearch() // 권한그룹 그리드 조회
      })
    },
    getGroupListData() {
      // 권한그룹 select Box 데이터 받아옴
      getAuthGroupData({ domainCd: this.param.domainCd, authgrpCd: '', authgrpNm: '' }).then(res => {
        let authSelectBox = this.$refs.authUser.$options.propsData.layoutData.editorList[1]
        authSelectBox.itemList = []
        this.groupList = _.cloneDeep(res.list)
        this.groupList.forEach(item => {
          authSelectBox.itemList.push({
            value: item.authgrpCd,
            label: item.authgrpNm
          })
        })
        authSelectBox.itemList.unshift({ value: '', label: this.$t('label.all') })
        this.param.authgrpCd = authSelectBox.value
      })
    },
    // 권한그룹 조회
    btnSearch() {
      getAuthGroupData(this.param).then(res => {
        res.list.forEach(item => {
          item.id = item.authgrpCd
        })
        this.authGrid.data = res.list
        notify(this.$t('msg.search_success'), 'success', 1000)
      })
    },
    // 조회조건 select box 데이터 변경
    changInput(...arg) {
      if (arg[0][0] === 'domainCd') {
        this.param.domainCd = arg[0][1].value
        this.getGroupListData() // 권한그룹 Select Box 데이터 생성
      }
      if (arg[0][0] === 'authgrpCd') this.param.authgrpCd = arg[0][1].value
    },
    // sub 버튼 리스트 클릭
    onClickAuth(e) {
      if (e.id === 'btnExportXlsx') this.btnExportXlsx('auth')
    },
    // sub 버튼 리스트 클릭
    onClickUser(e) {
      if (e.id === 'btnAdd') this.btnAdd()
      if (e.id === 'btnDelete') this.btnDelete()
      if (e.id === 'btnExportXlsx') this.btnExportXlsx('user')
    },
    // 추가 버튼 클릭(팝업 오픈)
    btnAdd() {
      if (this.popup.authgrpCd.length > 0) {
        this.$refs.addUserPopup.open() // 팝업 오픈
        this.popup.option.editorList.user_info.editorList
        this.getpopupSelectBox() // 팝업 사용자 그리드 조회 조건 조회
        this.selectAsgn() // 팝업 조직 그리드 데이터 조회
      } else {
        this.$vToastify.warning(this.$t('msg.no_click_auth')) // 에러 메시지 출력
      }
    },
    // 삭제 버튼 클릭
    btnDelete() {
      let selectedRows = this.authUserList.getSelectedRowsData() // 체크된 Row 체크
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
              deleteUserAuth(selectedRows)
                .then(res => {
                  notify(this.$t('msg.delete_success'), 'success', 1000)
                })
                .catch(error => {
                  console.log(error)
                })
                .finally(() => {
                  this.userGrid.data = [] // 사용자목록 그리드 초기화
                  this.authUserSelect({ domainCd: this.param.domainCd, authgrpCd: this.popup.authgrpCd }) // 사용자목록 그리드 조회
                })
            }
          })
      } else {
        this.$vToastify.warning(this.$t('msg.delete_no_checked')) // 에러 메시지 출력
      }
    },
    // 팝업 사용자 그리드 조회 조건 조회
    getpopupSelectBox() {
      // 팝업 조회 조건 생성 api
      getUserManageListData({ domainCd: this.param.domainCd }).then(res => {
        this.userList = res.list
        this.popup.option.editorList.user_info.editorList.forEach(list => {
          if (list.option.type !== 'button') {
            list.itemList.push({ value: '', label: this.$t('label.all') })
            this.userList.forEach(user => {
              list.itemList.push({
                value: user[list.id],
                label: user[list.id]
              })
            })
          }
        })
        this.popup.option.count++
      })
    },
    // 팝업 editor box 값 변화
    popupValueChanged(...arg) {
      if (arg[0][0][0] === 'userId') {
        this.popup.param.userId = arg[0][0][1].value // param 변경
        this.popup.option.editorList.user_info.editorList[0].value = arg[0][0][1].value // value 변경
        this.popup.option.editorList.user_info.editorList[1].itemList = [{ value: '', label: this.$t('label.all') }]
        this.userList.forEach(list => {
          if (list.userId === this.popup.param.userId || this.popup.param.userId === '') {
            this.popup.option.editorList.user_info.editorList[1].itemList.push({
              value: list.userNm,
              label: list.userNm
            })
          }
        })
        this.popup.option.count++
      }
      if (arg[0][0][0] === 'userNm') {
        this.popup.param.userNm = arg[0][0][1].value // param 변경
        this.popup.option.editorList.user_info.editorList[1].value = arg[0][0][1].value // value 변경
      }
    },
    // 팝업 사용자 조회 버튼
    onBtnClick(...arg) {
      let param = { domainCd: this.param.domainCd, userId: this.popup.param.userId, userNm: this.popup.param.userNm }
      getUserManageListData(param)
        .then(res => {
          res.list.forEach(item => {
            item.id = item.userId
          })
          this.popup.option.gridList.user_info[0].rowData = res.list
          this.popup.option.count++
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 팝업 조직 그리드 데이터 조회
    selectAsgn() {
      let param = { domainCd: this.param.domainCd }
      getAsgnData(param)
        .then(res => {
          res.list.forEach(item => {
            item.id = item.asgnCd
            item.level = item.level * 1 // level 자료형 변경
          })
          this.popup.option.gridList.asgn_info[0].rowData = res.list
          this.popup.option.gridList.asgn_info[0].selectedRowKeys = []
          this.popup.option.count++
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 팝업 화살표 버튼
    btnClick(...arg) {
      // 선택 사용자 그리드로 추가
      if (arg[0][0].id === 'front') {
        if (arg[0].radio === 'user_info') {
          let selectedRows = arg[1].popupUserGrid[0].dataGrid.getSelectedRowsData() // 팝업 사용자 그리드 체크된 Row 체크
          let rowData = this.popup.option.gridList.user_info[2].rowData // 선택된 사용자 그리드 row 리스트
          selectedRows.forEach(row => {
            if (!this.popup.option.gridList.user_info[2].rowData.some(el => el.userId === row.userId))
              this.popup.option.gridList.user_info[2].rowData.push(row)
          })
        }
        if (arg[0].radio === 'asgn_info') {
          let selectedRows = arg[1].popupAsgnGrid[0].treeList.getSelectedRowsData() // 팝업 조직 그리드 체크된 Row 체크
          let rowData = this.popup.option.gridList.asgn_info[2].rowData // 선택된 조직 그리드 row 리스트
          selectedRows.forEach(row => {
            if (!this.popup.option.gridList.asgn_info[2].rowData.some(el => el.asgnCd === row.asgnCd))
              this.popup.option.gridList.asgn_info[2].rowData.push(row)
          })
        }
      }
      // 선택 사용자 그리드에서 제거
      if (arg[0][0].id === 'back') {
        if (arg[0].radio === 'user_info') {
          let selectedRows = arg[1].selectUserGrid[0].dataGrid.getSelectedRowsData() // 팝업 사용자 그리드 체크된 Row 체크
          let rowData = this.popup.option.gridList.user_info[2].rowData // 선택된 사용자 그리드 row 리스트
          selectedRows.forEach(row => {
            let rowIndex = rowData.findIndex(el => el.userId === row.userId)
            rowData.splice(rowIndex, 1)
          })
        }
        if (arg[0].radio === 'asgn_info') {
          let selectedRows = arg[1].selectAsgnGrid[0].dataGrid.getSelectedRowsData() // 팝업 조직 그리드 체크된 Row 체크
          let rowData = this.popup.option.gridList.asgn_info[2].rowData // 선택된 조직 그리드 row 리스트
          selectedRows.forEach(row => {
            let rowIndex = rowData.findIndex(el => el.asgnCd === row.asgnCd)
            rowData.splice(rowIndex, 1)
          })
        }
      }
    },
    // 팝업 추가 버튼
    addPopupData(...arg) {
      let addRows = []
      if (arg[0] === 'user_info') {
        let selectedRows = arg[1].selectUserGrid[0].dataGrid.getSelectedRowsData() // 팝업 사용자 그리드 체크된 Row 체크
        selectedRows.forEach(row => {
          if (!this.userGrid.data.some(el => el.userId === row.userId)) {
            row.authgrpCd = this.popup.authgrpCd // 권한그룹코드 추가
            row.authgrpAsgCls = 'P' // 구분 추가
            row.__created__ = true // 생성 추가
            addRows.push(row)
          }
        })
      }
      if (arg[0] === 'asgn_info') {
        let selectedRows = arg[1].selectAsgnGrid[0].dataGrid.getSelectedRowsData() // 팝업 사용자 그리드 체크된 Row 체크
        selectedRows.forEach(row => {
          if (!this.userGrid.data.some(el => el.userId === row.asgnCd)) {
            row.authgrpCd = this.popup.authgrpCd // 권한그룹코드 추가
            row.authgrpAsgCls = this.$t('A') // 구분 추가
            row.userId = row.asgnCd
            row.userNm = row.asgnNm
            row.__created__ = true // 생성 추가
            addRows.push(row)
          }
        })
      }
      if (addRows.length > 0) {
        this.popup.option.valiData = true // validation 체크
        // 저장 api 호출
        createUserAuth(addRows)
          .then(res => {
            notify(this.$t('msg.save_success'), 'success', 1000)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.userGrid.data = [] // 사용자목록 그리드 초기화
            this.authUserSelect({ domainCd: this.param.domainCd, authgrpCd: this.popup.authgrpCd }) // 사용자목록 그리드 조회
          })
      } else {
        this.$vToastify.warning(this.$t('msg.add_no_checked')) // 에러 메시지 출력
      }
    },
    onClose(...arg) {
      this.resetPopup(arg)
    },
    // 팝업 데이터 리셋
    resetPopup(arg) {
      // 팝업 사용자 조회 조건 리셋
      this.popup.option.editorList.user_info.editorList.forEach(editor => {
        if (editor.option.type !== 'button') {
          editor.value = ''
          editor.itemList = []
        }
      })
      this.popup.option.gridList.user_info[0].rowData = [] // 팝업 사용자 그리드 리셋
      this.popup.option.gridList.user_info[2].rowData = [] // 팝업 사용자 그리드 리셋
      this.popup.option.gridList.asgn_info[0].rowData = [] // 팝업 조직 그리드 리셋
      this.popup.option.gridList.asgn_info[2].rowData = [] // 팝업 조직 그리드 리셋
      this.popup.option.count++
    },
    // 판넬 변경 버튼 클릭
    onPanelButton(...arg) {
      if (arg[1] === 'asgn_info') this.selectAsgn()
    },
    btnExportXlsx(grid) {
      if (grid === 'auth') this.$refs[this.authGrid.properties.gridName].onExporting(this.authList, 'authList.xlsx')
      if (grid === 'user') this.$refs[this.userGrid.properties.gridName].onExporting(this.authUserList, 'authUserList.xlsx')
    }
  }
}
</script>

<style lang="less" scoped>
/* css 혹은 less로 스타일 정의하는 부분 */
</style>
