export default function getData() {
  return {
    userEditorData: {
      user_info: {
        columns: 11,
        editorList: [
          {
            id: 'userNm',
            title: {
              label: 'userManage.userNm',
              width: '35%'
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
              placeholder: '그룹명',
              width: '65%'
            },
            position: {
              row: [1, 1], // row start, row span
              col: [6, 4], // col start, col span
              mobile: [1, 1, 7, 3] // 모바일 사이즈 row start, row span, col start, col span
            }
          },
          {
            option: {
              type: 'buttonList', // select/input/button/buttonList
              options: {
                type: 'default',
                searchModeOption: 'containted',
                content: '',
                icon: '',
                style: 'width: 100px; margin-top: 0.1%;margin-left: 0.1%; height:70%;', // 버튼 style
                listStyle: 'margin-top: 10px; margin-left: 20px;' // 리스트 style
              },
              list: [{ id: 'btnSearch' }] // 버튼 리스트
            },
            position: {
              row: [1, 1], // row start, row span
              col: [10, 1], // col start, col span
              mobile: [1, 1, 10, 1] // 모바일 사이즈 row start, row span, col start, col span
            }
          }
        ]
      },
      menu_info: {
        columns: 11,
        editorList: [
          {
            option: {
              type: 'buttonList', // select/input/button/buttonList
              options: {
                type: 'default',
                searchModeOption: 'containted',
                content: '',
                icon: '',
                style: 'width: 100px; margin-top: 0.1%;margin-left: 0.1%; height:70%;', // 버튼 style
                listStyle: 'margin-top: 10px; margin-left: 20px;' // 리스트 style
              },
              list: [{ id: 'btnSearch' }] // 버튼 리스트
            },
            position: {
              row: [1, 1], // row start, row span
              col: [10, 1], // col start, col span
              mobile: [1, 1, 10, 1] // 모바일 사이즈 row start, row span, col start, col span
            }
          }
        ]
      }
    },
    menuEditorData: {
      columns: 12,
      editorList: [
        {
          option: {
            type: 'buttonList', // select/input/button/buttonList
            options: {
              type: 'default',
              searchModeOption: 'containted',
              content: '',
              icon: '',
              style: 'width: 100px; margin-top: 0.1%;margin-left: 0.1%; height:70%;', // 버튼 style
              listStyle: 'margin-top: 0px; margin-left: 0px;' // 리스트 style
            },
            list: [{ id: 'btnSave' }, { id: 'btnDelete' }] // 버튼 리스트
          },
          position: {
            row: [1, 1], // row start, row span
            col: [10, 2], // col start, col span
            mobile: [1, 1, 8, 2] // 모바일 사이즈 row start, row span, col start, col span
          }
        }
      ]
    },
    domainEditorData: {
      columns: 5,
      style: 'width:100%; height:50%;',
      editorList: [
        {
          id: 'domainCd',
          title: {
            label: 'label.domain_nm',
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
            placeholder: '도메인 이름',
            width: '60%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [1, 5], // col start, col span
            mobile: [1, 1, 1, 3] // 모바일 사이즈 row start, row span, col start, col span
          }
        }
      ]
    },
    authUserEditorData: {
      columns: 5,
      style: 'width:100%; height:100%;',
      editorList: [
        {
          id: 'userNm',
          title: {
            label: 'userManage.userNm',
            width: '35%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'input', // input/select/filterSelect
            kind: 'text', // text/textArea
            readOnly: true,
            disabled: false,
            txtMaxlength: 30,
            txtMode: 'text',
            width: '60%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [1, 5], // col start, col span
            mobile: [1, 1, 1, 3] // 모바일 사이즈 row start, row span, col start, col span
          }
        }
      ]
    }
  }
}
