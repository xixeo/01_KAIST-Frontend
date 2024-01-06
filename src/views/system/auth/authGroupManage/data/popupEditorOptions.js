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
              label: 'authgrpManage.domain_nm',
              width: '40%'
            },
            value: '',
            itemList: [],
            option: {
              type: 'select', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
              kind: 'default', // default/filter/remote
              clearbutton: false,
              placeholder: '도메인이름',
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
            id: 'authgrpCd',
            title: {
              icon: 'red',
              label: 'authgrpManage.authgrp_cd',
              width: '40%'
            },
            value: '',
            option: {
              type: 'input', // input/select/filterSelect
              kind: 'text', // text/textArea
              readOnly: false,
              disabled: false,
              txtMaxlength: 12,
              txtMode: 'text',
              width: '60%'
            },
            validation: {
              pattern: /^[a-zA-Z0-9_\s+]{2,12}$/, // 데이터 형식(이름 패턴(숫자x))
              stringMin: 1, // string 길이 최소값
              required: true, // 필수입력
              patternMsg: `영문,숫자,'_'으로만 이루어진 1~12자`, // 데이터 형식이 다를 때 메시지
              stringMinMsg: '권한그룹코드는 한글자이상 입력해야 합니다.', // string 길이 최소값 이하시 메시지
              requiredMsg: '권한그룹코드는 필수입력 사항입니다.', // 미입력시 메시지
              asyncMsg: '권한그룹코드가 이미 등록되어있습니다.', // 데이터 중복시 메시지
              asyncList: [] // 현재 중복된 데이터 리스트
            },
            position: {
              row: [2, 1],
              col: [1, 10]
            }
          },
          {
            id: 'authgrpNm',
            title: {
              icon: 'red',
              label: 'authgrpManage.authgrp_nm',
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
              pattern: /^[A-Za-z0-9가-힣_\s+]+$/, // 데이터 형식(이름 패턴(숫자x))
              stringMin: 1, // string 길이 최소값
              required: true, // 필수입력
              patternMsg: `한글,영문,숫자,'_'으로만 이루어진 1~10자`, // 데이터 형식이 다를 때 메시지
              stringMinMsg: '권한그룹명은 한글자이상 입력해야 합니다.', // string 길이 최소값 이하시 메시지
              requiredMsg: '권한그룹명은 필수입력 사항입니다.', // 미입력시 메시지
              asyncMsg: '권한그룹명이 이미 등록되어있습니다.', // 데이터 중복시 메시지
              asyncList: [] // 현재 중복된 데이터 리스트
            },
            position: {
              row: [3, 1],
              col: [1, 10]
            }
          },
          {
            id: 'authgrpType',
            title: {
              icon: 'red',
              label: 'authgrpManage.type_nm',
              width: '40%'
            },
            value: '',
            itemList: [],
            option: {
              type: 'select', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
              kind: 'default', // default/filter/remote
              clearbutton: false,
              placeholder: '권한유형',
              readOnly: false,
              disabled: false,
              searchenabled: true,
              width: '60%'
            },
            validation: {
              kind: 'select', // email / passwordConfirm / name / phone / select
              required: true, // 필수입력
              requiredMsg: '권한유형은 필수입력 사항입니다.' // 미입력시 메시지
            },
            position: {
              row: [4, 1],
              col: [1, 10]
            }
          },
          {
            id: 'useYn',
            title: {
              icon: 'red',
              label: 'authgrpManage.use_yn',
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
            position: {
              row: [5, 1],
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
              row: [6, 1],
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
              row: [7, 1],
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
              row: [8, 1],
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
              height: '80',
              readOnly: true,
              maxLength: 100,
              width: '60%'
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
      }
    }
  }
}
