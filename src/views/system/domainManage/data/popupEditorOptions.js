import i18n from '@/i18n' // 언어 변환(매칭) component
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'

export default function getData() {
  return {
    popupData: {
      basic_info: {
        columns: 10,
        style: 'height:720px;overflow:auto;',
        editorList: [
          {
            id: 'domainCd',
            title: {
              icon: 'red',
              label: 'label.domain_cd',
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
            validation: {
              required: true, // 필수입력
              requiredMsg: '도메인 코드는 필수입력 사항입니다.', // 미입력시 메시지
              asyncMsg: '해당 코드는 이미 등록되어있습니다.', // 데이터 중복시 메시지
              asyncList: [] // 현재 중복된 데이터 리스트
            },
            position: {
              row: [1, 1],
              col: [1, 10]
            }
          },
          {
            id: 'domainNm',
            title: {
              icon: 'red',
              label: 'label.domain_nm',
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
              // pattern: /^[a-zA-Z가-힣\s]+$/, // 데이터 형식(이름 패턴(숫자x))
              // stringMin: 2, // string 길이 최소값
              required: true, // 필수입력
              // patternMsg: '올바른 이름 형식이 아닙니다.', // 데이터 형식이 다를 때 메시지
              // stringMinMsg: '이름은 두글자이상 입력해야 합니다.', // string 길이 최소값 이하시 메시지
              requiredMsg: '이름은 필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [2, 1],
              col: [1, 10]
            }
          },
          {
            id: 'domainStatusCd',
            title: {
              icon: 'red',
              label: 'label.status',
              width: '40%'
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
              width: '60%'
            },
            validation: {
              required: true, // 필수입력
              requiredMsg: '상태는 필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [3, 1],
              col: [1, 10]
            }
          },
          {
            id: 'joined_period',
            title: {
              icon: 'red',
              label: 'label.joined_period',
              width: '40%'
            },
            value: [],
            option: {
              type: 'dateBox',
              width: '60%',
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
                maxDate: '', // 최대 날짜값
                pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, // 데이터 형식(YYYY-MM-DD)
                patternMsg: `양식 예) 2020-06-01`, // 데이터 형식이 다를 때 메시지
                requiredMsg: '시작일은 필수입력 사항입니다.', // 미입력시 메시지
                maxDateMsg: '기간 시작일은 종료일보다 작아야 합니다.' // 미입력시 메시지
              },
              {
                required: true, // 필수입력
                // maxDate: '2021-04-27', // 최대 날짜값
                pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, // 데이터 형식(YYYY-MM-DD)
                patternMsg: `양식 예) 2020-06-01`, // 데이터 형식이 다를 때 메시지
                requiredMsg: '종료일 필수입력 사항입니다.' // 미입력시 메시지
                // maxDateMsg: '달력2는 1달전까지 선택가능합니다.' // 미입력시 메시지
              }
            ],
            position: {
              row: [4, 1],
              col: [1, 10]
            }
          },
          {
            id: 'companyNm',
            title: {
              icon: 'red',
              label: 'label.company_nm',
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
              // pattern: /^[0-9a-zA-z가-힣(),_-]+$/, // 데이터 형식
              required: true, // 필수입력
              // patternMsg: '한/영,숫자,특정문자[ ( ) , _ - ] 사용가능', // 데이터 형식이 다를 때 메시지
              requiredMsg: '회사이름은 필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [5, 1],
              col: [1, 10]
            }
          },
          {
            id: 'corrorateRegNo',
            title: {
              icon: 'red',
              label: 'label.corrorate_reg_no',
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
              pattern: /^[0-9-]{1,100}$/, // 데이터 형식(숫자만)
              requiredMsg: '사업자 등록번호는 필수입력 사항입니다.', // 미입력시 메시지
              patternMsg: "사업자 등록번호는 ' - '과 숫자만 입력 가능합니다." // 데이터 형식이 다를 때 메시지
            },
            position: {
              row: [6, 1],
              col: [1, 10]
            }
          },
          {
            id: 'postCode',
            title: {
              icon: 'red',
              label: '주소',
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
              placeholder: '우편번호',
              width: '20%'
            },
            validation: {
              required: true, // 필수입력
              requiredMsg: '필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [7, 1],
              col: [1, 10]
            }
          },
          {
            option: {
              type: 'button', // select/input/buttonList
              options: {
                kind: 'DevExtreme',
                class: null,
                style: 'width: 80%; margin-top: 10px;margin-left: 10%;',
                id: 'addressSearch',
                type: 'normal',
                icon: 'check',
                content: '주소검색',
                stylingMode: 'contained',
                visible: false,
                disabled: false
              }
            },
            position: {
              row: [7, 1], // row start, row span
              col: [7, 2] // col start, col span
              // mobile: [7, 7, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
            }
          },
          {
            id: 'address',
            title: {
              label: ' ',
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
              placeholder: '주소',
              width: '60%'
            },
            validation: {
              required: true, // 필수입력
              requiredMsg: '필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [8, 1],
              col: [1, 10]
            }
          },
          {
            id: 'addressDetail',
            title: {},
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: false,
              disabled: false,
              txtMaxlength: 30,
              placeholder: '상세주소',
              txtMode: 'text',
              width: '100%',
              style: 'margin-left:24.5%;'
            },
            validation: {
              required: true, // 필수입력
              requiredMsg: '필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [9, 1],
              col: [4, 4]
            }
          },
          {
            id: 'addressRef',
            title: {},
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: false,
              disabled: false,
              txtMaxlength: 30,
              placeholder: '참조항목',
              txtMode: 'text',
              width: '100%'
            },
            position: {
              row: [9, 1],
              col: [8, 3]
            }
          },
          {
            id: 'ownerNm',
            title: {
              icon: 'red',
              label: 'label.owner_nm',
              width: '40%'
            },
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: false,
              disabled: false,
              txtMaxlength: 10,
              txtMode: 'text',
              width: '60%'
            },
            validation: {
              pattern: /^[a-zA-z가-힣\s]+$/, // 데이터 형식(이름 패턴(숫자x))
              stringMin: 2, // string 길이 최소값
              required: true, // 필수입력
              patternMsg: '영문 도는 한글 입력가능', // 데이터 형식이 다를 때 메시지
              stringMinMsg: '이름은 두글자이상 입력해야 합니다.', // string 길이 최소값 이하시 메시지
              requiredMsg: '이름은 필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [10, 1],
              col: [1, 10]
            }
          },
          {
            id: 'phone',
            title: {
              icon: 'red',
              label: 'label.phone',
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
              pattern: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/, // 데이터 형식(전화번호)
              patternMsg: `'-'를 포함하여 입력해주세요.`, // 데이터 형식이 다를 때 메시지
              requiredMsg: '전화번호는 필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [11, 1],
              col: [1, 10]
            }
          },
          {
            id: 'fax',
            title: {
              icon: 'blue',
              label: 'label.fax',
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
            position: {
              row: [12, 1],
              col: [1, 10]
            }
          },
          {
            id: 'email',
            title: {
              icon: 'red',
              label: 'label.email',
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
              kind: 'email', // email /
              required: true, // 필수입력
              patternMsg: '올바른 이메일 형식이 아닙니다.', // 데이터 형식이 다를 때 메시지
              requiredMsg: '이메일은 필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [13, 1],
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
                content: 'check',
                stylingMode: 'contained',
                summary: true, // 필수입력 체크 후 메시지 표시
                summaryStyle: 'width:300px;' // 필수입력 체크 필드 스타일
              }
            },
            position: {
              row: [15, 1], // row start, row span
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
              row: [15, 1], // row start, row span
              col: [10, 1] // col start, col span
            }
          }
        ]
      },
      etc_info: {
        columns: 10,
        editorList: [
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
              row: [1, 1],
              col: [1, 10]
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
              row: [2, 1],
              col: [1, 10]
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
              row: [3, 1],
              col: [1, 10]
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
              row: [4, 1],
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
              width: '60%'
            },
            position: {
              row: [5, 1],
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
                content: 'check',
                stylingMode: 'contained',
                summary: true, // 필수입력 체크 후 메시지 표시
                summaryStyle: 'width:300px;' // 필수입력 체크 필드 스타일
              }
            },
            position: {
              row: [14, 1], // row start, row span
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
              row: [14, 1], // row start, row span
              col: [10, 1] // col start, col span
            }
          }
        ]
      }
    }
  }
}
