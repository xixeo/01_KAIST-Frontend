<template>
  <div>
    <div class="d-flex-grid">
      <!-- Grid Title -->
      <div v-if="gridInfo.title" class="col-sm-6 text-white m-1">
        <i class="fas fa-info-circle mr-1"></i>
        {{ gridInfo.title }}
      </div>
    </div>
    <div>
      <DxDataGrid
        id="gridContainer"
        :ref="this.gridRef"
        :style="`height: ${height}; width: ${width};`"
        :dataSource="dataSource"
        dateSerializationFormat="yyyy-MM-dd"
        :show-borders="false"
        :hover-state-enabled="true"
        :allow-column-resizing="gridInfo.colresize"
        :allow-column-reordering="gridInfo.colreorder"
        :show-row-lines="true"
        :column-auto-width="gridInfo.columnAuto"
        :word-wrap-enabled="true"
        :focused-row-enabled="true"
        :selectedRowKeys="selectedItemKeys"
        :customize-columns="customizeColumns"
        :focused-row-key="gridInfo.focusedRowKey"
        @exporting="onExporting"
        @context-menu-preparing="addContextMenuItems"
        @focused-row-changing="onFocusedRowChanging"
        @focused-row-changed="onFocusedRowChanged"
        @focused-cell-changing="onFocusedCellChanging"
        @selection-changed="onSelectionChanged"
        @editor-preparing="onEditorPreparing"
        @editor-prepared="onEditorPrepared"
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
      >
        <DxRowDragging
          :on-drag-change="onDragChange"
          :on-drag-start="onDragStart"
          :on-reorder="onReorder"
          :on-drag-end="onDragEnd"
          :data="gridInfo.gridName"
          :allow-reordering="gridInfo.allowReordering"
          :show-drag-icons="gridInfo.showDragIcons"
          :group="gridInfo.group"
        />

        <DxSelection
          :select-all-mode="gridInfo.seleectionAllMode"
          :show-check-boxes-mode="gridInfo.selectionCheckbox"
          :mode="gridInfo.selectionMode"
        />

        <DxSorting :mode="gridInfo.sortingMode" />
        <!-- Sorting   none, single, multiple 생성 -->
        <DxFilterRow :visible="gridInfo.filterRow" />
        <DxFilterPanel :visible="gridInfo.filterPanel" />

        <DxPaging :enabled="gridInfo.paging" :page-size="gridInfo.pagingSize" />
        <!-- 2021-10-12 by lyj 사용하지 않음 -->
        <DxPager :show-page-size-selector="false" :allowed-page-sizes="gridInfo.pageSizes" :show-info="true" />

        <DxHeaderFilter :visible="gridInfo.headerFilter" :allow-search="true" />
        <DxScrolling mode="gridInfo.scrollMode" />
        <!-- none, virtual, infinite (무한스크롤) 생성 -->
        <!-- <DxScrolling column-rendering-mode="virtual"/>  -->
        <!-- <DxLoadPanel :enabled="true"/>   차후 반영 검토  -->

        <DxEditing
          :allow-adding="gridInfo.adding"
          :allow-updating="gridInfo.editing"
          :select-text-on-edit-start="gridInfo.selectTextOnEditStart"
          :start-edit-action="gridInfo.startEditAction"
          :mode="gridInfo.editingMode"
          :allow-deleting="gridInfo.deleting"
        />
        <!-- mode="row" 'batch' | 'cell' | 'form' | 'popup' -->

        <!-- <DxColumn data-field="no" :visible="gridInfo.useNo" :width="70" /> -->
        <!-- 2021-10-05 by lyj, group-index,sort-order 속성 추가 처리 -->
        <DxColumn
          v-for="(item, index) in gridColinfos"
          :key="index"
          :caption="getMenuTitle(item.headcaption)"
          :alignment="item.alignment"
          :data-field="item.field"
          :group-index="item.groupindex"
          :data-type="item.fieldtype"
          :format="item.format"
          :allowEditing="item.editing"
          :css-class="columnCssClass(item.key)"
          :sort-order="item.sortOrder"
          :editor-options="item.editoroptions"
          :width="item.width"
          :fixed="item.fixed == true ? true : false"
          :visible="item.visible"
          :cell-template="item.button == true ? 'buttonEditPopup' : item.displayRowNumber == true ? 'DisplayRowNumberOfGrid' : null"
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
        >
          <DxLookup v-if="item.lookup" :data-source="item.lookup.datasource" :value-expr="item.lookup.value" :display-expr="item.lookup.display" />

          <!-- none, virtual, infinite (무한스크롤) 생성 -->
          <DxStringLengthRule v-if="item.max" :max="item.max" :message="`최대 ${item.max}자까지 입력하세요 `" />
        </DxColumn>

        <DxSummary v-if="gridInfo.summary">
          <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
          <DxGroupItem
            v-for="(item, index) in gridInfo.summary"
            :key="index + 'a'"
            v-if="item.group"
            :column="item.field"
            :alignment="item.alignment"
            :summary-type="item.type"
            :valueFormat="item.format"
            :show-in-column="item.field"
            :display-format="item.display"
            :show-in-group-footer="item.footer"
          />

          <DxTotalItem
            v-for="(item, index) in gridInfo.summary"
            :key="index + 'b'"
            v-else
            :column="item.field"
            name="SelectSummary"
            :alignment="item.alignment"
            :summary-type="item.type"
            :valueFormat="item.format"
            :show-in-column="item.field"
            :display-format="item.display"
          />
        </DxSummary>

        <DxGroupPanel :visible="gridInfo.groupPanel" />
        <DxSearchPanel :visible="gridInfo.searchPanel" :highlight-case-sensitive="true" />

        <!-- checkbox -->
        <template #checkBoxEditor="{ data: cellInfo  }">
          <DxCheckBox
            :value="cellInfo.value == 'Y' || cellInfo.value == true ? true : false"
            :on-value-changed="value => onCheckValueChanged(value, cellInfo)"
            :readOnly="chkBoxReadOnly"
          />
        </template>

        <!-- 2021-10-01 BY LYJ -->
        <!-- button -->
        <template #buttonEditPopup="{ data: cellInfo }">
          <GridButton :value="cellInfo.value" :cellInfo="cellInfo" :buttonText="'view'" @btnClick="btnClick(cellInfo)" />
        </template>
        <!-- 2021-10-01 BY LYJ -->
        <!-- display row number -->
        <template #DisplayRowNumberOfGrid="{ data: cellInfo }">
          <div>{{ cellInfo.rowIndex + 1 }}</div>
        </template>

        <!--셀 스타일 템플릿-->
        <template #grid-cell="{ data: cellInfo }">
          <div>{{ cellInfo.value }}</div>
        </template>
      </DxDataGrid>
    </div>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxExport,
  DxLookup,
  DxSelection,
  DxRowDragging,
  DxSorting,
  DxFilterRow,
  DxFilterPanel,
  DxRequiredRule,
  DxStringLengthRule,
  DxPaging,
  DxPager,
  DxSearchPanel,
  DxScrolling,
  DxGroupPanel,
  DxEditing,
  DxHeaderFilter,
  DxSummary,
  DxGroupItem,
  DxTotalItem
} from 'devextreme-vue/data-grid'
import { exportDataGrid } from 'devextreme/excel_exporter'
import ExcelJS from 'exceljs'
import saveAs from 'file-saver'
import EventBus from '@/components/event-bus'
import DxCheckBox from 'devextreme-vue/check-box'
import GridButton from './component/GridButton.vue' //2021-10-01 BY LYJ
//import comp from '@/views/system/commonCodeManage/Index'

export default {
  name: 'devDataGridExt',
  // mixins: [ResizeMixin],
  data() {
    return {
      routeName: this.$route.name,
      // gridRef : this.$route.name+'_'+this.gridInfo.gridName,
      gridRef: this.routeName + '_' + this.gridInfo.gridName,
      selectedItemKeys: [],
      chkBoxReadOnly: this.gridInfo.chkBoxReadOnly,
      columnFormats: []
    }
  },
  components: {
    DxCheckBox,
    GridButton,
    DxDataGrid,
    DxColumn,
    DxExport,
    DxLookup,
    DxSelection,
    DxSorting,
    DxFilterRow,
    DxFilterPanel,
    DxRowDragging,
    DxStringLengthRule,
    DxRequiredRule,
    DxPaging,
    DxPager,
    DxSearchPanel,
    DxScrolling,
    DxGroupPanel,
    DxEditing,
    DxHeaderFilter,
    DxSummary,
    DxGroupItem,
    DxTotalItem
  },
  props: {
    gridInfo: {
      type: Object
    },
    gridColinfos: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
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
    }
  },
  computed: {
    dataGrid: function() {
      console.log('dataGrid: ', this.gridRef)
      return this.$refs[this.gridRef].instance
    },
    columnsInfo: function() {
      return this.columnFormats
    }
  },
  mounted() {
    this.setKeyindex()
  },
  methods: {
    init() {
      this.dataGrid.clearSelection()
    },
    ResetColumns(olditems, newitems) {
      //this.$refs[this.gridRef].refresh()
      //this.dataGrid.option('dataSource', [])
      this.$refs[this.gridRef].dataSource = []
      //this.dataSource = []
      try {
        console.log('----------------------------------------------------')
        //var inst = this.$refs[this.gridRef].instance
        this.$refs[this.gridRef].instance.getDataSource()._items = []
        var totalColCount = this.$refs[this.gridRef].instance.getVisibleColumns().length // inst.columnCount()

        this.$refs[this.gridRef].instance.beginUpdate()
        // // console.log('column clear count:' + totalColCount)
        // for (var cIdx = 0; cIdx < totalColCount; cIdx++) {
        //   console.log(
        //     'delete : ' +
        //       cIdx +
        //       '/' +
        //       this.$refs[this.gridRef].instance.getVisibleColumns().length +
        //       this.$refs[this.gridRef].instance.getVisibleColumns()[cIdx].dataField
        //   )
        //   var key = this.$refs[this.gridRef].instance.getVisibleColumns()[cIdx].dataField
        //   console.log('delete key : ' + key)
        //   this.$refs[this.gridRef].instance.deleteColumn(key)
        // }

        this.$refs[this.gridRef].instance.getVisibleColumns().forEach(el => {
          this.$refs[this.gridRef].instance.deleteColumn(el.dataField)
          console.log('delete key : ' + el.dataField)
        })
        // inst.endUpdate()

        // olditems.forEach(element => {
        //   console.log('delete : ' + element.field)
        //   this.$refs[this.gridRef].instance.deleteColumn(element.field)
        // })

        // inst.getVisibleColumns().forEach(element => {
        //   console.log('delete : ' + element)
        //   inst.deleteColumn(element.name)
        // })

        console.log('column add count: ' + newitems.length)
        console.log(newitems)
        newitems.forEach(element => {
          console.log('add : ' + element.headcaption)
          this.$refs[this.gridRef].instance.addColumn({
            name: element.id,
            caption: element.headcaption,
            dataField: element.field,
            allowEditing: false,
            dataType: element.fieldtype,
            width: element.width,
            format: element.format,
            alignment: element.alignment,
            visible: element.visible,
            visibleIndex: element.visibleIndex
            //cellTemplate=item.button == true ? 'buttonEditPopup' : null
          })
        })
        this.$refs[this.gridRef].instance.endUpdate()
        console.log(this.$refs[this.gridRef].instance.columnCount())
        this.$emit('searchData', null)
        this.$refs[this.gridRef].instance.refresh()
        //this.$refs[this.gridRef].instance.refresh()
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    setKeyindex() {
      // let i = 0
      // console.log('test111' + JSON.stringify(this.dataSource) )
      // this.dataSource.forEach(item => {
      //   item.id = i
      //   i++
      // })
    },
    getMenuTitle(id) {
      return this.$t(id)
    },
    onExporting(context, title) {
      //this.dataGrid
      //console.log('@@@@Exporting data --> ' + context)

      const workbook = new ExcelJS.Workbook()
      const sheet1 = workbook.addWorksheet('sheet1')

      // sheet1.getRow(2).getCell(2).value = 'Price';
      // sheet1.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };

      exportDataGrid({
        worksheet: sheet1,
        component: context,
        topLeftCell: { row: 2, column: 2 }
        // customizeCell: ({ gridCell, excelCell }) => {
        //   setAlternatingRowsBackground(gridCell, excelCell);
        // }
      }).then(() => {
        workbook.xlsx.writeBuffer().then(buffer => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), title)
        })
      })
    },
    customizeColumns(columns) {
      // columns[0].width = 300;
    },
    onCellPrepared(cellInfo) {
      if (cellInfo.rowType == 'data') {
        cellInfo.cellElement.addClass('mergecells')
        //color cell on selection
        cellInfo.cellElement.click(function() {
          $('.mergecellselected').removeClass('mergecellselected')
          $(this).addClass('mergecellselected')
        })
        if (cellInfo.rowIndex > 0 && cellInfo.column.command != 'edit') {
          if (cellInfo.component.cellValue(cellInfo.rowIndex - 1, cellInfo.column.dataField) == cellInfo.value) {
            if (cellInfo.component.cellValue(cellInfo.rowIndex - 1, cellInfo.column.dataField)) {
              var prev = mergelements[cellInfo.rowIndex - 1][cellInfo.column.dataField]
              if (!mergelements[cellInfo.rowIndex]) mergelements[cellInfo.rowIndex] = {}
              mergelements[cellInfo.rowIndex][cellInfo.column.dataField] = prev
              if (prev) {
                cellInfo.cellElement.css('display', 'none')
                var span = prev.attr('rowspan')
                if (span) prev.attr('rowspan', Number(span) + 1)
                else prev.attr('rowspan', 2)
              }
            } else {
              if (!mergelements[cellInfo.rowIndex]) mergelements[cellInfo.rowIndex] = {}
              mergelements[cellInfo.rowIndex][cellInfo.column.dataField] = cellInfo.cellElement
            }
          } else {
            if (!mergelements[cellInfo.rowIndex]) mergelements[cellInfo.rowIndex] = {}
            mergelements[cellInfo.rowIndex][cellInfo.column.dataField] = cellInfo.cellElement
          }
        } else {
          if (!mergelements[cellInfo.rowIndex]) mergelements[cellInfo.rowIndex] = {}
          mergelements[cellInfo.rowIndex][cellInfo.column.dataField] = cellInfo.cellElement
        }
      }
    },

    addContextMenuItems(e) {
      if (e.rowIndex < 0) return
      if (e.row.rowType === 'data') {
        /*
        // var dataGrid = this.$refs[this.dataGridRefName].instance;
        // var dataGrid = this.$refs[this.gridInfo.gridName].instance;
        // var dataGrid = this.$refs[this.gridRef].instance;
        var columnFixing = this.dataGrid.option('columnFixing.enabled')
        var filterRow = this.dataGrid.option('filterRow.visible')
        var excelnm = this.$t(this.gridInfo.title) + '.xlsx'
        this.dataGrid.beginUpdate()

        e.items = [
          {
            icon: 'fas fa-file-excel',
            disabled: false,
            text: this.$t('COM0012'),
            onItemClick() {
              const workbook = new ExcelJS.Workbook()
              // const worksheet = workbook.addWorksheet('Employees');
              const worksheet = workbook.addWorksheet()
              exportDataGrid({ component: e.component, worksheet: worksheet, autoFilterEnabled: true, keepColumnWidths: true }).then(function() {
                workbook.xlsx.writeBuffer().then(function(buffer) {
                  // saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');});
                  saveAs(new Blob([buffer], { type: 'application/octet-stream' }), excelnm)
                })
              })
            }
          },
          // { disabled:true, beginGroup: true },
          {
            icon: 'fas fa-key',
            disabled: columnFixing,
            beginGroup: true,
            text: this.$t('COM0016'),
            onItemClick() {
              this.dataGrid.option('columnFixing.enabled', true)
            }
          },
          {
            icon: '',
            disabled: !columnFixing,
            text: this.$t('COM0015'),
            onItemClick() {
              this.dataGrid.option('columnFixing.enabled', false)
            }
          },
          {
            icon: 'fas fa-filter',
            disabled: filterRow,
            beginGroup: true,
            text: this.$t('COM0019'),
            onItemClick() {
              this.dataGrid.option('filterRow.visible', true)
            }
          },
          {
            icon: '',
            disabled: !filterRow,
            text: this.$t('COM0020'),
            onItemClick() {
              this.dataGrid.option('filterRow.visible', false)
              this.dataGrid.clearFilter()
            }
          }
        ]
        this.dataGrid.endUpdate()
        */
      }
    },
    onEditorPreparing(e) {
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_EditorPreparing', e)
    },
    onEditorPrepared(e) {
      //  e.editorOptions.onFocusOut = function(args) {
      //   // this.dataGrid.selectRows(e.row.key, true)
      //   // e.row.editRow()
      // }
    },
    onFocusedRowChanging(e) {
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_FocusedRowChanging', e)
    },
    onFocusedRowChanged: function(e) {
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_FocusedRowChanged', e)
    },
    onFocusedCellChanging: function(e) {
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_FocusedCellChanging', e)
    },
    onSelectionChanged(e) {
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_SelectionChanged', e)
    },
    onCellClick(e) {
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_CellClick', e)
    },
    onCellDblClick(e) {
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_CellDblClick', e)
    },
    onRowClick(e) {
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_RowClick', e)
    },
    onRowDblClick(e) {
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_RowDblClick', e)
    },
    onRowInserting(e) {
      // e.data.__created__ = true
    },
    onRowInserted(e) {},
    onInitNewRow(e) {},
    onRowUpdating(e) {},
    onRowUpdated(e) {
      e.data.__modified__ = true
      this.dataGrid.selectRows(e.key, true)
      this.dataGrid.saveEditData()
    },
    onKeyDown(e) {},
    onCellHoverChanged(e) {},
    onRowValidating(e) {},
    addRow(newRow) {
      newRow.id = this.dataGrid.totalCount() + 1
      newRow.__created__ = true
      this.dataSource.splice(0, 0, newRow)
    },
    logEvent(eventName) {},

    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value)
      cellInfo.component.updateDimensions()
    },

    onCheckValueChanged(value, cellInfo) {
      let colNm = cellInfo.column.dataField
      //cellInfo.setValue(cellInfo.value === 'Y' ? 'N' : 'Y')
      cellInfo.value = cellInfo.value === 'Y' || cellInfo.value === true ? 'N' : 'Y'
      cellInfo.data.__modified__ = true
      cellInfo.data[colNm] = cellInfo.value
      cellInfo.component.updateDimensions()

      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_onCheckValueChanged', {
        rowId: cellInfo.rowIndex,
        value: cellInfo.value,
        data: cellInfo.data,
        column: cellInfo.column.dataField
      })
    },

    onCalendarValueChanged(value, cellInfo) {
      cellInfo.setValue(value)
      cellInfo.component.updateDimensions()
      this.dataGrid.saveEditData()
    },

    onPostCdValueChanged(value, cellInfo) {
      cellInfo.setValue(value.zonecode)
      cellInfo.component.updateDimensions()
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_getPostAddress', { rowId: cellInfo.rowIndex, address: value.address })
      this.dataGrid.saveEditData()
    },

    onContentReady(e) {
      e.component.option('loadPanel.enabled', false)
    },
    cellTemplate(container, options) {
      var noBreakSpace = '\u00A0'
      var text = (options.value || [])
        .map(element => {
          return options.column.lookup.calculateCellValue(element)
        })
        .join(', ')

      container.textContent = text || noBreakSpace
      container.title = text
    },
    onClick(e) {
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_Add', e)
    },
    btnClick(e) {
      console.log('devDtaaGridExt.vue => ' + this.routeName + '_' + this.gridInfo.gridName + '_btnClick')
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_btnClick', e)
      this.$emit('viewClick', e)
    },

    onDragChange(e) {
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_DragChange', e)
    },
    onDragStart(e) {
      // e.cancel = true
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_DragStart', e)
    },
    onReorder(e) {
      const visibleRows = e.component.getVisibleRows()
      const toIndex = this.dataSource.indexOf(visibleRows[e.toIndex].data)
      const fromIndex = this.dataSource.indexOf(e.itemData)

      this.dataSource.splice(fromIndex, 1)
      this.dataSource.splice(toIndex, 0, e.itemData)
    },
    onDragEnd(e) {
      EventBus.$emit(this.routeName + '_' + this.gridInfo.gridName + '_DragEnd', e)
    },
    columnCssClass(key) {
      if (key) return 'grd-key'
    }
  },
  destroyed() {
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_EditorPreparing')
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_FocusedRowChanging')
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_FocusedRowChanged')
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_FocusedCellChanging')
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_SelectionChanged')
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_CellClick')
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_CellDblClick')
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_RowClick')
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_RowDblClick')
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_Add')
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_btnClick')
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_getPostAddress')
    EventBus.$off(this.routeName + '_' + this.gridInfo.gridName + '_onCheckValueChanged')
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles/themeB/variables.scss';

#gridContainer {
  //height: 440px;
  word-wrap: break-word;
  //border: 1px solid red;

  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.176) !important;
  }
  .dx-datagrid-headers {
    // background-color: $grid-header-bg;
    // color : $grid-header-color;
    // border: 1px solid #dee2e6 !important;
  }
  //2021-09-30 by lyj grid style 수정
  td[role='columnheader'] {
    text-align: center !important ;
    vertical-align: middle;
    color: #e1eaf3;
    background-color: rgba(255, 255, 255, 0.05);
    font-size: 14px; //
    font-weight: bold;
    border-width: 0;
    margin: 10px;
  }

  //Fixed Row background-color
  .dx-col-fixed {
    //background-color: #F8F8F8
  }

  // row hover color
  .dx-datagrid-table
    .dx-data-row.dx-state-hover:not(.dx-selection):not(.dx-row-inserted):not(.dx-row-removed):not(.dx-edit-row)
    > td:not(.dx-focused) {
    //background-color: red;
  }
  //focused row color
  .dx-row-focused.dx-data-row:not(.dx-edit-row) > td:not(.dx-focused) {
    //background-color: red;
  }

  //row height
  .dx-datagrid .dx-row > td {
    //padding: 5px
  }

  .dx-datagrid-rowsview .dx-texteditor-input {
    min-height: 23px;
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

  .file {
    height: 16px;
    width: 16px;
    background-image: url('/src/assets/images/file_clip.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center bottom;
    margin-right: 8px;
  }
}
</style>
