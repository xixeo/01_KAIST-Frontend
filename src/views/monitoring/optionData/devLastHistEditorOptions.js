export default function getData() {
  return {
    groupCodeData: {
      columns: 11,
      style: 'height:100%; font-size:14px;',
      editorList: [
        {
          id: 'devGroup',
          title: {
            label: 'label.devGroup',
            width: '25%'
          },
          value: '',
          itemList: [
            { value: 'test_value', label: 'test' },
            { value: 'test2_value', label: 'test2' }
          ],
          option: {
            type: 'select',
            kind: 'default',
            clearbutton: false,
            placeholder: null,
            readOnly: false,
            disabled: false,
            width: '75%',
            style: 'font-size: 18px;height:34px'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [1, 3] // col start, col span
          }
        },
        {
          id: 'devID',
          title: {
            label: 'label.devUniqueID',
            width: '40%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'input',
            kind: 'text',
            txtMaxlength: 30,
            readOnly: false,
            disabled: false,
            width: '60%',
            style: 'font-size: 18px;height:34px;'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [4, 2] // col start, col span
          }
        }
      ]
    }
  }
}
