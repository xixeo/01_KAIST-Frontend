<template>
  <div :class="'textBox p-2 w-full flex ' + options.class" :style="options.style">
    <span
      v-if="options.title"
      :class="options.title.class + ' label text-white'"
      :style="labelStyle"
    >{{ this.$t(options.title.label) }}
    <template v-if="options.tooltip">
      <div class="tooltip p-1">
        <svg-icon :icon-class="`help1`"  />
        <span class="tooltiptext">{{this.$t(options.tooltipText)}}</span>
      </div>
    </template></span>
    <DxNumberBox
      :class="options.option.class"
      :style="boxStyle"
      :value="options.value"
      :show-spin-buttons="options.option.spinbutton"
      :show-clear-button="options.option.clearbutton"
      :disabled="options.option.disabled"
      :step="options.option.stepValue"
      :min="options.option.minValue"
      :max="options.option.maxValue"
      :format="options.option.format"
      @value-changed="onValueChanged"
      @keyDown="onKeyDown"
    ></DxNumberBox>
  </div>
</template>

<script>
import { DxNumberBox } from 'devextreme-vue/number-box'

export default {
  name: 'dxNumberBox',
  data() {
    return {
      textValue: 0,
      labelStyle: 'float:left;text-align:left;',
      boxStyle: 'float:right;'
    }
  },
  components: {
    DxNumberBox
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return ''
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.textValue = this.options.value
        this.getStyle()
      }
    }
  },
  created() {
    this.getStyle()
  },
  methods: {
    getStyle() {
      console.log(this.options.value+"txt")
      if (this.options.title) {
        if (this.options.title.class) {
          if (this.options.title.icon === 'red') this.options.title.class + ' title_icon_red'
          if (this.options.title.icon === 'blue') this.options.title.class + ' title_icon_blue'
        } else {
          if (this.options.title.icon === 'red') this.options.title.class = ' title_icon_red'
          if (this.options.title.icon === 'blue') this.options.title.class = ' title_icon_blue'
        }
        if (this.options.title.width) this.labelStyle += `width: ${this.options.title.width};`
        if (this.options.title.style) this.labelStyle += `${this.options.title.style};`
      }
      if (this.options.option.width) this.boxStyle += `width: ${this.options.option.width};`
      if (this.options.option.style) this.boxStyle += `${this.options.option.style};`
    },
    onValueChanged(e) {
      this.$emit('input', this.options.id, e)
      this.$emit('onValueChanged', this.options.id, e)
    },
    onKeyDown(e) {
      console.log('키다운', this.options.id, e)
      this.$emit('onKeyDown', this.options.id, e)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles/themeB/variables.scss';
.title_icon_red {
  position: relative;
  padding-left: 15px;
  display: inline-block;
  &::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background: #f54949;
    top: calc(36px / 2);
    left: 0;
  }
}
.title_icon_blue {
  position: relative;
  padding-left: 15px;
  display: inline-block;
  &::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background: #2ec9f8;
    top: calc(36px / 2);
    left: 0;
  }
}

.textBox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  flex-basis: auto;

  .label {
    //flex-basis: 80px;
    line-height: 40px;
    text-align: right;
  }
}

.tooltip {
  top: 6px;
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 300px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  top: -6px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
