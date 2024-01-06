export default function getData(param) {
  let columDataList = [
    //domain_cd
    {
      field: 'domainCd',
      format: '',
      visible: false
    },
    //menu_cd
    {
      field: 'menuCd',
      format: '',
      visible: false
    },
    //계정
    {
      headcaption: 'label.userId',
      field: 'userId',
      fieldtype: 'string',
      format: '', 
      alignment: 'center',
      width: '230px',
      max: 100,
      editing: false,
      required: false,
      fixed: false,
      visible: false
    },
    //menu_nm
    {
      headcaption: 'label.menu_nm',
      field: 'menuNm',
      fieldtype: 'string',
      format: '', 
      alignment: 'center',
      width: '230px',
      max: 100,
      editing: false,
      required: false,
      fixed: false,
      visible: true
    },
    //순서
    {
      field: 'sort',
      format: '',
      visible: false
    },
    //LEVEL
    {
      field: 'level',
      format: '',
      visible: false
    },
    //부모 메뉴
    {
      field: 'prntsCd',
      format: '',
      visible: false
    },
    //menu_url
    {
      headcaption: 'label.menu_url',
      field: 'menuUrl',
      fieldtype: 'string',
      alignment: 'center',
      width: '200px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //all
    {
      headcaption: 'label.all',
      field: 'selectAll',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '90',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: true
    },
    //create
    {
      headcaption: 'label.create',
      field: 'basicAclc',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '90',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: true
    },
    //read
    {
      headcaption: 'label.read',
      field: 'basicAclr',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '90',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: true
    },
    //update
    {
      headcaption: 'label.update',
      field: 'basicAclu',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '90',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: true
    },
    //delete
    {
      headcaption: 'label.delete',
      field: 'basicAcld',
      fieldtype: 'boolean',
      format: '',
      alignment: 'center',
      width: '90',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false,
      checkbox: true
    },
    //메뉴 정보
    {
      field: 'note',
      format: '',
      visible: false
    },
    //아이콘
    {
      field: 'icon',
      format: '',
      visible: false
    },
  ]
  let columData = []
  columData = columDataList
  return {
    gridProperties: {
      gridName: 'authMenuGrid',
      chkBoxReadOnly: false,
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
      editing: false,
      focusKey: '1',

      //Grid Col Info
      pageSizes: [5, 10, 20, 30], //Grid Row size
      gridColinfos: columData
    }
  }
}

