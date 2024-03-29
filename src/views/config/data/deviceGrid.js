export default function getData(param) {
  let columDataList = [
    {
      headcaption: 'no',
      field: 'no',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '100',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: true,
      visible: true,
      displayRowNumber: true
    },
    // {
    //   headcaption: 'label.grid_device_id',
    //   field: 'deviceId',
    //   fieldtype: 'string',
    //   format: '',
    //   alignment: 'center',
    //   width: '170',
    //   max: 50,
    //   editoroptions: { format: '' },
    //   required: false,
    //   fixed: false,
    //   sortOrder: 'asc'
    // },
    {
      headcaption: 'label.grid_device_unique_id',
      field: 'deviceUniqueId',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '210',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: true,
      sortOrder: 'asc' //by lyj
    },
    {
      headcaption: 'label.devGroup',
      field: 'groupingStr',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '200',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      visible: false,
      groupindex: 0
    },
    {
      headcaption: 'label.grid_device_name',
      field: 'deviceNm',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '160',
      max: 5,
      editoroptions: { format: '' },
      required: false,
      fixed: true
    },
    {
      headcaption: 'label.grid_device_grp',
      field: 'deviceGrpId',
      fieldtype: 'Integer',
      format: '',
      alignment: 'center',
      width: '150',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.grid_device_type',
      field: 'deviceType',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '150',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.grid_device_timeout',
      field: 'deviceTimeout',
      fieldtype: 'number',
      format: '',
      alignment: 'center',
      width: '150',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.topic',
      field: 'topic',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '140',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.subscribe',
      field: 'subscribeVisible',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '110',
      max: 20,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      button: true
    },
    {
      headcaption: 'userManage.note',
      field: 'description',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '230',
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
      width: '120',
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
      width: '120',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.sub_use_yn',
      field: 'subUseYN',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '130',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: true,
      editing: false
    },
    {
      headcaption: 'label.api_use_yn',
      field: 'apiUseYN',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '150',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: true,
      editing: false
    },
    {
      headcaption: 'label.dash_use_yn',
      field: 'dashUseYN',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '130',
      max: 50,
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
      gridName: 'deviceGrid',
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
      buttonText: '구독',
      icon: '',

      //Grid Page여부 및 Page Size (조회 Row 수)
      paging: true,
      pagingSize: 11,
      scrollMode: 'none', //none, virtual, infinite (무한스크롤) 생성
      addbtn: false, //Grid 추가버튼

      //Grid Col Info
      //pageSizes: [5, 10, 20],
      gridColinfos: columData
    }
  }
}
