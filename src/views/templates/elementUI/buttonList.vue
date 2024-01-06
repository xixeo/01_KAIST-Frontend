<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <!--버튼 템플릿-->
  <div class="w-full h-full">
    <div class="flex  w-full">
      <el-breadcrumb>
        <el-breadcrumb-item>edit<elBtnList :useBtnList="data" :changed="isChange" @dataChange="isChange = false" /> </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <JsonEditor class="w-full h-full" :value="data" @json-save="saveButton($event)"></JsonEditor>
    <div class="w-full">
      <el-breadcrumb v-for="(item, index) in sample" :key="index" style="margin: 1%;">
        <el-breadcrumb-item> {{ item.options.id }}<elBtnList :useBtnList="item" @btnClick="btnClick(item.options.id, $event)"/></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import { elBtnList } from '@/components/elementui/editors/index'
import sampleData from './data/buttonList.js'
import JsonEditor from '@/components/editor/jsonEditor' // json 편집기
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'ElementUIButtonListTemplate',
  components: {
    elBtnList,
    JsonEditor
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      data: {},
      sample: sampleData,
      isChange: false
    }
  },
  created() {
    //console.log(this.sample)
    this.data = this.sample.default
  },
  beforeMount() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    btnClick(id, e) {
      this.data = {}
      // console.log(id, e)
      this.data = this.sample[id]
      // this.isChange = true
    },
    saveButton(event) {
      this.data = event
    }
  }
}
</script>

<style lang="scss" scoped></style>
