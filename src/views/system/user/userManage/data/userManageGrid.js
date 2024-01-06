export default function getData(param) {
  let columDataList = [
    //domain_cd (감춤)
    {
      headcaption: 'label.domain_cd',
      field: 'domainCd',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '90px',
      max: 100,
      editing: false,
      required: false,
      fixed: false,
      visible: false
    },
    //domain_nm
    {
      headcaption: 'label.domain_nm',
      field: 'domainNm',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '110px',
      max: 100,
      editing: false,
      required: false,
      fixed: false,
      visible: true
    },
    //userId
    {
      headcaption: 'userManage.userId',
      field: 'userId',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '150px',
      max: 100,
      editing: false,
      required: false,
      fixed: false,
      visible: true
    },
    //asgnCd(감춤)
    {
      headcaption: 'userManage.asgnCd',
      field: 'asgnCd',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '100px',
      max: 100,
      editing: false,
      required: false,
      fixed: false,
      visible: false
    },
    //asgnNm
    {
      headcaption: 'userManage.asgnNm',
      field: 'asgnNm',
      fieldtype: 'string',
      format: '',
      alignment: 'center',
      width: '100px',
      max: 100,
      editing: false,
      required: false,
      fixed: false,
      visible: true
    },
    //userNm
    {
      headcaption: 'userManage.userNm',
      field: 'userNm',
      fieldtype: 'string',
      alignment: 'center',
      width: '150px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //userNmEn
    {
      headcaption: 'userManage.userNmEn',
      field: 'userNmEn',
      fieldtype: 'string',
      alignment: 'center',
      width: '80px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: false
    },
    //nickNm
    {
      headcaption: 'userManage.nickNm',
      field: 'nickNm',
      fieldtype: 'string',
      alignment: 'center',
      width: '120px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: false
    },
    //userType
    {
      headcaption: 'userManage.userType',
      field: 'userType',
      fieldtype: 'string',
      alignment: 'center',
      width: '120px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: false,
      visible:false
    },
    //userType
    {
      headcaption: 'userManage.userType',
      field: 'userTypeNm',
      fieldtype: 'string',
      alignment: 'center',
      width: '120px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: false,
      visible:true
    },
    //offiTel
    {
      headcaption: 'userManage.offiTel',
      field: 'offiTel',
      fieldtype: 'string',
      alignment: 'center',
      width: '160px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //email
    {
      headcaption: 'userManage.email',
      field: 'email',
      fieldtype: 'string',
      alignment: 'center',
      width: '200px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //사용유무
    {
      headcaption: 'label.menu_use_yn',
      field: 'useYn',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '90',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      visible:true,
      checkbox: true
    },
    //note(비고)
    {
      headcaption: 'userManage.note',
      field: 'note',
      fieldtype: 'string',
      alignment: 'center',
      width: '110px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: false
    },
    //updateDt
    {
      headcaption: 'label.update_dt',
      field: 'updateDt',
      fieldtype: 'string',
      alignment: 'center',
      width: '110px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: false
    },
    //updateId
    {
      headcaption: 'label.update_id',
      field: 'updateId',
      fieldtype: 'string',
      alignment: 'center',
      width: '110px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: false
    },
    //insertDt
    {
      headcaption: 'label.insert_dt',
      field: 'insertDt',
      fieldtype: 'string',
      alignment: 'center',
      width: '110px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: false
    },
    //insertId
    {
      headcaption: 'label.insert_id',
      field: 'insertId',
      fieldtype: 'string',
      alignment: 'center',
      width: '110px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: false
    }
  ]
  let columData = []
  columData = columDataList
  return {
    userManageGridProperties: {
      gridName: 'userManageGrid',
      chkBoxReadOnly:true,
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
      searchPanel: true, //searchPanel
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
