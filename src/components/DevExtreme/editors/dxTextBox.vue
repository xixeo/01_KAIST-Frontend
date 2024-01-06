<template>
  <div :class="'textBox p-2 w-full flex ' + options.class" :style="options.style">
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
    </template>
    </span>
    <!-- mask가 있을 때 -->
    <DxTextBox
      v-if="options.option.mask"
      :class="options.option.class"
      :style="boxStyle"
      :value="options.value"
      :maxLength="options.option.txtMaxlength"
      :mode="options.option.txtMode"
      :read-only="options.option.readOnly"
      :disabled="options.option.disabled"
      :show-clear-button="options.option.clearbutton"
      :hover-state-enabled="true"
      :placeholder="this.$t(options.option.placeholder)"
      value-change-event="input"
      :mask-rules="options.option.mask.rules"
      :use-masked-value="options.option.mask.useMask"
      :mask="options.option.mask.pattern"
      :mask-invalid-message="options.option.mask.maskMsg"
      @value-changed="onValueChanged"
    >
      <!-- validation check -->
      <DxValidator v-if="options.validation">
        <!-- 필수항목 체크 -->
        <DxRequiredRule
          v-if="options.validation.required"
          :message="this.$t(options.validation.requiredMsg)"
        />
        <!--중복 체크 -->
        <DxAsyncRule
          v-if="options.validation.asyncList"
          :validation-callback="asyncValidation"
          :message="this.$t(options.validation.asyncMsg)"
        />
        <!-- 길이 체크 -->
        <DxStringLengthRule
          v-if="options.validation.stringMin"
          :min="options.validation.stringMin"
          :message="this.$t(options.validation.stringMinMsg)"
        />
        <!-- 형식 체크 -->
        <DxPatternRule
          v-if="options.validation.pattern"
          :pattern="options.validation.pattern"
          :message="this.$t(options.validation.patternMsg)"
        />
        <!-- 이메일 형식 체크 -->
        <DxEmailRule
          v-show="options.validation.kind==='email'"
          :message="this.$t(options.validation.patternMsg)"
        />
        <!-- 비밀번호 비교 -->
        <DxCompareRule
          v-if="options.validation.kind==='passwordConfirm'"
          :comparison-target="passwordComparison"
          :message="this.$t(options.validation.notMatchMsg)"
        />
      </DxValidator>
    </DxTextBox>
    <!-- mask가 없을 때 -->
    <DxTextBox
      v-if="!options.option.mask"
      :class="options.option.class"
      :style="boxStyle"
      :value="options.value"
      :maxLength="options.option.txtMaxlength"
      :mode="options.option.txtMode"
      :read-only="options.option.readOnly"
      :disabled="options.option.disabled"
      :show-clear-button="options.option.clearbutton"
      :hover-state-enabled="true"
      :placeholder="this.$t(options.option.placeholder)"
      value-change-event="input"
      @value-changed="onValueChanged"
    >
      <!-- validation check -->
      <DxValidator v-if="options.validation">
        <!-- 필수항목 체크 -->
        <DxRequiredRule
          v-if="options.validation.required"
          :message="this.$t(options.validation.requiredMsg)"
        />
        <!--중복 체크 -->
        <DxAsyncRule
          v-if="options.validation.asyncList"
          :validation-callback="asyncValidation"
          :message="this.$t(options.validation.asyncMsg)"
        />
        <!-- 길이 체크 -->
        <DxStringLengthRule
          v-if="options.validation.stringMin"
          :min="options.validation.stringMin"
          :message="this.$t(options.validation.stringMinMsg)"
        />
        <!-- 형식 체크 -->
        <DxPatternRule
          v-if="options.validation.pattern"
          :pattern="options.validation.pattern"
          :message="this.$t(options.validation.patternMsg)"
        />
        <!-- 이메일 형식 체크 -->
        <DxEmailRule
          v-if="options.validation.kind==='email'"
          :message="this.$t(options.validation.patternMsg)"
        />
        <!-- 비밀번호 비교 -->
        <DxCompareRule
          v-if="options.validation.kind==='passwordConfirm'"
          :comparison-target="passwordComparison"
          :message="this.$t(options.validation.notMatchMsg)"
        />
      </DxValidator>
    </DxTextBox>
  </div>
</template>

<script>
import { DxTextBox } from 'devextreme-vue/text-box'
import { DxValidator, DxRequiredRule, DxCompareRule, DxEmailRule, DxPatternRule, DxStringLengthRule, DxAsyncRule } from 'devextreme-vue/validator'
import notify from 'devextreme/ui/notify'

export default {
  name: 'dxTextBox',
  data() {
    return {
      labelStyle: 'float:left;text-align:left;',
      boxStyle: 'float:right;',
      boxClass: 'label text-white '
    }
  },
  components: {
    DxTextBox,
    DxValidator,
    DxRequiredRule,
    DxCompareRule,
    DxEmailRule,
    DxPatternRule,
    DxStringLengthRule,
    DxAsyncRule
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
        console.log('watch', this.emailList)
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
    onValueChanged(e) {
      this.$emit('input', this.options.id, e)
      this.$emit('onValueChanged', this.options.id, e)
    },
    // validation 체크
    asyncValidation(params) {
      return this.sendRequest(params.value)
    },
    // asyncList값과 value 데이터 리스트 비교
    sendRequest(value) {
      let emailList = this.options.validation.asyncList
      let validEmail = null
      return new Promise(resolve => {
        setTimeout(function() {
          emailList.forEach(data => {
            if (value === data) validEmail = false
          })
          resolve(validEmail)
        }, 1000)
      })
    },
    // 패스워드 비교
    passwordComparison() {
      return this.options.validation.compareValue
    }
    // passCheck() {
    //   let beforeValue = this.options.validation.compareValue
    //   let value = this.options.value
    //   console.log('passwordComparison', beforeValue, value)
    //   if (beforeValue === value) return true
    // }
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
  width: 200px;
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
