export default function getData(param) {
  let columDataList = [
    //user_id
    {
      headcaption: 'userManage.userId',
      field: 'userId',
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
      headcaption: 'userManage.userNm',
      field: 'userNm',
      fieldtype: 'string',
      alignment: 'center',
      width: '300px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    }
  ]
  let columData = []
  columData = columDataList
  return {
    gridProperties: {
      gridName: 'authUserGrid',
      selectionMode: 'single', //selection_mode : selection mode (single, multiple)
      selectionCheckbox: 'none', //selection_checkbox : selection checkbox (none, onClick, onLongTap, always)
      seleectionAllMode: 'page', //seleectionAll_mode : selection page ( page, allPages)
      colresize: true, //colresize : column resize
      colreorder: true, //colreorder : column reorder
      editing: false, //editing
      deleting: false, //deleting
      editingMode: 'row', //editing_mode : row, batch, cell, form, popup
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
      editing: false,
      focusKey: '1',

      //Grid Col Info
      pageSizes: [5, 10, 20, 30], //Grid Row size
      gridColinfos: columData
    }
  }
}

