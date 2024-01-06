<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <!--<div>sidebar & itemList</div>-->
  <div>
    <aside :class="isOpen ? 'sidebar open' : 'sidebar close'" :style="this.$store.state.menu.flag.fullscreen ? 'height:98vh' : 'height:80vh'">
      <div class="side">
        호선
        <br />LIST
        <div class="btn_t" @click="isOpen = !isOpen ? true : false">{{ items.openLabel }}</div>
      </div>
      <div class="search">
        <el-input class="search-input" type="text" name :placeholder="items.placeHolder" v-model="srchText" />
        <el-button @click="searchList">{{ $t('btnSearch') }}</el-button>
      </div>
      <ul>
        <li v-for="item in items.itemList" :key="item.index" :class="item.class">
          {{ item.label }}
          <span style="float:right;">
            <el-checkbox name id class="checkbox_css" @change="checkItem(item)" v-model="item.checked" />
          </span>
        </li>
      </ul>
    </aside>
    <div class="w-1/2 bg-gray-300" style="position: absolute;top: 0px; left: 500px; overflow:auto; height: 500px;">
      <jsonEditor :value="items" :mode="'code'" @json-save="onSaveClick($event)" class="h-full" id="jeditor" />
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
import jsonEditor from '@/components/editor/jsonEditor' // json 편집기
import data from './data/data'
// 개발자 작업 영역
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'itemList',
  components: {
    jsonEditor
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      srchText: '',
      isOpen: false,
      items: data
      //
    }
  },
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
  },
  mounted() {},
  watch: {
    isOpen() {
      this.items.openLabel = this.isOpen ? 'CLOSE' : 'OPEN'
    }
    // srchText() {
    //   console.log(this.srchText)
    // }
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 조회 버튼 클릭시 호출
    searchList() {
      console.log(this.srchText) // input 글자
    },
    // 체크박스 선택시 호출
    checkItem(obj) {
      // console.log('check:', obj)
      // alert(`check ${obj.index}: ${obj.label} , check:${obj.checked}`)
      // 전체 선택시
      if (obj.index === 1) {
        this.items.itemList.forEach(element => {
          element.checked = obj.checked
          if (element.index > 1) element.class = element.checked ? 'selectItem' : '' // 선택한 아이템 label 색상 변경
        })
      } else {
        obj.class = obj.checked ? 'selectItem' : '' // 선택한 아이템 label 색상 변경
      }
    },
    onSaveClick(event) {
      this.items = {}
      this.items = event
    }
  }
}
</script>

<style lang="scss" scoped>
/* css 혹은 less로 스타일 정의하는 부분 */

.sidebar {
  background-color: rgba(0, 0, 0, 0.5);
  width: 300px;
  height: 80vh; // 98vh;
  top: 150px;
  left: -300px;
  position: relative;

  .side {
    background: #1a7dd2;
    position: absolute;
    top: 0px;
    left: 300px;
    width: 52px;
    border: none;
    color: white;
    width: 65px;
    text-align: center;
    line-height: 22px;
    cursor: pointer;
  }

  .search {
    width: 100%;
    background: #4b4d4f;
    padding: 6px 8px;

    .search-input {
      background: #4b4d4f;
      padding: 2px 2px;
      border: 1px solid #898989;
      color: #ffffff;
      width: 170px;
      font-size: 0.7rem;
    }

    button {
      background: #898989;
      padding: 4px 10px;
      margin-top: 2px;
      margin-left: 10px;
      border: 1px solid #898989;
      color: #ffffff;
    }
  }

  // 사이드바 열기 위치 / 효과
  &.open {
    left: 0px;
    transition: all 1s;
  }
  // 사이드바 닫기 위치 / 효과
  &.close {
    left: -300px;
    transition: all 1s;
  }

  .checkbox_css {
    width: 20px;
    height: 20px;
    float: right;
    margin-right: 30px;
  }

  > ul {
    margin: 0;
    padding: 0;
    position: absolute;
    color: #fff;
    width: 90%;
    overflow-y: scroll;
    height: 88%;
  }

  li {
    width: 100%;
    list-style: none;
    text-indent: 7px;
    padding: 10px 0px;
    font-size: 14px;
  }

  li.selectAll {
    border-bottom: 1px solid #333;
    width: 100%;
  }

  li.selectItem {
    color: #ff0000;
  }

  .btn_t {
    background: #000;
    width: 65px;
    font-size: 12px;
    padding: 5px 0px;
  }
}
</style>
