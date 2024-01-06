<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <div>
    <h2>VectorMap 템플릿</h2>
    <div class="w-full h-full flex">
      <vectorMap :items="items"/>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
import store from '@/store'
import getMapData from './data/mapData.js' // 맵에 매핑하기 위한 포인트 정보
import vectorMap from '@/components/DevExtreme/map/devVectorMap.vue'
import devCustomChart from '@/components/DevExtreme/devChart/devCustomChart.vue' // 사용자 정의 차트
export default {
  name: 'vectorMapTemplate',
  components: {
    vectorMap
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      items: {
        title: 'vectorMap',
        src: '@/assets/images/camera/20210611_110247.jpg',
        url: '@/assets/images/camera/20210611_110247.jpg',
        layerData: getMapData()
      },
      fullscreen: false,
      MapViewFull: false,
      flag: {
        settingPopup: false
      }
    }
  },
  created() {},
  watch: {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 좌표 출력
    getLayerData() {
      console.log('출력', feature)
    },
    clickItem() {
        console.log('클릭', feature)
    }
  }
}
</script>
<style lang="less"></style>
