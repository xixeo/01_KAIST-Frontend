<template>
  <div class="w-full flex">
    <div
      class="w-4/10 mt-2 text-center align-middle"
      :style="[title?{'display':'block'}:{'display':'none'}]"
    >
      <span v-if="label" class="icon_lbl align-middle" style="top:-17px"></span>
      {{$t(title)}}
    </div>
    <div :class="title?'w-6/10 h-10 mr-2':'w-full h-10 mr-2'">
      <Select
        class="w-full"
        v-bind:value="this.model"
        placeholder="Select"
        :filterable="this.filterable"
        @change="updateValue"
        style="text-align-last: center"
      >
        <template v-if="this.group">
          <el-option-group v-for="group in this.items" :key="group.label" :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-option-group>
        </template>
        <template v-else>
          <template v-for="item in this.items">
            <template v-if="item.useyn !== false">
              <Option
                :key="item.value"
                :value="item.value"
                :label="getText(item.text)"
                automatic-dropdown="true"
              ></Option>
            </template>
          </template>
        </template>
      </Select>
    </div>
  </div>
</template>

<style>
.el-input__icon {
  height: auto;
  width: 25px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: -1px;
  margin-top: 0px;
}
.el-popper[x-placement^='bottom'] {
  margin-top: 40px;
}
</style>

<script>
import OnWindowResize from '@/mixins/OnWindowResize' // window 크기 변경 감지
import i18n from '@/i18n' // 언어 변환(매칭) component
import { Select, Option } from 'element-ui' // 메시지박스 component
export default {
  components: {
    Select,
    Option
  },
  name: 'userSelect',
  props: ['title', 'dest', 'model', 'items', 'group', 'filterable', 'label'],
  mixins: [
    OnWindowResize() // window 사이즈 변경시 Echart resize 가 자동으로 되지 않아 mixins 에 있는 windowResize 이벤트 사용
  ],
  data() {
    return {
      gridInstance: null
    }
  },
  mounted() {
    console.log('group', this.group, this.dest)
    this.$nextTick(() => {
      // 내부 그리드의 width가 시점 문제로 조정 되지 않는 이슈는 글로벌 이벤트로 해결
      window.dispatchEvent(new Event('resize'))
    })
  },
  destroyed() {},
  methods: {
    onWindowResize() {},
    getText(value) {
      return i18n.t(value)
    },
    updateValue: function(value) {
      // console.log(target)
      this.$emit('select', this.title, this.dest, value)
    },
    click: function(value) {
      // console.log(value)
      this.$emit('click', value)
    }
  }
}
</script>
