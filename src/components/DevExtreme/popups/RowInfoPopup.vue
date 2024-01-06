<template>
  <DxPopup
    :title="getTitle(popupData.title)"
    :show-title="true"
    :visible.sync="popupVisible"
    :close-on-outside-click="false"
    :scrollingEnabled="true"
    :width="popupData.width"
    :height="popupData.height"
    @hidden="onHidden"
  >
    <div class="w-full h-full">
      <div>
        <template v-if="popupData.panelButton">
          <dxButtonList
            id="buttonList"
            :useBtnList="popupData.panelButton"
            @btnClick="onClick($event.options)"
          ></dxButtonList>
        </template>
      </div>
      <div>
        <template v-if="popupData.panelButton !== ''">
          <div v-for="(item, index) in popupData.panelButton.list" :key="index">
            <editorsLayout
              v-if="radio == item.id"
              :ref="editorData.ref"
              :layoutData="editorData[radio]"
              @onValueChanged="onValueChanged"
              @onContentReady="onContentReady"
              @onBtnClick="onBtnClick"
            ></editorsLayout>
          </div>
        </template>
      </div>
    </div>
  </DxPopup>
</template>

<script>
import { DxPopup } from 'devextreme-vue/popup'
import { DxButton } from 'devextreme-vue/button'
import { dxButtonList } from '@/components/DevExtreme/editors' // 에디터 컴포넌트
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트

export default {
  name: 'RowInfoPopup',
  components: {
    DxPopup,
    DxButton,
    dxButtonList,
    editorsLayout
  },
  props: {
    popupData: {
      type: Object,
      default: []
    },
    editorData: {
      type: Object,
      default: []
    }
  },
  data() {
    return {
      routeName: this.$route.name,
      popupVisible: false,
      rowDataList: [],
      selectRadio: '',
      radio: '', // panel 구분
      noReset: false
    }
  },
  watch: {
    popupData: {
      deep: true,
      handler() {
        if (!this.noReset) {
          this.radio = this.popupData.panelButton.list[0].id
        }
      }
    }
  },
  created() {
    this.radio = this.popupData.panelButton.list[0].id
    this.popupData.panelButton.group.selectedKeys[0] = this.$t(this.popupData.panelButton.list[0].id)
  },
  methods: {
    ///////////////////////////////////////
    /*            Popup Event            */
    ///////////////////////////////////////
    // 팝업 오픈
    open(rowData) {
      this.rowDataList = rowData
      this.radio = this.popupData.panelButton.list[0].id
      console.log(this.editorData)
      this.popupVisible = true
    },
    onHidden(e) {
      this.popupVisible = false
    },
    // 팝업 닫기
    onClose() {
      this.popupVisible = false
    },
    onSuccess() {
      this.$emit('complete', this.rowDataList)
    },

    ///////////////////////////////////////
    /*             Fuction               */
    ///////////////////////////////////////
    getTitle(id) {
      return this.$t(id)
    },
    // editor box 데이터 변경
    onValueChanged(...arg) {
      this.$emit('onValueChanged', arg)
    },
    // panel 구분 버튼 변경
    onClick(e) {
      this.noReset = e.noReset
      this.radio = e.id
    },
    onBtnClick(...arg) {
      if (arg[0].id === 'close') this.onClose()
      if (arg[0].id === 'success') this.onSuccess()
      this.$emit('onBtnClick', arg)
    },
    onContentReady(...arg) {
      this.$emit('onContentReady', arg)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles/themeB/variables.scss';
</style>
