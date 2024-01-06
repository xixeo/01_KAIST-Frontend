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
      headcaption: 'label.disp_gubn',
      field: 'dispGubn',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '140',
      max: 5,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.disp_gubn_code',
      field: 'dispGubnCode',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '155',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.display_col',
      field: 'displayCol',
      fieldtype: 'integer',
      format: '',
      alignment: 'center',
      width: '160',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.display_col_nm',
      field: 'displayColNm',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '160',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.fieldtype',
      field: 'fieldtype',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '130',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.format',
      field: 'format',
      fieldtype: 'number',
      format: '',
      alignment: 'center',
      width: '140',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.alignment',
      field: 'alignment',
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
      headcaption: 'label.width',
      field: 'width',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '135',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.max',
      field: 'max',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '130',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    // {
    //   headcaption: 'label.required',
    //   field: 'required',
    //   fieldtype: 'boolean',
    //   format: '',
    //   alignment: 'center',
    //   width: '140',
    //   max: 50,
    //   editoroptions: { format: '' },
    //   required: false,
    //   fixed: false,
    //   checkbox: true,
    //   editing: false
    // },
    {
      headcaption: 'label.fixed',
      field: 'fixed',
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
      headcaption: 'label.display_order',
      field: 'displayOrder',
      fieldtype: 'number',
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
      field: 'discription',
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
      width: '130',
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
      width: '130',
      max: 50,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    {
      headcaption: 'label.use_yn',
      field: 'useYN',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '125',
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
      gridName: 'deviceDispGrid',
      chkBoxReadOnly:true,
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
      pagingSize: 11,
      scrollMode: 'none', //none, virtual, infinite (무한스크롤) 생성
      addbtn: false, //Grid 추가버튼

      //Grid Col Info
      pageSizes: [5, 10, 20],
      gridColinfos: columData,
      useNo: true
    }
  }
}
