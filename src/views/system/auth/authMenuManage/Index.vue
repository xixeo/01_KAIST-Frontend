<template>
  <!-- HTML 정의하는 부분 -->
  <div class="layout-wrapper" style="padding:10px">
    <div class="container-fluid">
      <!-- 타이틀 및 button -->
      <layoutTitle buttonKind="dxButton" :useButtonList="buttonUseList" />
    </div>
    <!-- 권한그룹조회 -->
    <div class="lg:flex">
      <div class="lg:w-2/5" style="padding-right:0.5rem;">
        <div style="display: flex; justify-content: space-between;">
          <dxButtonList
            style="height:100%;padding-top:0.5rem;padding-bottom:0.5rem;"
            :useBtnList="buttonList"
            @btnClick="onClick($event.options)"
          ></dxButtonList>
          <editorsLayout
            ref="domainInfo"
            :layoutData="domainEditorOptionData"
            @onValueChanged="valueChanged"
          ></editorsLayout>
        </div>
        <div class="editor-card-theme">
          <editorsLayout
            ref="groupInfo"
            :layoutData="groupEditorOptionData['group_info']"
            @onValueChanged="valueChanged"
            @btnClick="btnClick"
          ></editorsLayout>
        </div>
        <!-- 권한 그리드 영역 -->
        <devDataGrid
          v-show="radio=='group_info'"
          height="calc(100vh - 300px)"
          :gridInfo="authGroupGrid.properties"
          :dataSource="authGroupGrid.data"
          :ref="authGroupGrid.properties.gridName"
          style="padding-top:10px;"
        ></devDataGrid>
        <!-- 메뉴 Tree 그리드 영역 -->
        <dxTreeList
          v-show="radio=='menu_info'"
          :ref="menuTree.properties.treeName"
          height="calc(100vh - 300px)"
          :treeInfo="menuTree.properties"
          :dataSource="menuTreeData"
          :expandedRowKeys="menuTree.expandedRowKeys"
          :selectedRowKeys="menuTree.selectedRowKeys"
          style="padding-top:10px;"
        />
      </div>
      <!-- 메뉴조회 -->
      <div class="lg:w-3/5" style="padding-left:0.5rem;">
        <div style="display: flex; justify-content: flex-end;">
          <div>
            <editorsLayout ref="authgrpInfo" :layoutData="authgrpEditorOptionData"></editorsLayout>
          </div>
          <div>
            <dxButtonList
              style="height:100%;padding-top:0.5rem;padding-bottom:0.5rem;"
              :useBtnList="buttonMenulList"
              @btnClick="onClickMenu($event.options)"
            ></dxButtonList>
          </div>
        </div>
        <devDataGrid
          height="calc(100vh - 216px)"
          :gridInfo="authMenuGrid.properties"
          :dataSource="authMenuGrid.data"
          :ref="authMenuGrid.properties.gridName"
        ></devDataGrid>
      </div>
    </div>
  </div>
</template>

<script>
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
import layoutTitle from '@/components/layoutTitle' // Title & Button 컴포넌트
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import getEditorOptions from './data/editorOptions' // 에디터 옵션 데이터
import { devDataGrid, dxTreeList } from '@/components/DevExtreme/grid' // 그리드 컴포넌트
import getAuthGroupGrid from './data/authGroupGrid' // auth 그리드 옵션 데이터
import getAuthMenuGrid from './data/authMenuGrid' // menu 그리드 옵션 데이터
import getMenuTree from './data/menuTree' // menu tree 그리드 옵션 데이터
import { dxButtonList } from '@/components/DevExtreme/editors' // 에디터 컴포넌트
import { getDomainListData } from '@/api/system/domainManage' // 도메인 리스트 api 호출
import { getChildCmCodeList, getCmCode } from '@/api/system/cmCodeManage' // 공통코드 api 호출
import { getMenuData, getLowerLevelMenu } from '@/api/system/menuManage' // 메뉴 api 호출
import { getAuthgrpListData, getAuthGroupData } from '@/api/system/authGroupManage' // 권한그룹 api 호출
import { getMenuAuthGroup, createMenuAuthGroup, deleteMenuAuthGroup } from '@/api/system/authMenuManage' // 권한그룹 api 호출
import notify from 'devextreme/ui/notify' // message
import EventBus from '@/components/event-bus' // 그리드 이벤트
import { getUserId, getDomainCd } from '@/utils/token'
import envs from '@/envs'

export default {
  name: 'authMenuManage',
  components: {
    layoutTitle,
    editorsLayout,
    getEditorOptions,
    devDataGrid,
    getAuthGroupGrid,
    getAuthMenuGrid,
    dxButtonList,
    dxTreeList
  },
  // .vue 내부에서 사용되는 model
  data() {
    return {
      //도메인코드
      userDomainCd: '',
      //선택 권한그룹코드, 그룹명
      selectAuthgrp: {
        authgrpCd: '',
        authgrpNm: ''
      },
      //공통코드 리스트
      comcodeList: {
        localList: [],
        authTypeList: []
      },
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
        list: []
      },
      // editor list 정보
      groupEditorOptionData: '',
      menuEditorOptionData: '',
      domainEditorOptionData: '',
      authgrpEditorOptionData: '',
      // 그리드 정보
      authGroupGrid: {
        properties: [], // 그리드 설정 정보
        data: [] // 그리드 데이터
      },
      authMenuGrid: {
        properties: [], // 그리드 설정 정보
        data: [], // 그리드 데이터
        firstData: [] // 조회기준 데이터
      },
      //watch때문에....
      //authMenuGridData: [],
      changeGridData: [], // 조회 후 변경된 데이터
      // 트리 그리드 정보
      menuTree: {
        properties: [], //TreeList Main Column 정보
        expandedRowKeys: ['MENU001', 'MENU002', 'MENU003', 'MENU004'], // 처음 조회시 펼쳐질 ID
        firstData: [], // 조회기준 데이터
        clickRow: null, // 클릭한 ROW
        clickKey: null, // 클릭한 ROW의 key
        maxId: 0,
        changeRow: [], // 내용 수정된 ROW
        addRowId: [], // 추가된 Row ID 리스트
        selectedRowKeys: [] // 선택된 row
      },
      menuTreeData: [], // TreeList Main Data
      //버튼(그룹, 메뉴)
      buttonList: {
        group: {
          stylingMode: 'outlined',
          selectionMode: 'single', // 하나만 선택 가능
          selectedKeys: [this.$t('group_info')] // 버튼 리스트 중 선택된 key
        },
        options: {
          type: 'default',
          stylingMode: 'containted',
          content: '',
          style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'group_info' }, { id: 'menu_info' }]
      },
      //조회버튼(그룹, 메뉴)
      buttonSearchList: {
        group: {
          stylingMode: 'outlined',
          selectionMode: 'single', // 하나만 선택 가능
          selectedKeys: [this.$t('group_info')] // 버튼 리스트 중 선택된 key
        },
        options: {
          type: 'default',
          stylingMode: 'containted',
          content: '',
          style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'btnSearch' }]
      },
      //버튼리스트 우측 메뉴리스트
      buttonMenulList: {
        group: {
          stylingMode: 'outlined',
          selectionMode: 'single'
        },
        options: {
          type: 'default',
          stylingMode: 'containted',
          content: '',
          icon: '',
          style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'btnRefresh' }, { id: 'btnSave' }, { id: 'btnDelete' }]
      },
      // 좌측판넬구분값
      radio: '',
      panel: true,
      // 권한그룹 파라미터
      groupParam: {
        domainStatusCd: 'Y',
        domainCd: '',
        authgrpCd: '',
        authgrpNm: ''
      },
      //셀렉트박스
      item: {
        id: 'domainCd',
        title: {
          label: 'label.domain_cd',
          width: '45%'
        },
        value: '',
        itemList: [],
        option: {
          type: 'select', // select/input/button
          kind: 'default', // default/filter
          clearbutton: false,
          readOnly: false,
          disabled: false,
          searchenabled: true, // true: editable false: no editable
          placeholder: '도메인코드',
          width: '55%'
        },
        position: {
          row: [1, 1], // row start, row span
          col: [1, 3], // col start, col span
          mobile: [1, 1, 1, 3] // 모바일 사이즈 row start, row span, col start, col span
        }
      }
    }
  },
  watch: {
    // 신규row 추가시 체크박스 체크
    //authMenuGridData: {
    //  deep: true,
    //  handler() {
    //      let allData = _.cloneDeep(this.authMenuGridData).filter(x => {
    //        return x.__created__ != false
    //      })
    //  }
    //}
  },
  computed: {
    menuTreeList() {
      return this.$refs[this.menuTree.properties.treeName].treeList // Main TreeList
    },
    authGroupList() {
      // domain dataGrid
      return this.$refs[this.authGroupGrid.properties.gridName].dataGrid
    },
    authMenuList() {
      // domain dataGrid
      return this.$refs[this.authMenuGrid.properties.gridName].dataGrid
    }
  },
  async created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
    this.userDomainCd = getDomainCd()
    this.groupParam.domainCd = this.userDomainCd
    await this.editorInit()
    await this.domainListSelect() // 도메인 select Box 데이터 받아옴
    await this.authgrpListSelect() // 조회조건 권한 그룹 코드, 이름 select box 데이터 받아옴
    await this.btnSearch() //권한그룹 그리드 조회

    //공통코드 정의
    //let commonCodeList = await Promise.all([getChildCmCodeList({domainCd: this.userDomainCd, codeCd: 'S001'}), //지역
    //                                        getChildCmCodeList({domainCd: this.userDomainCd, codeCd: 'A002'}) //권한그룹유형
    //                                      ])

    //this.comcodeList.localList = commonCodeList[0].list
    //this.comcodeList.authTypeList = commonCodeList[1].list
    //this.authGroupGrid.properties.gridColinfos[2].lookup.datasource = this.comcodeList.authTypeList
    //this.authGroupGrid.properties.gridColinfos[2].lookup.value = "codeCd"
    //this.authGroupGrid.properties.gridColinfos[2].lookup.display = "codeNm"
    //console.log('###comCode2 : ' + JSON.stringify(this.authGroupGrid.properties.gridColinfos[2].lookup))

    // 그리드 cell 클릭 이벤트
    EventBus.$on(this.$route.name + '_' + this.authGroupGrid.properties.gridName + '_CellClick', e => {
      this.cellClick(e)
    })

    EventBus.$on(this.$route.name + '_' + this.authMenuGrid.properties.gridName + '_onCheckValueChanged', e => {
      this.onCheckValueChanged(e)
    })

    // 트리 드래그 이벤트
    EventBus.$on(this.$route.name + '_' + this.menuTree.properties.treeName + '_DragStart', e => {
      this.treeMenu_DragStart(e)
    })
    EventBus.$on(this.$route.name + '_' + this.menuTree.properties.treeName + '_DragEnd', e => {
      this.treeMenu_DragEnd(e)
    })
    EventBus.$on(this.$route.name + '_' + this.menuTree.properties.treeName + '_CellPrepared', e => {
      //console.log('#### treeMenu_CellPrepared -----> ' )
      this.treeMenu_CellPrepared(e)
    })
  },
  beforeMount() {
    this.authGroupGrid.properties = getAuthGroupGrid().gridProperties // dataGrid Column 정보
    this.authMenuGrid.properties = getAuthMenuGrid().gridProperties // dataGrid Column 정보
    this.menuTree.properties = getMenuTree().menuGridProperties
    //this.menuTree.properties.focusedRowKey = 0
  },
  mounted() {},
  methods: {
    // master 도메인과 현재사용자 도메인 비교
    compareDomain() {
      // 도메인이 같지않을 때
      if (envs.masterDomain !== getDomainCd()) {
        this.domainEditorOptionData.editorList[0].option.visible = false
      }
    },
    // .vue 내부에서 사용되는 함수를 정의한다.
    editorInit() {
      this.radio = 'group_info'
      this.groupEditorOptionData = getEditorOptions().groupEditorData
      this.menuEditorOptionData = getEditorOptions().menuEditorData
      this.domainEditorOptionData = getEditorOptions().domainEditorData
      this.domainEditorOptionData.editorList[0].value = this.userDomainCd
      this.authgrpEditorOptionData = getEditorOptions().authgrpEditorData
      this.compareDomain() // master 도메인과 현재사용자 도메인 비교
    },

    //체크박스선택 선택
    onCheckValueChanged(e) {
      console.log('onCheckValueChanged ' + e.column + ' : ' + e.value)
      if (e.column == 'selectAll') {
        //이벤트버스가 먼저 발생함.... 테스트 많이 필요.....
        if (e.value == 'Y') {
          this.authMenuGrid.data[e.rowId].basicAclc = 'Y'
          this.authMenuGrid.data[e.rowId].basicAclr = 'Y'
          this.authMenuGrid.data[e.rowId].basicAclu = 'Y'
          this.authMenuGrid.data[e.rowId].basicAcld = 'Y'
          this.authMenuGrid.data[e.rowId].selectAll = 'Y'
        } else {
          this.authMenuGrid.data[e.rowId].basicAclc = 'N'
          this.authMenuGrid.data[e.rowId].basicAclr = 'N'
          this.authMenuGrid.data[e.rowId].basicAclu = 'N'
          this.authMenuGrid.data[e.rowId].basicAcld = 'N'
          this.authMenuGrid.data[e.rowId].selectAll = 'N'
        }
      } else if (e.column == 'basicAclc' || e.column == 'basicAclr' || e.column == 'basicAclu' || e.column == 'basicAcld') {
        console.log('e.column : ' + e.column)
        let checkValueList = []
        checkValueList.push(this.authMenuGrid.data[e.rowId].basicAclc)
        checkValueList.push(this.authMenuGrid.data[e.rowId].basicAclr)
        checkValueList.push(this.authMenuGrid.data[e.rowId].basicAclu)
        checkValueList.push(this.authMenuGrid.data[e.rowId].basicAcld)
        if (e.value == 'Y') {
          let count = 0
          for (let i = 0; i < checkValueList.length; i++) {
            if (checkValueList[i] == 'Y') {
              count++
            }
          }
          if (count >= 4) {
            this.authMenuGrid.data[e.rowId].selectAll = 'Y'
          }
        } else {
          this.authMenuGrid.data[e.rowId].selectAll = 'N'
        }
      }
    },
    //그룹/메뉴 버튼 선택 이벤트 정의
    onClick(e) {
      if (e.id == 'menu_info') {
        if (this.authGroupList.getSelectedRowsData().length < 1) {
          notify(this.$t('msg.authGroup_check'), 'warning', 800)
          //버튼셀렉트 이미지 변경로직 추가
          return
        } else {
          this.btnMenuSearch()
        }
      }
      this.radio = e.id
    },
    onClickMenu(e) {
      if (e.id == 'btnSave') {
        let dataList = [] // 수정/추가될 ROW 리스트
        //let saveDataList = this.authMenuList.getSelectedRowsData() // 체크된 Row 데이터
        //수정사항 : row0일때 예외처리
        let saveDataList = this.authMenuGrid.data //전체 row 데이터
        console.log('__created__||__modified__ : ' + JSON.stringify(saveDataList))
        saveDataList.forEach(item => {
          if (item.__created__ || item.__modified__) {
            dataList.push(item)
          }
        })

        createMenuAuthGroup(dataList)
          .then(res => {
            notify(this.$t('msg.save_success'), 'success', 300)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            let param = {
              domainCd: this.userDomainCd,
              authgrpCd: this.selectAuthgrp.authgrpCd
            }
            this.btnAuthMenuSearch(param)
          })
      } else if (e.id == 'btnDelete') {
        //console.log("####delete")
        let selectedRows = this.authMenuList.getSelectedRowsData()
        let param = {
          domainCd: this.userDomainCd,
          authgrpCd: this.selectAuthgrp.authgrpCd
        }
        //수정사항 : 삭제확인 메세지
        this.$vToastify
          .prompt({
            body: this.$t('msg.delete_qustion'),
            answers: { Yes: true, No: false },
            mode: 'prompt'
          })
          .then(value => {
            if (value) {
              // api 호출
              deleteMenuAuthGroup(selectedRows)
                .then(res => {
                  notify(this.$t('msg.delete_success'), 'success', 300)
                  this.btnAuthMenuSearch(param)
                })
                .catch(error => {
                  console.log(error)
                })
                .finally(() => {})
            }
          })
      } else if (e.id == 'btnRefresh') {
        let param = {
          domainCd: this.userDomainCd,
          authgrpCd: this.selectAuthgrp.authgrpCd
        }
        this.btnAuthMenuSearch(param)
      }
    },
    btnClick(...arg) {
      //console.log("####btnClick : "+ this.radio + " -> " + JSON.stringify(arg[0][0].id))
      if (arg[0][0].id == 'btnSearch') {
        if (this.radio == 'group_info') {
          this.btnSearch()
        } else if (this.radio == 'menu_info') {
          this.btnMenuSearch()
        }
      }
    },
    // select box 값 변경
    valueChanged(...arg) {
      //console.log("####valueChanged"+ arg[0][0] + "/" + arg[0][1])
      if (arg[0][0] === 'domainCd') {
        this.radio = 'group_info'
        this.userDomainCd = arg[0][1].value
        this.groupParam.domainCd = arg[0][1].value
        this.btnSearch()
        this.btnMenuSearch()
        this.authgrpListSelect()
      } else if (arg[0][0] === 'authgrpCd') {
        this.groupParam.authgrpCd = arg[0][1].value
      } else if (arg[0][0] === 'authgrpNm') {
        this.groupParam.authgrpNm = arg[0][1].value
      }
    },
    // 도메인 select Box 데이터 받아옴
    domainListSelect() {
      getDomainListData({ domainStatusCd: '' }).then(res => {
        //console.log("####getDomainListData"+ JSON.stringify(res))
        let domainSelectBox = this.$refs.domainInfo.$options.propsData.layoutData.editorList[0]
        res.list.forEach(item => {
          // 그룹 도메인 이름 select box 데이터 추가
          domainSelectBox.itemList.push({
            value: item.domainCd,
            label: item.domainNm
          })
        })
      })
    },
    // 그룹권한 select Box 데이터 받아옴
    authgrpListSelect() {
      getAuthgrpListData(this.groupParam)
        .then(res => {
          //검색조건의 셀렉트박스 중 한개를 선택
          let authgrpCdSelectBox = this.$refs.groupInfo.$options.propsData.layoutData.editorList[0]
          let authgrpNmSelectBox = this.$refs.groupInfo.$options.propsData.layoutData.editorList[1]
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
    // 그리드 cell 클릭 시
    cellClick(e) {
      // 클릭한 cell 정보 조회
      if (e.key) {
        this.selectAuthgrp.authgrpCd = e.row.data.authgrpCd
        this.selectAuthgrp.authgrpNm = e.row.data.authgrpNm
        this.authgrpEditorOptionData.editorList[0].value = e.row.data.authgrpNm + '(' + e.row.data.authgrpCd + ')'
        let param = {
          domainCd: this.userDomainCd,
          authgrpCd: this.selectAuthgrp.authgrpCd
        }
        this.btnAuthMenuSearch(param)
      }
    },
    // 권한그룹 그리드 조회
    btnSearch() {
      //console.log('##btnSearch : ' + JSON.stringify(this.groupParam))
      this.openLoading('msg.searching')
      getAuthGroupData(this.groupParam)
        .then(res => {
          //console.log('##res :', res.list)
          res.list.forEach((item, index) => {
            item.id = item.authgrpCd //itme.id = 그리드 row id
          }) //id 값 추가
          notify(this.$t('msg.search_success'), 'success', 500)
          this.authGroupGrid.data = res.list
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          let param = {
            domainCd: this.userDomainCd,
            authgrpCd: this.selectAuthgrp.authgrpCd
          }
          //권한메뉴 초기화
          this.authMenuGrid.data = []
          this.authgrpEditorOptionData.editorList[0].value = ''
          this.getAuthTypeSelectBox() // 권한유형형식 데이터 호출
          this.endLoading()
        })
    },
    // 메뉴 그리드 생성
    btnMenuSearch() {
      let authMenuList = this.authMenuGrid.data
      let dataSource = []
      //console.log('##authMenuList: ' + JSON.stringify(authMenuList))
      // api 호출
      getLowerLevelMenu({ domainCd: this.userDomainCd })
        .then(res => {
          //console.log('조회 :', res.list)

          res.list.forEach(item => {
            //그리드에 데이터를 넣기 위한 전처리
            item.id = item.menuCd
            item.level = item.level * 1

            let check = true
            //메뉴권한 리스트에 데이터가 있으면 메뉴리스트에서 제외
            authMenuList.forEach(list => {
              //console.log('##check: ' + item.menuCd + ' [vs] ' + list.menuCd)
              if (item.menuCd == list.menuCd) {
                check = false
              }
            })
            if (check) {
              //console.log('##item pusch : ' + item.menuCd)
              dataSource.push(item)
            }
          })
          //notify(this.$t('msg.search_success'), 'success', 500) // 성공 메시지
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          //console.log('##dataSource: ' + JSON.stringify(dataSource))
          this.menuTree.selectedRowKeys = [] // 체크 항목 초기화
          this.menuTreeData = [] // 초기화
          this.menuTreeData = dataSource // 그리드 데이터
          this.endLoading()
        })
    },
    // 권한메뉴조회
    btnAuthMenuSearch(param) {
      //console.log('###parma: ' + JSON.stringify(param.authgrpCd))
      if (!param.authgrpCd) {
        return
      }
      // 메뉴 그리드 생성
      this.openLoading('msg.searching')
      // api 호출
      getMenuAuthGroup(param)
        .then(res => {
          //console.log('###조회 :', res.list)
          res.list.forEach(item => {
            if (item.basicAclc == 'Y' && item.basicAclr == 'Y' && item.basicAclu == 'Y' && item.basicAcld == 'Y') {
              item.selectAll = 'Y'
            } else {
              item.selectAll = 'N'
            }
            item.id = item.menuCd
            //item.level = item.level * 1 // level 자료형 변경
          }) // id 값 추가
          notify(this.$t('msg.search_success'), 'success', 500) // 성공 메시지
          this.authMenuGrid.data = res.list
          this.authMenuGrid.firstData = _.cloneDeep(res.list) // 조회초기값 저장
          this.changeGridData = this.authMenuGrid.firstData
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.btnMenuSearch()
          this.endLoading()
        })
    },
    // 트리 드레그 이벤트
    treeMenu_DragStart(e) {
      // console.log('###tree DragStart : ' + e.itemData.id)
      // let visibleRows = e.component.getVisibleRows()
      // let sourceNode = e.component.getNodeByKey(e.itemData.id)
    },

    //드래그 놓을때
    treeMenu_DragEnd(e) {
      let validation = true
      let msg = ''

      //중복확인 로직 추가
      this.authMenuGrid.data.forEach(item => {
        //console.log('###item.id---> ' + item.menuCd)
        if (item.menuCd === e.itemData.menuCd) {
          validation = false
        }
      })

      //중복이나 예외상황에 리턴
      if (!validation) {
        console.log('<-- End ---> ')
        return
      }

      //드레그한 메뉴 데이터
      let sourceNode = e.component.getNodeByKey(e.itemData.id)
      //console.log('#### sourceNode : ' + JSON.stringify(sourceNode.data))

      //하단메뉴들 조회
      let param = {
        domainCd: this.userDomainCd,
        menuCd: e.itemData.menuCd
      }
      let authMenuGridData = this.authMenuGrid.data

      getLowerLevelMenu(param)
        .then(res => {
          res.list.forEach(item => {
            // console.log('## item : ' + JSON.stringify(item))
            let dragMenuRow = {
              domainCd: this.userDomainCd,
              authgrpCd: this.authGroupList.getSelectedRowsData()[0].authgrpCd,
              menuCd: item.menuCd,
              menuNm: item.menuNm,
              menuUrl: item.menuUrl,
              basicAclc: 'Y',
              basicAclr: 'Y',
              basicAclu: 'Y',
              basicAcld: 'Y',
              selectAll: 'Y'
            }
            //view 메뉴일 경우 newInputRow 에 저장
            if (item.isleaf == '1' || item.menuCd == 'MENU001') {
              let check = true
              //기존 데이터와 중복확인
              authMenuGridData.forEach(authItem => {
                if (authItem.menuCd == item.menuCd) {
                  check = false
                }
              })
              if (check) {
                this.$refs[this.authMenuGrid.properties.gridName].addRow(dragMenuRow)
              }
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {})

      //옮긴 row는 삭제 ==> 트리리스트로 변경예정
      let deleteRow = []
      deleteRow.push(sourceNode.data)
      this.DeleteCallBack(deleteRow, this.menuTree.properties.treeName)
    },

    DeleteCallBack(selectedRows, whichGrid) {
      var index1 = null

      selectedRows.forEach(key => {
        if (whichGrid === this.menuTree.properties.treeName) {
          index1 = this.menuTreeData.findIndex(obj => obj == key)
          if (index1 != -1) this.menuTreeData.splice(index1, 1)
        } else if (whichGrid === this.authMenuGrid.properties.gridName) {
          index1 = this.authMenuGrid.data.findIndex(obj => obj == key)
          this.authMenuGrid.data.splice(index1, 1)
        }
      })
    },

    // 실제 view 파일이 아닌 메뉴가 하위에 없으면 상위메뉴들 없애는 것
    treeMenu_CellPrepared(e) {
      if (e.rowType === 'data') {
        //console.log('*******treeMenu_CellPrepared : '+JSON.stringify(e.row.data) + ' / ' + e.row.node.children.length)
        if (e.row.node.children.length === 0 && e.row.data.isleaf === '0' && e.row.data.id != 'MENU001') {
          //console.log('<-----in------> '+JSON.stringify(e.data) + ' ' + this.menuTree.properties.treeName)
          this.DeleteCallBack([e.row.data], this.menuTree.properties.treeName)
        }
      }
    },

    // 조직형식 selectbox 데이터 호출
    getAuthTypeSelectBox() {
      let param = { domainCd: this.userDomainCd, codeCd: 'A002' }
      // 조직형식 Select Box 데이터 생성
      getChildCmCodeList(param).then(res => {
        this.authGroupGrid.properties.gridColinfos[2].lookup.datasource = res.list
        this.authGroupGrid.properties.gridColinfos[2].lookup.value = 'codeCd'
        this.authGroupGrid.properties.gridColinfos[2].lookup.display = 'codeNm'
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
    }
  }
}
</script>

<style lang="less" scoped>
/* css 혹은 less로 스타일 정의하는 부분 */
</style>
