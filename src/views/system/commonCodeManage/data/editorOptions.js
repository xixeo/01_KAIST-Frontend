export default function getData() {
  return {
    cmCodeData: {
      columns: 2,
      editorList: [
        {
          id: 'domainCd',
          title: {
            label: 'authgrpManage.domain_nm',
            width: '35%'
          },
          value: '',
          itemList: [],
          option: {
            visible: true,
            type: 'select', // select/input/button
            kind: 'default', // default/filter
            clearbutton: false,
            placeholder: null,
            readOnly: false,
            disabled: false,
            placeholder: 'authgrpManage.domain_cd',
            width: '65%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [1, 3] // col start, col span
          }
        },
        {
          id: 'codeCd',
          title: {
            label: 'label.cmcode_search',
            width: '4%'
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
            placeholder: '분류',
            width: '22%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [4, 1] // col start, col span
          }
        },
        // {
        //   id: 'codeNm',
        //   title: {
        //     label: 'label.cmcode_nm',
        //     width: '35%'
        //   },
        //   value: '',
        //   itemList: [],
        //   option: {
        //     type: 'select', // select/input/button
        //     kind: 'default', // default/filter
        //     clearbutton: false,
        //     readOnly: false,
        //     disabled: false,
        //     searchenabled: true, // true: editable false: no editable
        //     placeholder: '분류명',
        //     width: '65%'
        //   },
        //   position: {
        //     row: [1, 1], // row start, row span
        //     col: [6, 2] // col start, col span
        //   }
        // }
      ]
    }
  }
}
