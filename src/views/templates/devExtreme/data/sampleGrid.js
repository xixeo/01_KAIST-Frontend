export default function getData() {
  return {
    dataGridProperties: {
      gridName: 'dataGrid',
      selectionMode: 'single', //selection_mode : selection mode (single, multiple)
      selectionCheckbox: 'none', //selection_checkbox : selection checkbox (none, onClick, onLongTap, always)
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

      //Grid Col Info
      pageSizes: [5, 10, 20, 30], //Grid Row size
      // 그룹하는 열에 groupIndex 주기
      summary: [
        // 코드
        { group: true, type: 'sum', display: '{0}', format: 'Sum : #,###', field: 'sampleCd', footer: true },
        // 이름
        { group: true, type: 'count', display: '{0}', format: 'Count : #,### 개', field: 'sampleNm', footer: true },
        // 상태
        { group: true, type: 'sum', display: '{0}', format: '#,###', field: 'sampleStatus', footer: true },
        // 합계
        { type: 'count', display: 'AAAA', alignment: 'right', format: '#,###', field: 'prise', footer: true }
      ],
      gridColinfos: [
        {
          headcaption: 'No',
          field: 'id',
          fieldtype: 'string',
          alignment: 'left',
          format: '',
          width: '10%',
          required: false,
          key: true,
          groupIndex: 0
        },
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
        },
        {
          headcaption: '합계',
          field: 'prise',
          fieldtype: 'string',
          alignment: 'center',
          format: '',
          width: '20%',
          required: false
        }
      ]
    },
    treeGridProperties: {
      title: 'sampleTreeGrid',
      treeName: 'treeGrid',
      selectionMode: 'multiple', //selection_mode : single, multiple      Default : none
      selectionCheckbox: 'always', //selection_checkbox : none, onClick, onLongTap, always
      seleectionAllMode: 'page', //selectionAll_mode : selection page ( page, allPages)  allPages : 페이지경우 모든 페이지 다 선택됨
      colresize: true, //colresize : column resize
      colreorder: true, //colreorder : column reorder
      adding: false, //adding
      editing: true, //editing
      editingMode: 'cell', //editing_mode : row, batch, cell, form, popup     Default : row
      deleting: false, //deleting
      sortingMode: 'multiple', //sortingMode : none, single, multiple
      selectTextOnEditStart: true, //selectTextOnEditStart
      startEditAction: 'click', //startEditAction : click, dblClick
      filterRow: false, //filterRow
      filterPanel: false, //filterPanel
      headerFilter: true, //headerFilter
      colChooser: false, //ColumnChooser
      colFixing: false, //Fixing
      columnAuto: true, //columnAuto
      //Grid Page여부 및 Page Size (조회 Row 수)
      paging: false,
      pagingSize: 30,
      scrollMode: 'none', //none, virtual, infinite (무한스크롤) 생성
      addbtn: false, //TreeList 추가버튼

      //  this.treeMain.option('autoExpandAll', 'true')    모든 행을 열고 싶을때
      //  true 일 시 처음 조회 시 모든 row 확장된 상태로 나옴

      //Drag 관련
      allowDropInsideItem: true, // 드래그 열 드랍 여부
      allowReordering: true, // 재배열 허용여부
      showDragIcons: true, // 드래그 옆 이미지

      //Tree Col Info
      pageSizes: [5, 10, 20],
      treeColinfos: [
        //메뉴명
        {
          headcaption: '메뉴명',
          field: 'menuNm',
          fieldtype: 'string',
          format: '',
          alignment: 'left',
          width: '230',
          max: 100,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          visible: true
        },
        //부모 메뉴
        {
          headcaption: '부모메뉴',
          field: 'prntsCd',
          fieldtype: 'number',
          format: '',
          alignment: 'center',
          width: '100',
          max: 1000,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          visible: false
        },
        //메뉴 ID
        {
          headcaption: '메뉴ID',
          field: 'menuCd',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '100',
          max: 1000,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          visible: false
        },
        //순서
        {
          headcaption: '순서',
          field: 'sort',
          fieldtype: 'number',
          format: '',
          alignment: 'center',
          width: '80',
          max: 10,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          visible: true
        },
        //사용유무
        {
          headcaption: '사용유무',
          field: 'useYn',
          fieldtype: 'boolean',
          format: '',
          alignment: 'center',
          width: '110',
          max: 1,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          checkbox: true
        }
      ]
    }
  }
}
