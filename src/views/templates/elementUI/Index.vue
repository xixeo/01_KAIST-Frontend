<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <div>
    <div class="flex">
      <div class="w-1/10"><h2>Element UI 템플릿</h2></div>
      <!-- <div class="w-1/4"><themeSelect :id="'elementui'" /></div> -->
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand" class="bg-gray-700 ">
        <template slot-scope="props">
          <!--버튼 템플릿-->
          <btnTemplate class="w-full" v-if="props.row.type === 'button'" />
          <!--버튼 리스트 템플릿-->
          <btnListTemplate class="w-full" v-if="props.row.type === 'buttonlist'" />
          <!--라디오버튼 템플릿-->
          <radioBtnTemplate class="w-full" v-if="props.row.type === 'radiobutton'" />
          <!--날짜 선택 템플릿-->
          <div style="padding: 10px" v-if="props.row.type === 'date'">
            <div class="block">
              <span class="demonstration" style="padding-right: 10px">date</span>
              <el-date-picker v-model="date.value1" type="date" placeholder="Pick a date" default-value="2021-02-01" style="margin-right: 10px">
              </el-date-picker>
              <span class="demonstration" style="padding-right: 10px">daterange</span>
              <el-date-picker
                v-model="date.value2"
                type="daterange"
                align="right"
                start-placeholder="Start Date"
                end-placeholder="End Date"
                default-value="2021-02-01"
              >
              </el-date-picker>
            </div>
          </div>
          <!-- select box 템플릿 -->
          <selectBoxTemplate v-if="props.row.type === 'select'" />
          <!-- switch 템플릿 -->
          <div style="padding: 10px" v-if="props.row.type === 'switch'">
            <el-switch v-model="switchValue"> </el-switch>
          </div>
          <div style="padding: 10px" v-if="props.row.type === 'numberinput'">
            <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" style="margin-right: 10px"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="타입" prop="type"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import themeSelect from '@/components/themeSelect'
import btnSampleData from './data/button.js'
import btnTemplate from './button'
import btnListTemplate from './buttonList'
import radioBtnTemplate from './radioButton'
import selectBoxTemplate from './selectBox'
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'ElementUITemplate',
  components: {
    themeSelect,
    btnTemplate,
    btnListTemplate,
    radioBtnTemplate,
    selectBoxTemplate
    //
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      selected: {
        button: {}
      },
      btnSample: btnSampleData,
      tableData: [
        { type: 'button' },
        { type: 'buttonlist' },
        { type: 'radiobutton' },
        { type: 'select' },
        { type: 'switch' },
        { type: 'numberinput' },
        { type: 'date' }
      ],
      date: {
        value1: '',
        value2: ''
      },
      num: 1,
      selectBox: {
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
        value: ''
      },
      switchValue: true
    }
  },
  created() {
    this.selected.button = this.btnSample.default
  },
  beforeMount() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    handleChange(value) {
      console.log(value)
    },
    btnClick(id, event) {
      console.log(id, event)
      this.selected.button = this.btnSample[id]
    },
    saveButton(event) {
      this.selected.button = event
    }
  }
}
</script>

<style lang="scss" scoped>
// .el-table__expanded-cell {
//   background: cornsilk;
// }
</style>
