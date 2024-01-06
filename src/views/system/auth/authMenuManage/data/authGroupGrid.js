export default function getData(param) {
  let columDataList = [
    //authgrp_cd
    {
      headcaption: 'authgrpManage.authgrp_cd',
      field: 'authgrpCd',
      fieldtype: 'string',
      format: '', 
      alignment: 'center',
      width: '200px',
      max: 100,
      editing: false,
      required: false,
      fixed: false,
      visible: true
    },
    //authgrp_nm
    {
      headcaption: 'authgrpManage.authgrp_nm',
      field: 'authgrpNm',
      fieldtype: 'string',
      alignment: 'center',
      width: '300px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //authgrp_type
    {
      headcaption: 'authgrpManage.type',
      field: 'authgrpType',
      fieldtype: 'string',
      alignment: 'center',
      width: '150px',
      lookup: {
        datasource: [],
        value: '',
        display: ''
      },
      editoroptions: { format: '' },
      required: false,
      editing: true,
      fixed: false
    },
  ]
  let columData = []
  columData = columDataList
  return {
    gridProperties: {
      gridName: 'authGroupGrid',
      selectionMode: 'single', //selection_mode : selection mode (single, multiple)
      selectionCheckbox: 'none', //selection_checkbox : selection checkbox (none, onClick, onLongTap, always)
      seleectionAllMode: 'page', //seleectionAll_mode : selection page ( page, allPages)
      colresize: true, //colresize : column resize
      colreorder: true, //colreorder : column reorder
      editing: false, //editing
      deleting: false, //deleting
      editingMode: 'cell', //editing_mode : row, batch, cell, form, popup
      sortingMode: 'single', //sortingMode : none, single, multiple
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

