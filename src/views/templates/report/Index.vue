<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <!--<div>
      <h2>Embed template 페이지</h2>
  </div>-->
  <div
    id="report"
    class="hasNavAndTags"
    :class="this.$store.state.menu.flag.fullscreen ? 'isFullView' : ''"
  >
    <birtReport />
  </div>
</template>

<script>
import axios from 'axios'
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import birtReport from '@/components/report/BIRTReportComponent'
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'report',
  components: {
    birtReport
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      isReportPopup: false
    }
  },
  beforeCreate() {},
  created: () => {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
  },
  mounted: () => {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. nDOM 이후에 조작할 경우 이곳에서 수행
  },
  computed: {},
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
  }
}
</script>

<style lang="less" scoped>
/* css 혹은 less로 스타일 정의하는 부분 */
/* 퍼블리셔 작업 영역 */
</style>
