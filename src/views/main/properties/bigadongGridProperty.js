export default function getData() {
  return {
    BigadongDeviceGridProperties: {
      gridName: 'BigadongDeviceGrid',
      title: '비가동 목록 그리드',
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
      pagingSize: 15,
      scrollMode: 'infinite', //none, virtual, infinite (무한스크롤) 생성
      addbtn: false, //Grid 추가버튼

      //Grid Col Info
      //pageSizes: 10,
      //Grid Col Info
      //pageSizes: [5, 10, 20, 30], //Grid Row size
      gridColinfos: [
        {
          headcaption: '디바이스 ID',
          field: 'deviceId',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '200',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          visible: true
        },
        {
          headcaption: '유니크ID',
          field: 'uniqueID',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '150',
          max: 50,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          visible: false
        },
        {
          headcaption: '디바이스명',
          field: 'deviceNm',
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
        }
      ]
    }
  }
}
