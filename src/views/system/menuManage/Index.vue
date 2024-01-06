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
        @btnSave="btnSave()"
        @btnDelete="btnDelete()"
      />
    </div>
    <!-- 조회조건 -->
    <div class="editor-card-theme">
      <editorsLayout ref="domain" :layoutData="domainData" @changInput="changInput"></editorsLayout>
    </div>
    <div style="padding-top:10px">
      <!-- 그리드 영역 -->
      <div class="lg:flex">
        <div class="lg:w-3/5" style="padding-right:0.5rem;">
          <div class="col-sm-6 text-white m-1">
            <i class="fas fa-info-circle mr-1"></i>
            {{ $t('label.menu_list') }}
          </div>
          <!-- Tree 그리드 영역 -->
          <dxTreeList
            :ref="menuTreeGrid.properties.treeName"
            height="calc(100vh - 310px)"
            :treeInfo="menuTreeGrid.properties"
            :dataSource="menuTreeGridData"
            :expandedRowKeys="menuTreeGrid.expandedRowKeys"
            :selectedRowKeys="menuTreeGrid.selectedRowKeys"
          />
        </div>
        <!-- 메뉴 정보 리스트 -->
        <div class="lg:w-2/5" style="padding-left:0.5rem;">
          <div class="col-sm-6 text-white m-1">
            <i class="fas fa-info-circle mr-1"></i>
            {{ $t('label.menu_info') }}
          </div>
          <editorsLayout ref="menuInfo" :layoutData="menuInfoData" @onValueChanged="onValueChanged"></editorsLayout>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dxTreeList } from '@/components/DevExtreme/grid' // 트리 그리드 컴포넌트
import layoutTitle from '@/components/layoutTitle' // Title & Button 컴포넌트
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import getEditorOptions from './data/editorOptions' // 에디터 옵션 데이터
import getmenuGrid from './data/menuGrid' // 그리드 옵션 데이터
import { getDomainListData } from '@/api/system/domainManage' // 도메인 api 호출
import { getMenuData, updateMenuData, deleteMenuData } from '@/api/system/menuManage' // 메뉴 api 호출
import EventBus from '@/components/event-bus' // 그리드 이벤트
import notify from 'devextreme/ui/notify' // message
import { getChildCmCodeList, getCmCode } from '@/api/system/cmCodeManage' // 공통코드 api 호출
import { getDomainCd } from '@/utils/token'
import envs from '@/envs'
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'MenuManage',
  components: {
    layoutTitle,
    dxTreeList,
    editorsLayout
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
        }, // 버튼 리스트 옵션
        list: [{ id: 'btnSearch' }, { id: 'btnAdd' }, { id: 'btnDelete' }, { id: 'btnSave' }] // 리스트
      },
      // 트리 그리드 정보
      menuTreeGrid: {
        properties: [], //TreeList Main Column 정보
        expandedRowKeys: [], // 처음 조회시 펼쳐질 ID
        clickRow: null, // 클릭한 ROW
        clickKey: null, // 클릭한 ROW의 key
        maxId: 0,
        selectedRowKeys: [] // 선택된 row
      },
      menuTreeGridData: [], // TreeList Main Data
      changeGridData: [], // 조회 후 변경된 데이터
      changeCount: true,
      domainData: getEditorOptions().domainData, // 도메인 정보
      menuInfoData: getEditorOptions().menuInfoData, // 메뉴 정보 레이아웃 옵션
      paramDomainCode: '', // 파라미터 도메인 코드
      domainCode: '', // 현재 조회된 도메인 코드
      beforeClickRow: [], // 이전 클릭 ROW
      nowClickRow: [] // 현재 클릭 ROW
    }
  },
  watch: {
    // 그리드 조회 후 데이터 변경시
    menuTreeGridData: {
      deep: true,
      handler() {
        if (this.changeCount) {
          let allData = _.cloneDeep(this.menuTreeGridData).filter(x => {
            return x.__created__ != true
          })
          if (allData.length > 0) {
            this.changeGridData.forEach((first, index) => {
              if (JSON.stringify(first) !== JSON.stringify(allData[index]) && !allData[index].__created__) {
                this.menuTreeGrid.selectedRowKeys.push(first.id) // 해당 Row 선택
                this.changeGridData[index] = allData[index] // 변경된 데이터 업데이트
                this.menuTreeGridData.forEach(item => {
                  if (item.id === first.id) item.__modified__ = true
                }) // __modified__ 추가
              }
            })
          }
        }
      }
    }
  },
  computed: {
    treeMenu() {
      return this.$refs[this.menuTreeGrid.properties.treeName].treeList // Main TreeList
    }
  },
  async created() {
    this.userDomainCd = getDomainCd() // 세션정보에서 현재사용자 도메인 세팅
    this.paramDomainCode = this.userDomainCd
    this.domainData.editorList[0].value = this.paramDomainCode
    await this.compareDomain() // master 도메인과 현재사용자 도메인 비교
    await this.initSelectBox()
    // 그리드 ROW 클릭 이벤트
    EventBus.$on(this.$route.name + '_' + this.menuTreeGrid.properties.treeName + '_FocusedRowChanged', e => {
      this.focusedRowChanged(e)
    })
  },
  beforeMount() {
    this.menuTreeGrid.properties = getmenuGrid().menuGridProperties
  },
  methods: {
    // master 도메인과 현재사용자 도메인 비교
    compareDomain() {
      // 도메인이 같지않을 때
      if (envs.masterDomain !== getDomainCd()) {
        this.cardVisible = false
      }
    },
    getIconSelectBox() {
      let param = { domainCd: this.domainCode, level: '1', prntsCd: 'A003', useYn: 'Y' }
      // 아이콘 Select Box 데이터 생성
      getCmCode(param)
        .then(res => {
          let iconSelectBox = this.$refs.menuInfo.$options.propsData.layoutData.editorList[4]
          iconSelectBox.itemList = [] // icon 리스트 초기화
          res.list.forEach(item => {
            this.menuInfoData.editorList[4].option.itemImage = item.codeNm
            iconSelectBox.itemList.push({
              value: item.codeNm,
              label: item.codeNm
            })
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Select Box 생성
    initSelectBox() {
      // 도메인 select Box 데이터 받아옴
      getDomainListData({ domainStatusCd: '' })
        .then(res => {
          let domainSelectBox = this.$refs.domain.$options.propsData.layoutData.editorList[0]
          res.list.forEach(item => {
            domainSelectBox.itemList.push({
              value: item.domainCd,
              label: item.domainNm
            })
          })
          this.paramDomainCode = domainSelectBox.value
          this.btnSearch()
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 추가
    btnAdd(e) {
      let prntsCd = 0 // 부모메뉴 ID
      if (!this.menuTreeGridData.some(el => el.menuCd === this.menuTreeGrid.clickKey)) this.menuTreeGrid.clickKey = null // 선택된 key 초기화
      if (this.menuTreeGrid.clickKey !== null) prntsCd = this.menuTreeGrid.clickKey // 추가되는 parent key
      this.menuTreeGrid.expandedRowKeys.push(prntsCd) // 펼쳐질 key
      let menuCd = this.nextmenuCdCheck() // 추가되는 메뉴 아이디 생성
      console.log('추가', menuCd)
      let newRow = {
        domainCd: this.domainCode,
        id: menuCd,
        menuNm: null,
        prntsCd: prntsCd, // prntsCd가 null이면 추가안됨
        menuCd: menuCd,
        sort: null,
        menuUrl: null,
        icon: '',
        useYn: 'N',
        note: '',
        level: 0,
        insertDt: '',
        insertId: '',
        updateDt: '',
        updateId: ''
      } // 추가될 row 데이터 셋
      this.menuTreeGrid.selectedRowKeys.push(menuCd) // 해당 Row 선택
      this.$refs[this.menuTreeGrid.properties.treeName].addRow(newRow) // row 추가
      if (prntsCd === 0) notify(this.$t('msg.add_success'), 'success', 1000)
      if (prntsCd !== 0) notify(this.$t('msg.check_add_success'), 'success', 1000)
    },
    // 추가되는 메뉴 아이디 생성
    nextmenuCdCheck() {
      var menuCd = 'MENU'
      this.menuTreeGridData.forEach(item => {
        let id = item.id.split('MENU')
        if (id[1] * 1 > this.menuTreeGrid.maxId) {
          this.menuTreeGrid.maxId = id[1] * 1
        }
      })
      this.menuTreeGrid.maxId++
      menuCd = menuCd + String(this.menuTreeGrid.maxId)
      this.menuTreeGrid.maxId = 0
      return menuCd
    },
    // 조회
    btnSearch() {
      // 메뉴 그리드 생성
      this.openLoading('msg.searching')
      this.menuTreeGridData = [] // 그리드 데이터 초기화
      // api 호출
      getMenuData({ domainCd: this.paramDomainCode })
        .then(res => {
          console.log('btnSearch :', this.paramDomainCode, res.list)
          res.list.forEach(item => {
            item.id = item.menuCd
            item.level = item.level * 1 // level 자료형 변경
          }) // id 값 추가
          notify(this.$t('msg.search_success'), 'success', 1000) // 성공 메시지
          this.menuTreeGrid.selectedRowKeys = [] // 체크 항목 초기화
          this.changeCount = false
          this.menuTreeGridData = _.cloneDeep(res.list) // 그리드 데이터
          this.menuTreeGrid.clickKey = null // 클릭한 key 초기화
          this.changeGridData = _.cloneDeep(res.list) // 조회초기값 저장
          this.menuTreeGrid.properties.focusedRowKey = 0 //포커즈된 row 초기화
          this.domainCode = this.paramDomainCode // 도메인 코드 저장
          this.getIconSelectBox() //  아이콘 select box 데이터 갱신
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.endLoading()
          this.changeCount = true
          // 에디터 박스 데이터 초기화
          this.menuInfoData.editorList.forEach(list => {
            if (list.id === 'sort' || list.id === 'level') {
              list.value = 0
            } else {
              list.value = ''
            }
          })
        })
    },
    // 저장
    btnSave() {
      let saveData = []
      this.menuTreeGridData.forEach(row => {
        if (row.__created__ || row.__modified__) saveData.push(row)
      })
      console.log('save', saveData)
      if (this.verification(saveData)) {
        // 저장 api 호출
        updateMenuData(saveData)
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
    //  체크
    verification(saveData) {
      if (saveData && saveData[0]) {
        let list = [] // 에러 메시지에 들어갈 컬럼 리스트
        let msg = '' // 에러 메시지
        for (let i = 0; i < saveData.length; i++) {
          if (saveData[i].menuNm === '') list.push(this.$t('label.menu_nm')) // 빈값 체크
          if (saveData[i].menuUrl === '') list.push(this.$t('label.menu_url')) // 빈값 체크
          if (list.length > 0) {
            list.forEach((item, index) => {
              msg += item
              if (list.length - 1 !== index) msg += ', '
            })
            this.$vToastify.warning({ body: msg + this.$t('msg.required_item') }) // 에러 메시지 출력
            return false // 실패
          } else {
            return true // 성공
          }
          // }
        }
      } else {
        notify(this.$t('msg.no_change'), 'warning', 1000)
      }
    },
    // 삭제
    btnDelete() {
      let selectedRows = this.treeMenu.getSelectedRowsData() // 체크된 Row 체크
      let deleteData = selectedRows
      this.menuTreeGridData.forEach(row => {
        selectedRows.forEach(selectRow => {
          if (row.prntsCd === selectRow.menuCd) deleteData.push(row)
        })
      }) // 선택항목 자식 row도 포함
      console.log('delete', deleteData)
      if (deleteData.length > 0) {
        this.$vToastify // 삭제확인 메세지
          .prompt({
            body: this.$t('msg.delete_qustion'),
            answers: { Yes: true, No: false },
            mode: 'prompt'
          })
          .then(value => {
            if (value) {
              // api 호출
              deleteMenuData(deleteData)
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
          .catch(error => {
            console.log(error)
          })
      } else {
        notify(this.$t('msg.delete_no_checked'), 'warning', 1000)
      }
    },
    // row sort 변경
    checkRowSort(row) {
      if (this.beforeClickRow && row) {
        if (this.beforeClickRow.key && row.key) {
          if (this.beforeClickRow.key === row.key || row.data.sort === null) {
            if (row.data.sort !== null) {
              let beforeIndex = this.beforeClickRow.node.parent.children // row 변경전 위치
              beforeIndex.splice(
                beforeIndex.findIndex(el => el.key === row.key),
                1
              ) // row 변경전 위치의 해당 row 제거
              beforeIndex.forEach((item, index) => {
                this.menuTreeGridData[this.menuTreeGridData.findIndex(el => el.id === item.key)].sort = index + 1
              }) // row 변경전 위치의 sort 변경
            }
            this.nowSortChange(row.node.parent.children) // 현재 sort 변경
          } else {
            let itemPrntsCd = this.beforeClickRow.node.parent.key // 부모코드
            if (this.menuTreeGridData[this.menuTreeGridData.findIndex(el => el.id === this.beforeClickRow.key)].prntsCd !== itemPrntsCd) {
              let beforeIndex = this.beforeClickRow.node.parent.children // row 변경전 위치
              beforeIndex.splice(
                beforeIndex.findIndex(el => el.key === row.key),
                1
              ) // row 변경전 위치의 해당 row 제거
              beforeIndex.forEach((item, index) => {
                this.menuTreeGridData[this.menuTreeGridData.findIndex(el => el.id === item.key)].sort = index + 1
              }) // row 변경전 위치의 sort 변경
            }
            this.nowSortChange(row.node.parent.children) // 현재 sort 변경
          }
        } else {
          this.nowSortChange(row.node.parent.children) // 현재 sort 변경
        }
      } else {
        if (row) {
          // 이전 위치에 대한 데이터가 없을 때
          this.nowSortChange(row.node.parent.children) // 현재 sort 변경
        } else if (this.beforeClickRow) {
          // 현재 위치에 대한 데이터가 없을 때
          let beforeIndex = this.beforeClickRow.node.parent.children // row 변경전 위치
          let itemPrntsCd = '' // 부모코드
          let sortCount = 2
          beforeIndex.splice(
            beforeIndex.findIndex(el => el.key === this.beforeClickRow.key),
            1
          ) // row 변경전 위치의 해당 row 제거
          beforeIndex.forEach((item, index) => {
            this.menuTreeGridData[this.menuTreeGridData.findIndex(el => el.id === item.key)].sort = index + 1
          }) // row 변경전 위치의 sort 변경
          this.menuTreeGridData.forEach(item => {
            if (item.id === this.beforeClickRow.key) itemPrntsCd = item.prntsCd
          }) // 이동된 row 부모코드 찾기
          this.menuTreeGridData.forEach(item => {
            if (item.prntsCd === itemPrntsCd) {
              if (item.id === this.beforeClickRow.key) {
                item.sort = 1
              } else {
                item.sort = sortCount
                sortCount++
              }
            }
          })
        }
      }
    },
    // 현재 level의 sort 체인지
    nowSortChange(nowRow) {
      nowRow.forEach((item, index) => {
        this.menuTreeGridData[this.menuTreeGridData.findIndex(el => el.id === item.key)].sort = index + 1
      }) // row 변경후 위치의 sort 변경
    },
    // 그리드 ROW 클릭 시
    focusedRowChanged(e) {
      this.nowClickRow = e.row // 현재 클릭 row
      this.checkRowSort(e.row) // row sort 변경
      // 클릭한 메뉴 정보 조회
      if (e.row) {
        this.menuTreeGridData.forEach((item, index) => {
          if (item.id === e.row.key) {
            this.menuInfoData.editorList.forEach(data => {
              data.value = ''
              data.value = item[data.id] // 데이터 매칭
            })
            this.menuTreeGrid.clickRow = index
          }
        })
        if (e.row) this.menuTreeGrid.clickKey = e.row.key
      }
      this.beforeClickRow = e.row //이전 클릭 row에 저장
    },
    // 조회조건 select box 데이터 변경
    changInput(...arg) {
      this.paramDomainCode = arg[0][1].value
    },
    // editor box 데이터 변경
    onValueChanged(...arg) {
      if (this.menuTreeGrid.clickKey !== null) {
        if (arg[0][0] == 'icon') {
          this.menuInfoData.editorList[4].option.dropdownImage = arg[0][1].value // 그리드 데이터 변경
        }
        this.menuTreeGridData[this.menuTreeGrid.clickRow][arg[0][0]] = arg[0][1].value // 그리드 데이터 변경
        // 에디터 박스 데이터 변경
        this.menuInfoData.editorList.forEach(list => {
          if (list.id === arg[0][0]) {
            list.value = arg[0][1].value
          }
        })
      }
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

<style lang="scss" scoped>
@import '@/assets/scss/styles/themeB/variables.scss';
</style>
