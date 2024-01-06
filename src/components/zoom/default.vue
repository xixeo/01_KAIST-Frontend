<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <!--현대미포 맵 선택-->
  <div class="zooms" :class="`grid grid-rows-${layout.rows} grid-cols-${layout.cols}`">
    <el-button
      type="info"
      class="w-full in"
      :class="`col-start-${layout.zoomin.col[0]} col-span-${layout.zoomin.col[1]} h-${layout.zoomin.height}`"
      @click="clickItem(true)"
    >
      <i class="el-icon-plus label_icon"></i>
    </el-button>
    <el-button
      type="info"
      class="w-full out"
      :class="`col-start-${layout.zoomout.col[0]} col-span-${layout.zoomout.col[1]} h-${layout.zoomin.height}`"
      @click="clickItem(false)"
    >
      <i class="el-icon-minus label_icon"></i>
    </el-button>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

import _ from 'lodash'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'defaultZoom',
  components: {
    //
  },
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    layout: {
      type: Object,
      default: () => {
        return {
          rows: 2,
          cols: 8,
          zoomin: { col: [8, 1], height: 8 },
          zoomout: { col: [8, 1], height: 8 }
        }
      }
    }
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다
  data() {
    return {
      selected: 1,
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      // 이미지 정보
      listInfo: []
    }
  },
  watch: {
    // 아이템 리스트 갱신하면 데이터 복사 및 갱신
    items() {
      this.makeItems()
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {
    this.listInfo = []
  },
  methods: {
    // 클릭하면 호출
    clickItem(inout) {
      this.$emit('clickItem', inout) // 정보를 부모에게 전송
    }
  }
}
</script>
<style lang="scss" scoped>
$textColor: 151619;
$bgColor: #fff;
$hoverColor: #1a7dd2;
$boxColor: #4f5358;

.zooms {
  width: 100%;
  height: 100%;
  .el-button--info {
    padding: 0px;
    margin: 0px;
    border: none;
    // :active {
    //   background: none;
    // }
  }
  .in {
    border-radius: 5px 5px 1px 1px;
  }
  .out {
    border-radius: 1px 1px 5px 5px;
  }
  color: $textColor;
  .label_icon {
    position: relative;
    font-weight: bold;
  }
}
</style>
