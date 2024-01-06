<template>
  <!-- HTML 정의하는 부분 -->
  <div>
    <!--테마 선택-->
    <div class="dx-fieldset">
      <div class="dx-field">
        <!-- <themeSelect :id="'devExtreme'" /> -->
      </div>
    </div>
    <div class="layout-wrapper">
      <div class="container-fluid">
        <!-- 타이틀 및 button -->
        <layoutTitle
          buttonKind="dxButton"
          :useButtonList="buttonUseList"
          @btnAdd="btnAdd()"
          @btnSearch="btnSearch()"
          @btnSave="btnSave()"
          @btnDelete="btnDelete()"
        />
      </div>
      <!-- 조회조건 -->
      <div class="editor-card-theme">
        <!-- editorsLayout 컴포넌트 사용 -->
        <editorsLayout ref="domain" :layoutData="editorData" @onValueChanged="onValueChanged" @onBtnClick="onBtnClick"></editorsLayout>
      </div>
      <div class="pt-2">
        <!-- 그리드 영역 -->
        <el-row :gutter="10">
          <el-col :lg="12" :xl="12">
            <!-- Data 그리드 영역 -->
            <devDataGrid
              height="calc(100vh - 442px)"
              :gridInfo="sampleDataGrid.properties"
              :dataSource="sampleDataGrid.data"
              :ref="sampleDataGrid.properties.gridName"
            ></devDataGrid>
          </el-col>
          <el-col :lg="12" :xl="12">
            <!-- Tree 그리드 영역 -->
            <dxTreeList
              :ref="sampleTreeGrid.mainNm"
              height="calc(100vh - 470px)"
              :treeInfo="sampleTreeGrid.properties"
              :dataSource="sampleTreeGrid.data"
              :expandedRowKeys="sampleTreeGrid.expandedRowKeys"
            />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
import { devDataGrid } from '@/components/DevExtreme/grid' // 그리드 컴포넌트
import { dxTreeList } from '@/components/DevExtreme/grid' // 트리 그리드 컴포넌트
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import layoutTitle from '@/components/layoutTitle' // Title & Button 컴포넌트
import getEditorOptions from './data/editorOptions' // 에디터 옵션 데이터
import getsampleGrid from './data/sampleGrid' // 그리드 옵션 데이터
import { getGridData, getTreeGridData } from '@/api/template/gridTemplate' // api 호출
import themeSelect from '@/components/themeSelect' // 테마 셀렉터
export default {
  name: 'GridTemplate',
  components: {
    themeSelect,
    layoutTitle,
    dxTreeList,
    editorsLayout,
    devDataGrid
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      buttonUseList: {
        group: null,
        options: {
          type: 'default',
          searchModeOption: 'containted',
          content: '',
          icon: '',
          style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'btnSearch' }, { id: 'btnAdd' }, { id: 'btnDelete' }]
      },
      editorData: getEditorOptions().editorData, // editor list 정보
      // 그리드 정보
      sampleDataGrid: {
        properties: [],
        data: []
      },
      // 트리 그리드 정보
      sampleTreeGrid: {
        treeMainRef: this.$route.name + '_' + 'treeMain',
        properties: [], //TreeList Main Column 정보
        data: [], //TreeList Main Data
        expandedRowKeys: [] // 처음 조회시 펼쳐질 ID
      }
    }
  },
  created() {
    this.initGrid()
  },
  beforeMount() {
    this.sampleDataGrid.properties = getsampleGrid().dataGridProperties // dataGrid Column 정보
    this.sampleTreeGrid.properties = getsampleGrid().treeGridProperties // TreeGrid Column 정보
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    initGrid() {
      this.btnSearch()
    },
    btnAdd() {
      //
    },
    btnSearch() {
      // dataGrid data
      getGridData().then(res => {
        this.sampleDataGrid.data = res
      })
      // treeGrid data
      getTreeGridData().then(res => {
        res.forEach(item => {
          item.id = item.menuCd
        })
        this.sampleTreeGrid.data = res
      })
    },
    btnSave() {
      //
    },
    btnDelete() {
      //
    },
    changInput(...arg) {
      //arg[0] : id //arg[1] : function parameters
      console.log('changInput', arg)
    },
    onValueChanged(...arg) {
      console.log('onValueChanged', arg)
    },
    onKeyDown(...arg) {
      console.log('onKeyDown', arg)
    },
    onKeyUp(...arg) {
      console.log('onKeyUp', arg)
    },
    onKeyPress(...arg) {
      console.log('onKeyPress', arg)
    },
    onEnterKey(...arg) {
      console.log('onEnterKey', arg)
    },
    onBtnClick(...arg) {
      console.log('onBtnClick', arg)
    }
  }
}
</script>
