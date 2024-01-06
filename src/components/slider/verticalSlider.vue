<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <div class="vertical_slider">
    <div class="foot_banner w-full">
      <div class="imageContainer" v-bind:style="{ transform: 'translate(0px, -' + selected * movePixel + 'px)', postion: 'absolute', width: '100%' }">
        <ul class="w-full">
          <div v-for="item in sliderList" :key="item.index" class="w-full">
            <li class="imageWrapper">
              <img :src="require(`@/assets/images/sliderIcons/${item.img}`)" width="100%" height="100%" @click="clickImage(item)" />
            </li>
          </div>
        </ul>
      </div>
      <div class="prev w-full" v-on:click="prev">
        <button class name>
          <img src="@/assets/images/sliderIcons/prev.png" alt="이전버튼" width="100%" />
        </button>
      </div>
      <div class="next w-full" v-on:click="next">
        <button class name>
          <img src="@/assets/images/sliderIcons/next.png" alt="다음버튼" width="100%" />
        </button>
      </div>
    </div>
  </div>
  <!--foot 배너 끝-->
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

import _ from 'lodash'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'verticalSlider',
  components: {
    //
  },
  props: {
    sliderList: {
      type: Array,
      default: () => {
        return []
      }
    },
    movePixel: {
      type: Number,
      default: 50
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
    // sliderList: {
    //   deep: true,
    //   handler(newData) {
    //     this.listInfo.slice(0)
    //     _.merge(this.listInfo, this.sliderList)
    //     console.log('sliderList change', this.listInfo)
    //     this.prev()
    //   }
    // }
  },
  created() {
    _.merge(this.listInfo, this.sliderList)
    this.prev()
  },
  mounted() {},
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 이미지를 클릭하면 호출
    clickImage(item) {
      // console.log(item)
      this.$emit('click', item) // 선택한 이미지의 정보를 부모에게 전송
    },
    prev() {
      if (this.selected !== -1) this.selected = this.selected - 1
      // else this.selected = this.listInfo.length
      // console.log(this.selected)
    },
    next() {
      if (this.selected !== this.listInfo.length - 2) this.selected = this.selected + 1
      // this.selected = 1
      //console.log(this.selected)
    }
  }
}
</script>
<style lang="scss" scoped>
.vertical_slider {
  float: left;
  width: 100%;
  height: 100%;
}
.foot_banner {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  margin: 0px 15%;
  background: #252525;

  .imageContainer {
    float: left;
    position: relative;
    margin: 25px auto;
    display: flex;
    overflow: hidden;
    transition: 0.5s;
  }
  button {
    width: 100%;
    background: #464646;
    border: 0px none;
    cursor: pointer;
    padding: 0px;
    border-radius: 0px;
  }
  .prev {
    position: absolute;
    //--margin: 295px auto;
    //--bottom: 0px;
    :hover {
      background: #168ff4;
    }
  }
  .next {
    position: absolute;
    bottom: -7px;
    :hover {
      background: #168ff4;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      list-style: none;
      // padding: 0;
      // margin: 0;
      &.imageWrapper {
        width: 100%;
        background: #252525;
        :hover {
          background: #168ff4;
          transition: all 0.5s;
        }
      }
    }
  }
}
</style>
