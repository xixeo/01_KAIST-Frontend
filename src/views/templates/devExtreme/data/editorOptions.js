export default function getData() {
  return {
    editorData: {
      columns: 12,
      // class: '', // layout class
      // style: '', // layout style
      editorList: [
        {
          id: 'content1',
          title: {
            icon: 'red', // red / blue
            label: 'dxSelectBox',
            width: '50%' // 라벨 길이
            // class: '', // title class
            // style: '' // title style
          },
          value: '', // 표시값
          itemList: [
            {
              value: '',
              label: '전체'
            },
            {
              value: 'Y',
              label: '사용'
            },
            {
              value: 'N',
              label: '미사용'
            }
          ], // { value: 'id', label: '이름' }
          option: {
            type: 'select', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            kind: 'default', // default/filter/remote
            clearbutton: false,
            searchenabled: false, // true: editable false: no editable
            placeholder: null,
            readOnly: false,
            disabled: false,
            width: '50%' // 박스 길이
            // class: '', // box class
            // style: '' // box style
          },
          position: {
            row: [1, 1], // row start, row span
            col: [1, 2], // col start, col span
            mobile: [1, 1, 1, 2] // 모바일 위치 row start, row span, col start, col span
          }
          // class: '', // title + box class
          // style: '' // title + box style
        },
        {
          id: 'content3',
          title: {
            label: 'dxTextBox',
            width: '50%'
          },
          value: '',
          option: {
            type: 'input', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            kind: 'text', // text/textArea
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '50%'
          },
          position: {
            row: [1, 1],
            col: [3, 2],
            mobile: [2, 2, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
        {
          id: 'content2',
          title: {
            label: 'filterSelectBox',
            width: '50%'
          },
          value: '',
          option: {
            type: 'select', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            kind: 'filter', // default/filter/remote
            placeholder: '항목',
            width: '50%'
          },
          itemList: [
            {
              value: 'a',
              label: '이름a'
            },
            {
              value: 'b',
              label: '이름b'
            },
            {
              value: 'c',
              label: '이름c'
            }
          ],
          position: {
            row: [1, 1], // row start, row span
            col: [5, 2], // col start, col span
            mobile: [3, 3, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
        {
          id: 'content2',
          title: {
            label: 'remoteSelectBox',
            width: '50%'
          },
          value: '',
          option: {
            type: 'select', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            kind: 'remote', // default/filter/remote
            placeholder: '항목',
            width: '50%'
          },
          itemList: [
            {
              value: 'a',
              label: '이름a'
            },
            {
              value: 'b',
              label: '이름b'
            },
            {
              value: 'c',
              label: '이름c'
            }
          ],
          position: {
            row: [1, 1], // row start, row span
            col: [7, 2], // col start, col span
            mobile: [3, 3, 1, 3] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
        {
          id: 'joined_period',
          title: {
            label: 'el-datePicker',
            width: '25%'
          },
          value: [],
          option: {
            type: 'datePicker', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            width: '75%'
          },
          position: {
            row: [1, 1],
            col: [9, 4],
            mobile: [4, 4, 1, 3] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
        {
          id: 'content3',
          title: {
            label: 'dxFilterSelectBox',
            width: '50%' // 라벨 길이
            // class: '', // title class
            // style: '' // title style
          },
          value: '', // 표시값
          itemList: [
            {
              value: '',
              label: '전체'
            },
            {
              value: 'Y',
              label: '사용'
            },
            {
              value: 'N',
              label: '미사용'
            }
          ], // { value: 'id', label: '이름' }
          option: {
            type: 'select', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            kind: 'default', // default/filter/remote
            clearbutton: false,
            placeholder: null,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            width: '50%' // 박스 길이
            // class: '', // box class
            // style: '' // box style
          },
          position: {
            row: [2, 1], // row start, row span
            col: [1, 2], // col start, col span
            mobile: [5, 5, 1, 2] // 모바일 위치 row start, row span, col start, col span
          }
          // class: '', // title + box class
          // style: '' // title + box style
        },
        {
          id: 'content4',
          title: {
            label: 'dxNumberBox',
            width: '40%'
          },
          value: 0,
          option: {
            type: 'number', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            spinbutton: true,
            clearbutton: true,
            disabled: false,
            stepValue: 5, // 단위
            minValue: -10, // min
            maxValue: 30, // max
            format: '#,##0.## 개',
            width: '60%'
          },
          position: {
            row: [2, 1],
            col: [3, 3],
            mobile: [6, 6, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
        {
          id: 'content4',
          title: {
            label: 'dxTextArea',
            width: '30%'
          },
          value: '',
          option: {
            type: 'input', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            kind: 'textArea', // text/textArea
            height: '60',
            readOnly: false,
            maxLength: 50,
            width: '70%'
          },
          position: {
            row: [2, 1],
            col: [6, 3],
            mobile: [2, 2, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
        {
          id: 'content4',
          title: {
            icon: 'blue', // red / blue
            label: 'dxCheckBox',
            width: '70%'
          },
          value: 'Y',
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            width: '30%',
            style: 'padding-top:10px;' // box style
            // class: '', // box class
          },
          position: {
            row: [2, 1],
            col: [9, 2],
            mobile: [2, 2, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
        {
          option: {
            type: 'buttonList', // select/input/buttonList
            options: {
              type: 'default',
              searchModeOption: 'containted',
              content: '',
              icon: '',
              style: 'width: 100px; margin-top: 0.1%;margin-left: 0.1%; height:70%;', // 버튼 style
              listStyle: 'margin-top: 10px;' // 리스트 style
            },
            list: [{ id: 'btnSearch' }, { id: 'btnAdd' }] // 버튼 리스트
          },
          position: {
            row: [2, 1], // row start, row span
            col: [11, 2], // col start, col span
            mobile: [7, 7, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
          }
        },
        {
          id: 'email',
          title: {
            label: 'email',
            width: '20%'
          },
          value: '',
          option: {
            type: 'input', // input
            kind: 'text', // text/textArea
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '80%'
          },
          validation: {
            kind: 'email', // email /
            required: true, // 필수입력
            kindMsg: '올바른 이메일 형식이 아닙니다.', // 데이터 형식이 다를 때 메시지
            requiredMsg: '이메일은 필수입력 사항입니다.', // 미입력시 메시지
            asyncMsg: '이메일이 이미 등록되었습니다.', // 데이터 중복시 메시지
            asyncList: ['aaa@aaa.com', 'bbb@bbb.co.kr'] // 현재 중복된 데이터 리스트
          },
          position: {
            row: [3, 1],
            col: [1, 3]
          }
        },
        {
          id: 'password',
          title: {
            label: 'password',
            width: '40%'
          },
          value: '',
          option: {
            type: 'input', // input
            kind: 'text', // text/textArea
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'password',
            width: '60%'
          },
          validation: {
            required: true, // 필수입력
            requiredMsg: '비밀번호는 필수입력 사항입니다.' // 미입력시 메시지
          },
          position: {
            row: [3, 1],
            col: [4, 2]
          }
        },
        {
          id: 'passwordConfirm',
          title: {
            label: 'passwordConfirm',
            width: '40%'
          },
          value: '',
          option: {
            type: 'input', // input
            kind: 'text', // text/textArea
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'password',
            width: '60%'
          },
          validation: {
            kind: 'passwordConfirm', // email / passwordConfirm
            compareValue: '1234', // 비교 비밀번호
            required: true, // 필수입력
            notMatchMsg: '비밀번호가 일치하지 않습니다.', // 불일치시 메시지
            requiredMsg: '비밀번호확인은 필수입력 사항입니다.' // 미입력시 메시지
          },
          position: {
            row: [3, 1],
            col: [6, 3]
          }
        },
        {
          id: 'namePattern',
          title: {
            label: 'namePattern',
            width: '40%'
          },
          value: '',
          option: {
            type: 'input', // input
            kind: 'text', // text/textArea
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '60%'
          },
          validation: {
            pattern: /^[^0-9]+$/, // 데이터 형식(이름 패턴(숫자x))
            stringMin: 2, // string 길이 최소값
            required: true, // 필수입력
            patternMsg: '올바른 이름 형식이 아닙니다.', // 데이터 형식이 다를 때 메시지
            stringMinMsg: '이름은 두글자이상 입력해야 합니다.', // string 길이 최소값 이하시 메시지
            requiredMsg: '이름은 필수입력 사항입니다.', // 미입력시 메시지
            asyncMsg: '이름이 이미 등록되어있습니다.', // 데이터 중복시 메시지
            asyncList: ['김경환', 'gyeonghwan'] // 현재 중복된 데이터 리스트
          },
          position: {
            row: [3, 1],
            col: [9, 3]
          }
        },
        {
          id: 'phone',
          title: {
            label: 'phone',
            width: '30%'
          },
          value: '',
          option: {
            type: 'input', // input
            kind: 'text', // text/textArea
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '70%',
            mask: {
              rules: {
                X: /[0-9]/
              }, // 전화번호 룰
              useMask: true,
              pattern: '000-0000-0000', // 전화번호 번호 패턴
              maskMsg: '전화번호 형식을 준수해야 합니다.' // mask 형식 메시지
            }
          },
          validation: {
            required: true, // 필수입력
            pattern: /^\d{3}-\d{3,4}-\d{4}$/, // 데이터 형식(전화번호)
            patternMsg: '올바른 전화번호 형식이 아닙니다.', // 데이터 형식이 다를 때 메시지
            requiredMsg: '전화번호는 필수입력 사항입니다.' // 미입력시 메시지
          },
          position: {
            row: [4, 1],
            col: [1, 3]
          }
        },
        {
          id: 'content1',
          title: {
            icon: 'red', // red / blue
            label: '선택',
            width: '30%' // 라벨 길이
          },
          value: '', // 표시값
          itemList: [
            {
              value: '1',
              label: '데이터1'
            },
            {
              value: '2',
              label: '데이터2'
            },
            {
              value: '3',
              label: '데이터3'
            },
            {
              value: '4',
              label: '데이터4'
            }
          ], // { value: 'id', label: '이름' }
          option: {
            type: 'select', // input/select/
            kind: 'default', // default/filter/remote
            clearbutton: false,
            searchenabled: false, // true: editable false: no editable
            placeholder: null,
            readOnly: false,
            disabled: false,
            width: '70%' // 박스 길이
          },
          validation: {
            required: true, // 필수입력
            requiredMsg: '선택은 필수입력 사항입니다.' // 미입력시 메시지
          },
          position: {
            row: [4, 1], // row start, row span
            col: [4, 3] // col start, col span
          }
        },
        {
          id: 'dxDateBox',
          title: {
            label: 'dxDateBox',
            width: '15%'
          },
          value: [],
          option: {
            type: 'dateBox',
            width: '85%',
            division: '~',
            data: [
              {
                kind: 'date', // date / time / datetime
                format: 'yyyy-MM-dd',
                clearbutton: true,
                pickertype: 'calendar', // native / calendar / rollers / list
                placeholder: '',
                readOnly: false,
                disabled: false,
                dateFormat: 'yyyy-MM-dd',
                txtMaxlength: 20,
                txtMode: 'password',
                style: 'width:100px;'
                // max: '2021-12-01',
                // min: '2000-01-01'
              },
              {
                kind: 'date', // date / time / datetime
                format: 'yyyy-MM-dd',
                clearbutton: true,
                pickertype: 'calendar', // native / calendar / rollers / list
                placeholder: '',
                readOnly: false,
                disabled: false,
                dateFormat: 'yyyy-MM-dd',
                txtMaxlength: 20,
                txtMode: 'password',
                style: 'width:100px;'
                // max: '2021-12-01',
                // min: '2000-01-01'
              }
            ]
          },
          validation: [
            {
              required: true, // 필수입력
              maxDate: '2020-06-01', // 최대 날짜값
              requiredMsg: '달력1은 필수입력 사항입니다.', // 미입력시 메시지
              maxDateMsg: '달력1은 작년 6월전이여야 합니다.' // 미입력시 메시지
            },
            {
              required: true, // 필수입력
              maxDate: '2021-04-27', // 최대 날짜값
              requiredMsg: '달력2는 필수입력 사항입니다.', // 미입력시 메시지
              maxDateMsg: '달력2는 1달전까지 선택가능합니다.' // 미입력시 메시지
            }
          ],
          position: {
            row: [4, 1],
            col: [7, 4]
          }
        },
        {
          option: {
            type: 'button',
            options: {
              kind: 'DevExtreme',
              class: null,
              style: 'width: 95%; margin-top: 10px;margin-left: 0.1%;',
              id: 'check',
              type: 'normal',
              icon: 'check',
              disabled: false,
              content: 'check',
              stylingMode: 'contained',
              summary: true, // 필수입력 체크 후 메시지 표시
              summaryStyle: 'width:300px;height:100px;' // 필수입력 체크 필드 스타일
            }
          },
          position: {
            row: [5, 1], // row start, row span
            col: [6, 3] // col start, col span
          }
        }
      ]
    }
  }
}
