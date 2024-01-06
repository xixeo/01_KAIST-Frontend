export default function getData() {
  return {
    asgnGridProperties: {
      treeName: 'asgnGrid',
      selectionMode: 'multiple', //selection_mode : single, multiple      Default : none
      selectionCheckbox: 'always', //selection_checkbox : none, onClick, onLongTap, always
      seleectionAllMode: 'page', //selectionAll_mode : selection page ( page, allPages)  allPages : 페이지경우 모든 페이지 다 선택됨
      colresize: true, //colresize : column resize
      colreorder: true, //colreorder : column reorder
      editing: true, //editing
      editingMode: 'cell', //editing_mode : row, batch, cell, form, popup     Default : row
      sortingMode: 'multiple', //sortingMode : none, single, multiple
      selectTextOnEditStart: true, //selectTextOnEditStart
      startEditAction: 'click', //startEditAction : click, dblClick
      headerFilter: true, //headerFilter
      columnAuto: true, //columnAuto
      pagingSize: 30, // Grid Page여부 및 Page Size (조회 Row 수)
      scrollMode: 'none', //none, virtual, infinite (무한스크롤) 생성
      //Drag 관련
      allowDropInsideItem: true, // 드래그 열 드랍 여부
      allowReordering: true, // 재배열 허용여부
      showDragIcons: true, // 드래그 옆 이미지
      //Tree Col Info
      pageSizes: [5, 10, 20],
      treeColinfos: [
        // 조직명
        {
          headcaption: 'label.asgn_nm',
          field: 'asgnNm',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '45%',
          max: 100,
          editing: false,
          required: false,
          fixed: false,
          visible: true
        },
        // 조직 형식
        {
          headcaption: 'label.asgn_type',
          field: 'asgnType',
          fieldtype: 'string',
          format: '',
          alignment: 'center',
          width: '35%',
          max: 100,
          editing: false,
          required: false,
          fixed: false,
          visible: true
        },
        // 순서
        {
          headcaption: 'label.sort',
          field: 'sort',
          fieldtype: 'number',
          format: '',
          alignment: 'center',
          width: '20%',
          editoroptions: { format: '' },
          required: false,
          editing: false,
          fixed: false
        },
        // 조직코드
        {
          field: 'asgnCd',
          format: '',
          visible: false
        },
        // 부모조직코드
        {
          field: 'prntsCd',
          format: '',
          visible: false
        },
        // 조직코드레벨
        {
          field: 'level',
          format: '',
          visible: false
        },
        // 비고
        {
          field: 'note',
          format: '',
          visible: false
        },
        // 도메인코드
        {
          field: 'domainCd',
          format: '',
          visible: false
        }
      ]
    }
  }
}
