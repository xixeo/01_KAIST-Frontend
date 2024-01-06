export default function getData(param) {
  let columDataList = [
      //domainCd
      {
        headcaption: 'authgrpManage.domain_cd',
        field: 'domainCd',
        fieldtype: 'string',
        format: '',
        alignment: 'left',
        width: '10%',
        max: 100,
        editing: false,
        required: false,
        fixed: false,
        visible: false
      },
      //domainNm
      {
        headcaption: 'authgrpManage.domain_nm',
        field: 'domainNm',
        fieldtype: 'string',
        format: '',
        alignment: 'left',
        width: '15%',
        max: 100,
        editing: false,
        required: false,
        fixed: false,
        visible: true
      },
      //authGroupCd
      {
        headcaption: 'authgrpManage.authgrp_cd',
        field: 'authgrpCd',
        fieldtype: 'string',
        alignment: 'center',
        width: '10%',
        editoroptions: { format: '' },
        required: false,
        editing: false,
        fixed: false
      },
      //authGroupNm
      {
        headcaption: 'authgrpManage.authgrp_nm',
        field: 'authgrpNm',
        fieldtype: 'string',
        alignment: 'center',
        width: '15%',
        max: 1,
        editoroptions: { format: '' },
        required: false,
        fixed: false,
        checkbox: true
      },
      //type
      {
        headcaption: 'authgrpManage.type',
        field: 'authgrpType',
        fieldtype: 'string',
        alignment: 'center',
        width: '7%',
        max: 1,
        editoroptions: { format: '' },
        required: false,
        fixed: false,
        visible:false,
        checkbox: true
      },
      //typeNm
      {
        headcaption: 'authgrpManage.type_nm',
        field: 'authgrpTypeNm',
        fieldtype: 'string',
        alignment: 'center',
        width: '7%',
        max: 1,
        editoroptions: { format: '' },
        required: false,
        fixed: false,
        visible:true,
        checkbox: true
      },
      //useYn
      {
        headcaption: 'authgrpManage.use_yn',
        field: 'useYn',
        fieldtype: 'boolean',
        format: '',
        alignment: 'center',
        width: '8%',
        max: 1,
        editoroptions: { format: '' },
        required: false,
        fixed: false,
        visible:true,
        checkbox: true
      },
      //updateDt
      {
        headcaption: 'label.update_dt',
        field: 'updateDt',
        fieldtype: 'string',
        alignment: 'center',
        width: '20%',
        max: 1,
        editoroptions: { format: '' },
        required: false,
        fixed: false,
        checkbox: true
      },
      //updateId
      {
        headcaption: 'label.update_id',
        field: 'updateId',
        fieldtype: 'string',
        alignment: 'center',
        width: '7%',
        max: 1,
        editoroptions: { format: '' },
        required: false,
        fixed: false,
        checkbox: true
      },
      //insertDt
      {
        headcaption: 'label.insert_dt',
        field: 'insertDt',
        fieldtype: 'string',
        alignment: 'center',
        width: '20%',
        max: 1,
        editoroptions: { format: '' },
        required: false,
        fixed: false,
        checkbox: true
      },
      //insertId
      {
        headcaption: 'label.insert_id',
        field: 'insertId',
        fieldtype: 'string',
        alignment: 'center',
        width: '7%',
        max: 1,
        editoroptions: { format: '' },
        required: false,
        fixed: false,
        checkbox: true
      }
    ]
  let columData = []
  columData = columDataList
  // if (param === 'label.basic_info') columData = columDataList
  // if (param === 'label.company_info') columData = columDataList.company_info
  return {
    authgrpGridProperties: {
      gridName: 'authgrpGrid',
      chkBoxReadOnly:true,
      selectionMode: 'multiple', //selection_mode : selection mode (single, multiple)
      selectionCheckbox: 'always', //selection_checkbox : selection checkbox (none, onClick, onLongTap, always)
      seleectionAllMode: 'page', //seleectionAll_mode : selection page ( page, allPages)
      colresize: true, //colresize : column resize
      colreorder: true, //colreorder : column reorder
      editing: true, //editing
      deleting: false, //deleting
      editingMode: 'cell', //editing_mode : row, batch, cell, form, popup
      sortingMode: 'multiple', //sortingMode : none, single, multiple
      selectTextOnEditStart: true, //selectTextOnEditStart
      startEditAction: 'click', //startEditAction : click, dblClick
      filterRow: false, //filterRow
      filterPanel: false, //filterPanel
      headerFilter: false, // 헤더 필터링
      colChooser: false, //ColumnChooser
      colFixing: false, //Fixing
      columnAuto: true, //columnAuto
      groupPanel: false, //groupPanel
      searchPanel: true, //searchPanel
      //Grid Page여부 및 Page Size (조회 Row 수)
      paging: true,
      pagingSize: 30,
      scrollMode: 'none', //none, virtual, infinite (무한스크롤) 생성
      addbtn: false, //Grid 추가버튼
      editing: false,
      focusKey: '1',

      //Grid Col Info
      pageSizes: [5, 10, 20, 30], //Grid Row size
      gridColinfos: columData
    }
  }
}
