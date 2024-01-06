export default function getData() {
  return {
    deviceLastDataGridProperties: {
      gridName: 'deviceLastDataGrid',
      title: 'Device 최근 수신 현황',
      selectionMode: 'none', //selection_mode : single, multiple      Default : none
      selectionCheckbox: 'none', //selection_checkbox : none, onClick, onLongTap, always       Default : onClick
      seleectionAllMode: 'page', //selectionAll_mode : selection page ( page, allPages)  allPages : 페이지경우 모든 페이지 다 선택됨  Default: allPages
      colresize: true, //colresize : column resize     Default : false
      colreorder: true, //colreorder : column reorder    Default : false
      editing: false, //editing
      editingMode: 'cell', //editing_mode : row, batch, cell, form, popup     Default : row
      sortingMode: 'none', //sortingMode : none, single, multiple   Default : single
      selectTextOnEditStart: true, //selectTextOnEditStart
      startEditAction: 'click', //startEditAction : click, dblClick
      filterRow: false, //filterRow
      filterPanel: false, //filterPanel
      headerFilter: false, //headerFilter
      colChooser: false, //ColumnChooser
      colFixing: false, //Fixing
      columnAuto: true, //columnAuto
      //Grid Page여부 및 Page Size (조회 Row 수)
      paging: false,
      pagingSize: 30,
      scrollMode: 'virtual', //none, virtual, infinite (무한스크롤) 생성
      addbtn: false, //Grid 추가버튼,
      height: 'calc(100vh - 180px)', //window.innerHeight / 1.5 + 110 + 'px',
      width: 'auto',
      //Grid Col Info
      //pageSizes: 10,
      //Grid Col Info
      //pageSizes: [5, 10, 20, 30], //Grid Row size
      gridColinfos: [
        // {
        //   headcaption: 'label.devID', //system id
        //   field: 'device_id',
        //   fieldtype: 'string',
        //   format: '',
        //   alignment: 'center',
        //   width: '110',
        //   max: 50,
        //   editoroptions: { format: '' },
        //   required: false,
        //   fixed: false,
        //   visible: true
        // },
        {
          headcaption: 'label.devUniqueID', //device id
          field: 'device_unique_id',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '150',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          visible: true
        },
        {
          headcaption: 'label.devNM',
          field: 'device_nm',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '*',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          visible: true
        },
        {
          headcaption: 'label.devGroup',
          field: 'device_groupstr',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '*',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          visible: false,
          groupindex: 0
        },
        // {
        //   headcaption: 'label.devGroupNM',
        //   field: 'device_grp_nm',
        //   fieldtype: 'string',
        //   format: '',
        //   alignment: 'center',
        //   width: '*',
        //   max: 50,
        //   editoroptions: { format: '' },
        //   required: false,
        //   fixed: false,
        //   visible: true
        // },
        {
          headcaption: 'label.LastRecvTime',
          field: 'time',
          fieldtype: 'date',
          format: 'yyyy-MM-dd HH:mm:ss',
          alignment: 'center',
          width: '167',
          max: 10,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          sortOrder: 'desc'
        },
        {
          headcaption: 'Timeout(m)',
          field: 'deviceTimeout',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '125',
          max: 10,
          editoroptions: { format: '' },
          required: false,
          fixed: false
        },
        {
          headcaption: '가동상태',
          field: 'status',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '60',
          max: 10,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          statusImage: true
        },
        {
          headcaption: 'label.ratePerMin', //분당 처리율
          field: 'countPerMinute',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '165',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          visible: true
        }
      ]
    }
  }
}
