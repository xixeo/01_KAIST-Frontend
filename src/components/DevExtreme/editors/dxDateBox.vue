<template>
  <div :class="'dateBox p-2 w-full flex ' + options.class" :style="options.style">
    <span v-if="options.title" :class="options.title.class + ' label text-white'" :style="labelStyle">{{ this.$t(options.title.label) }}</span>
    <div :class="boxClass" :style="boxStyle">
      <DxDateBox
        :value="options.value[0]"
        :type="options.option.data[0].kind"
        :display-format="options.option.data[0].format"
        :show-clear-button="options.option.data[0].clearbutton"
        :picker-type="options.option.data[0].pickertype"
        :placeholder="this.$t(options.option.data[0].placeholder)"
        :read-only="options.option.data[0].readOnly"
        :disabled="options.option.data[0].disabled"
        :dateSerializationFormat="options.option.data[0].dateFormat"
        :max="options.option.data[0].max"
        :min="options.option.data[0].min"
        @change="onChange"
        @value-changed="onStartValueChanged"
        @key-down="onKeyDown"
        @key-up="onKeyUp"
        @enter-key="onEnterKey"
        @paste="onPaste"
      >
        <DxValidator v-if="options.validation">
          <DxRequiredRule v-if="options.validation[0].required" :message="options.validation[0].requiredMsg" />
          <DxRangeRule v-if="options.validation[0].maxDate" :max="options.validation[0].maxDate" :message="options.validation[0].maxDateMsg" />
        </DxValidator>
      </DxDateBox>
      <span v-if="options.option.division" class="label text-white" style="width:30px;text-align: center;">{{ options.option.division }}</span>
      <DxDateBox
        v-if="options.option.data[1]"
        :value="options.value[1]"
        :type="options.option.data[1].kind"
        :display-format="options.option.data[1].format"
        :show-clear-button="options.option.data[1].clearbutton"
        :picker-type="options.option.data[1].pickertype"
        :placeholder="this.$t(options.option.data[1].placeholder)"
        :read-only="options.option.data[1].readOnly"
        :disabled="options.option.data[1].disabled"
        :dateSerializationFormat="options.option.data[1].dateFormat"
        :max="options.option.data[1].max"
        :min="options.option.data[1].min"
        @change="onChange"
        @value-changed="onEndValueChanged"
        @key-down="onKeyDown"
        @key-up="onKeyUp"
        @enter-key="onEnterKey"
        @paste="onPaste"
      >
        <DxValidator v-if="options.validation">
          <DxRequiredRule v-if="options.validation[1].required" :message="options.validation[1].requiredMsg" />
          <DxRangeRule v-if="options.validation[1].maxDate" :max="options.validation[1].maxDate" :message="options.validation[1].maxDateMsg" />
        </DxValidator>
      </DxDateBox>
    </div>
  </div>
</template>

<script>
import { DxDateBox, DxCalendarOptions } from 'devextreme-vue/date-box'
import { DxValidator, DxRequiredRule, DxRangeRule } from 'devextreme-vue/validator'

export default {
  name: 'dxDateBox',
  data() {
    return {
      labelStyle: 'float:left;text-align:left;',
      boxStyle: 'float:right;',
      boxClass: 'flex '
    }
  },
  components: {
    DxDateBox,
    DxCalendarOptions,
    DxValidator,
    DxRequiredRule,
    DxRangeRule
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
        this.getStyle()
      }
    }
  },
  created() {
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
      if (this.options.option.class) this.boxClass += this.options.option.class
    },
    onChange(e) {},
    onStartValueChanged(e) {
      this.$emit('onValueChanged', 'start', e)
    },
    onEndValueChanged(e) {
      this.$emit('onValueChanged', 'end', e)
    },
    onKeyDown(e) {
      this.$emit('onKeyDown', this.dateid, e)
    },
    onKeyUp(e) {
      this.$emit('onKeyUp', this.dateid, e)
    },
    onEnterKey(e) {
      this.$emit('onEnterKey', this.dateid, e)
    },
    onPaste(e) {
      this.$emit('onPaste', this.dateid, e)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles/themeB/variables.scss';

.dateBox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  flex-basis: auto;

  .label {
    //flex-basis: 80px;
    line-height: 36px;
    text-align: right;
  }
}
</style>
