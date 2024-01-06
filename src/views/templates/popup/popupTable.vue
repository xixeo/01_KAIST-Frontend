<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <!--품질일보-->
  <div>
    <!--팝업 열기 버튼-->
    <dxButton :options="btnOptions" @btnClick="testVisible = true"></dxButton>
    <contentPopup
      :title="'품질일보'"
      :popupID="'testDrag2'"
      class="popup"
      v-if="this.testVisible"
      @clickExpand="clickExpand"
      @clickClose="testVisible = $event"
      :collapsable="{ use: true }"
      :closable="{ use: true }"
      :draggable="{ stopDragging: false, isStorePosition: true, resetInitialPos: true, useFixDragIcon: true }"
    >
      <ulTable :items="qualityList" :icon="'news'" @clickItem="clickTableItem" style="height:237px;" />
    </contentPopup>
    <contentPopup
      class="popup"
      @clickExpand="clickExpand"
      :draggable="{ stopDragging: false, isStorePosition: true, resetInitialPos: true }"
      :popupID="'testDrag'"
    >
      <ulTable :items="qualityList" :icon="'news'" @clickItem="clickTableItem" />
    </contentPopup>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
import contentPopup from '@/components/popup/content'
import ulTable from '@/components/table/ulTable'
import { dxButton } from '@/components/DevExtreme/editors' // 에디터 컴포넌트

export default {
  name: 'vSlider',
  components: {
    contentPopup,
    ulTable,
    dxButton
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      qualityList: [],
      testVisible: true,
      btnVisible: true,
      btnOptions: {
        kind: 'DevExtreme',
        class: null,
        style: 'width: 120px; margin-top: 0.1%;margin-left: 0.1%;',
        id: 'test',
        type: 'default',
        content: null,
        icon: null,
        stylingMode: 'contained',
        svg: {
          icon: 'excel',
          style: 'margin-right: 3px;'
        },
        text: {
          content: 'open',
          style: 'margin-left: 3px;'
        }
      }
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
    onClick(e) {},
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
  --height: 237px;
  background: #151619;
  color: #ffffff;
}
</style>
