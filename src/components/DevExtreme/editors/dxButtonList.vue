<template>
  <div class="flex w-full h-full" :style="useBtnList.options.listStyle" v-if="isChange === true">
    <template v-if="!group">
      <dxButton
        class="btn lex"
        v-for="item in buttonList"
        :key="`btn_${item.id}`"
        :btnid="item.id"
        :options="item.options"
        @btnClick="clickButton(item)"
      ></dxButton>
    </template>
    <template v-else-if="group">
      <DxButtonGroup
        id="test"
        :items="buttonList"
        key-expr="content"
        :styling-mode="group.searchModeOption"
        :selection-mode="group.selectionMode"
        :selected-item-keys="group.selectedKeys"
        @item-click="clickButton($event)"
        @mouseover.native="mouseOver"
        @mouseleave="isTooltipVisible = false"
      />
      <!--<DxTooltip :position="'top'" :visible="isTooltipVisible" :close-on-outside-click="false" :target="'#test'">
        {{ tooltipLabel }}
      </DxTooltip>-->
    </template>
  </div>
</template>

<script>
import DxButtonGroup from 'devextreme-vue/button-group'
// import DxTooltip from 'devextreme-vue/tooltip'
import dxButton from './dxButton.vue'
import _ from 'lodash'
export default {
  name: 'dxButtonList',
  components: { dxButton, DxButtonGroup },
  props: {
    useBtnList: {
      type: Object,
      default: () => {
        return {
          group: null,
          options: {
            type: 'default',
            searchModeOption: 'containted',
            content: '',
            icon: '',
            style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
          },
          list: [
            { id: 'btnSearch' },
            { id: 'btnAdd' },
            { id: 'btnSave' },
            { id: 'btnDelete' }
            // { id: 'btnChoice' },
            // { id: 'btnPrint' },
            // { id: 'btnClose' },
            // { id: 'btnConfirm' },
            // { id: 'btnCancel' },
            // { id: 'btnLabel' },
            // { id: 'btnCopy' },
            // { id: 'btnSelectAll' }
            // { id: 'btnUndo' },
            // { id: 'btnRedo' },
            // { id: 'btnUpload' },
            // { id: 'btnDownload' },
            // { id: 'btnRefresh' }
          ]
        }
      }
    }
  },
  data() {
    return {
      group: null,
      isChange: true,
      tooltipLabel: 'tooltip',
      isTooltipVisible: false,
      defaultOptions: {
        type: 'default',
        stylingMode: 'contained',
        content: '',
        icon: '',
        style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;'
      },
      defButtonList: [
        { id: 'btnSearch', text: this.$i18n.t('btnSearch'), options: {} },
        { id: 'btnAdd', text: this.$i18n.t('btnAdd'), options: {} },
        { id: 'btnSave', text: this.$i18n.t('btnSave'), options: {} },
        { id: 'btnDelete', text: this.$i18n.t('btnDelete'), options: {} },
        { id: 'btnChoice', text: this.$i18n.t('btnChoice'), options: {} },
        { id: 'btnPrint', text: this.$i18n.t('btnPrint'), options: {} },
        { id: 'btnClose', text: this.$i18n.t('btnClose'), options: {} },
        { id: 'btnConfirm', text: this.$i18n.t('btnConfirm'), options: {} },
        { id: 'btnCancel', text: this.$i18n.t('btnCancel'), options: {} },
        { id: 'btnLabel', text: this.$i18n.t('btnLabel'), options: {} },
        { id: 'btnCopy', text: this.$i18n.t('btnCopy'), options: {} },
        { id: 'btnSelectAll', text: this.$i18n.t('btnSelectAll'), options: {} },
        { id: 'btnUndo', text: this.$i18n.t('btnUndo'), options: {} },
        { id: 'btnRedo', text: this.$i18n.t('btnRedo'), options: {} },
        { id: 'btnUpload', text: this.$i18n.t('btnUpload'), options: {} },
        { id: 'btnDownload', text: this.$i18n.t('btnDownload'), options: {} },
        { id: 'btnRefresh', text: this.$i18n.t('btnRefresh'), options: {} },
        { id: 'btnExportXlsx', text: this.$i18n.t('btnExportXlsx'), options: {} }
      ],
      buttonList: []
    }
  },
  watch: {
    useBtnList: {
      deep: true,
      handler() {
        console.log('useBtnList', this.useBtnList)
        this.changeOptions()
      }
    }
  },
  created() {
    // let menuCd = ''
    // let savAh = '',
    //   schAh = '',
    //   delAh = '',
    //   exlAh = '',
    //   fn1Ah = '',
    //   fn2Ah = '',
    //   fn3Ah //fn1Ah : Print
    // let menu_id = this.$route.meta.menu_id

    // let authMenus = JSON.parse(window.sessionStorage.getItem('myAuthMenus'))
    // let findMenu = authMenus.find(element => element.menu_id == menu_id)

    // if (findMenu != null) {
    //   menuCd = findMenu.menuCd
    // }

    //menu id로 권한 찾기
    // let find = authGrps.find(element => element.menuCd == menuCd)
    // if (find != null) {
    //   schAh = find.schAh //조회
    //   savAh = find.savAh //저장
    //   delAh = find.delAh //삭제
    //   fn1Ah = find.fn1Ah //출력
    // }
    //버튼권한별 View
    // let authButtonList = this.buttonList.filter(btn => {
    //   if (this.$store.state.user.userId == 'system' || this.$store.state.user.userId == 'dev') {
    //     //system, dev 권한 제외
    //     return this.useBtnList.includes(btn.id)
    //   } else {
    //     if (
    //       (btn.id == 'btnSearch' && schAh == 'Y') ||
    //       (btn.id == 'btnAdd' && savAh == 'Y') ||
    //       (btn.id == 'btnSave' && savAh == 'Y') ||
    //       (btn.id == 'btnDelete' && delAh == 'Y') ||
    //       (btn.id == 'btnPrint' && savAh == 'Y')
    //     ) {
    //       return this.useBtnList.includes(btn.id)
    //     }
    //   }
    // })

    // 버튼 권한을 적용하지않음
    this.setOptions()
  },
  methods: {
    /// 최초 버튼리스트의 options 정보 변경
    setOptions() {
      if (this.useBtnList.group) {
        this.group = {}
        _.merge(this.group, this.useBtnList.group)
        // console.log(this.group)
      }
      let authButtonList = []
      this.useBtnList.list.forEach(useList => {
        let findButton = this.defButtonList.find(item => useList.id === item.id)
        if (findButton) {
          // console.log('find button', findButton.id)
          if (useList.options) {
            findButton.options = {}
            _.merge(findButton.options, useList.options)
          } else {
            _.merge(findButton.options, this.useBtnList.options ? this.useBtnList.options : this.defaultOptions)
          }
          if (findButton.options.content === '') findButton.content = findButton.options.content = findButton.text
          if (findButton.options.icon === '') findButton.icon = findButton.options.icon = this.getIcon(findButton.id)
          if (useList.hint) {
            findButton.hint = useList.hint
          } else if (!findButton.hint) findButton.hint = findButton.text
          // console.log(findButton)
          authButtonList.push(findButton)
        } else {
          // 사용자 정의 버튼을 추가 할 수 있도록 함
          let newBtn = { id: useList.id, text: this.$i18n.t(useList.id), visible: useList.visible, options: {} }
          _.merge(newBtn.options, this.useBtnList.options)
          if (newBtn.options.content === '') newBtn.content = newBtn.options.content = newBtn.text
          else newBtn.options.tooltip = newBtn.text
          if (newBtn.options.icon === '') newBtn.icon = newBtn.options.icon = useList.icon ? useList.icon : this.getIcon(useList.id)
          if (useList.hint) {
            newBtn.hint = useList.hint
          } else if (!newBtn.hint) newBtn.hint = newBtn.text
          // console.log('test button', newBtn.id, newBtn.visible)
          // if (newBtn.visible === true || newBtn.visible === 'true')
          authButtonList.push(newBtn)
        }
      })
      this.buttonList = authButtonList
      console.log(this.group, this.buttonList)
    },
    /// 버튼 리스트의 options 정보 변경시 데이터 갱신
    changeOptions() {
      if (this.isChange === false) return

      this.group = null
      if (this.useBtnList.group) {
        this.group = {}
        _.merge(this.group, this.useBtnList.group)
      }

      let authButtonList = []
      this.defButtonList.forEach(item => {
        let isExist = false
        // let findButton = this.useBtnList.find(useList => useList.id === item.id)
        // if (findButton) {
        //   isExist = true
        //   if (findButton.options) {
        //     // console.log('1', item)
        //     _.merge(item.options, findButton.options)
        //   } else {
        //     _.merge(item.options, this.useBtnList.options ? this.useBtnList.options : this.defaultOptions)
        //     // console.log('2', item, item.options)
        //   }
        //   if (item.options.content === '') item.content = item.options.content = item.text
        //   if (item.options.icon === '') item.icon = item.options.icon = this.getIcon(item.id)
        //   authButtonList.push(item)
        // }

        this.useBtnList.list.forEach(useList => {
          if (useList.id === item.id) {
            isExist = true
            if (useList.options) {
              // console.log('1', item)
              _.merge(item.options, useList.options)
            } else {
              _.merge(item.options, this.useBtnList.options ? this.useBtnList.options : this.defaultOptions)
              // console.log('2', item, item.options)
            }
            if (item.options.content === '') item.content = item.options.content = item.text
            if (item.options.icon === '') item.icon = item.options.icon = this.getIcon(item.id)
            authButtonList.push(item)
          }
        })
        // console.log(item.id, isExist)
        if (isExist === false) item.options = {}
      })
      this.buttonList = {}
      this.buttonList = authButtonList
      // console.log(this.buttonList)
      this.isChange = false
      let t = setInterval(() => {
        // console.log('setInterval')
        this.isChange = true
        clearInterval(t)
      }, 300)
    },
    // 버튼 id에 따라 icon 이름 지정(devExtreme icon 전용)
    getIcon(obj) {
      let icon = 'search'
      switch (obj) {
        case 'btnSearch':
          icon = 'search'
          break
        case 'btnAdd':
          icon = 'add'
          break
        case 'btnDelete':
          icon = 'clear'
          break
        case 'btnChoice':
          icon = 'check'
          break
        case 'btnPrint':
          icon = 'print'
          break
        case 'btnClose':
          icon = 'close'
          break
        case 'btnSave':
          icon = 'save'
          break
        case 'btnConfirm':
          icon = 'todo'
          break
        case 'btnCancel':
          icon = 'undo'
          break
        case 'btnLabel':
          icon = 'tags'
          break
        case 'btnCopy':
          icon = 'copy'
          break
        case 'btnSelectAll':
          icon = 'selectall'
          break
        case 'btnUndo':
          icon = 'undo'
          break
        case 'btnRedo':
          icon = 'redo'
          break
        case 'btnUpload':
          icon = 'upload'
          break
        case 'btnDownload':
          icon = 'download'
          break
        case 'btnRefresh':
          icon = 'refresh'
          break
        case 'btnExportXlsx':
          icon = 'xlsxfile'
          break
        default:
          icon = 'user'
      }
      return icon
    },
    clickButton(e) {
      console.log('clickButton', e)
      if (!e.options) e.options = e.itemData
      this.$emit('btnClick', e)
    },
    mouseOver(e) {
      if (e.srcElement.innerText) {
        this.isTooltipVisible = true
        this.tooltipLabel = e.srcElement.innerText
        // console.log('mouseOver', e, e.srcElement.id, e.srcElement.innerText)
      }
    }
  }
}
</script>
