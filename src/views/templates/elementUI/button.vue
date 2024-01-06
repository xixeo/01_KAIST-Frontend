<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <!--버튼 템플릿-->
  <div class="w-full h-full">
    <div class="flex w-full">
      <el-breadcrumb v-for="(item, index) in btnSample" :key="index">
        <el-breadcrumb-item> {{ item.id }}<elBtn :options="item" @btnClick="btnClick(item)"/></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="flex  w-full">
      <el-breadcrumb>
        <el-breadcrumb-item>edit<elBtn :options="button" /> </el-breadcrumb-item>
      </el-breadcrumb>
      <JsonEditor class="w-full h-full" :value="button" @json-save="saveButton($event)"></JsonEditor>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import { elBtn } from '@/components/elementui/editors/index'
import btnSampleData from './data/button.js'
import JsonEditor from '@/components/editor/jsonEditor' // json 편집기
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'ElementUIButtonTemplate',
  components: {
    elBtn,
    JsonEditor
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      button: {},
      btnSample: btnSampleData
    }
  },
  created() {
    this.button = this.btnSample.default
  },
  beforeMount() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    btnClick(e) {
      // console.log(e)
      this.button = this.btnSample[e.id]
    },
    saveButton(event) {
      this.button = event
    }
  }
}
</script>

<style lang="scss" scoped></style>
