<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <!--품질일보-->
  <contentPopup :title="'품질일보'" class="popup" @clickExpand="clickExpand">
    <ulTable :items="qualityList" :icon="'news'" @clickItem="clickTableItem" />
  </contentPopup>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
import contentPopup from '@/components/popup/content'
import ulTable from '@/components/table/ulTable'

export default {
  name: 'popupDraggable',
  components: {
    contentPopup,
    ulTable
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      qualityList: []
    }
  },
  created() {},
  mounted() {
    this.qualityList = [
      { index: 1, content: '3월 09일 화요일', id: 'test1' },
      { index: 2, content: '3월 10일 수요일', id: 'test2' },
      { index: 3, content: '3월 11일 목요일', id: 'test3' },
      { index: 4, content: '3월 12일 금요일', id: 'test4' },
      { index: 5, content: '3월 13일 토요일', id: 'test5' },
      { index: 6, content: '3월 14일 일요일', id: 'test6' },
      { index: 7, content: '3월 15일 월요일', id: 'test7' }
    ]
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 이미지를 클릭하면 호출
    clickExpand(item) {
      console.log(item)
    },
    clickTableItem(item) {
      console.log(item)
    }
  }
}
</script>
<style lang="scss" scoped>
.popup {
  float: left;
  width: 23%;
  margin-left: 1%;
  margin-right: 1%;
  height: 237px;
  background: #151619;
  color: #ffffff;
}
</style>
