<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <div class="w-full h-full">
    <div style="width=100%;">
      <el-breadcrumb>
        <el-breadcrumb-item>edit</el-breadcrumb-item>
      </el-breadcrumb>
      <JsonEditor class="w-full h-full" :value="data" @json-save="save($event)"></JsonEditor>
    </div>
    <div style="display: flex;">
      <el-breadcrumb v-for="(item, index) in sample" :key="index">
        <el-breadcrumb-item>
          {{ item.id }}
          <div style="margin: 1%; width: 300px;">
            <elRadioBtn :options="item" @onChange="onChange(item, $event)" />
          </div>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import _ from 'lodash'
import sampleData from './data/radio.js'
import JsonEditor from '@/components/editor/jsonEditor' // json 편집기
import { elRadioBtn } from '@/components/elementui/editors/index'
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'ElementUIRadioButtonTemplate',
  components: {
    JsonEditor,
    elRadioBtn
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      data: {},
      button: {},
      sample: sampleData,
      radio1: '1',
      radio2: 'New York',
      options: [
        {
          value: '1',
          label: 'OptA',
          disabled: false
        },
        {
          value: '2',
          label: 'OptB',
          disabled: false
        },
        {
          value: '3',
          label: 'OptC',
          disabled: false
        }
      ]
    }
  },
  created() {
    for (let item in this.sample) {
      _.merge(this.sample[item].options, this.options)
      this.sample[item].value = this.options[0].value
      this.sample[item].options.forEach(element => {
        element.disabled = this.sample[item].disabled
      })
    }
    this.data = this.sample.default
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    save(event) {
      this.data = event
    },
    onChange(item, event) {
      item.value = event
      this.data = {}
      this.data = this.sample[item.id]
    }
  }
}
</script>

<style lang="scss" scoped></style>
