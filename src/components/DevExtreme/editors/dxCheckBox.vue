<template>
  <div class="checkBox p-2 w-full flex ' + options.class" :style="options.style">
    <span
      v-if="options.title"
      :class="options.title.class + ' label text-white'"
      :style="labelStyle"
    >{{this.$t(options.title.label)}}
    <template v-if="options.tooltip">
      <div class="tooltip p-1">
        <svg-icon :icon-class="`help1`"  />
        <span class="tooltiptext">{{this.$t(options.tooltipText)}}</span>
      </div>
    </template></span>
    <DxCheckBox
      :class="options.option.class"
      :style="boxStyle"
      :value="checkValue"
      :disabled="options.option.disabled"
      :readOnly="options.option.readOnly"
      :visible="options.option.visible"
      :text="options.option.text"
      @value-changed="onValueChanged"
    />
  </div>
</template>

<script>
import DxCheckBox from 'devextreme-vue/check-box'

export default {
  name: 'dxCheckBox',
  data() {
    return {
      chkBoxValue: this.model,
      labelStyle: 'float:left;text-align:left;',
      boxStyle: 'float:right;',
      checkValue: ''
    }
  },
  components: {
    DxCheckBox
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
        if (this.options.value === 'Y' || this.options.value === true) this.checkValue = true
        if (this.options.value === 'N' || this.options.value === false) this.checkValue = false
        this.getStyle()
      }
    }
  },
  created() {
    if (this.options.value === 'Y' || this.options.value === true) this.checkValue = true
    if (this.options.value === 'N' || this.options.value === false) this.checkValue = false
    this.getStyle()
  },
  methods: {
    getStyle() {
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
      this.$emit('onValueChanged', this.options.id, e)
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
.checkBox {
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
  width: 250px;
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