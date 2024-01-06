export default function getData() {
  return {
    groupCodeData: {
      columns: 11,
      style: 'height:100%; font-size:14px;',
      editorList: [
        {
          id: 'client_id',
          title: {
            label: 'label.client_id',
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
            style: 'font-size: 18px;height:34px'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [1, 2] // col start, col span
          }
        },
        {
          id: 'topic',
          title: {
            label: 'label.topic',
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
            col: [3, 2] // col start, col span
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
                dateFormat: 'yyyyMMddTHHmm',
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
                dateFormat: 'yyyyMMddTHHmm',
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
            col: [5, 4]
          }
        },
        {
          id: 'devID',
          title: {
            label: 'label.devUniqueID',
            width: '30%'
          },
          value: '',
          itemList: [],
          option: { type: 'label', visible: true, style: 'font-size:small;color:aqua' },
          position: {
            row: [1, 1], // row start, row span
            col: [9, 2] // col start, col span
          }
        }
        // {
        //   id: 'sTime', //error
        //   title: {
        //     // icon: 'blue',
        //     label: '시작일시',
        //     width: '35%'
        //   },
        //   value: [],
        //   option: {
        //     type: 'dateBox', // input/select/filterSelect
        //     width: '60%',
        //     data: [
        //       {
        //         kind: 'time', // date / time / datetime
        //         format: 'HH:MM',
        //         clearbutton: true,
        //         pickertype: 'rollers', // native / calendar / rollers / list
        //         placeholder: '검색 시작 시간',
        //         readOnly: false,
        //         disabled: false,
        //         dateFormat: 'HH:MM',
        //         txtMaxlength: 20,
        //         txtMode: 'text',
        //         style: 'width:100%; font-size: 18px; height:34px'
        //         // max: '2999-12-31',
        //         // min: '1960-01-01'
        //       }
        //     ]
        //   },
        //   position: {
        //     row: [1, 1],
        //     col: [7, 2]
        //   }
        // },
        // {
        //   id: 'eTime', //error
        //   title: {
        //     // icon: 'blue',
        //     label: '종료일시',
        //     width: '35%'
        //   },
        //   value: [],
        //   option: {
        //     type: 'dateBox', // input/select/filterSelect
        //     width: '60%',
        //     data: [
        //       {
        //         kind: 'time', // date / time / datetime
        //         format: 'HH:MM',
        //         clearbutton: true,
        //         pickertype: 'rollers', // native / calendar / rollers / list
        //         placeholder: '검색 종료 시간',
        //         readOnly: false,
        //         disabled: false,
        //         dateFormat: 'HH:MM',
        //         txtMaxlength: 20,
        //         txtMode: 'text',
        //         style: 'width:100%; font-size: 18px; height:34px'
        //         // max: '2999-12-31',
        //         // min: '1960-01-01'
        //       }
        //     ]
        //   },
        //   position: {
        //     row: [1, 1],
        //     col: [9, 2]
        //   }
        // }
      ]
    }
  }
}
