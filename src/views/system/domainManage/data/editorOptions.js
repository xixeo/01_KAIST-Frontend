export default function getData() {
  return {
    domainData: {
      columns: 12,
      editorList: [
        {
          id: 'domainStatusCd',
          title: {
            label: 'label.status',
            width: '35%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'select', // select/input/button
            kind: 'default', // default/filter
            clearbutton: false,
            placeholder: null,
            readOnly: false,
            disabled: false,
            width: '65%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [1, 2] // col start, col span
            // mobile: [1, 1, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
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
            col: [3, 3], // col start, col span
            mobile: [1, 1, 1, 3] // 모바일 사이즈 row start, row span, col start, col span
          }
        }
      ]
    }
  }
}
