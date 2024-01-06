import i18n from '@/i18n' // 언어 변환(매칭) component
export default function getData() {
  return {
    domainData: {
      columns: 8, // layout 크기
      // class: '', // layout class
      // style: '', // layout style
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
            visible: true,
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
          // class: '', // title + box class
          // style: '' // title + box style
        }
      ]
    },
    menuInfoData: {
      columns: 2,
      // class: '', // layout class
      // style: '', // layout style
      editorList: [
        {
          id: 'menuCd',
          title: {
            icon: 'red', // red / blue
            label: 'label.menu_cd',
            width: '40%'
          },
          value: '',
          option: {
            type: 'input', // input/select/filterSelect
            kind: 'text', // text/textArea
            readOnly: false,
            disabled: true,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '60%'
          },
          position: {
            row: [1, 1],
            col: [1, 2]
          }
        },
        {
          id: 'menuNm',
          title: {
            icon: 'red', // red / blue
            label: 'label.menu_nm',
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
            row: [2, 1],
            col: [1, 2]
          }
        },
        {
          id: 'sort',
          title: {
            icon: 'red', // red / blue
            label: 'label.menu_sort',
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
            row: [3, 1],
            col: [1, 2]
          }
        },
        {
          id: 'menuUrl',
          title: {
            icon: 'red', // red / blue
            label: 'label.menu_url',
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
            row: [4, 1],
            col: [1, 2]
          }
        },
        {
          id: 'icon',
          title: {
            icon: 'blue', // red / blue
            label: 'label.menu_icon',
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
            width: '60%',
            iconVisible: true, //아이콘 보임여부
            dropdownImage: '', //아이콘 1
            itemImage: '' //아이콘2
          },
          position: {
            row: [5, 1],
            col: [1, 2]
          }
        },
        {
          id: 'level',
          title: {
            icon: 'blue', // red / blue
            label: 'label.level',
            width: '40%'
          },
          value: '',
          option: {
            type: 'number', // input/select/filterSelect
            spinbutton: true,
            clearbutton: true,
            disabled: false,
            stepValue: 1, // 단위
            minValue: 0, // min
            maxValue: 1000, // max
            format: '#,##0',
            width: '60%'
          },
          position: {
            row: [6, 1],
            col: [1, 2]
          }
        },
        {
          id: 'note',
          title: {
            icon: 'blue', // red / blue
            label: 'label.menu_desc',
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
            row: [7, 1],
            col: [1, 2]
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
            row: [8, 1],
            col: [1, 2]
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
            row: [9, 1],
            col: [1, 2]
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
            row: [10, 1],
            col: [1, 2]
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
            row: [11, 1],
            col: [1, 2]
          }
        }
      ]
    }
  }
}
