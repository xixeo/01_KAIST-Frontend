export default function getData() {
  return {
    groupCodeData: {
      columns: 11,
      style: 'height:100%; font-size:14px;background-color:#1F1D2B',
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
          item: ['group1', 'grouop2'],
          option: {
            type: 'select',
            kind: 'default',
            clearbutton: false,
            placeholder: null,
            readOnly: false,
            disabled: false,
            searchenabled: true, //by
            width: '75%',
            style: 'font-size: 18px;height:34px'
          },
          validation: {
            required: false, // 필수입력
            requiredMsg: ''
            // requiredMsg: '분류명은 필수입력 사항입니다.' // 미입력시 메시지
          },
          position: {
            row: [1, 1], // row start, row span
            col: [1, 3] // col start, col span
          },
          isExistColFormats: false
        },
        {
          id: 'devID',
          title: {
            label: 'label.devUniqueID',
            width: '30%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'input',
            kind: 'text',
            txtMaxlength: 30,
            readOnly: false,
            disabled: false,
            width: '70%',
            style: 'font-size: 18px;height:34px;'
          },
          validation: {
            required: false, // 필수입력
            requiredMsg: ''
            // requiredMsg: '분류명은 필수입력 사항입니다.' // 미입력시 메시지
          },
          position: {
            row: [1, 1], // row start, row span
            col: [4, 2] // col start, col span
          }
        },
        {
          id: 'date', //error
          title: {
            // icon: 'blue',
            label: 'label.date',
            width: '10%'
          },
          value: [],
          option: {
            division: '~',
            type: 'dateBox', // input/select/filterSelect
            width: '85%',
            data: [
              {
                kind: 'datetime', // date / time / datetime
                // format: '2018-23-04T10:00:00',
                clearbutton: false,
                pickertype: 'calendar', // native / calendar / rollers / list
                placeholder: '시작일시',
                readOnly: false,
                disabled: false,
                dateFormat: 'yyyy-MM-dd HH:mm:ss',
                txtMaxlength: 30,
                txtMode: 'text',
                style: 'width:100%; font-size: 18px; height:34px',
                required: true // 필수입력
                // max: '2999-12-31',
                // min: '1960-01-01'
              },
              {
                kind: 'datetime', // date / time / datetime
                // format: '2018-23-04T10:00:00',
                clearbutton: false,
                pickertype: 'calendar', // native / calendar / rollers / list
                placeholder: '종료일시',
                readOnly: false,
                disabled: false,
                dateFormat: 'yyyy-MM-dd HH:mm:ss',
                txtMaxlength: 30,
                txtMode: 'text',
                style: 'width:100%; font-size: 18px; height:34px',
                required: true // 필수입력
                // max: '2999-12-31',
                // min: '1960-01-01'
              }
            ]
          },

          position: {
            row: [1, 1],
            col: [6, 4]
          }
        },
        {
          id: 'devID',
          title: {
            label: 'label.devUniqueID',
            width: '30%'
          },
          value: '(미입력시 디폴트는 1일)',
          itemList: [],
          option: { type: 'label', visible: true, style: 'font-size:small;color:aqua' },
          position: {
            row: [1, 1], // row start, row span
            col: [10, 2] // col start, col span
          }
        }
      ]
    }
  }
}
