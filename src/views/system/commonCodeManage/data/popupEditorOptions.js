import i18n from '@/i18n' // 언어 변환(매칭) component
export default function getData() {
  return {
    popupData: {
      basic_info: {
        columns: 10,
        style: 'height:720px;overflow:auto;',
        editorList: [
          {
            id: 'codeCd',
            title: {
              icon: 'red',
              label: 'label.cmcode_cd',
              width: '40%'
            },
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: false,
              disabled: false,
              txtMaxlength: 30,
              txtMode: 'text',
              width: '60%'
            },
            validation: {
              required: true, // 필수입력
              requiredMsg: '분류코드는 필수입력 사항입니다.33', // 미입력시 메시지
              asyncMsg: '해당 코드는 이미 등록되어있습니다.', // 데이터 중복시 메시지
              asyncList: [] // 현재 중복된 데이터 리스트
            },
            position: {
              row: [1, 1],
              col: [1, 10]
            }
          },
          {
            id: 'codeNm',
            title: {
              icon: 'red',
              label: 'label.cmcode_nm',
              width: '40%'
            },
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: false,
              disabled: false,
              txtMaxlength: 30,
              txtMode: 'text',
              width: '60%'
            },
            validation: {
              required: true, // 필수입력
              requiredMsg: '분류명은 필수입력 사항입니다.222' // 미입력시 메시지
            },
            position: {
              row: [2, 1],
              col: [1, 10]
            }
          },
          {
            id: 'sort',
            title: {
              icon: 'blue',
              label: 'label.sort',
              width: '40%'
            },
            value: '',
            validation: {
              //pattern: /^[0-9]$/, // 데이터 형식(숫자)
              pattern: /^[0-9]+$/, // 데이터 형식(이름 패턴(숫자x))
              patternMsg: `숫자만 입력해주세요.` // 데이터 형식이 다를 때 메시지
            },
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: false,
              disabled: false,
              txtMaxlength: 30,
              txtMode: 'text',
              width: '60%'
            },
            position: {
              row: [3, 1],
              col: [1, 10]
            }
          },
          {
            id: 'note',
            title: {
              icon: 'blue',
              label: 'label.memo',
              width: '40%'
            },
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'textArea', // text/textArea
              height: '80',
              readOnly: false,
              maxLength: 100,
              txtMode: 'text',
              width: '60%'
            },
            position: {
              row: [4, 1],
              col: [1, 10]
            }
          },
          {
            option: {
              type: 'button',
              options: {
                kind: 'DevExtreme',
                class: null,
                style: 'width: 80px; margin-top: 10px;margin-right: 1%;',
                id: 'success',
                type: 'success',
                disabled: false,
                content: '추가',
                stylingMode: 'contained',
                summary: true, // 필수입력 체크 후 메시지 표시
                summaryStyle: 'width:300px;' // 필수입력 체크 필드 스타일
              }
            },
            position: {
              row: [5, 1], // row start, row span
              col: [5, 5] // col start, col span
            }
          },
          {
            option: {
              type: 'button',
              options: {
                kind: 'DevExtreme',
                class: null,
                style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
                id: 'close',
                type: 'normal',
                disabled: false,
                content: 'btnClose',
                stylingMode: 'contained'
              }
            },
            position: {
              row: [5, 1], // row start, row span
              col: [10, 1] // col start, col span
            }
          }
        ]
      }
    }
  }
}
