export default {
  edit: {
    kind: 'DevExtreme',
    class: null,
    style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;',
    id: 'test1',
    type: 'normal',
    content: 'normal',
    icon: 'check',
    stylingMode: 'contained'
  },
  normal: {
    kind: 'DevExtreme',
    class: null,
    style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;',
    id: 'test2',
    type: 'normal',
    content: 'normal',
    icon: 'check',
    stylingMode: 'contained'
  },
  default: {
    kind: 'DevExtreme',
    class: null,
    style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;',
    id: 'test3',
    type: 'default',
    content: 'default',
    icon: 'activefolder',
    stylingMode: 'contained'
  },
  success: {
    kind: 'DevExtreme',
    class: null,
    style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;',
    id: 'test4',
    type: 'success',
    content: 'success',
    icon: 'message',
    disabled: null,
    stylingMode: 'contained'
  },
  danger: {
    kind: 'DevExtreme',
    class: null,
    style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;',
    id: 'test5',
    type: 'danger',
    content: 'danger',
    icon: 'warning',
    stylingMode: 'contained'
  },
  disabled: {
    kind: 'DevExtreme',
    class: null,
    style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;',
    id: 'test6',
    type: 'danger',
    content: 'disabled',
    icon: 'close',
    disabled: true,
    stylingMode: 'contained'
  },
  fontawesome: {
    kind: 'DevExtreme',
    class: null,
    style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;',
    id: 'test7',
    type: 'default',
    content: null,
    icon: null,
    disabled: null,
    stylingMode: 'contained',
    fas: {
      icon: 'fas fa-file-excel',
      style: 'margin-right: 0px;'
    },
    text: {
      content: 'fontawesome',
      style: 'margin-left: 0px;'
    }
  },
  svgIcon: {
    kind: 'DevExtreme',
    class: null,
    style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;',
    id: 'test8',
    type: 'success',
    content: null,
    icon: null,
    disabled: null,
    stylingMode: 'contained',
    svg: {
      icon: 'excel',
      style: 'margin-right: 3px;'
    },
    text: {
      content: 'svg',
      style: 'margin-left: 1px;'
    }
  },
  icon: {
    kind: 'DevExtreme',
    class: null,
    style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;',
    id: 'test9',
    type: 'normal',
    icon: 'plus',
    tooltip: '추가',
    stylingMode: 'contained'
  },
  outline: {
    kind: 'DevExtreme',
    class: null,
    style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;',
    id: 'test10',
    content: 'outlined',
    type: 'success',
    stylingMode: 'outlined'
  },
  text: {
    kind: 'DevExtreme',
    class: null,
    style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;',
    id: 'test11',
    content: 'text',
    type: 'normal',
    stylingMode: 'text'
  },
  list_normal: {
    group: null,
    options: {
      type: 'default',
      stylingMode: 'containted',
      content: '',
      icon: '',
      style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
    },
    list: [
      { id: 'btnSearch' },
      { id: 'btnAdd' },
      { id: 'btnSave' },
      { id: 'btnDelete' },
      { id: 'btnChoice' },
      { id: 'btnPrint' },
      { id: 'btnClose' },
      { id: 'btnConfirm' },
      // { id: 'btnCancel' },
      { id: 'btnLabel' },
      { id: 'btnCopy' },
      // { id: 'btnSelectAll' },
      // { id: 'btnUndo' },
      // { id: 'btnRedo' },
      // { id: 'btnUpload' },
      // { id: 'btnDownload' },
      { id: 'btnTest' },
      { id: 'btnRefresh' }
    ]
  },
  list_icon: {
    group: null,
    options: {
      type: 'danger',
      stylingMode: 'containted',
      content: null,
      icon: '',
      style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
    },
    list: [
      { id: 'btnSearch' },
      { id: 'btnAdd' },
      { id: 'btnSave' },
      { id: 'btnDelete' },
      { id: 'btnChoice' },
      { id: 'btnPrint' },
      { id: 'btnClose' },
      { id: 'btnConfirm' },
      { id: 'btnCancel' },
      { id: 'btnLabel' },
      { id: 'btnCopy' },
      { id: 'btnSelectAll' },
      // { id: 'btnUndo' },
      // { id: 'btnRedo' },
      { id: 'btnUpload' },
      { id: 'btnDownload' },
      { id: 'btnRefresh' }
    ]
  },
  list_text: {
    group: null,
    options: {
      type: 'success',
      stylingMode: 'containted',
      content: '',
      icon: null,
      style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
    },
    list: [
      { id: 'btnSearch' },
      { id: 'btnAdd' },
      { id: 'btnSave' },
      { id: 'btnDelete' },
      { id: 'btnChoice' },
      { id: 'btnPrint' },
      { id: 'btnClose' },
      { id: 'btnConfirm' },
      { id: 'btnCancel' },
      { id: 'btnLabel' },
      { id: 'btnCopy' },
      { id: 'btnSelectAll' },
      // { id: 'btnUndo' },
      // { id: 'btnRedo' },
      { id: 'btnUpload' },
      { id: 'btnDownload' },
      { id: 'btnRefresh' }
    ]
  },
  list_edit: {
    group: {
      stylingMode: 'outlined',
      selectionMode: 'single'
    },
    options: {
      type: 'default',
      stylingMode: 'containted',
      content: '',
      icon: '',
      style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
    },
    list: [
      { id: 'btnSearch' },
      { id: 'btnAdd' },
      { id: 'btnSave' },
      { id: 'btnDelete' },
      { id: 'btnChoice' },
      { id: 'btnPrint' },
      { id: 'btnClose' },
      { id: 'btnConfirm' },
      { id: 'btnCancel' },
      { id: 'btnLabel' },
      { id: 'btnCopy' },
      { id: 'btnSelectAll' },
      // { id: 'btnUndo' },
      // { id: 'btnRedo' },
      { id: 'btnUpload' },
      { id: 'btnDownload' },
      { id: 'btnRefresh' }
    ]
  }
}
