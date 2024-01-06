export default function getData(param) {
  let columDataList = [
    //codeCd
    {
      headcaption: 'label.cmcode_cd',
      field: 'codeCd',
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
    //codeNm
    {
      headcaption: 'label.cmcode_nm',
      field: 'codeNm',
      fieldtype: 'string',
      alignment: 'center',
      width: '150px',
      editoroptions: { format: '' },
      required: false,
      editing: true,
      fixed: false
    },
    //sort
    {
      headcaption: 'label.sort',
      field: 'sort',
      fieldtype: 'string',
      alignment: 'center',
      width: '60px',
      editoroptions: { format: '' },
      required: false,
      editing: true,
      fixed: false
    },
    //note
    {
      headcaption: 'label.memo',
      field: 'note',
      fieldtype: 'string',
      format: '',
      alignment: 'left',
      width: '150px',
      max: 100,
      editing: true,
      required: false,
      fixed: false,
      visible: true
    }
  ]
  let columData = []
  columData = columDataList
  return {
    cmCodeGridProperties: {
      gridName: 'cmCodeGrid',
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
      startEditAction: 'dblClick', //startEditAction : click, dblClick
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
      focusKey: '1',

      //Grid Col Info
      pageSizes: [5, 10, 20, 30], //Grid Row size
      gridColinfos: columData
    }
  }
}

