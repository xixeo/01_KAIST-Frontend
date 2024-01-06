export default function getData() {
  return {
    gridName: 'dataGrid',
    selectionMode: 'single', //selection_mode : selection mode (single, multiple)
    selectionCheckbox: 'none', //selection_checkbox : selection checkbox (none, onClick, onLongTap, always)
    seleectionAllMode: 'page', //seleectionAll_mode : selection page ( page, allPages)
    colresize: true, //colresize : column resize
    colreorder: true, //colreorder : column reorder
    editing: false, //editing
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
    //Grid Col Info
    pageSizes: [5, 10, 20, 30], //Grid Row size
    gridColinfos: [
      { headcaption: 'No', field: 'id', fieldtype: 'string', alignment: 'left', format: '', width: '10%', required: false },
      { headcaption: '코드', field: 'sampleCd', fieldtype: 'string', alignment: 'center', format: '', width: '25%', required: false },
      { headcaption: '이름', field: 'sampleNm', fieldtype: 'string', alignment: 'center', format: '', width: '25%', required: false },
      {
        headcaption: '상태',
        field: 'sampleStatus',
        fieldtype: 'string',
        alignment: 'center',
        format: '',
        width: '20%',
        required: false
      },
      {
        headcaption: '생성자',
        field: 'insertId',
        fieldtype: 'string',
        alignment: 'center',
        format: '',
        width: '20%',
        required: false
      },
      {
        headcaption: '생성일',
        field: 'insertDt',
        fieldtype: 'string',
        alignment: 'center',
        format: '',
        width: '20%',
        required: false
      }
    ]
  }
}
