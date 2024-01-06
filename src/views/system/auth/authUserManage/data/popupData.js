import i18n from '@/i18n' // 언어 변환(매칭) component
export default function getData() {
  return {
    // 팝업 정보
    option: {
      title: 'label.addUser',
      // panel 구분 버튼
      panelButton: {
        group: {
          stylingMode: 'outlined',
          selectionMode: 'single', // 하나만 선택 가능
          selectedKeys: [i18n.t('user_info')] // 버튼 리스트 중 선택된 key
        },
        options: {
          type: 'default',
          stylingMode: 'containted',
          content: '',
          listStyle: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'user_info' }, { id: 'asgn_info' }]
      },
      width: '80%', // 팝업 가로
      height: '80%', // 팝업 높이
      okButtonLabel: 'btnAdd', // ok버튼
      valiData: false, // 데이터 검증
      count: 0, // watch
      // editor list
      editorList: {
        user_info: {
          columns: 12,
          editorList: [
            {
              id: 'userId',
              title: {
                label: 'userManage.userId',
                width: '40%'
              },
              value: '',
              itemList: [],
              option: {
                type: 'select', // select/input/button
                kind: 'default', // default/filter
                clearbutton: false,
                readOnly: false,
                disabled: false,
                searchenabled: true, // true: editable false: no editable
                placeholder: '유저 아이디',
                width: '60%'
              },
              position: {
                row: [1, 1], // row start, row span
                col: [1, 3] // col start, col span
              }
            },
            {
              id: 'userNm',
              title: {
                label: 'userManage.userNm',
                width: '40%'
              },
              value: '',
              itemList: [],
              option: {
                type: 'select', // select/input/button
                kind: 'default', // default/filter
                clearbutton: false,
                readOnly: false,
                disabled: false,
                searchenabled: true, // true: editable false: no editable
                placeholder: '유저 이름',
                width: '60%'
              },
              position: {
                row: [1, 1], // row start, row span
                col: [4, 3] // col start, col span
              }
            },
            {
              option: {
                type: 'button',
                options: {
                  kind: 'DevExtreme',
                  class: null,
                  style: 'width: 95%; margin-top: 10px;margin-left: 0.1%;',
                  id: 'search',
                  type: 'default',
                  icon: 'search',
                  disabled: false,
                  content: i18n.t('btnSearch'),
                  stylingMode: 'contained'
                }
              },
              position: {
                row: [1, 1], // row start, row span
                col: [12, 1] // col start, col span
              }
            }
          ]
        }
      },
      gridList: {
        user_info: [
          {
            width: [11, 11],
            height: 'calc(100vh - 480px)',
            title: 'label.userList',
            properties: {
              gridName: 'popupUserGrid',
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
              headerFilter: true, // 헤더 필터링
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
              gridColinfos: [
                // userId
                {
                  headcaption: 'userManage.userId',
                  field: 'userId',
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
                // userNm
                {
                  headcaption: 'userManage.userNm',
                  field: 'userNm',
                  fieldtype: 'string',
                  alignment: 'center',
                  width: '35%',
                  editoroptions: { format: '' },
                  required: false,
                  editing: false,
                  fixed: false
                },
                // asgnNm
                {
                  headcaption: 'userManage.asgnNm',
                  field: 'asgnNm',
                  fieldtype: 'string',
                  alignment: 'center',
                  width: '30%',
                  editoroptions: { format: '' },
                  required: false,
                  editing: false,
                  fixed: false
                }
              ]
            },
            rowData: [] // 그리드 Row data
          },
          {
            width: [2, 2],
            style: 'height:calc(100vh - 480px);',
            columns: 5,
            editorList: [
              {
                option: {
                  type: 'button',
                  options: {
                    kind: 'DevExtreme',
                    class: null,
                    style: 'width: 100%; margin-top: 10px;margin-left: 0.1%;',
                    id: 'back',
                    type: 'default',
                    icon: 'chevrondoubleleft',
                    disabled: false,
                    stylingMode: 'contained'
                  }
                },
                position: {
                  row: [3, 1], // row start, row span
                  col: [2, 3] // col start, col span
                }
              },
              {
                option: {
                  type: 'button',
                  options: {
                    kind: 'DevExtreme',
                    class: null,
                    style: 'width: 100%; margin-top: 10px;margin-left: 0.1%;',
                    id: 'front',
                    type: 'default',
                    icon: 'chevrondoubleright',
                    disabled: false,
                    stylingMode: 'contained'
                  }
                },
                position: {
                  row: [12, 1], // row start, row span
                  col: [2, 3] // col start, col span
                }
              }
            ]
          },
          {
            width: [11, 11],
            height: 'calc(100vh - 480px)',
            title: 'label.selectUser',
            properties: {
              gridName: 'selectUserGrid',
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
              gridColinfos: [
                // userId
                {
                  headcaption: 'userManage.userId',
                  field: 'userId',
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
                // userNm
                {
                  headcaption: 'userManage.userNm',
                  field: 'userNm',
                  fieldtype: 'string',
                  alignment: 'center',
                  width: '35%',
                  editoroptions: { format: '' },
                  required: false,
                  editing: false,
                  fixed: false,
                  visible: true
                },
                // asgnNm
                {
                  headcaption: 'userManage.asgnNm',
                  field: 'asgnNm',
                  fieldtype: 'string',
                  alignment: 'center',
                  width: '30%',
                  editoroptions: { format: '' },
                  required: false,
                  editing: false,
                  fixed: false,
                  visible: true
                }
              ]
            },
            rowData: [] // 그리드 Row data
          }
        ],
        asgn_info: [
          {
            width: [11, 11],
            height: 'calc(100vh - 405px)',
            title: 'label.asgn_list',
            properties: {
              treeName: 'popupAsgnGrid',
              selectionMode: 'multiple', //selection_mode : single, multiple      Default : none
              selectionCheckbox: 'always', //selection_checkbox : none, onClick, onLongTap, always
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
              //Drag 관련
              allowDropInsideItem: false, // 드래그 열 드랍 여부
              allowReordering: false, // 재배열 허용여부
              showDragIcons: false, // 드래그 옆 이미지
              //Tree Col Info
              pageSizes: [5, 10, 20],
              treeColinfos: [
                // 조직명
                {
                  headcaption: 'label.asgn_nm',
                  field: 'asgnNm',
                  fieldtype: 'string',
                  format: '',
                  alignment: 'left',
                  width: '50%',
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
                  alignment: 'left',
                  width: '50%',
                  max: 100,
                  editing: false,
                  required: false,
                  fixed: false,
                  visible: true
                },
                // 순서
                {
                  field: 'sort',
                  format: '',
                  visible: false
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
                }
              ]
            },
            rowData: [] // 그리드 Row data
          },
          {
            width: [2, 2],
            style: 'height:calc(100vh - 405px);',
            columns: 5,
            editorList: [
              {
                option: {
                  type: 'button',
                  options: {
                    kind: 'DevExtreme',
                    class: null,
                    style: 'width: 100%; margin-top: 10px;margin-left: 0.1%;',
                    id: 'back',
                    type: 'default',
                    icon: 'chevrondoubleleft',
                    disabled: false,
                    stylingMode: 'contained'
                  }
                },
                position: {
                  row: [3, 1], // row start, row span
                  col: [2, 3] // col start, col span
                }
              },
              {
                option: {
                  type: 'button',
                  options: {
                    kind: 'DevExtreme',
                    class: null,
                    style: 'width: 100%; margin-top: 10px;margin-left: 0.1%;',
                    id: 'front',
                    type: 'default',
                    icon: 'chevrondoubleright',
                    disabled: false,
                    stylingMode: 'contained'
                  }
                },
                position: {
                  row: [12, 1], // row start, row span
                  col: [2, 3] // col start, col span
                }
              }
            ]
          },
          {
            width: [11, 11],
            height: 'calc(100vh - 405px)',
            title: 'label.selectAsgn',
            properties: {
              gridName: 'selectAsgnGrid',
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
              gridColinfos: [
                // asgnNm
                {
                  headcaption: 'label.asgn_nm',
                  field: 'asgnNm',
                  fieldtype: 'string',
                  format: '',
                  alignment: 'center',
                  width: '50%',
                  max: 100,
                  editing: false,
                  required: false,
                  fixed: false,
                  visible: true
                },
                // asgnType
                {
                  headcaption: 'label.asgn_type',
                  field: 'asgnType',
                  fieldtype: 'string',
                  alignment: 'center',
                  width: '50%',
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
                }
              ]
            },
            rowData: [] // 그리드 Row data
          }
        ]
      }
    }
  }
}
