export default function getData(param) {
  let columDataList = [
    //domainCd
    {
      headcaption: 'label.domain_cd',
      field: 'domainCd',
      fieldtype: 'string',
      format: '',
      alignment: 'left',
      width: '100px',
      max: 100,
      editing: false,
      required: false,
      fixed: false,
      visible: true
    },
    //domainNm
    {
      headcaption: 'label.domain_nm',
      field: 'domainNm',
      fieldtype: 'string',
      alignment: 'center',
      width: '120px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //domainStatusCd
    // {
    //   headcaption: 'label.status',
    //   field: 'domainStatusCd',
    //   fieldtype: 'string',
    //   alignment: 'center',
    //   width: '70px',
    //   editoroptions: { format: '' },
    //   required: false,
    //   editing: false,
    //   fixed: false
    // },
    //domainStatusNm
    {
      headcaption: 'label.status',
      field: 'domainStatusNm',
      fieldtype: 'string',
      alignment: 'center',
      width: '80px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //serviceStartDt
    {
      headcaption: 'label.joined_period_start',
      field: 'serviceStartDt',
      fieldtype: 'string',
      alignment: 'center',
      width: '120px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    //serviceEndDt
    {
      headcaption: 'label.joined_period_end',
      field: 'serviceEndDt',
      fieldtype: 'string',
      alignment: 'center',
      width: '120px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    //companyNm
    {
      headcaption: 'label.company_nm',
      field: 'companyNm',
      fieldtype: 'string',
      alignment: 'center',
      width: '160px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //corrorateRegNo
    {
      headcaption: 'label.corrorate_reg_no',
      field: 'corrorateRegNo',
      fieldtype: 'string',
      alignment: 'center',
      width: '150px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //postCode
    {
      headcaption: 'label.postCode',
      field: 'postCode',
      fieldtype: 'string',
      alignment: 'center',
      width: '80px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //AddressFull
    {
      headcaption: 'label.address',
      field: 'addressFull',
      fieldtype: 'string',
      alignment: 'left',
      width: '500px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //companyAddress
    {
      headcaption: 'label.address',
      field: 'address',
      fieldtype: 'string',
      alignment: 'left',
      width: '300px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false,
      visible: false
    },
    //addressDetail
    {
      headcaption: 'label.addressDetail',
      field: 'addressDetail',
      fieldtype: 'string',
      alignment: 'left',
      width: '150px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false,
      visible: false
    },
    //addressRef
    {
      headcaption: 'label.addressRef',
      field: 'addressRef',
      fieldtype: 'string',
      alignment: 'left',
      width: '150px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false,
      visible: false
    },
    // owner
    {
      headcaption: 'label.owner_nm',
      field: 'ownerNm',
      fieldtype: 'string',
      alignment: 'center',
      width: '80px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //phone
    {
      headcaption: 'label.phone',
      field: 'phone',
      fieldtype: 'string',
      alignment: 'center',
      width: '140px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //fax
    {
      headcaption: 'label.fax',
      field: 'fax',
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
      headcaption: 'label.email',
      field: 'email',
      fieldtype: 'string',
      alignment: 'center',
      width: '200px',
      editoroptions: { format: '' },
      required: false,
      editing: false,
      fixed: false
    },
    //note
    {
      headcaption: 'label.memo',
      field: 'note',
      fieldtype: 'string',
      alignment: 'left',
      width: '300px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false
    },
    //insertDt
    {
      headcaption: 'label.insert_dt',
      field: 'insertDt',
      fieldtype: 'string',
      alignment: 'center',
      width: '170px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false
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
      fixed: false
    },
    //updateDt
    {
      headcaption: 'label.update_dt',
      field: 'updateDt',
      fieldtype: 'string',
      alignment: 'center',
      width: '170px',
      max: 1,
      editoroptions: { format: '' },
      required: false,
      fixed: false
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
      fixed: false
    }
  ]
  let columData = []
  columData = columDataList
  return {
    domainGridProperties: {
      gridName: 'domainGrid',
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
