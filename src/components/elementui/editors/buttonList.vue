<template>
  <div class="buttonContainer" v-if="isChange">
    <template v-if="!group">
      <elBtn v-for="(item, index) in buttonList" :key="index" :options="item.options" @btnClick="clickButton(item)" />
    </template>
    <template v-else>
      <el-button-group>
        <template>
          <el-tooltip
            v-for="(item, index) in buttonList"
            :key="index"
            :placement="item.options.tooltip ? item.options.tooltip.placement : 'top'"
            :effect="item.options.tooltip ? item.options.tooltip.effect : 'light'"
            :visible="item.isTooltipVisible"
            :content="item.options.tooltip ? item.options.tooltip : item.options.content ? item.options.content : item.options.text.content"
          >
            <el-button
              :id="item.id"
              :class="item.options.class"
              :style="item.options.style"
              :type="item.options.type"
              :icon="item.options.icon"
              :disabled="item.options.disabled"
              @click="clickButton(item)"
              @mouseover.native="item.isTooltipVisible = true"
              @mouseleave.native="item.isTooltipVisible = false"
              :plain="item.options.stylingMode === 'palin' ? true : false"
              :round="item.options.stylingMode === 'round' ? true : false"
              :circle="item.options.stylingMode === 'circle' ? true : false"
              :autofocus="item.options.autofocus"
              :loading="item.options.loding"
              ><!--fas icon-->
              <span :class="item.options.svg || item.options.fas ? 'flex' : ''">
                <!--icon-->
                <i v-if="item.options.fas" :style="item.options.fas.style" :class="item.options.fas.icon"></i>
                <svg-icon
                  v-if="item.options.svg"
                  class=""
                  :calss="item.options.svg.class"
                  :style="item.options.svg.style"
                  :icon-class="item.options.svg.icon"
                />
                <!--text-->
                <span v-if="item.options.text" class="pb-1" :calss="item.options.text.class" :style="item.options.text.style">{{
                  item.options.text.content
                }}</span>
                <span v-else-if="item.options.content" class="dx-button-text">{{ item.options.content }}</span>
              </span>
            </el-button>
          </el-tooltip>
        </template>
        <!--<elBtn v-for="(item, index) in buttonList" :key="index" :options="item.options" @btnClick="clickButton(item)" />-->
        <!--<el-button type="default" icon="el-icon-edit"></el-button>
        <el-button type="default" icon="el-icon-share"></el-button>
        <el-button type="default" icon="el-icon-delete"></el-button>-->
      </el-button-group>
    </template>
  </div>
</template>

<script>
// import DxButton from 'devextreme-vue/button'
// import DxTooltip from 'devextreme-vue/tooltip'
import elBtn from './button'
import { uuid } from 'vue-uuid'
import _ from 'lodash'

export default {
  name: 'elBtnList',
  components: {
    elBtn
  },
  data() {
    return {
      id: uuid.v1(),
      isChange: true,
      isTooltipVisible: false,
      group: false,
      tooltipLabel: 'tooltip',
      defaultOptions: {
        type: 'default',
        stylingMode: 'contained',
        content: null,
        icon: null,
        style: 'width: 120px;'
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
        { id: 'btnRefresh', text: this.$i18n.t('btnRefresh'), options: {} }
      ],
      buttonList: []
    }
  },
  props: {
    changed: {
      type: Boolean,
      default: false
    },
    useBtnList: {
      change: false,
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
  },
  watch: {
    /// option 값이 변경되면 button을 새로 그리도록 함
    useBtnList: {
      deep: true,
      handler() {
        // console.log('chagned')
        this.changeOptions()
      }
    }
  },
  computed: {
    getID() {
      // console.log('getID', this.options.id, this.btnid)
      return this.options.id ? this.options.id : this.btnid
    },
    tooltipID() {
      // console.log('tooltipID', this.id)
      let tooltip = this.options.id ? this.options.id : this.btnid
      return '#' + tooltip
    }
  },
  created() {
    this.setOptions(this.useBtnList)
  },
  mounted() {
    // this.id = uuid.v1()
  },
  methods: {
    setHint(srcBtn, destBtn) {
      if (srcBtn.hint) {
        destBtn.hint = srcBtn.hint
      } else if (!destBtn.hint) destBtn.hint = destBtn.text
    },
    setContent(srcBtn, destBtn) {
      if (destBtn.options.content === '') destBtn.content = destBtn.options.content = destBtn.text
      else destBtn.options.tooltip = destBtn.text
    },
    setIcon(srcBtn, destBtn) {
      if (destBtn.options.icon === '') destBtn.icon = destBtn.options.icon = srcBtn.icon ? srcBtn.icon : this.getIcon(srcBtn.id)
    },
    changeExistBtn(btnInfos, destBtn, srcBtn) {
      destBtn.options = {}
      if (srcBtn.options) {
        _.merge(destBtn.options, srcBtn.options)
      } else {
        _.merge(destBtn.options, btnInfos.options ? btnInfos.options : this.defaultOptions)
      }

      this.setHint(srcBtn, destBtn)
      this.setContent(srcBtn, destBtn)
      this.setIcon(srcBtn, destBtn)
    },
    changeUserBtn(btnInfos, destBtn, srcBtn) {
      destBtn.options = {}
      _.merge(destBtn.options, btnInfos.options)

      this.setHint(srcBtn, destBtn)
      this.setContent(srcBtn, destBtn)
      this.setIcon(srcBtn, destBtn)
      // console.log('test button', newdestBtnBtn.id, destBtn)
      // if (destBtn.visible === true || destBtn.visible === 'true')
    },
    setOptions(btnInfos) {
      if (!btnInfos) return
      this.buttonList = []
      // 버튼 그룹 여부 확인
      if (btnInfos.group) {
        this.group = true
        _.merge(this.group, btnInfos.group)
        // console.log(this.group)
      }

      // console.log('check button list', btnInfos)
      let authButtonList = []
      btnInfos.list.forEach(useList => {
        let findButton = this.defButtonList.find(item => useList.id === item.id)
        if (findButton) {
          this.changeExistBtn(btnInfos, findButton, useList)
          authButtonList.push(findButton)
        } else {
          // 사용자 정의 버튼을 추가 할 수 있도록 함
          let newBtn = { id: useList.id, text: this.$i18n.t(useList.id), visible: useList.visible, options: useList.options ? useList.options : {} }
          this.changeUserBtn(btnInfos, newBtn, useList)
          authButtonList.push(newBtn)
        }
      })
      this.buttonList = authButtonList
      // console.log('setOption', this.group, this.buttonList)
    },
    /// 버튼 리스트의 options 정보 변경시 데이터 갱신
    changeOptions() {
      if (this.isChange === false) return
      this.group = false
      this.setOptions(this.useBtnList)
      console.log(this.buttonList)
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
          icon = 'el-icon-search'
          break
        case 'btnAdd':
          icon = 'el-icon-plus'
          break
        case 'btnDelete':
          icon = 'el-icon-delete'
          break
        case 'btnChoice':
          icon = 'el-icon-check'
          break
        case 'btnPrint':
          icon = 'el-icon-printer'
          break
        case 'btnClose':
          icon = 'el-icon-close'
          break
        case 'btnSave':
          icon = 'el-icon-edit'
          break
        case 'btnConfirm':
          icon = 'el-icon-finished'
          break
        case 'btnCancel':
          icon = 'el-icon-undo'
          break
        case 'btnLabel':
          icon = 'el-icon-house'
          break
        case 'btnCopy':
          icon = 'el-icon-tickets'
          break
        case 'btnSelectAll':
          icon = 'el-icon-document'
          break
        case 'btnUndo':
          icon = 'el-icon-undo'
          break
        case 'btnRedo':
          icon = 'el-icon-redo'
          break
        case 'btnUpload':
          icon = 'el-icon-upload'
          break
        case 'btnDownload':
          icon = 'el-icon-download'
          break
        case 'btnRefresh':
          icon = 'el-icon-refresh'
          break
        default:
          icon = 'el-icon-user'
      }
      return icon
    },
    clickButton(e) {
      // console.log('clickButton', e)
      if (!e.options) e.options = e.itemData
      this.$emit('btnClick', e)
    },
    mouseOver(e) {
      if (e.srcElement.innerText) {
        this.isTooltipVisible = true
        this.tooltipLabel = e.srcElement.innerText
        // console.log('mouseOver', e, e.srcElement.id, e.srcElement.innerText)
      }
    },
    onClick(e) {
      this.$emit('btnClick', this.btnid, e)
    },
    onTooltip() {
      this.isTooltipVisible = !this.isTooltipVisible
      // console.log('onTooltip', this.isTooltipVisible)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles/themeB/variables.scss';

// .buttonContainer {
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: flex-start;
//   align-items: stretch;
//   flex-basis: auto;
//   /* display: inline-flex; *///

//   .label {
//     //flex-basis: 80px;
//     line-height: 36px;
//     text-align: right;
//   }
// }
</style>
