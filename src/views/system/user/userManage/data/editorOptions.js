export default function getData() {
  return {
    userManageData: {
      columns: 10,
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
            visual: true,
            type: 'select', // select/input/button
            kind: 'default', // default/filter
            clearbutton: false,
            placeholder: '도메인이름',
            readOnly: false,
            disabled: false,
            width: '60%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [1, 2], // col start, col span
            mobile: [1, 1, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
        {
          id: 'userId',
          title: {
            label: 'userManage.userId',
            width: '30%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'select', // select/input/button
            kind: 'default', // default/filter
            clearbutton: false,
            placeholder: '유저 아이디',
            readOnly: false,
            disabled: false,
            width: '70%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [3, 2], // col start, col span
            mobile: [1, 1, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
        {
          id: 'userNm',
          title: {
            label: 'userManage.userNm',
            width: '30%'
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
            width: '70%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [5, 2] // col start, col span
            // mobile: [2, 2, 1, 3] // 모바일 사이즈 row start, row span, col start, col span
          }
        }
      ]
    }
  }
}
