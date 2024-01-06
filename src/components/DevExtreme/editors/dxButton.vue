<template>
  <div class="buttonContainer">
    <template v-if="!options">
      <DxButton
        :style="`height: ${height}; width: ${width};font-size:${fontSize};color:${fontColor};`"
        :text="btntext"
        :type="btntype"
        :styling-mode="btnstyling"
        :disabled="disabled"
        :icon="icon"
        @click="onClick"
      />
    </template>
    <template v-else-if="options">
      <!-- v-if="options.kind === 'DevExtreme'"-->
      <DxButton
        :id="getID"
        v-if="isChange === true"
        :class="options.class"
        :style="options.style"
        :type="options.type"
        :icon="options.icon"
        :text="this.$t(options.content)"
        :styling-mode="options.stylingMode"
        :disabled="options.disabled"
        :use-submit-behavior="options.summary"
        @click="$emit('btnClick', options.id, $event)"
        @mouseover.native="isTooltipVisible = true"
        @mouseleave.native="isTooltipVisible = false"
      >
        <!--fas icon-->
        <i v-if="options.fas" class="dx-icon" :class="options.fas.icon"></i>
        <!--svg icon-->
        <svg-icon
          v-if="options.svg"
          class="dx-icon"
          :calss="options.svg.class"
          :style="options.svg.style"
          :icon-class="options.svg.icon"
        />
        <!--text-->
        <span
          v-if="options.text"
          class="dx-button-text"
          :calss="options.text.class"
          :style="options.text.style"
        >{{ options.text.content }}</span>
      </DxButton>
      <DxTooltip
        v-if="options.tooltip || options.content || options.text"
        :position="'top'"
        :visible="isTooltipVisible"
        :close-on-outside-click="false"
        :target="tooltipID"
      >{{ options.tooltip ? options.tooltip : options.content ? options.content : options.text.content }}</DxTooltip>
    </template>
  </div>
</template>

<script>
import DxButton from 'devextreme-vue/button'
import DxTooltip from 'devextreme-vue/tooltip'
import { uuid } from 'vue-uuid'

export default {
  name: 'dxButton',
  data() {
    return {
      id: uuid.v1(),
      isChange: true,
      isTooltipVisible: false
    }
  },
  components: {
    DxButton,
    DxTooltip
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    btnid: {
      type: String
      // required: true
    },
    btntext: {
      type: String,
      default: () => {
        return ''
      }
    },
    btntype: {
      type: String,
      default: () => {
        return 'default'
      }
    },
    btnstyling: {
      type: String,
      default: () => {
        return 'contained'
      }
    },
    width: {
      type: String,
      default: function() {
        return '80px'
      }
    },
    height: {
      type: String,
      default: function() {
        return '30px'
      }
    },
    fontSize: {
      type: String,
      default: function() {
        return '1em'
      }
    },
    fontColor: {
      type: String,
      default: function() {
        return 'white'
      }
    },
    icon: {
      type: String,
      default: function() {
        return ''
      }
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  watch: {
    /// option 값이 변경되면 button을 새로 그리도록 함
    options() {
      if (this.isChange === false) return
      this.isChange = false
      let t = setInterval(() => {
        // console.log('setInterval')
        this.isChange = true
        clearInterval(t)
      }, 500)
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
  mounted() {
    // this.id = uuid.v1()
  },
  methods: {
    onClick(e) {
      console.log('버튼')
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

.buttonContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: stretch;
  flex-basis: auto;
  /* display: inline-flex; */

  .label {
    //flex-basis: 80px;
    line-height: 36px;
    text-align: right;
  }
}
</style>
