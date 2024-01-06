export default function getData(param) {
  return {
    authGridProperties: {
      gridName: 'authGrid',
      selectionMode: 'multiple', //selection_mode : selection mode (single, multiple)
      selectionCheckbox: 'none', //selection_checkbox : selection checkbox (none, onClick, onLongTap, always)
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
      headerFilter: true, // 헤더 필터링
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

      //Grid Col Info
      pageSizes: [5, 10, 20, 30], //Grid Row size
      gridColinfos: [
        //authgrpCd
        {
          headcaption: 'authgrpManage.authgrp_cd',
          field: 'authgrpCd',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '30%',
          editing: false,
          required: false,
          fixed: false,
          visible: true
        },
        //authgrpNm
        {
          headcaption: 'authgrpManage.authgrp_nm',
          field: 'authgrpNm',
          fieldtype: 'string',
          alignment: 'center',
          width: '30%',
          editoroptions: { format: '' },
          required: false,
          editing: false,
          fixed: false
        },
        //authgrpTypeNm
        {
          headcaption: 'authgrpManage.type_nm',
          field: 'authgrpTypeNm',
          fieldtype: 'string',
          alignment: 'center',
          width: '20%',
          editoroptions: { format: '' },
          required: false,
          editing: false,
          fixed: false
        },
        //useYn
        {
          headcaption: 'authgrpManage.use_yn',
          field: 'useYn',
          fieldtype: 'string',
          alignment: 'center',
          width: '20%',
          max: 1,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          checkbox: true
        }
      ]
    },
    userGridProperties: {
      gridName: 'userGrid',
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
      headerFilter: true, // 헤더 필터링
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
      focusKey: '0',

      //Grid Col Info
      pageSizes: [5, 10, 20, 30], //Grid Row size
      gridColinfos: [
        // authgrpAsgCls
        {
          headcaption: 'label.division',
          field: 'authgrpAsgCls',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '15%',
          editing: false,
          required: false,
          fixed: false,
          visible: true
        },
        // userId
        {
          headcaption: 'label.codeId',
          field: 'userId',
          fieldtype: 'string',
          alignment: 'center',
          width: '20%',
          editoroptions: { format: '' },
          required: false,
          editing: false,
          fixed: false
        },
        // userNm
        {
          headcaption: 'userManage.userNm',
          field: 'userNm',
          fieldtype: 'string',
          alignment: 'center',
          width: '25%',
          editoroptions: { format: '' },
          required: false,
          editing: false,
          fixed: false
        },
        // insertDt
        {
          headcaption: 'label.insert_dt',
          field: 'insertDt',
          fieldtype: 'string',
          alignment: 'center',
          width: '20%',
          editoroptions: { format: '' },
          required: false,
          editing: false,
          fixed: false
        },
        // insertId
        {
          headcaption: 'label.insert_id',
          field: 'insertId',
          fieldtype: 'string',
          alignment: 'center',
          width: '20%',
          max: 1,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          checkbox: true
        }
      ]
    }
  }
}
