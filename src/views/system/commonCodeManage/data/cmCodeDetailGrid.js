export default function getData(param) {
  let columDataList = [
    //prntsCd
    {
      headcaption: 'label.prnts_cd',
      field: 'prntsCd',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '150px',
      max: 100,
      editing: false,
      required: false,
      fixed: false,
      visible: false
    },
    //codeCd
    {
      headcaption: 'label.child_cmcode_cd',
      field: 'codeCd',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '150px',
      max: 100,
      editing: true,
      required: false,
      fixed: false,
      visible: true
    },
    //codeNm
    {
      headcaption: 'label.child_cmcode_nm',
      field: 'codeNm',
      fieldtype: 'string',
      alignment: 'center',
      width: '150px',
      editoroptions: { format: '' },
      required: false,
      editing: true,
      fixed: false
    },
    //sort
    {
      headcaption: 'label.sort',
      field: 'sort',
      fieldtype: 'string',
      alignment: 'center',
      width: '70px',
      editoroptions: { format: '' },
      required: false,
      editing: true,
      fixed: false
    },
    //data1
    {
      headcaption: 'label.data1',
      field: 'data1',
      fieldtype: 'string',
      alignment: 'left',
      width: '153px',
      editoroptions: { format: '' },
      required: false,
      editing: true,
      fixed: false
    },
    //data2
    {
      headcaption: 'label.data2',
      field: 'data2',
      fieldtype: 'string',
      alignment: 'left',
      width: '153px',
      editoroptions: { format: '' },
      required: false,
      editing: true,
      fixed: false
    },
    //data3
    {
      headcaption: 'label.data3',
      field: 'data3',
      fieldtype: 'string',
      alignment: 'left',
      width: '153px',
      editoroptions: { format: '' },
      required: false,
      editing: true,
      fixed: false
    },
    //data4
    {
      headcaption: 'label.data4',
      field: 'data4',
      fieldtype: 'string',
      alignment: 'left',
      width: '153px',
      editoroptions: { format: '' },
      required: false,
      editing: true,
      fixed: false
    },
    //data5
    {
      headcaption: 'label.data5',
      field: 'data5',
      fieldtype: 'string',
      alignment: 'left',
      width: '153px',
      editoroptions: { format: '' },
      required: false,
      editing: true,
      fixed: false
    },
    //insertDt
    {
      headcaption: 'label.insert_dt',
      field: 'insertDt',
      fieldtype: 'string',
      alignment: 'center',
      width: '170px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //insertId
    {
      headcaption: 'label.insert_id',
      field: 'insertId',
      fieldtype: 'string',
      alignment: 'center',
      width: '110px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //updateDt
    {
      headcaption: 'label.update_dt',
      field: 'updateDt',
      fieldtype: 'string',
      alignment: 'center',
      width: '170px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //updateId
    {
      headcaption: 'label.update_id',
      field: 'updateId',
      fieldtype: 'string',
      alignment: 'center',
      width: '110px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    }
  ]
  let columData = []
  columData = columDataList
  return {
    cmCodeDetailGridProperties: {
      gridName: 'cmCodeDetailGrid',
      selectionMode: 'multiple', //selection_mode : selection mode (single, multiple)
      selectionCheckbox: 'always', //selection_checkbox : selection checkbox (none, onClick, onLongTap, always)
      seleectionAllMode: 'page', //seleectionAll_mode : selection page ( page, allPages)
      colresize: true, //colresize : column resize
      colreorder: true, //colreorder : column reorder
      editing: true, //editing
      deleting: false, //deleting
      editingMode: 'cell', //editing_mode : row, batch, cell, form, popup
      sortingMode: 'multiple', //sortingMode : none, single, multiple
      selectTextOnEditStart: true, //selectTextOnEditStart
      startEditAction: 'click', //startEditAction : click, dblClick
      filterRow: false, //filterRow
      filterPanel: false, //filterPanel
      headerFilter: false, // 헤더 필터링
      colChooser: false, //ColumnChooser
      colFixing: false, //Fixing
      columnAuto: true, //columnAuto
      groupPanel: false, //groupPanel
      searchPanel: false, //searchPanel
      //Grid Page여부 및 Page Size (조회 Row 수)
      paging: true,
      pagingSize: 30,
      scrollMode: 'none', //none, virtual, infinite (무한스크롤) 생성
      addbtn: false, //Grid 추가버튼
      focusKey: '1',

      //Grid Col Info
      pageSizes: [5, 10, 20, 30], //Grid Row size
      gridColinfos: columData
    }
  }
}

