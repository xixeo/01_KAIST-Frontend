export default function getData() {
  return {
    authUserData: {
      columns: 12,
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
            placeholder: '도메인명',
            width: '60%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [1, 3] // col start, col span
          }
        },
        {
          id: 'authgrpCd',
          title: {
            label: 'authgrpManage.authgrp_nm',
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
            placeholder: '권한그룹명',
            width: '60%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [4, 3] // col start, col span
            // mobile: [2, 2, 1, 3] // 모바일 사이즈 row start, row span, col start, col span
          }
        }
      ]
    }
  }
}
