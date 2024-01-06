<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <div class="w-full h-full">
    <div class="flex w-full">
      <el-breadcrumb v-for="(item, index) in sample" :key="index">
        <el-breadcrumb-item>
          {{ item.id }}
          <div style="margin: 2%; width: 180px;">
            <elSelectBox :options="item" @focusItem="focus" @changeItem="change" />
          </div>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="flex  w-full">
      <el-breadcrumb>
        <el-breadcrumb-item>
          edit
          <elSelectBox :options="data" />
        </el-breadcrumb-item>
      </el-breadcrumb>
      <JsonEditor class="w-full h-full" :value="data" @json-save="save($event)"></JsonEditor>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import elSelectBox from '@/components/elementui/editors/selectBox'
import sampleData from './data/select.js'
import JsonEditor from '@/components/editor/jsonEditor' // json 편집기
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'ElementUISelectBoxTemplate',
  components: {
    elSelectBox,
    JsonEditor
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      data: {},
      sample: sampleData,
      options: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2',
          disabled: true
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      groupOptions: [
        {
          label: 'label1',
          options: [
            {
              value: 'Option1',
              label: 'Option1'
            },
            {
              value: 'Option2',
              label: 'Option2',
              disabled: true
            }
          ]
        },
        {
          label: 'label2',
          options: [
            {
              value: 'Option3',
              label: 'Option3'
            },
            {
              value: 'Option4',
              label: 'Option4'
            },
            {
              value: 'Option5',
              label: 'Option5'
            }
          ]
        }
      ],
      value: ''
    }
  },
  created() {
    for (let item in this.sample) {
      this.sample[item].options = this.options
    }
    this.data = this.sample.default
  },
  beforeMount() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    focus(e) {
      console.log('focus', e)
      if (this.data.id !== e) {
        this.data = this.sample[e]
        if (e === 'group') {
          this.data.options = this.groupOptions
        }
      }
    },
    change(e) {
      console.log('change', e)
    },
    save(event) {
      this.data = event
    }
  }
}
</script>

<style lang="scss" scoped></style>
