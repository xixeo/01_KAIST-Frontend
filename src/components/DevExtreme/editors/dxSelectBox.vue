<template>
  <div :class="'selectBox p-2 w-full flex ' + options.class" :style="options.style">
    <span
      v-if="options.title"
      :class="options.title.class + ' label text-white'"
      :style="labelStyle"
    >{{this.$t(options.title.label)}}</span>
    <DxSelectBox
      :class="options.option.class"
      :style="boxStyle"
      :value="options.value"
      :ref="this.selBoxRef"
      :data-source="options.itemList"
      :search-enabled="options.option.searchenabled"
      :search-mode="'startswith'"
      :search-expr="'label'"
      :value-expr="'value'"
      :display-expr="'label'"
      :read-only="options.option.readOnly"
      :disabled="options.option.disabled"
      :show-clear-button="options.option.clearbutton"
      :search-timeout="searchTimeoutOption"
      :placeholder="this.$t(options.option.placeholder)"
      @change="onChange"
      @value-changed="onValueChanged"
      @key-down="onKeyDown"
      @key-up="onKeyUp"
      @enter-key="onEnterKey"
      @paste="onPaste"
      drop-down-button-template="valueIcon"
      item-template="customItem"
    >
      <template #valueIcon="{}">
        <div v-if="options.option.dropdownImage && options.option.iconVisible">
          <svg-icon :iconClass="options.option.dropdownImage" class="custom-icon" />
        </div>
        <div v-else class="dx-dropdowneditor-icon"></div>
      </template>

      <template #customItem="{ data: itemData }">
        <div v-if="options.option.itemImage && options.option.iconVisible ">
          <div class="custom-item flex">
            <svg-icon :iconClass="itemData.label" style="width:50%;" />
            <div class="product-name" style="width:50%;">{{ itemData.label }}</div>
          </div>
        </div>
        <div v-else class="product-name">{{ itemData.label }}</div>
      </template>

      <DxValidator v-if="options.validation">
        <DxRequiredRule
          v-if="options.validation.required"
          :message="this.$t(options.validation.requiredMsg)"
        />
      </DxValidator>
    </DxSelectBox>
  </div>
</template>

<script>
import DxSelectBox from 'devextreme-vue/select-box'
import { DxValidator, DxRequiredRule } from 'devextreme-vue/validator'
export default {
  name: 'dxSelectBox',
  data() {
    return {
      searchTimeoutOption: 10,
      selBoxRef: this.$route.name + '_' + this.options.id,
      labelStyle: 'float:left;text-align:left;',
      boxStyle: 'float:right;'
    }
  },
  components: {
    DxValidator,
    DxSelectBox,
    DxRequiredRule
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
    },
    onChange(e) {},
    onValueChanged(e) {
      this.$emit('input', this.options.id, e)
      this.$emit('onValueChanged', this.options.id, e)
    },
    onKeyDown(e) {
      this.$emit('onKeyDown', this.options.id, e)
    },
    onKeyUp(e) {
      this.$emit('onKeyUp', this.options.id, e)
    },
    onEnterKey(e) {
      this.$emit('onEnterKey', this.options.id, e)
    },
    onPaste(e) {
      this.$emit('onPaste', this.options.id, e)
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

.selectBox {
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

  .custom-item img {
    float: right;
  }

  .custom-item .product-name {
    line-height: 32px;
    padding-left: 5px;
  }

  .custom-icon {
    max-height: 100%;
    max-width: 100%;
    font-size: 28px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>