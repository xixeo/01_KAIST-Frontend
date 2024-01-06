import i18n from '@/i18n' // 언어 변환(매칭) component
export default function getData() {
  return {
    domainData: {
      columns: 8, // layout 크기
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
            col: [1, 2] // col start, col span
            // mobile: [1, 1, 1, 2], // 모바일 위치 row start, row span, col start, col span
          }
        }
      ]
    },
    asgnInfoData: {
      columns: 8,
      editorList: [
        {
          id: 'asgnType',
          title: {
            icon: 'red', // red / blue
            label: 'label.asgn_type',
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
            placeholder: '',
            width: '60%'
          },
          position: {
            row: [1, 1], // row start, row span
            col: [1, 8] // col start, col span
          }
        },
        {
          id: 'asgnCd',
          title: {
            icon: 'red', // red / blue
            label: 'label.asgn_cd',
            width: '54%'
          },
          value: '',
          option: {
            type: 'input', // input/select/filterSelect
            kind: 'text', // text/textArea
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '46%'
          },
          validation: {
            required: true, // 필수입력
            requiredMsg: i18n.t('msg.required_check') // 미입력시 메시지
          },
          position: {
            row: [2, 1],
            col: [1, 6]
          }
        },
        {
          option: {
            type: 'button', // select/input/buttonList
            options: {
              kind: 'DevExtreme',
              class: null,
              style: 'width: 95%; margin-top: 10px;margin-left: 0.1%;',
              id: 'duplicate_check',
              type: 'normal',
              icon: 'check',
              disabled: false,
              content: 'duplicate_check',
              stylingMode: 'contained'
            }
          },
          position: {
            row: [2, 1], // row start, row span
            col: [7, 2] // col start, col span
          }
        },
        {
          id: 'asgnNm',
          title: {
            icon: 'red', // red / blue
            label: 'label.asgn_nm',
            width: '40%'
          },
          value: '',
          option: {
            type: 'input', // input/select/filterSelect
            kind: 'text', // text/textArea
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '60%'
          },
          validation: {
            required: true, // 필수입력
            requiredMsg: i18n.t('msg.required_check') // 미입력시 메시지
          },
          position: {
            row: [3, 1],
            col: [1, 8]
          }
        },
        {
          id: 'sort',
          title: {
            icon: 'red', // red / blue
            label: 'label.sort',
            width: '40%'
          },
          value: '',
          option: {
            type: 'number', // input/select/filterSelect
            spinbutton: true,
            clearbutton: true,
            disabled: true,
            stepValue: 1, // 단위
            minValue: 1, // min
            maxValue: 1000, // max
            format: '#,##0',
            width: '60%'
          },
          position: {
            row: [4, 1],
            col: [1, 8]
          }
        },
        {
          id: 'note',
          title: {
            icon: 'blue', // red / blue
            label: 'label.memo',
            width: '40%'
          },
          value: '',
          option: {
            type: 'input', // input/select/filterSelect
            kind: 'text', // text/textArea
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '60%'
          },
          position: {
            row: [5, 1],
            col: [1, 8]
          }
        },
        {
          id: 'insertDt',
          title: {
            icon: 'blue',
            label: 'label.insert_dt',
            width: '40%'
          },
          value: '',
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
            row: [6, 1],
            col: [1, 8]
          }
        },
        {
          id: 'insertId',
          title: {
            icon: 'blue',
            label: 'label.insert_id',
            width: '40%'
          },
          value: '',
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
            row: [7, 1],
            col: [1, 8]
          }
        },
        {
          id: 'updateDt',
          title: {
            icon: 'blue',
            label: 'label.update_dt',
            width: '40%'
          },
          value: '',
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
            row: [8, 1],
            col: [1, 8]
          }
        },
        {
          id: 'updateId',
          title: {
            icon: 'blue',
            label: 'label.update_id',
            width: '40%'
          },
          value: '',
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
            row: [9, 1],
            col: [1, 8]
          }
        }
      ]
    }
  }
}
