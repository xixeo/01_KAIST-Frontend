export default function getData() {
  return {
    authgrpData: {
      columns: 12,
      editorList: [
        {
          id: 'domainCd',
          title: {
            label: 'authgrpManage.domain_nm',
            width: '35%'
          },
          value: '',
          itemList: [
            {
              value: 'a',
              label: 'a'
            },
            {
              value: 'b',
              label: 'b'
            },
            {
              value: 'c',
              label: 'c'
            }
          ],
          option: {
            type: 'select', // select/input/button
            kind: 'default', // default/filter
            clearbutton: false,
            placeholder: null,
            readOnly: false,
            disabled: false,
            searchenabled: true,
            placeholder: 'authgrpManage.domain_cd',
            width: '65%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [1, 3], // col start, col span
            mobile: [1, 1, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
        {
          id: 'authgrpCd',
          title: {
            label: 'authgrpManage.authgrp_cd',
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
            placeholder: 'authgrpManage.authgrp_cd',
            width: '60%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [4, 3] // col start, col span
            // mobile: [2, 2, 1, 3] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
        {
          id: 'authgrpNm',
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
            placeholder: 'authgrpManage.authgrp_nm',
            width: '60%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [7, 3] // col start, col span
            // mobile: [2, 2, 1, 3] // 모바일 사이즈 row start, row span, col start, col span
          }
        }
      ]
    }
  }
}
