<template>
  <div>
    <div class="d-flex-grid">
      <!-- Tree Title -->
      <div v-if="treeInfo.title" class="col-sm-6 text-white m-1">
        <i class="fas fa-info-circle mr-1"></i>
        {{ this.$t(treeInfo.title) }}
      </div>
      <!-- 추가버튼 -->
      <div v-if="treeInfo.addbtn">
        <button class="btn btn-xs" @click="onClick">
          <svg-icon icon-class="plus" />
        </button>
      </div>
    </div>
    <div>
      <!-- @cell-click="onCellClick" -->
      <DxTreeList
        id="treeContainer"
        :ref="this.treeRef"
        :style="`height: ${height}; width: ${width};`"
        :data-source="gridData"
        :root-value="rootValue"
        :show-borders="true"
        :hover-state-enabled="true"
        :allow-column-resizing="treeInfo.colresize"
        :allow-column-reordering="treeInfo.colreorder"
        :show-row-lines="true"
        :column-auto-width="treeInfo.columnAuto"
        :word-wrap-enabled="true"
        :focused-row-enabled="true"
        :expanded-row-keys="expandedRowKeys"
        :selected-row-keys="selectedRowKeys"
        :customize-columns="customizeColumns"
        :autoExpandAll="treeInfo.autoExpandAll"
        :focused-row-key="treeInfo.focusedRowKey"
        @focused-row-changing="onFocusedRowChanging"
        @focused-row-changed="onFocusedRowChanged"
        @focused-cell-changing="onFocusedCellChanging"
        @selection-changed="onSelectionChanged"
        @editor-preparing="onEditorPreparing"
        @editor-prepared="onEditorPrepared"
        @cell-prepared="onCellPrepared"
        @cell-click="onCellClick"
        @cell-dblClick="onCellDblClick"
        @row-click="onRowClick"
        @row-dbclick="onRowDblClick"
        @editing-start="logEvent('EditingStart')"
        @init-new-row="onInitNewRow"
        @row-inserting="onRowInserting"
        @row-inserted="onRowInserted"
        @row-updating="onRowUpdating"
        @row-updated="onRowUpdated"
        @row-removing="logEvent('RowRemoving')"
        @row-removed="logEvent('RowRemoved')"
        @key-down="onKeyDown"
        @cell-hover-changed="onCellHoverChanged"
        @row-validating="onRowValidating"
        key-expr="id"
        parent-id-expr="prntsCd"
      >
        <DxRowDragging
          :on-drag-change="onDragChange"
          :on-drag-start="onDragStart"
          :on-reorder="onReorder"
          :on-drag-end="onDragEnd"
          :data="treeInfo.treeName"
          :allow-drop-inside-item="treeInfo.allowDropInsideItem"
          :allow-reordering="treeInfo.allowReordering"
          :show-drag-icons="treeInfo.showDragIcons"
          :group="treeInfo.group"
        />
        <DxSelection
          :select-all-mode="treeInfo.seleectionAllMode"
          :allow-select-all="treeInfo.allowSelectAll"
          :mode="treeInfo.selectionMode"
        />

        <DxSorting :mode="treeInfo.sortingMode" />
        <!-- Sorting   none, single, multiple 생성 -->
        <DxFilterRow :visible="treeInfo.filterRow" />
        <DxFilterPanel :visible="treeInfo.filterPanel" />
        <DxHeaderFilter :visible="treeInfo.headerFilter" :allow-search="true" />
        <DxColumnChooser :enabled="treeInfo.colChooser" />
        <DxColumnFixing :enabled="treeInfo.colFixing" />

        <DxPaging :enabled="treeInfo.paging" :page-size="treeInfo.pagingSize" />
        <DxPager
          :show-page-size-selector="true"
          :allowed-page-sizes="treeInfo.pageSizes"
          :show-info="true"
        />

        <DxScrolling mode="treeInfo.scrollMode" />
        <!-- none, virtual, infinite (무한스크롤) 생성 -->
        <!-- <DxScrolling column-rendering-mode="virtual"/>  -->
        <!-- <DxLoadPanel :enabled="true"/>   차후 반영 검토  -->

        <DxEditing
          :allow-adding="treeInfo.adding"
          :allow-updating="treeInfo.editing"
          :select-text-on-edit-start="treeInfo.selectTextOnEditStart"
          :start-edit-action="treeInfo.startEditAction"
          :mode="treeInfo.editingMode"
          :allow-deleting="treeInfo.deleting"
        />
        <!-- mode="row" 'batch' | 'cell' | 'form' | 'popup' -->

        <!-- :caption = {{this.$i18n.t(item.headcaption)}} -->
        <DxColumn data-field="id" :visible="false" />

        <DxColumn
          v-for="(item, index) in treeInfo.treeColinfos"
          :key="index"
          :caption="getMenuTitle(item.headcaption)"
          :alignment="item.alignment"
          :data-field="item.field"
          :data-type="item.fieldtype"
          :format="item.format"
          :allowEditing="item.editing"
          :css-class="columnCssClass(item.key)"
          :editor-options="item.editoroptions"
          :width="item.width"
          :fixed="item.fixed == true ? true : false"
          :edit-cell-template="
            item.lookup != null && item.dropDownBox != null
              ? item.dropDownBox
              : item.dropDownBox == 'PostCdDropDownBox'
              ? 'PostCdDropDownBox'
              : item.checkbox == true
              ? 'checkBoxEditor'
              : item.button == true
              ? 'buttonEditPopup'
              : item.fieldtype == 'date'
              ? 'calendarEditor'
              : null
          "
          :visible="item.visible"
        >
          <DxEmailRule v-if="item.email" />

          <DxLookup
            v-if="item.lookup"
            :data-source="
              item.dropDownBox == 'EquCdDropDownBox'
                ? lookEquCdDataSource
                : item.dropDownBox == 'LocNoDropDownBox'
                ? locNoDataSource
                : item.dropDownBox == 'RoutOrdDropDownBox'
                ? RoutOrdDataSource
                : item.lookup.datasource
            "
            :value-expr="item.lookup.value"
            :display-expr="item.lookup.display"
          />

          <DxStringLengthRule
            v-if="item.max"
            :max="item.max"
            :message="`최대 ${item.max}자까지 입력하세요 `"
          />

          <DxRequiredRule v-if="item.required" />
        </DxColumn>

        <!-- checkbox -->
        <template #checkBoxEditor="{ data: cellInfo  }">
          <DxCheckBox
            :value="cellInfo.value == 'Y' ? true : false"
            :on-value-changed="value => onCheckValueChanged(value, cellInfo)"
          />
        </template>

        <!-- button -->
        <template #buttonEditPopup="{ data: cellInfo }">
          <GridButton :value="cellInfo.value" :cellInfo="cellInfo" @btnClick="btnClick" />
        </template>

        <!-- 거래처 DropDownBox-->
        <template #PartnerDropDownBox="{ data: cellInfo }">
          <PartnerDropDownComponent
            :value="cellInfo.value"
            :on-value-changed="value => onCellValueChanged(value, cellInfo, 'D')"
            :data-source="treeInfo.partnerDataSource"
            :read-only="readOnlyOption(cellInfo)"
          />
        </template>

        <!-- 우편번호 DropDownBox-->
        <!-- <template #PostCdDropDownBox="{ data: cellInfo }">
          <PostCdDropDownComponent
            :value="cellInfo.value"
            :on-value-changed="(value) => onPostCdValueChanged(value, cellInfo)"
            :read-only="readOnlyOption(cellInfo)"
          />
        </template>-->

        <!-- 조직 DropDownBox-->
        <template #OrgnDropDownBox="{ data: cellInfo }">
          <OrgnDropDownComponent
            :value="cellInfo.value"
            :on-value-changed="value => onCellValueChanged(value, cellInfo, 'D')"
            :data-source="treeInfo.orgnDataSource"
            :read-only="readOnlyOption(cellInfo)"
          />
        </template>

        <!-- 사번 DropDownBox-->
        <template #EmpDropDownBox="{ data: cellInfo }">
          <EmpDropDownComponent
            :value="cellInfo.value"
            :on-value-changed="value => onCellValueChanged(value, cellInfo, 'D')"
            :data-source="treeInfo.empDataSource"
            :read-only="readOnlyOption(cellInfo)"
          />
        </template>

        <!-- 품목그룹 DropDownBox-->
        <template #ItemGrpDropDownBox="{ data: cellInfo }">
          <itemGrpDropDownComponent
            :value="cellInfo.value"
            :on-value-changed="value => onCellValueChanged(value, cellInfo, 'D')"
            :data-source="treeInfo.itemGrpDataSource"
            :read-only="readOnlyOption(cellInfo)"
          />
        </template>

        <!-- 공정 DropDownBox-->
        <template #OprNoDropDownBox="{ data: cellInfo }">
          <OprNoDropDownComponent
            :value="cellInfo.value"
            :on-value-changed="value => onCellValueChanged(value, cellInfo, 'D')"
            :data-source="treeInfo.oprNoDataSource"
            :read-only="readOnlyOption(cellInfo)"
          />
        </template>

        <!-- 저장위치 DropDownBox-->
        <template #LocNoDropDownBox="{ data: cellInfo }">
          <LocNoDropDownComponent
            :value="cellInfo.value"
            :on-value-changed="value => onCellValueChanged(value, cellInfo, 'D')"
            :data-source="locNoDataSource"
            :read-only="readOnlyOption(cellInfo)"
            :plnt-id="plnt_id"
          />
        </template>

        <!-- 설비코드 DropDownBox-->
        <template #EquCdDropDownBox="{ data: cellInfo }">
          <EquCdDropDownComponent
            :value="cellInfo.value"
            :on-value-changed="value => onCellValueChanged(value, cellInfo, 'D')"
            :data-source="lookEquCdDataSource"
            :read-only="readOnlyOption(cellInfo)"
            :plnt-id="plnt_id"
          />
        </template>

        <!-- 공정순서 DropDownBox-->
        <template #RoutOrdDropDownBox="{ data: cellInfo }">
          <RoutOrdDropDownComponent
            :value="cellInfo.value"
            :on-value-changed="value => onCellValueChanged(value, cellInfo, 'D')"
            :data-source="treeInfo.RoutOrdDataSource"
            :read-only="readOnlyOption(cellInfo)"
            :plnt-id="plnt_id"
            :item-cd="itemCd"
          />
        </template>

        <!-- 품목코드 DropDownBox-->
        <template #ItemCdDropDownBox="{ data: cellInfo }">
          <ItemCdDropDownComponent
            :value="cellInfo.value"
            :on-value-changed="value => onItemValueChanged(value, cellInfo)"
            :data-source="treeInfo.ItemCdDataSource"
            :read-only="readOnlyOption(cellInfo)"
            :itemInfoList="itemInfoList(cellInfo)"
            :plnt-id="plnt_id"
          />
        </template>

        <template #dropDownBoxEditor="{ data: cellInfo }">
          <DropDownBoxComponent
            :value="cellInfo.value"
            :on-value-changed="cellInfo.setValue"
            :data-source="treeInfo.dropDataSource"
            :read-only="readOnlyOption(cellInfo)"
          />
        </template>

        <template #tagBoxEditor="{ data: cellInfo }">
          <TagBoxComponent
            :value="cellInfo.value"
            :on-value-changed="value => onValueChanged(value, cellInfo)"
            :dataSource="treeInfo.dropDataSource"
            :data-grid-component="cellInfo.component"
          />
        </template>
      </DxTreeList>
    </div>
  </div>
</template>

<script>
import {
  DxTreeList,
  DxColumn,
  DxColumnChooser,
  DxFilterPanel,
  DxColumnFixing,
  DxPaging,
  DxPager,
  DxScrolling,
  DxLoadPanel,
  DxSorting,
  DxHeaderFilter,
  DxEditing,
  DxFilterRow,
  DxLookup,
  DxSelection,
  DxSearchPanel,
  DxRequiredRule,
  DxRowDragging,
  DxEmailRule
} from 'devextreme-vue/tree-list'
//import TagBoxComponent from './TagBoxComponent.vue';
import EventBus from '@/components/event-bus'
import { DxStringLengthRule } from 'devextreme-vue/validator'
import DxCheckBox from 'devextreme-vue/check-box'
import {
  ItemGrpDropDownComponent,
  PartnerDropDownComponent,
  OrgnDropDownComponent,
  EmpDropDownComponent,
  DropDownBoxComponent,
  TagBoxComponent,
  OprNoDropDownComponent,
  LocNoDropDownComponent,
  EquCdDropDownComponent,
  RoutOrdDropDownComponent,
  ItemCdDropDownComponent
} from '@/components/DevExtreme/grid/component'
import GridButton from './component/GridButton.vue'
import { getDateFormat } from '@/utils/common'

const valueChangedHandler = function(e) {
  const previousValue = e.previousValue
  const newValue = e.value
}

export default {
  name: 'dxTreeList',
  data() {
    return {
      routeName: this.$route.name,
      treeRef: this.$route.name + '_' + this.treeInfo.treeName,
      focusedRowKey: 1,
      gridData: []
    }
  },
  components: {
    DxTreeList,
    DxColumn,
    DxColumnChooser,
    DxFilterPanel,
    DxColumnFixing,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxScrolling,
    DxLoadPanel,
    DxSorting,
    DxHeaderFilter,
    DxLookup,
    DxCheckBox,
    DxEditing,
    DxSelection,
    DxSearchPanel,
    DxRequiredRule,
    DxEmailRule,
    DxStringLengthRule,
    TagBoxComponent,
    DropDownBoxComponent,
    GridButton,
    DxRowDragging,
    PartnerDropDownComponent,
    OrgnDropDownComponent,
    EmpDropDownComponent,
    ItemGrpDropDownComponent,
    OprNoDropDownComponent,
    LocNoDropDownComponent,
    EquCdDropDownComponent,
    RoutOrdDropDownComponent,
    ItemCdDropDownComponent
  },
  props: {
    treeInfo: {
      type: Object
    },
    selectedRowKeys: {
      type: Array,
      default: () => []
    },
    expandedRowKeys: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    rootValue: {
      type: String,
      default: '0'
    },
    height: {
      type: String,
      default: function() {
        return window.innerHeight / 1.5 + 30 + 'px'
      }
    },
    width: {
      type: String,
      default: '100%'
    },
    plntId: {
      type: String,
      default: () => {
        return ''
      }
    },
    itemCd: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  watch: {
    dataSource: {
      deep: true,
      handler() {
        this.gridData = this.dataSource
      }
    }
  },
  computed: {
    treeList: function() {
      return this.$refs[this.treeRef].instance
    },
    lookEquCdDataSource: function() {
      if (this.plntId > '') {
        return this.treeInfo.equCdDataSource.filter(element => element.plntId == this.plntId)
      } else {
        return this.treeInfo.equCdDataSource
      }
    },
    locNoDataSource: function() {
      if (this.plntId > '') {
        return this.treeInfo.locNoDataSource.filter(element => element.plntId == this.plntId)
      } else {
        return this.treeInfo.locNoDataSource
      }
    },
    RoutOrdDataSource: function() {
      if (this.plntId > '') {
        return this.treeInfo.RoutOrdDataSource.filter(element => element.itemCd == this.itemCd)
      } else {
        return this.treeInfo.RoutOrdDataSource
      }
    },
    plnt_id: function() {
      return this.plntId
    }
  },
  methods: {
    init() {
      this.treeList.clearSelection()
    },
    getMenuTitle(id) {
      return this.$t(id)
    },
    customizeColumns(columns) {
      //columns[0].width = 300;
    },

    onEditorPreparing(e) {
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_EditorPreparing', e)
      // if (e.parentType == 'dataRow') {

      //   var valueChanged = this.onCellValueChanged
      //   e.editorOptions.onValueChanged = args => {

      //     if (e.index > 0) valueChanged(args.value, e, 'L')

      //   }
      // }
    },
    onEditorPrepared(e) {},
    onCellPrepared(e) {
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_CellPrepared', e)
    },
    onFocusedRowChanging(e) {
      if (this.treeInfo.selectionMode == 'single') {
        if (e.prevRowIndex > 0) this.treeList.selectRows(e.rows[e.prevRowIndex].key, false)
        this.treeList.selectRows(e.rows[e.newRowIndex].key, false)
      }
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_FocusedRowChanging', e)
    },
    onFocusedRowChanged: function(e) {
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_FocusedRowChanged', e)
    },
    onFocusedCellChanging: function(e) {
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_FocusedCellChanging', e)
    },
    onSelectionChanged(e) {
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_SelectionChanged', e)
    },
    onCellClick(e) {
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_CellClick', e)
    },
    onCellDblClick(e) {
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_CellDblClick', e)
    },
    onRowClick(e) {
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_RowClick', e)
    },
    onRowDblClick(e) {
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_RowDblClick', e)
    },
    onRowInserting(e) {},
    onRowInserted(e) {},
    onInitNewRow(e) {},
    onRowUpdating(e) {},
    onRowUpdated(e) {
      e.data.__modified__ = true
      this.treeList.selectRows(e.key, true)
      this.treeList.saveEditData()
    },
    onKeyDown(e) {},
    onCellHoverChanged(e) {},
    onRowValidating(e) {},
    addRow(newRow) {
      if (newRow.id == null) newRow.id = this.dataSource.length + 1

      Object.defineProperty(newRow, '__created__', { value: true, writable: true, enumerable: true, configurable: true })

      this.dataSource.splice(0, 0, newRow)
    },
    logEvent(eventName) {},
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value)
      cellInfo.component.updateDimensions()
    },
    onClick(e) {
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_Add', e)
    },
    columnCssClass(key) {
      if (key) return 'grd-key'
    },

    ///////////////////////////////////////
    /*          Drag    Event            */
    ///////////////////////////////////////

    //부모 노드가 하위 노드로 들어가는것을 방지
    onDragChange(e) {
      if (e.fromComponent.NAME === 'dxDataGrid') {
        return
      }
      let visibleRows = e.component.getVisibleRows(),
        sourceNode = e.component.getNodeByKey(e.itemData.id),
        targetNode = visibleRows[e.toIndex].node
      while (targetNode && targetNode.data) {
        if (targetNode.data.id === sourceNode.data.id || targetNode.data.__created__) {
          e.cancel = true
          break
        }
        targetNode = targetNode.parent
      }

      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_DragChange', e)
    },
    onDragStart(e) {
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_DragStart', e)
    },
    onDragEnd(e) {
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_DragEnd', e)
    },
    onReorder(e) {
      let visibleRows = e.component.getVisibleRows(),
        sourceData = e.itemData,
        targetData = visibleRows[e.toIndex].data

      // 드래그된 Row가 Select된 상태로 되는것
      let getSelectedRowIds = []
      this.treeList.getSelectedRowsData().forEach(element => {
        getSelectedRowIds.push(element.id)
      })

      getSelectedRowIds.push(sourceData.id)

      e.component.selectRows(getSelectedRowIds)

      //selectedRowKeys
      if (e.dropInsideItem) {
        e.itemData.prntsCd = targetData.id
        e.component.refresh()
      } else {
        let sourceIndex = this.dataSource.indexOf(sourceData),
          targetIndex = this.dataSource.indexOf(targetData)

        if (sourceData.prntsCd !== targetData.prntsCd) {
          sourceData.prntsCd = targetData.prntsCd
          if (e.toIndex > e.fromIndex) {
            targetIndex++
          }
        }

        this.dataSource.splice(sourceIndex, 1)
        this.dataSource.splice(targetIndex, 0, sourceData)
      }
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_Reorder', e)
    },
    ///////////////////////////////////////
    /*          template Event           */
    ///////////////////////////////////////
    onCheckValueChanged(value, cellInfo) {
      cellInfo.setValue(cellInfo.value === 'Y' ? 'N' : 'Y')
      cellInfo.component.updateDimensions()
    },

    onCalendarValueChanged(value, cellInfo) {
      cellInfo.setValue(value)
      cellInfo.component.updateDimensions()
      this.treeList.saveEditData()
    },
    btnClick(e) {
      //EventBus.$emit(this.$route.name +"_"+ this.gridInfo.gridName + "_btnClick", e)
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_btnClick', e)
    },
    onPostCdValueChanged(value, cellInfo) {
      cellInfo.setValue(value.zonecode)
      cellInfo.component.updateDimensions()
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_getPostAddress', { rowId: cellInfo.rowIndex, address: value.address })
      this.treeList.saveEditData()
      //this.$emit('postComplete',  cellInfo.rowIndex, value.address);
    },
    onCellValueChanged(value, cellInfo, div) {
      cellInfo.setValue(value)
      cellInfo.component.updateDimensions()
      let cellValue = value
      let cellDataField = ''

      if (div == 'L') {
        cellDataField = cellInfo.dataField
      } else if (div == 'D') {
        cellDataField = cellInfo.column.dataField
      }
      let e = { value: cellValue, dataField: cellDataField, cellInfo: cellInfo }
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_CellValueChanged', e)
      this.treeList.saveEditData()
    },
    onItemValueChanged(value, cellInfo) {
      cellInfo.setValue(value.selectedRowKeys[0])
      cellInfo.component.updateDimensions()
      let rowData = value.selectedRowsData[0]
      let e = {
        rowId: cellInfo.rowIndex,
        clntId: rowData.clntId,
        compId: rowData.compId,
        plntId: rowData.plntId,
        plntNm: rowData.plntNm,
        itemCd: rowData.itemCd,
        bpCd: rowData.bpCd,
        salePrc: rowData.salePrc,
        purPrc: rowData.purPrc,
        oprPrc: rowData.oprPrc,
        itemFullNm: rowData.itemFullNm,
        itemNm: rowData.itemNm,
        itemDiv: rowData.itemDiv,
        qltyCd: rowData.qltyCd,
        spec: rowData.spec,
        stockYn: rowData.stockYn,
        unitWt: rowData.unitWt,
        unitOfWt: rowData.unitOfWt,
        basicUnit: rowData.basicUnit,
        dwNo: rowData.dwNo,
        useYn: rowData.useYn,
        itemGrpCd: rowData.itemGrpCd,
        aplyFndt: rowData.aplyFndt,
        aplyStdt: rowData.aplyStdt
      }
      EventBus.$emit(this.routeName + '_' + this.treeInfo.treeName + '_getItemInfoList', e)
      this.treeList.saveEditData()
    },
    getCellDate(value) {
      return getDateFormat(value)
    },
    readOnlyOption(cellInfo) {
      if (typeof cellInfo.column.editorOptions === 'undefined' || typeof cellInfo.column.editorOptions.key === 'undefined') return false
      return cellInfo.column.editorOptions.key == true
        ? cellInfo.row.data.__created__ == null || cellInfo.row.data.__created__ == true
          ? false
          : true
        : false
    },
    itemInfoList(cellInfo) {
      if (typeof cellInfo.column.editorOptions === 'undefined' || typeof cellInfo.column.editorOptions.itemInfoList === 'undefined') return false
      return cellInfo.column.editorOptions.itemInfoList == true ? true : false
    }
  },
  destroyed() {
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_EditorPreparing')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_CellPrepared')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_FocusedRowChanging')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_FocusedRowChanged')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_FocusedCellChanging')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_SelectionChanged')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_CellClick')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_CellDblClick')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_RowClick')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_RowDblClick')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_Add')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_DragChange')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_DragStart')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_DragEnd')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_Reorder')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_btnClick')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_getPostAddress')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_getItemInfoList')
    EventBus.$off(this.routeName + '_' + this.treeInfo.treeName + '_CellValueChanged')
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles/themeB/variables.scss';

#treeContainer {
  //height: 440px;
  word-wrap: break-word;
  //border: 1px solid red;

  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.176) !important;
  }
  td[role='columnheader'] {
    text-align: center !important ;
    color: $grid-header-color;
    background-color: $grid-header-bg;
    font-size: 14px; //
  }
  //Fixed Row background-color
  .dx-col-fixed {
    //background-color: #F8F8F8
  }

  .dx-command-select {
    width: 30px !important;
    min-width: 30px !important;
  }

  .dx-header-row .grd-key {
    color: $yellow !important;
  }

  .dx-data-row .grd-key {
    // color: green !important;
  }
}
</style>
