<template>
  <DxPopup
    :title="getTitle(popupTitle)"
    :show-title="true"
    :visible.sync="popupVisible"
    :close-on-outside-click="device !== 'mobile' ? false : true"
    :scrollingEnabled="true"
    :width="'40%'"
    :height="'60%'"
    :minWidth="'360px'"
    @hidden="onHidden"
  >
    <DxScrollView width="100%" height="100%">
      <div class="w-full h-full">
        <pre>{{ this.content }}</pre>
        <!-- <vue-json-editor
          id="jsoneditor"
          class="html-editor h-full v-full"
          v-model="content"
          :mode="mode"
          @has-error="$emit('json-error', $event)"
          :show-btns="false"
          :expandedOnStart="true"
        /> -->
      </div>
    </DxScrollView>
  </DxPopup>
</template>

<script>
import { DxPopup } from 'devextreme-vue/popup'
import { DxScrollView } from 'devextreme-vue/scroll-view'
// import vueJsonEditor from 'vue-json-editor'

export default {
  name: 'MapPopup',
  components: {
    DxPopup,
    DxScrollView
    // vueJsonEditor
  },
  props: {
    domainList: {
      type: Array,
      default: () => {
        return []
      }
    },
    popupTitle: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'text' // tree, code, text, form, view
    }
  },
  data() {
    return {
      popupVisible: false, // visible
      content: ''
    }
  },
  computed: {
    // web / app 구분
    device() {
      return this.$store.state.app.device
    }
  },
  watch: {
    value(val) {
      this.content = this.IsJsonString(val) == true ? JSON.parse(val) : val
    }
  },
  mounted() {
    //
  },
  methods: {
    ///////////////////////////////////////
    /*            Popup Event            */
    ///////////////////////////////////////
    // 팝업 오픈
    open() {
      this.popupVisible = true
      console.log('popup open')
    },
    // 팝업 닫기
    onHidden(e) {
      this.popupVisible = false
      this.$emit('close', e)
    },
    ///////////////////////////////////////
    /*             Fuction               */
    ///////////////////////////////////////
    getTitle(id) {
      return this.$t(id)
    },
    IsJsonString(str) {
      try {
        var json = JSON.parse(str)
        return typeof json === 'object'
      } catch (e) {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles/themeB/variables.scss';
.title_icon_blue {
  position: relative;
  padding-left: 15px;
  display: inline-block;
  &::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    line-height: 36px;
    background: #2ec9f8;
    top: calc(36px / 2);
    left: 0;
  }
}
.line {
  border: 1px solid #91979d;
  width: 0.1px;
  height: 36px;
}
.product-name {
  line-height: 36px;
  padding-left: 10px;
}
</style>
