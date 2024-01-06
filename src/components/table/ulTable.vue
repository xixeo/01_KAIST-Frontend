<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <div class="ul_table flex">
    <div class="ul_table_icon">
      <svg-icon :icon-class="icon"/>
    </div>
    <div class="ul_table_list">
      <ul>
        <li
          v-for="(item, index) in listInfo"
          :key="item.index"
          @click="clickItem(item, index)"
          :class="selected===index?'li_click':''"
        >
          <div class="flex">
            <svg-icon icon-class="choice" v-if="selected===index"/>
            <div>{{item.content}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

import _ from 'lodash'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'ulTable',
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
    movePixel: {
      type: Number,
      default: 50
    },
    icon: {
      type: String,
      default: 'news'
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
    this.makeItems()
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
.ul_table {
  width: 100%;
  height: 100%;

  .ul_table_icon {
    width: 30%;
    float: left;
    padding: 5% 0px 0px 5%;
    .svg-icon {
      width: 100%;
      height: 100%;
      min-width: 50%;
      min-height: 50%;
    }
  }
  .ul_table_list {
    margin-top: 0px;
    width: 70%;
    height: 80%;
    float: left;
    overflow-y: auto;
    ul {
      --padding: 10px;
      padding-left: 10px;
      li {
        --list-style: none;
        cursor: pointer;
        border-bottom: 1px solid #252525;
        padding: 6px 0px;
        text-indent: 14px;
        &:first-child {
          border-top: 1px solid #363636;
        }
        &:nth-child(even) {
          background: #1c1b1b;
        }
      }
      :hover {
        background: #464646 !important;
        transition: all 0.5s;
      }
      .li_click {
        color: #168ff4 !important;
        background: #363636 !important;
        transition: all 1s;
      }
    }
  }
}
</style>
