<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <div style="height: 89vh; overflow-y: auto; overflow-x: hidden;">
    <div class="dx-fieldset">
      <div class="dx-field">
        <!-- <themeSelect :id="'devExtreme'" /> -->
      </div>
    </div>
    <!--Sapmle list-->
    <div class="dx-fieldset">
      <div class="dx-field">
        <div class="dx-field-label">normal</div>
        <div class="dx-field-value">
          <dxButton :options="btnSampleNormal" @btnClick="onClick(btnSampleNormal)"></dxButton>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">default</div>
        <div class="dx-field-value">
          <dxButton :options="btnSampleDefault" @btnClick="onClick(btnSampleDefault)"></dxButton>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">success</div>
        <div class="dx-field-value">
          <dxButton :options="btnSampleSuccess" @btnClick="onClick(btnSampleSuccess)"></dxButton>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">danger</div>
        <div class="dx-field-value">
          <dxButton :options="btnSampleDanger" @btnClick="onClick(btnSampleDanger)"></dxButton>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">disabled</div>
        <div class="dx-field-value">
          <dxButton :options="btnSampleDisabled" @btnClick="onClick(btnSampleDisabled)"></dxButton>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">outline</div>
        <div class="dx-field-value">
          <dxButton :options="btnSampleOutline" @btnClick="onClick(btnSampleOutline)"></dxButton>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">fontawesome</div>
        <div class="dx-field-value">
          <dxButton :options="btnSampleFas" @btnClick="onClick(btnSampleFas)"></dxButton>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">svg</div>
        <div class="dx-field-value">
          <dxButton :options="btnSampleSvg" @btnClick="onClick(btnSampleSvg)"></dxButton>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">icon</div>
        <div class="dx-field-value">
          <dxButton :options="btnSampleIcon" @btnClick="onClick(btnSampleIcon)"></dxButton>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">text</div>
        <div class="dx-field-value">
          <dxButton :options="btnSampleText" @btnClick="onClick(btnSampleText)"></dxButton>
        </div>
      </div>
    </div>
    <!--Editing Sample-->
    <div class="flex w-full">
      <div class="dx-field">
        <div class="dx-field-label">button edit</div>
        <div class="dx-field-value" v-if="isChange">
          <dxButton :options="btnSampleEdit" @btnClick="testVisible = true"></dxButton>
        </div>
      </div>
      <div style="width:100%;">
        <div class="dx-field-label">json</div>
        <div class="dx-field-value">
          <JsonEditor :value="btnSampleEdit" @json-save="onClick($event)" class="w-full h-full"></JsonEditor>
        </div>
      </div>
    </div>
    <!--button list-->
    <div class="dx-fieldset">
      <div class="dx-field">
        <div class="dx-field-label">buttonList Normal</div>
        <div class="dx-field-value">
          <dxButtonList :useBtnList="btnButtonListNormal" @btnClick="onClick($event.options)"></dxButtonList>
        </div>
      </div>
    </div>
    <div class="dx-fieldset">
      <div class="dx-field">
        <div class="dx-field-label">buttonList icon</div>
        <div class="dx-field-value">
          <dxButtonList :useBtnList="btnButtonListIcon" @btnClick="onClick($event.options)"></dxButtonList>
        </div>
      </div>
    </div>
    <div class="dx-fieldset">
      <div class="dx-field">
        <div class="dx-field-label">buttonList edit</div>
        <div class="dx-field-value">
          <dxButtonList :useBtnList="btnButtonListSample" @btnClick="onClick($event.options)"></dxButtonList>
        </div>
      </div>
      <JsonEditor :value="btnButtonListSample" @json-save="onClickButtonListChange($event)" class="w-full h-full"></JsonEditor>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
// import contentPopup from '@/components/popup/content'
import notify from 'devextreme/ui/notify'
import { dxButton, dxButtonList } from '@/components/DevExtreme/editors' // 에디터 컴포넌트
import btnSample from './data/button.js'

import JsonEditor from '@/components/editor/jsonEditor' // json 편집기
import _ from 'lodash'
import localStore from '@/utils/localStore'
import themeSelect from '@/components/themeSelect'

export default {
  name: 'Button',
  components: {
    dxButton,
    dxButtonList,
    JsonEditor,
    themeSelect
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      testVisible: true,
      btnVisible: true,
      btnSampleSuccess: btnSample.success,
      btnSampleDefault: btnSample.default,
      btnSampleNormal: btnSample.normal,
      btnSampleDanger: btnSample.danger,
      btnSampleDisabled: btnSample.disabled,
      btnSampleOutline: btnSample.outline,
      btnSampleFas: btnSample.fontawesome,
      btnSampleSvg: btnSample.svgIcon,
      btnSampleIcon: btnSample.icon,
      btnSampleText: btnSample.text,
      btnSampleEdit: btnSample.edit,
      btnButtonListNormal: btnSample.list_normal,
      btnButtonListIcon: btnSample.list_icon,
      btnButtonListSample: btnSample.list_edit,
      isChange: true,
      notifyType: ['info', 'warning', 'error', 'success'],
      notifyIndex: 0,
      themes: 0
    }
  },
  created() {},
  mounted() {},
  methods: {
    onClickButtonListChange(e) {
      notify({ message: `button click and change`, width: 320 }, this.notifyType[this.notifyIndex++], 1000)
      if (this.notifyIndex > 3) this.notifyIndex = 0
      // console.log('onClickButtonListChange', e)
      let data = { group: null, list: [], options: {} }
      let list = []
      let options = {}
      if (e.group) {
        data.group = {}
        _.merge(data.group, e.group)
      }
      _.merge(data.list, e.list)
      _.merge(data.options, e.options)
      this.btnButtonListSample.group = {}
      this.btnButtonListSample.list = []
      this.btnButtonListSample.options = {}
      // _.merge(this.btnButtonListSample.list, list)
      // _.merge(this.btnButtonListSample.options, options)
      _.merge(this.btnButtonListSample, data)
      console.log(this.btnButtonListSample)
    },
    onClick(e) {
      notify({ message: `button click and change`, width: 320 }, this.notifyType[this.notifyIndex++], 1000)
      if (this.notifyIndex > 3) this.notifyIndex = 0
      this.btnSampleEdit = {}
      _.merge(this.btnSampleEdit, e)
      console.log(e)
    }
    // .vue 내부에서 사용되는 함수를 정의한다.
  }
}
</script>
<style lang="scss" scoped>
.dx-viewport:not(.dx-theme-ios7) .dx-fieldset {
  width: 100%;
  margin: 30px auto;
}

.dx-viewport:not(.dx-theme-ios7) .dx-fieldset:first-child {
  margin-top: 0px;
}

.dx-viewport:not(.dx-theme-ios7) .dx-fieldset-header {
  font-size: 16px;
}

.dx-viewport:not(.dx-theme-ios7) .dx-field {
  display: inline-block;
  margin-right: 24px;
}
.dx-viewport:not(.dx-theme-ios7) .dx-field-value:not(.dx-widget) > .dx-button {
  float: none;
}

.dx-viewport:not(.dx-theme-ios7) .dx-field-value:not(.dx-switch):not(.dx-checkbox):not(.dx-button),
.dx-viewport:not(.dx-theme-ios7) .dx-field-label {
  float: none;
  width: 100%;
}

.dx-viewport:not(.dx-theme-ios7) .dx-field-label {
  padding-left: 0;
}

.send .dx-button-content .dx-icon {
  font-size: 18px;
}
</style>
