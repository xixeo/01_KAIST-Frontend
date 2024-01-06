<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <div class="w-full flex">
    <ul v-if="listInfo.length>0">
      <li v-for="(item, index) in listInfo" :key="index" @click="clickItem(item, index)">
        <div class="title">
          {{item.title}}
          <span>{{item.subTitle}}</span>
        </div>
        <div class="img_info">
          <img :src="item.img">
        </div>
        <div class="Num">
          <div class="text">
            {{item.number}}
            <span>{{item.unit}}</span>
          </div>
          <div class="d-day">{{item.dDay}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

import _ from 'lodash'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'combineList',
  components: {
    //
  },
  props: {
    items: {
      type: Array,
      default: () => {
        return []
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
  mounted() {
    this.makeItems() // 화면에 출력할 데이터를 Merge
  },
  beforeDestroy() {
    this.listInfo = []
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    makeItems() {
      this.listInfo = []
      this.items.forEach(item => {
        this.listInfo.push(item)
      })
      console.log('items change', this.listInfo)
    },
    // 클릭하면 호출
    clickItem(item, index) {
      this.selected = index
      // console.log(item)
      this.$emit('clickItem', item) // 정보를 부모에게 전송
    }
  }
}
</script>
<style lang="scss" scoped>
$liBgClr: #353c48;
$hoverColor: #1a7dd2;
$subColor: #999;
$redColor: #ff0000;
ul {
  list-style: none;
  margin: 0;
  padding: 5px;
  li {
    float: left;
    background: $liBgClr;
    width: 48%;
    height: 82px;
    margin: 1%;
  }
  :hover {
    div.title {
      background: $hoverColor;
    }
  }
  div {
    &.title {
      width: 100%;
      background: #434954;
      padding: 3px 0px;
      text-indent: 10px;

      span {
        float: right;
        font-size: 11pt;
        padding-right: 5px;
        color: $subColor;
      }
    }
    &.img_info {
      float: left;
      width: 60%;
      img {
        width: 100%;
        height: 100%;
        padding: 3% 0px 0px 0px;
      }
    }
    &.Num {
      float: left;
      width: 40%;
      display: block;
      background: #2a303a;
      height: 52px;
      text-align: center;
      .text {
        width: 100%;
        font-size: 18pt;
        font-weight: bold;
        padding: 5% 0px 3% 0px;
        span {
          color: $hoverColor;
          font-size: 10pt;
          padding: 0px 0px 0px 3%;
        }
      }
      .d-day {
        width: 100%;
        color: $redColor;
        margin-top: -10%;
      }
    }
  }
}
</style>
