import i18n from '@/i18n' // 언어 변환(매칭) component
import { getUserId } from '@/utils/token'

export default function getData() {
  return {
    //deviceManager
    deviceSearchData: {
      columns: 20,
      editorList: [
        {
          id: 'deviceGrpId',
          title: {
            label: 'label.device_grp_search',
            width: '8%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '그룹코드',
            width: '16%'
          },
          position: {
            row: [1, 1],
            col: [1, 10]
          }
        },
        {
          id: 'deviceId',
          title: {
            label: 'label.device_id_search',
            width: '12%'
          },
          value: '',
          itemList: [],
          style: 'margin-left:100px;',
          option: {
            type: 'input',
            kind: 'text',
            txtMaxlength: 30,
            readOnly: false,
            disabled: false,
            width: '12%'
          },
          position: {
            row: [1, 1],
            col: [3, 10]
          }
        }
      ]
    },
    deviceInsertData: {
      columns: 14,
      style: 'padding-left:50px;',
      editorList: [
        {
          id: 'deviceId',
          title: {
            icon: 'red',
            label: 'label.system_id',
            width: '21%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '18%',
            readOnly: true,
            visible: false
          },
          // validation: {
          //   required: true,
          //   requiredMsg: i18n.t('msg.required_check')
          // },
          position: {
            row: [1, 1],
            col: [1, 10]
          }
        },
        {
          id: 'deviceUniqueId',
          title: {
            icon: 'red',
            label: 'label.device_id',
            width: '21%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 30,
            txtMode: 'text',
            width: '23%'
          },
          validation: {
            required: true,
            requiredMsg: i18n.t('msg.required_check')
          },
          position: {
            row: [1, 1],
            col: [1, 10]
          }
        },
        {
          id: 'deviceNm',
          title: {
            icon: 'blue',
            label: 'label.device_name',
            width: '21%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 200,
            txtMode: 'text',
            width: '23%'
          },
          position: {
            row: [1, 1],
            col: [6, 10]
          }
        },
        {
          id: 'deviceGrpId',
          title: {
            icon: 'red',
            label: 'label.device_grp',
            width: '21%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '그룹코드',
            width: '23%'
          },
          position: {
            row: [2, 1],
            col: [1, 10]
          }
        },
        {
          id: 'deviceType',
          title: {
            icon: 'blue',
            label: 'label.device_type',
            width: '21%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '디바이스 타입',
            width: '23%'
          },
          position: {
            row: [2, 1],
            col: [6, 10]
          }
        },
        {
          id: 'apiUseYN',
          title: {
            icon: 'blue',
            label: 'label.api_use_yn',
            width: '21%'
          },
          value: true,
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [3, 1],
            col: [1, 10]
          }
        },
        {
          id: 'subUseYN',
          title: {
            icon: 'blue',
            label: 'label.sub_use_yn',
            width: '21%'
          },
          value: true,
          //style: 'margin-left:40px;',
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [3, 1],
            col: [6, 10]
          }
        },
        {
          id: 'dashUseYN',
          title: {
            icon: 'blue',
            label: 'label.device_dash_use_yn',
            width: '21%'
          },
          value: true,
          tooltip: true,
          tooltipText: '그룹의 대시보드 사용유무가 우선 적용',
          //style: 'margin-left:60px;',
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [4, 1],
            col: [1, 10]
          }
        },
        {
          id: 'deviceTimeout',
          title: {
            icon: 'blue',
            label: 'label.timeout',
            width: '21%'
          },
          value: '60',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            width: '23%'
          },
          position: {
            row: [4, 1],
            col: [6, 10]
          }
        },
        {
          id: 'deviceTimeoutDes',
          title: {
            label: '(Default : 60분)',
            width: '18%'
          },
          style: 'margin-left:35px;',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: true,
            txtMaxlength: 20,
            width: '0%'
          },
          position: {
            row: [4, 1],
            col: [10, 10]
          }
        },
        {
          id: 'topic',
          title: {
            icon: 'blue',
            label: 'label.topic',
            width: '21%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            width: '23%'
          },
          position: {
            row: [5, 1],
            col: [1, 10]
          }
        },
        {
          id: 'description',
          title: {
            icon: 'blue',
            label: 'userManage.note',
            width: '21%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 500,
            txtMode: 'text',
            width: '76%'
          },
          position: {
            row: [6, 1],
            col: [1, 10]
          }
        },
        {
          id: 'insertId',
          title: {
            icon: 'blue',
            label: 'label.insert_id',
            width: '21%'
          },
          value: getUserId(),
          option: {
            type: 'input',
            kind: 'text',
            readOnly: true,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '23%'
          },
          position: {
            row: [7, 1],
            col: [1, 10]
          }
        },
        {
          option: {
            type: 'button',
            options: {
              kind: 'DevExtreme',
              class: null,
              style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
              id: 'btnAdd',
              type: 'add',
              disabled: false,
              content: '추가',
              stylingMode: 'contained'
            }
          },
          position: {
            row: [10, 1],
            col: [5, 1]
          }
        },
        {
          option: {
            type: 'button',
            options: {
              kind: 'DevExtreme',
              class: null,
              style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
              id: 'btnCancel',
              type: 'normal',
              disabled: false,
              content: 'btnClose',
              stylingMode: 'contained'
            }
          },
          position: {
            row: [10, 1], // row start, row span
            col: [6, 1] // col start, col span
          }
        }
      ]
    },
    deviceUpdateData: {
      columns: 14,
      style: 'padding-left:50px;',
      editorList: [
        {
          id: 'deviceId',
          title: {
            icon: 'red',
            label: 'label.system_id',
            width: '21%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: true,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '18%',
            visible: false
          },
          position: {
            row: [1, 1],
            col: [1, 10]
          }
        },
        {
          id: 'deviceUniqueId',
          title: {
            icon: 'red',
            label: 'label.device_id',
            width: '21%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: true,
            disabled: false,
            txtMaxlength: 30,
            txtMode: 'text',
            width: '22%'
          },
          position: {
            row: [1, 1],
            col: [1, 10]
          }
        },
        {
          id: 'deviceNm',
          title: {
            icon: 'blue',
            label: 'label.device_name',
            width: '20%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 200,
            txtMode: 'text',
            width: '23%'
          },
          position: {
            row: [1, 1],
            col: [6, 10]
          }
        },
        {
          id: 'deviceGrpId',
          title: {
            icon: 'blue',
            label: 'label.device_grp',
            width: '21%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '그룹코드',
            width: '23%'
          },
          position: {
            row: [2, 1],
            col: [1, 10]
          }
        },
        {
          id: 'deviceType',
          title: {
            icon: 'blue',
            label: 'label.device_type',
            width: '20%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '디바이스 타입',
            width: '23%'
          },
          position: {
            row: [2, 1],
            col: [6, 10]
          }
        },
        {
          id: 'apiUseYN',
          title: {
            icon: 'blue',
            label: 'label.api_use_yn',
            width: '21%'
          },
          value: false,
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [3, 1],
            col: [1, 10]
          }
        },
        {
          id: 'subUseYN',
          title: {
            icon: 'blue',
            label: 'label.sub_use_yn',
            width: '20%'
          },
          value: false,
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [3, 1],
            col: [6, 10]
          }
        },
        {
          id: 'dashUseYN',
          title: {
            icon: 'blue',
            label: 'label.device_dash_use_yn',
            width: '21%'
          },
          value: false,
          tooltip: true,
          tooltipText: '그룹의 대시보드 사용유무가 우선 적용',
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [4, 1],
            col: [1, 10]
          }
        },
        {
          id: 'deviceTimeout',
          title: {
            icon: 'blue',
            label: 'label.timeout',
            width: '20%'
          },
          value: '60',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 500,
            width: '23%'
          },
          position: {
            row: [4, 1],
            col: [6, 10]
          }
        },
        {
          id: 'deviceTimeoutDes',
          title: {
            label: '(Default : 60분)',
            width: '18%'
          },
          style: 'margin-left:35px;',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: true,
            txtMaxlength: 20,
            width: '0%'
          },
          position: {
            row: [4, 1],
            col: [10, 10]
          }
        },
        {
          id: 'topic',
          title: {
            icon: 'blue',
            label: 'label.topic',
            width: '21%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            width: '22%'
          },
          position: {
            row: [5, 1],
            col: [1, 10]
          }
        },
        {
          id: 'description',
          title: {
            icon: 'blue',
            label: 'userManage.note',
            width: '21%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '77%'
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
            width: '21%'
          },
          value: getUserId(),
          option: {
            type: 'input',
            kind: 'text',
            readOnly: true,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '23%'
          },
          position: {
            row: [7, 1],
            col: [1, 10]
          }
        },
        {
          option: {
            type: 'button',
            options: {
              kind: 'DevExtreme',
              class: null,
              style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
              id: 'btnAdd',
              type: 'add',
              disabled: false,
              content: '수정',
              stylingMode: 'contained',
              summary: true // 필수입력 체크 후 메시지 표시
            }
          },
          position: {
            row: [10, 1],
            col: [4, 1]
          }
        },
        {
          option: {
            type: 'button',
            options: {
              kind: 'DevExtreme',
              class: null,
              style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
              id: 'btnCancel',
              type: 'normal',
              disabled: false,
              content: 'btnClose',
              stylingMode: 'contained'
            }
          },
          position: {
            row: [10, 1], // row start, row span
            col: [5, 1] // col start, col span
          }
        }
      ]
    },
    //deviceGrpManager
    groupCodeData: {
      columns: 1,
      editorList: [
        {
          id: 'deviceGrpId',
          title: {
            label: 'label.grid_device_grp',
            width: '8%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '그룹코드',
            width: '16%'
          },
          position: {
            row: [1, 1],
            col: [1, 1]
          }
        }
      ]
    },
    grpInsertData: {
      columns: 10,
      style: 'padding-left:50px;',
      editorList: [
        {
          id: 'deviceGrpId',
          title: {
            icon: 'red',
            label: 'label.grp_cd',
            width: '10%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '15%'
          },
          validation: {
            required: true,
            requiredMsg: i18n.t('msg.required_check')
          },
          position: {
            row: [1, 1],
            col: [1, 10]
          }
        },
        {
          id: 'deviceGrpNm',
          title: {
            icon: 'blue',
            label: 'label.grp_nm',
            width: '16%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 200,
            txtMode: 'text',
            width: '23%'
          },
          position: {
            row: [1, 1],
            col: [4, 10]
          }
        },
        {
          id: 'useYN',
          title: {
            icon: 'blue',
            label: 'label.grp_sub_use_yn',
            width: '12%'
          },
          value: true,
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [2, 1],
            col: [1, 10]
          }
        },
        {
          id: 'dashUseYN',
          title: {
            icon: 'blue',
            label: 'label.grp_dash_use_yn',
            width: '16%'
          },
          value: true,
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [2, 1],
            col: [4, 10]
          }
        },
        {
          id: 'description',
          title: {
            icon: 'blue',
            label: 'userManage.note',
            width: '10%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 500,
            txtMode: 'text',
            width: '66%'
          },
          position: {
            row: [3, 1],
            col: [1, 10]
          }
        },
        {
          id: 'insertId',
          title: {
            icon: 'blue',
            label: 'label.insert_id',
            width: '10%'
          },
          value: getUserId(),
          option: {
            type: 'input',
            kind: 'text',
            readOnly: true,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '15%'
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
              style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
              id: 'btnAdd',
              type: 'add',
              disabled: false,
              content: '추가',
              stylingMode: 'contained'
            }
          },
          position: {
            row: [10, 1],
            col: [4, 1]
          }
        },
        {
          option: {
            type: 'button',
            options: {
              kind: 'DevExtreme',
              class: null,
              style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
              id: 'btnCancel',
              type: 'normal',
              disabled: false,
              content: 'btnClose',
              stylingMode: 'contained'
            }
          },
          position: {
            row: [10, 1], // row start, row span
            col: [5, 1] // col start, col span
          }
        }
      ]
    },
    //update
    grpUpdateData: {
      columns: 10,
      style: 'padding-left:50px;',
      editorList: [
        {
          id: 'deviceGrpId',
          title: {
            icon: 'red',
            label: 'label.grp_cd',
            width: '10%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: true,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '15%'
          },
          validation: {
            required: true,
            requiredMsg: i18n.t('msg.required_check')
          },
          position: {
            row: [1, 1],
            col: [1, 10]
          }
        },
        {
          id: 'deviceGrpNm',
          title: {
            icon: 'blue',
            label: 'label.grp_nm',
            width: '16%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 200,
            txtMode: 'text',
            width: '23%'
          },
          position: {
            row: [1, 1],
            col: [4, 10]
          }
        },
        {
          id: 'useYN',
          title: {
            icon: 'blue',
            label: 'label.grp_sub_use_yn',
            width: '12%'
          },
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [2, 1],
            col: [1, 10]
          }
        },
        {
          id: 'dashUseYN',
          title: {
            icon: 'blue',
            label: 'label.grp_dash_use_yn',
            width: '16%'
          },
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [2, 1],
            col: [4, 10]
          }
        },
        {
          id: 'description',
          title: {
            icon: 'blue',
            label: 'userManage.note',
            width: '10%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 500,
            txtMode: 'text',
            width: '66%'
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
            width: '10%'
          },
          value: getUserId(),
          option: {
            type: 'input',
            kind: 'text',
            readOnly: true,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '15%'
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
              style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
              id: 'btnAdd',
              type: 'add',
              disabled: false,
              content: '수정',
              stylingMode: 'contained',
              summary: true // 필수입력 체크 후 메시지 표시
            }
          },
          position: {
            row: [10, 1],
            col: [4, 1]
          }
        },
        {
          option: {
            type: 'button',
            options: {
              kind: 'DevExtreme',
              class: null,
              style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
              id: 'btnCancel',
              type: 'normal',
              disabled: false,
              content: 'btnClose',
              stylingMode: 'contained'
            }
          },
          position: {
            row: [10, 1], // row start, row span
            col: [5, 1] // col start, col span
          }
        }
      ]
    },
    dispSearchData: {
      columns: 20,
      editorList: [
        {
          id: 'dispGubn',
          title: {
            label: 'label.disp_gubn',
            width: '7%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '표시구분',
            width: '11%'
          },
          position: {
            row: [1, 1],
            col: [1, 10]
          }
        },
        {
          id: 'dispGubnCode',
          title: {
            label: 'label.disp_gubn_code',
            width: '9%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'input',
            kind: 'text',
            txtMaxlength: 30,
            readOnly: false,
            disabled: false,
            width: '20%'
          },
          position: {
            row: [1, 1],
            col: [3, 10]
          }
        }
      ]
    },
    dispInsertData: {
      columns: 14,
      style: 'padding-left:50px;',
      editorList: [
        {
          id: 'dispGubn',
          title: {
            icon: 'red',
            label: 'label.disp_gubn',
            width: '15%'
          },
          value: 'DEFAULT',
          itemList: [],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '그룹코드',
            width: '17%'
          },
          validation: {
            required: true,
            requiredMsg: i18n.t('msg.required_check')
          },
          position: {
            row: [1, 1],
            col: [1, 10]
          }
        },
        {
          id: 'dispGubnCode',
          title: {
            icon: 'red',
            label: 'label.disp_gubn_code',
            width: '17%'
          },
          value: 'DEFAULT',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: true,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '25%'
          },
          validation: {
            required: true,
            requiredMsg: i18n.t('msg.required_check')
          },
          position: {
            row: [1, 1],
            col: [5, 10]
          }
        },
        {
          id: 'displayCol',
          title: {
            icon: 'red',
            label: 'label.display_col',
            width: '15%'
          },
          value: '',
          itemList: [],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '컬럼',
            width: '17%'
          },
          validation: {
            required: true,
            requiredMsg: i18n.t('msg.required_check')
          },
          position: {
            row: [2, 1],
            col: [1, 10]
          }
        },
        {
          id: 'displayColDes',
          value: '',
          itemList: [],
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            visible: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '20%'
          },
          validation: {
            required: true,
            requiredMsg: i18n.t('msg.required_check')
          },
          style: 'padding-top:17px;margin-left:60px;',
          position: {
            row: [2, 1],
            col: [4, 10]
          }
        },
        {
          id: 'displayColNm',
          title: {
            icon: 'blue',
            label: 'label.display_col_nm',
            width: '17%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 500,
            txtMode: 'text',
            width: '25%'
          },
          position: {
            row: [2, 1],
            col: [5, 10]
          }
        },
        {
          id: 'fieldtype',
          title: {
            icon: 'red',
            label: 'label.fieldtype',
            width: '15%'
          },
          value: 'string',
          itemList: [
            { value: 'string', label: 'string' },
            { value: 'date', label: 'date' },
            { value: 'number', label: 'number' } //by lyj
          ],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '필드타입',
            width: '17%'
          },
          validation: {
            required: true,
            requiredMsg: i18n.t('msg.required_check')
          },
          position: {
            row: [3, 1],
            col: [1, 10]
          }
        },
        {
          id: 'format',
          title: {
            icon: 'blue',
            label: 'label.format',
            width: '17%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '25%'
          },
          position: {
            row: [3, 1],
            col: [5, 10]
          }
        },
        {
          id: 'alignment',
          title: {
            icon: 'red',
            label: 'label.alignment',
            width: '15%'
          },
          value: 'center',
          itemList: [
            { value: 'center', label: 'center' },
            { value: 'left', label: 'left' },
            { value: 'right', label: 'right' }
          ],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '데이터 정렬',
            width: '17%'
          },
          validation: {
            required: true,
            requiredMsg: i18n.t('msg.required_check')
          },
          position: {
            row: [4, 1],
            col: [1, 10]
          }
        },
        {
          id: 'width',
          title: {
            icon: 'blue',
            label: 'label.width',
            width: '17%'
          },
          value: '100',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '25%'
          },
          position: {
            row: [4, 1],
            col: [5, 10]
          }
        },
        {
          id: 'max',
          title: {
            icon: 'blue',
            label: 'label.max',
            width: '15%'
          },
          value: '50',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '17%'
          },
          position: {
            row: [5, 1],
            col: [1, 10]
          }
        },
        {
          id: 'fixed',
          title: {
            icon: 'blue',
            label: 'label.fixed',
            width: '17%'
          },
          value: false,
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [5, 1],
            col: [5, 10]
          }
        },
        {
          id: 'required',
          title: {
            icon: 'blue',
            label: 'label.required',
            width: '8%'
          },
          value: false,
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: false,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [5, 1],
            col: [6, 10]
          }
        },
        {
          id: 'displayOrder',
          title: {
            icon: 'blue',
            label: 'label.display_order',
            width: '15%'
          },
          value: 0,
          tooltip: true,
          tooltipText: '동일한 순서일 경우는 컬럼의 이름이 우선 적용',
          option: {
            type: 'number',
            clearbutton: true,
            disabled: false,
            width: '17%'
          },
          position: {
            row: [6, 1],
            col: [1, 10]
          }
        },
        {
          id: 'useYN',
          title: {
            icon: 'blue',
            label: 'label.use_yn',
            width: '17%'
          },
          value: true,
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            style: 'padding-top:10px;'
          },
          position: {
            row: [6, 1],
            col: [5, 10]
          }
        },
        {
          id: 'description',
          title: {
            icon: 'blue',
            label: 'userManage.note',
            width: '15%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 1000,
            txtMode: 'text',
            width: '67%'
          },
          position: {
            row: [7, 1],
            col: [1, 10]
          }
        },
        {
          id: 'insertId',
          title: {
            icon: 'blue',
            label: 'label.insert_id',
            width: '15%'
          },
          value: getUserId(),
          option: {
            type: 'input',
            kind: 'text',
            readOnly: true,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '17%'
          },
          position: {
            row: [8, 1],
            col: [1, 10]
          }
        },
        {
          option: {
            type: 'button',
            options: {
              kind: 'DevExtreme',
              class: null,
              style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
              id: 'btnAdd',
              type: 'add',
              disabled: false,
              content: '추가',
              stylingMode: 'contained'
            }
          },
          position: {
            row: [10, 1],
            col: [4, 1]
          }
        },
        {
          option: {
            type: 'button',
            options: {
              kind: 'DevExtreme',
              class: null,
              style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
              id: 'btnCancel',
              type: 'normal',
              disabled: false,
              content: 'btnClose',
              stylingMode: 'contained'
            }
          },
          position: {
            row: [10, 1], // row start, row span
            col: [5, 1] // col start, col span
          }
        },
        {
          option: {
            type: 'summary',
            summaryStyle: 'width:300px;padding-bottom:20px;' // 필수입력 체크 필드 스타일
          },
          position: {
            row: [6, 1], // row start, row span
            col: [1, 10] // col start, col span
          }
        }
      ]
    },
    dispUpdateData: {
      columns: 14,
      style: 'padding-left:50px;',
      editorList: [
        {
          id: 'dispGubn',
          title: {
            icon: 'red',
            label: 'label.disp_gubn',
            width: '15%'
          },
          value: '',
          itemList: [
            { value: 'default', label: '디폴트' },
            { value: 'GROUP', label: '그룹' },
            { value: 'DEVICE', label: 'Device' }
          ],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: true,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '그룹코드',
            width: '17%'
          },
          validation: {
            required: true,
            requiredMsg: i18n.t('msg.required_check')
          },
          position: {
            row: [1, 1],
            col: [1, 10]
          }
        },
        {
          id: 'dispGubnCode',
          title: {
            icon: 'red',
            label: 'label.disp_gubn_code',
            width: '17%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: true,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '25%'
          },
          validation: {
            required: true,
            requiredMsg: i18n.t('msg.required_check')
          },
          position: {
            row: [1, 1],
            col: [5, 10]
          }
        },
        {
          id: 'displayCol',
          title: {
            icon: 'red',
            label: 'label.display_col',
            width: '15%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: true,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '17%'
          },
          validation: {
            required: true,
            requiredMsg: i18n.t('msg.required_check')
          },
          position: {
            row: [2, 1],
            col: [1, 10]
          }
        },
        {
          id: 'displayColNm',
          title: {
            icon: 'blue',
            label: 'label.display_col_nm',
            width: '17%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 500,
            txtMode: 'text',
            width: '25%'
          },
          position: {
            row: [2, 1],
            col: [5, 10]
          }
        },
        {
          id: 'fieldtype',
          title: {
            icon: 'blue',
            label: 'label.fieldtype',
            width: '15%'
          },
          value: '',
          itemList: [
            { value: 'string', label: 'string' },
            { value: 'date', label: 'date' },
            { value: 'number', label: 'number' } //by lyj
          ],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '필드타입',
            width: '17%'
          },
          position: {
            row: [3, 1],
            col: [1, 10]
          }
        },
        {
          id: 'format',
          title: {
            icon: 'blue',
            label: 'label.format',
            width: '17%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '25%'
          },
          position: {
            row: [3, 1],
            col: [5, 10]
          }
        },
        {
          id: 'alignment',
          title: {
            icon: 'blue',
            label: 'label.alignment',
            width: '15%'
          },
          value: '',
          itemList: [
            { value: 'center', label: 'center' },
            { value: 'left', label: 'left' },
            { value: 'right', label: 'right' }
          ],
          option: {
            type: 'select',
            kind: 'default', // default/filter
            clearbutton: false,
            readOnly: false,
            disabled: false,
            searchenabled: true, // true: editable false: no editable
            placeholder: '데이터 정렬',
            width: '17%'
          },
          position: {
            row: [4, 1],
            col: [1, 10]
          }
        },
        {
          id: 'width',
          title: {
            icon: 'blue',
            label: 'label.width',
            width: '17%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '25%'
          },
          position: {
            row: [4, 1],
            col: [5, 10]
          }
        },
        {
          id: 'max',
          title: {
            icon: 'blue',
            label: 'label.max',
            width: '15%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '17%'
          },
          position: {
            row: [5, 1],
            col: [1, 10]
          }
        },
        {
          id: 'fixed',
          title: {
            icon: 'blue',
            label: 'label.fixed',
            width: '17%'
          },
          value: false,
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [5, 1],
            col: [5, 10]
          }
        },
        {
          id: 'required',
          title: {
            icon: 'blue',
            label: 'label.required',
            width: '8%'
          },
          value: false,
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: false,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [5, 1],
            col: [6, 10]
          }
        },
        {
          id: 'displayOrder',
          title: {
            icon: 'blue',
            label: 'label.display_order',
            width: '15%'
          },
          tooltip: true,
          tooltipText: '동일한 순서일 경우는 컬럼의 이름이 우선 적용',
          option: {
            type: 'number',
            clearbutton: false,
            width: '17%'
          },
          position: {
            row: [6, 1],
            col: [1, 10]
          }
        },
        {
          id: 'useYN',
          title: {
            icon: 'blue',
            label: 'label.use_yn',
            width: '17%'
          },
          value: false,
          option: {
            type: 'checkBox', // input/select/filterSelect/number/checkBox/buttonList/datePicker ...
            disabled: false,
            readOnly: false,
            visible: true,
            text: '',
            style: 'padding-top:10px;'
          },
          position: {
            row: [6, 1],
            col: [5, 10]
          }
        },
        {
          id: 'description',
          title: {
            icon: 'blue',
            label: 'userManage.note',
            width: '15%'
          },
          value: '',
          option: {
            type: 'input',
            kind: 'text',
            readOnly: false,
            disabled: false,
            txtMaxlength: 1000,
            txtMode: 'text',
            width: '68%'
          },
          position: {
            row: [7, 1],
            col: [1, 10]
          }
        },
        {
          id: 'updateId',
          title: {
            icon: 'blue',
            label: 'label.update_id',
            width: '15%'
          },
          value: getUserId(),
          option: {
            type: 'input',
            kind: 'text',
            readOnly: true,
            disabled: false,
            txtMaxlength: 20,
            txtMode: 'text',
            width: '15%'
          },
          position: {
            row: [8, 1],
            col: [1, 10]
          }
        },
        {
          option: {
            type: 'button',
            options: {
              kind: 'DevExtreme',
              class: null,
              style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
              id: 'btnAdd',
              type: 'add',
              disabled: false,
              content: '수정',
              stylingMode: 'contained',
              summary: true // 필수입력 체크 후 메시지 표시
            }
          },
          position: {
            row: [10, 1],
            col: [4, 1]
          }
        },
        {
          option: {
            type: 'button',
            options: {
              kind: 'DevExtreme',
              class: null,
              style: 'width: 95%; margin-top: 10px;margin-right: 10%;',
              id: 'btnCancel',
              type: 'normal',
              disabled: false,
              content: 'btnClose',
              stylingMode: 'contained'
            }
          },
          position: {
            row: [10, 1], // row start, row span
            col: [5, 1] // col start, col span
          }
        }
      ]
    }
  }
}
