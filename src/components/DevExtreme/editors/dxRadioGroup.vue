<template>
  <div class="radioGroupContainer">
    <div>
      <DxRadioGroup
        :dataSource="dataSource"
        :displayExpr="displayExpr"
        :valueExpr="valueExpr"
        :layout="layout"
        :value="value"
        :name="name"
        :width="width"
        :height="height"
        :disabled="disabled"
        :readOnly="readOnly"
        @value-changed="onValueChanged"
      />
    </div>
  </div>
</template>

<script>
import DxRadioGroup from 'devextreme-vue/radio-group'

export default {
  name: 'dxRadioGroup',
  components: {
    DxRadioGroup
  },
  props: {
    radioId: {
      type: String,
      required: true
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    displayExpr: {
      type: String,
      default: () => {
        return ''
      }
    },
    valueExpr: {
      type: String,
      default: () => {
        return ''
      }
    },
    name: {
      type: String,
      default: () => {
        return ''
      }
    },
    layout: {
      type: String,
      default: () => {
        //vertical, horizontal
        return 'vertical'
      }
    },
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    width: {
      type: String,
      default: function() {
        return '50px'
      }
    },
    height: {
      type: String,
      default: function() {
        return '35px'
      }
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    readOnly: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  methods: {
    onValueChanged(e) {
      const previousValue = e.previousValue
      const newValue = e.value
      this.$emit('onValueChanged', this.radioId, e)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles/themeB/variables.scss';

.radioGroupContainer {
  /* display: inline-flex; */

  .label {
    //flex-basis: 80px;
    line-height: 36px;
    text-align: right;
  }
}
</style>