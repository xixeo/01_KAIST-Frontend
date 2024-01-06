<template>
  <!-- HTML 정의하는 부분 -->
  <form class="w-full h-full">
    <div :class="`grid auto-rows-max lg:grid-cols-${layoutDataList.columns} ${layoutDataList.class}`" :style="layoutDataList.style">
      <div :class="getLayoutClass(item.position)" v-for="(item, index) in layoutDataList.editorList" :key="index">
        <!-- 셀렉트 박스 -->
        <template class="md:flex" v-if="item.option.type === 'select'">
          <!-- dx-default select Box -->
          <template v-if="item.option.kind === 'default' && item.option.visible !== false">
            <dxSelectBox
              :options="item"
              @input="changeInput"
              @onValueChanged="onValueChanged"
              @onKeyDown="onKeyDown"
              @onKeyUp="onKeyUp"
              @onEnterKey="onEnterKey"
              @onPaste="onPaste"
            />
          </template>
          <template v-else-if="item.option.kind === 'filter' && item.option.visible !== false">
            <!-- filter select Box -->
            <filterSelectBox :options="item" @onValueChanged="onValueChanged" />
          </template>
          <template v-else-if="item.option.kind === 'remote' && item.option.visible !== false">
            <!-- remote select Box -->
            <remoteSelectBox :options="item" @onValueChanged="onValueChanged" />
          </template>
          <template v-else-if="item.option.kind === 'filterText' && item.option.visible !== false">
            <!-- filter text select Box -->
            <DxAutocomplete :data-source="item.item" placeholder="Type first name..." @value-changed="onValueChanged" />
          </template>
        </template>
        <!-- 텍스트 박스 -->
        <template v-else-if="item.option.type === 'input' && item.option.visible !== false">
          <template v-if="item.option.kind === 'text' && item.option.visible !== false">
            <!-- dx-text box -->
            <dxTextBox
              :options="item"
              @onValueChanged="onValueChanged"
              @onKeyDown="onKeyDown"
              @onKeyUp="onKeyUp"
              @onEnterKey="onEnterKey"
              @onPaste="onPaste"
            />
          </template>
          <template v-if="item.option.kind === 'textArea' && item.option.visible !== false">
            <!-- dx-text box -->
            <dxTextArea :options="item" @onValueChanged="onValueChanged" />
          </template>
        </template>
        <!-- 숫자입력 박스 -->
        <template v-else-if="item.option.type === 'number' && item.option.visible !== false">
          <!-- dx-number box -->
          <dxNumberBox :options="item" @onValueChanged="onValueChanged" />
        </template>
        <!-- 체크 박스 -->
        <template v-else-if="item.option.type === 'checkBox' && item.option.visible !== false">
          <!-- dx-check box -->
          <dxCheckBox :options="item" @onValueChanged="onValueChanged" />
        </template>
        <!-- 버튼 리스트 -->
        <template v-else-if="item.option.type === 'buttonList' && item.option.visible !== false">
          <!-- dx-button list -->
          <dxButtonList :useBtnList="item.option" @btnClick="btnClick" />
        </template>
        <!-- 버튼 -->
        <template v-else-if="item.option.type === 'button' && item.option.visible !== false">
          <!-- dx-button -->
          <dxButton :options="item.option.options" @btnClick="onClick(item.option.options)" />
          <!-- summary -->
          <DxValidationSummary
            ref="summary"
            v-if="item.option.options.summary"
            id="summary"
            :style="item.option.options.summaryStyle"
            @contentReady="onContentReady"
            @initialized="onOptionChanged"
          />
        </template>
        <!-- dx달력 -->
        <template v-else-if="item.option.type === 'dateBox' && item.option.visible !== false">
          <!-- datePicker -->
          <dxDateBox :options="item" @onValueChanged="onValueChanged" />
        </template>
        <!-- el달력 -->
        <template v-else-if="item.option.type === 'datePicker' && item.option.visible !== false">
          <!-- datePicker -->
          <datePicker :options="item" />
        </template>
        <!-- Label -->
        <template v-else-if="item.option.type === 'label' && item.option.visible !== false">
          <div class="mt-3 ml-0">
            <span :style="item.option.style">{{ item.value }}</span>
          </div>
        </template>
      </div>
    </div>
  </form>
</template>

<script>
import {
  dxSelectBox,
  dxTextBox,
  dxNumberBox,
  dxTextArea,
  filterSelectBox,
  remoteSelectBox,
  dxCheckBox,
  dxButtonList,
  dxButton,
  dxDateBox,
  datePicker
} from '@/components/DevExtreme/editors' // 에디터 컴포넌트
import { DxAutocomplete } from 'devextreme-vue/autocomplete'
import DxButton from 'devextreme-vue/button'
import DxValidationSummary from 'devextreme-vue/validation-summary'
// [ECMA6] export default 된 부분이 외부에서 import로 사용
export default {
  name: 'editorsLayout',
  props: {
    layoutData: {
      type: Object,
      default: () => {
        return { columns: 0, editorList: [] }
      }
    }
  },
  components: {
    dxSelectBox,
    dxTextBox,
    dxNumberBox,
    dxTextArea,
    filterSelectBox,
    remoteSelectBox,
    dxCheckBox,
    dxButtonList,
    dxButton,
    dxDateBox,
    datePicker,
    DxButton,
    DxValidationSummary,
    DxAutocomplete
  },
  data() {
    return {
      layoutDataList: []
    }
  },
  watch: {
    layoutData: {
      deep: true,
      handler() {
        this.layoutDataList = this.layoutData
      }
    }
  },
  created() {
    this.layoutDataList = this.layoutData
    //console.log('#layoutData : ' + JSON.stringify(this.layoutDataList))
  },
  mounted() {},
  methods: {
    // 레이아웃 위치 정보
    getLayoutClass(item) {
      if (!item) return ''
      let result = ''
      result += `${item.class} `
      if (item.mobile) {
        result += `lg:row-start-${item.row[0]} `
        result += `lg:row-span-${item.row[1]} `
        result += `lg:col-start-${item.col[0]} `
        result += `lg:col-span-${item.col[1]} `
        result += `md:row-start-${item.mobile[0]} `
        result += `md:row-span-${item.mobile[1]} `
        result += `md:col-start-${item.mobile[2]} `
        result += `md:col-span-${item.mobile[3]} `
      } else {
        result += `row-start-${item.row[0]} `
        result += `row-span-${item.row[1]} `
        result += `col-start-${item.col[0]} `
        result += `col-span-${item.col[1]} `
      }
      return result
    },
    // 내부에서 사용되는 함수를 정의
    onValueChanged(...arg) {
      this.$emit('onValueChanged', arg)
    },
    onKeyDown(...arg) {
      this.$emit('onKeyDown', arg)
    },
    onKeyUp(...arg) {
      this.$emit('onKeyUp', arg)
    },
    onEnterKey(...arg) {
      this.$emit('onEnterKey', arg)
    },
    onPaste(...arg) {
      this.$emit('onPaste', arg)
    },
    changeInput(...arg) {
      this.$emit('changInput', arg)
    },
    btnClick(...arg) {
      this.$emit('btnClick', arg)
    },
    onClick(e) {
      this.$emit('onBtnClick', e)
    },
    onContentReady(e) {
      let contentList = []
      e.element.children.forEach(item => {
        contentList.push(item.innerText)
      })
      this.$emit('onContentReady', contentList)
    },
    onOptionChanged(e) {
      this.$emit('onOptionChanged', e)
    }
  }
}
</script>

<style lang="less" scoped>
/* css 혹은 less로 스타일 정의하는 부분 */
#summary {
  padding-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.bg-purple {
  background: #e66eeb;
}
.grid-row {
  margin: 2px;
  min-height: 36px;
}
.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 30px 35px 0;
  margin: 0 auto;
  margin-top: 320px;
  overflow: hidden;
  background-color: rgba(39, 39, 39, 0); // 로그인 박스 배경
  border-radius: 10px;
}
</style>
