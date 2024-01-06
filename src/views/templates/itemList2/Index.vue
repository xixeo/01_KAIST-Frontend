<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <div>
    <vslider @click="clickSliderItem" :sliderList="listInfo.itemList" :style="listInfo.style" />
    <div class="w-1/2 bg-gray-300" style="overflow:auto; height: 500px;">
      <jsonEditor :value="json" :mode="'code'" @json-save="onSaveClick($event)" class="h-full" id="jeditor" />
    </div>
  </div>
  <!--foot 배너 끝-->
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
import vslider from '@/components/slider/verticalSlider'
import jsonEditor from '@/components/editor/jsonEditor' // json 편집기
import items from './data/data'
import _ from 'lodash'

export default {
  name: 'vSlider',
  components: {
    vslider,
    jsonEditor
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      selected: 1,
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      // 이미지 정보
      listInfo: items(),
      json: {}
    }
  },
  created() {
    this.json = this.listInfo
  },
  mounted() {},
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 이미지를 클릭하면 호출
    clickSliderItem(item) {
      console.log(item) // 선택한 이미지의 정보
    },
    onSaveClick(event) {
      this.listInfo = {}
      _.merge(this.listInfo, event)
      console.log(event.itemList)
    }
  }
}
</script>
<style lang="scss" scoped></style>
