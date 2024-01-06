export default function getData(param) {
  let columDataList = [
    {
      headcaption: 'label.no',
      field: 'no',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '100',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      visible: true,
      displayRowNumber: true
    },
    {
      headcaption: 'label.grp_cd',
      field: 'deviceGrpId',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '150',
      max: 5,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.grp_nm',
      field: 'deviceGrpNm',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '170',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.devCnt',
      field: 'devCnt',
      fieldtype: 'Integer',
      format: '',
      alignment: 'center',
      width: '140',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'userManage.note',
      field: 'description',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '*',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.insert_dt',
      field: 'insertDt',
      fieldtype: 'date',
      format: 'yyyy-MM-dd HH:mm:ss',
      alignment: 'center',
      width: '180',
      max: 10,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.insert_id',
      field: 'insertId',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '115',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.update_dt',
      field: 'updateDt',
      fieldtype: 'date',
      format: 'yyyy-MM-dd HH:mm:ss',
      alignment: 'center',
      width: '180',
      max: 5,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.update_id',
      field: 'updateId',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '115',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.dash_use_yn',
      field: 'dashUseYN',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '130',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: true,
      disabled: true
    },
    {
      headcaption: 'label.grp_sub_use_yn',
      field: 'useYN',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '140',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: true,
      editing: false
    }
  ]
  let columData = []
  columData = columDataList
  return {
    gridProperties: {
      gridName: 'deviceGrpGrid',
      chkBoxReadOnly: true,
      selectionMode: 'multiple', //selection_mode : single, multiple      Default : none
      selectionCheckbox: 'always', //selection_checkbox : none, onClick, onLongTap, always       Default : onClick
      seleectionAllMode: 'page', //selectionAll_mode : selection page ( page, allPages)  allPages : 페이지경우 모든 페이지 다 선택됨  Default: allPages
      colresize: true, //colresize : column resize     Default : false
      colreorder: true, //colreorder : column reorder    Default : false
      editing: false, //editing
      editingMode: 'cell', //editing_mode : row, batch, cell, form, popup     Default : row
      sortingMode: 'multiple', //sortingMode : none, single, multiple   Default : single
      selectTextOnEditStart: true, //selectTextOnEditStart
      startEditAction: 'click', //startEditAction : click, dblClick
      filterRow: false, //filterRow
      filterPanel: false, //filterPanel
      headerFilter: true, //headerFilter
      colChooser: false, //ColumnChooser
      colFixing: false, //Fixing
      columnAuto: true, //columnAuto

      //Grid Page여부 및 Page Size (조회 Row 수)
      paging: true,
      pagingSize: 12,
      scrollMode: 'none', //none, virtual, infinite (무한스크롤) 생성
      addbtn: false, //Grid 추가버튼

      //Grid Col Info
      pageSizes: [5, 10, 20],
      gridColinfos: columData,
      useNo: true
    }
  }
}
