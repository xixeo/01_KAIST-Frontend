import i18n from '@/i18n' // 언어 변환(매칭) component

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
              label: 'label.domain_nm',
              width: '40%'
            },
            value: '',
            itemList: [],
            option: {
              type: 'select', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
              kind: 'default', // default/filter/remote
              clearbutton: false,
              placeholder: '도메인코드',
              readOnly: false,
              disabled: false,
              searchenabled: true,
              width: '60%'
            },
            validation: {
              kind: 'select', // email / passwordConfirm / name / phone / select
              required: true, // 필수입력
              requiredMsg: '도메인이름은 필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [1, 1],
              col: [1, 10]
            }
          },
          {
            id: 'userId',
            title: {
              icon: 'red',
              label: 'userManage.userId',
              width: '40%'
            },
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: true,
              disabled: false,
              txtMaxlength: 15,
              txtMode: 'text',
              width: '60%'
            },
            validation: {
              pattern: /^[a-zA-Z0-9_]{2,12}$/, // 데이터 형식(이름 패턴(숫자x))
              stringMin: 2, // string 길이 최소값
              required: true, // 필수입력
              patternMsg: `영문,숫자,'_'으로만 이루어진 2~12자.`, // 데이터 형식이 다를 때 메시지
              asyncMsg: '아이디가 이미 등록되어있습니다.', // 데이터 중복시 메시지
              asyncList: [] // 현재 중복된 데이터 리스트
            },
            position: {
              row: [2, 1],
              col: [1, 10]
            }
          },
          {
            id: 'asgnCd',
            title: {
              icon: 'red',
              label: 'userManage.asgnCd',
              width: '40%'
            },
            value: '',
            option: {
              type: 'select', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
              kind: 'default', // default/filter/remote
              clearbutton: false,
              placeholder: '조직코드',
              readOnly: false,
              disabled: false,
              searchenabled: true, // true: editable false: no editable
              width: '60%' // 박스 길이
            },
            itemList: [],
            validation: {
              kind: 'select', // email / passwordConfirm / name / phone / select
              required: true, // 필수입력
              requiredMsg: '조직이름은 필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [3, 1],
              col: [1, 10]
            }
          },
          {
            id: 'userNm',
            title: {
              icon: 'red',
              label: 'userManage.userNm',
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
              pattern: /^[가-힣\s]+$/, // 데이터 형식(한글 패턴(숫자x))
              required: true, // 필수입력
              patternMsg: '올바른 이름 형식이 아닙니다.', // 데이터 형식이 다를 때 메시지
              requiredMsg: '이름은 필수입력 사항입니다.', // 미입력시 메시지
            },
            position: {
              row: [4, 1],
              col: [1, 10]
            }
          },
          {
            id: 'userNmEn',
            title: {
              icon: 'red',
              label: 'userManage.userNmEn',
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
              pattern: /^[a-zA-Z\s+]+$/, // 데이터 형식(영어 이름 패턴(숫자x))
              required: true, // 필수입력
              patternMsg: '영문만 입력가능합니다.', // 데이터 형식이 다를 때 메시지
              requiredMsg: '이름(영문)은 필수입력 사항입니다.', // 미입력시 메시지
            },
            position: {
              row: [5, 1],
              col: [1, 10]
            }
          },
          {
            id: 'useYn',
            title: {
              icon: 'red',
              label: 'label.use_yn',
              width: '40%'
            },
            option: {
              type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
              disabled: false,
              readOnly: true,
              visible: true,
              text: '',
              width: '23px',
              style: 'padding-top:10px;' // box style
            },
            value: true,
            validation: {
              kind: 'select', // email / passwordConfirm / name / phone / select
              required: true, // 필수입력
              requiredMsg: '사용여부은 필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [6, 1],
              col: [1, 10]
            }
          },
          {
            id: 'userType',
            title: {
              icon: 'red',
              label: 'userManage.userType',
              width: '40%'
            },
            value: '',
            option: {
              type: 'select', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
              kind: 'default', // default/filter/remote
              clearbutton: false,
              placeholder: '사용자 타입',
              readOnly: false,
              disabled: false,
              searchenabled: true,
              width: '60%'
            },
            itemList: [],
            validation: {
              kind: 'select', // email / passwordConfirm / name / phone / select
              required: true, // 필수입력
              requiredMsg: '사용자타입은 필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [7, 1],
              col: [1, 10]
            }
          },
          {
            id: 'offiTel',
            title: {
              icon: 'red',
              label: 'userManage.offiTel',
              width: '40%'
            },
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: false,
              disabled: false,
              placeholder: '',
              txtMaxlength: 15,
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
              row: [8, 1],
              col: [1, 10]
            }
          },
          {
            id: 'email',
            title: {
              icon: 'red',
              label: 'userManage.email',
              width: '40%'
            },
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: false,
              disabled: false,
              txtMaxlength: 50,
              txtMode: 'text',
              width: '60%'
            },
            validation: {
              kind: 'email', // email /
              required: true, // 필수입력
              patternMsg: '올바른 이메일 형식이 아닙니다.', // 데이터 형식이 다를 때 메시지
              requiredMsg: '이메일은 필수입력 사항입니다.', // 미입력시 메시지
            },
            position: {
              row: [9, 1],
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
              row: [10, 1], // row start, row span
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
              row: [11, 1], // row start, row span
              col: [10, 1] // col start, col span
            }
          }
        ]
      },
      etc_info: {
        columns: 10,
        editorList: [
          {
            id: 'nickNm',
            title: {
              icon: 'blue',
              label: 'userManage.nickNm',
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
            position: {
              row: [1, 1],
              col: [1, 10]
            }
          },
          {
            id: 'note',
            title: {
              icon: 'blue',
              label: 'userManage.note',
              width: '40%'
            },
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'textArea', // text/textArea
              height: '80',
              readOnly: false,
              maxLength: 50,
              width: '60%'
            },
            position: {
              row: [2, 1],
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
              row: [3, 1],
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
              row: [4, 1],
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
              row: [5, 1],
              col: [1, 10]
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
              row: [7, 1], // row start, row span
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
              row: [8, 1], // row start, row span
              col: [10, 1] // col start, col span
            }
          }
        ]
      },
      change_pass: {
        columns: 12,
        editorList: [
          {
            id: 'checkPass',
            title: {
              icon: 'red',
              label: 'userManage.checkPass',
              width: '40%'
            },
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: false,
              disabled: false,
              txtMaxlength: 25,
              txtMode: 'password',
              width: '60%',
              visible: true
            },
            // validation: {
            //   required: true, // 필수입력
            //   requiredMsg: '비밀번호는 필수입력 사항입니다.' // 미입력시 메시지
            // },
            position: {
              row: [1, 1],
              col: [1, 12]
            }
          },
          {
            id: 'changePass',
            title: {
              icon: 'red',
              label: 'userManage.changePass',
              width: '40%'
            },
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: false,
              disabled: false,
              txtMaxlength: 25,
              txtMode: 'password',
              width: '60%',
              visible: false
            },
            // validation: {
            //   required: true, // 필수입력
            //   requiredMsg: '비밀번호는 필수입력 사항입니다.' // 미입력시 메시지
            // },
            position: {
              row: [2, 1],
              col: [1, 12]
            }
          },
          {
            id: 'verifyPass',
            title: {
              icon: 'red',
              label: 'userManage.verifyPass',
              width: '40%'
            },
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: false,
              disabled: false,
              visible: false,
              txtMaxlength: 25,
              txtMode: 'password',
              width: '60%',
              visible: false
            },
            // validation: {
            //   kind: 'passwordConfirm', // email / passwordConfirm
            //   compareValue: '1234', // 비교 비밀번호
            //   required: true, // 필수입력
            //   notMatchMsg: '비밀번호가 일치하지 않습니다.', // 불일치시 메시지
            //   requiredMsg: '비밀번호확인은 필수입력 사항입니다.' // 미입력시 메시지
            // },
            position: {
              row: [3, 1],
              col: [1, 12]
            }
          },
          {
            option: {
              type: 'button', // select/input/buttonList
              options: {
                kind: 'DevExtreme',
                class: null,
                style: 'width: 95%; margin-top: 10px;margin-left: 0.1%;',
                id: 'btnCheckPass',
                type: 'normal',
                icon: 'check',
                content: 'btnCheck',
                stylingMode: 'contained',
                visible:true,
                disabled: false
              }
            },
            position: {
              row: [4, 1], // row start, row span
              col: [11, 2], // col start, col span
              // mobile: [7, 7, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
            }
          },
          {
            option: {
              type: 'button', // select/input/buttonList
              options: {
                kind: 'DevExtreme',
                class: null,
                style: 'width: 95%; margin-top: 10px;margin-left: 0.1%;',
                id: 'btnChangePass',
                type: 'normal',
                icon: 'check',
                content: 'btnChange',
                stylingMode: 'contained',
                visible: false,
                disabled: false
              }
            },
            position: {
              row: [4, 1], // row start, row span
              col: [11, 2], // col start, col span
              // mobile: [7, 7, 1, 2] // 모바일 사이즈 row start, row span, col start, col span
            }
          }
        ]
      }
    }
  }
}
