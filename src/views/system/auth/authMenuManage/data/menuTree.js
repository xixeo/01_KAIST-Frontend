export default function getData() {
  return {
    menuGridProperties: {
      treeName: 'menuTree',
      selectionMode: 'single', //selection_mode : single, multiple      Default : none
      selectionCheckbox: 'onClick', //selection_checkbox : none, onClick, onLongTap, always
      seleectionAllMode: 'page', //selectionAll_mode : selection page ( page, allPages)  allPages : 페이지경우 모든 페이지 다 선택됨
      colresize: true, //colresize : column resize
      colreorder: true, //colreorder : column reorder
      editing: false, //editing
      editingMode: 'cell', //editing_mode : row, batch, cell, form, popup     Default : row
      sortingMode: 'multiple', //sortingMode : none, single, multiple
      selectTextOnEditStart: true, //selectTextOnEditStart
      startEditAction: 'click', //startEditAction : click, dblClick
      headerFilter: true, //headerFilter
      columnAuto: true, //columnAuto
      pagingSize: 30, // Grid Page여부 및 Page Size (조회 Row 수)
      scrollMode: 'none', //none, virtual, infinite (무한스크롤) 생성
      
      
      autoExpandAll : true,      // true 일 시 처음 조회 시 모든 row 확장된 상태로 나옴
      group: "group",
      //Drag 관련
      allowDropInsideItem: false, // 드래그 열 드랍 여부
      allowReordering: false, // 재배열 허용여부
      showDragIcons: true, // 드래그 옆 이미지
      //Tree Col Info
      pageSizes: [5, 10, 20],
      treeColinfos: [
        //메뉴명
        {
          headcaption: 'label.menu_nm',
          field: 'menuNm',
          fieldtype: 'string',
          format: '',
          alignment: 'left',
          width: '250',
          max: 100,
          editing: false,
          required: false,
          fixed: false,
          visible: true
        },
        //URL
        {
          headcaption: 'label.menu_url',
          field: 'menuUrl',
          fieldtype: 'string',
          format: '',
          alignment: 'left',
          width: '200',
          max: 100,
          editing: false,
          required: false,
          fixed: false,
          visible: true
        },
        //순서
        {
          headcaption: 'label.menu_sort',
          field: 'sort',
          fieldtype: 'number',
          format: '',
          alignment: 'center',
          width: '80',
          editoroptions: { format: '' },
          required: false,
          editing: false,
          fixed: false
        },
        //LEVEL
        {
          headcaption: 'label.level',
          field: 'level',
          fieldtype: 'number',
          format: '',
          alignment: 'center',
          width: '130',
          max: 100,
          editing: false,
          required: false,
          fixed: false,
          visible: true
        },
        //사용유무
        {
          headcaption: 'label.menu_use_yn',
          field: 'useYn',
          fieldtype: 'boolean',
          format: '',
          alignment: 'center',
          width: '80',
          max: 1,
          editoroptions: { format: '' },
          required: false,
          fixed: false,
          checkbox: true,
          visible: false
        },
        //메뉴 ID
        {
          headcaption: 'label.menu_nm',
          field: 'menuCd',
          fieldtype: 'string',
          format: '',
          alignment: 'left',
          width: '250',
          max: 100,
          editing: false,
          required: false,
          fixed: false,
          visible: false
        },
        //부모 메뉴
        {
          field: 'prntsCd',
          format: '',
          visible: false
        },
        //아이콘
        {
          field: 'icon',
          format: '',
          visible: false
        },
        //메뉴 정보
        {
          field: 'note',
          format: '',
          visible: false
        }
      ]
    }
  }
}
