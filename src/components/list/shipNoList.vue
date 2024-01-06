<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <div>
    <aside
      :class="isOpen?'sidebar open':'sidebar close'"
      :style="this.$store.state.menu.flag.fullscreen?'height:98vh':'height:89vh'"
    >
      <!-- title / open / detail info -->
      <div class="side">
        <div class="title flex">
          <!--title-->
          <div class="w-1/2 mt-1">{{$t(title)}}</div>
          <!--button(open/close)-->
          <div class="btn_t w-1/2 flex" @click="setOpenClose">
            {{openLabel}}
            <!--<svg-icon v-if="!isOpen" :icon-class="'chevron-circle-right-solid'" class="ml-1 w-24"></svg-icon>-->
          </div>
        </div>
        <!--detail info box-->
        <div class="sub-info" v-if="isOpen && listInfo.length>0 && selected > 0">
          <div class="title">{{this.$t(detailTitle)}}</div>
          <ul>
            <!--<li v-for="(value, key, index) in selectedItem" :key="index">- {{$t(key)}} : {{value}}</li>-->
            <li v-for="(value, key, index) in selectedItem" :key="index">
              <span class="dock_info1">{{key}}</span>
              <span class="dock_info2">{{value}}</span>
            </li>
          </ul>
        </div>
      </div>

      <!--search-->
      <div class="search flex">
        <el-input
          class="search-input"
          type="text"
          name
          :placeholder="placeHolder"
          v-model="srchText"
        />
        <el-button class="button" @click="searchList">{{$t('btnSearch')}}</el-button>
      </div>
      <!--item list-->
      <ul v-if="listInfo.length>0">
        <li
          v-for="(item) in listInfo"
          :key="item.index"
          :class="item.class"
          @click="clickItem(item)"
        >
          <el-tooltip
            :content="item.tooltip?item.tooltip:item.label"
            :effect="'dark'"
            placement="right"
          >
            <a href="#">
              <span class="state_icon" :style="{color:item.color}">●</span>
              {{item.label}}
              <span style="float:right;" v-if="useCheck">
                <el-checkbox
                  name
                  id
                  class="checkbox_css"
                  @change="checkItem(item)"
                  v-model="item.checked"
                />
              </span>
            </a>
          </el-tooltip>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

import _ from 'lodash'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'shipNoList',
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
    title: {
      type: String,
      default: '호선 List'
    },
    detailTitle: {
      type: String,
      default: '호선 정보'
    }
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다
  data() {
    return {
      selectedItem: {},
      srchText: '',
      useCheck: false, // 체크박스 사용 여부
      isOpen: false,
      openLabel: 'OPEN', // 버튼 label
      placeHolder: 'ID, Nm, Owner, IMO, Type',
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
    },
    isOpen() {
      this.openLabel = this.isOpen ? 'CLOSE' : 'OPEN'
    }
    // srchText() {
    //   console.log(this.srchText)
    // }
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
      this.items.forEach((item, index) => {
        this.listInfo.push(item)
        if (index === 0) {
          this.selectedItem = item.info
        }
      })
      // console.log('items change', this.listInfo)
    },
    searchList() {
      console.log(this.srchText) // input 글자
    },
    setOpenClose() {
      this.isOpen = !this.isOpen ? true : false
      this.$emit('changeOpenClose', this.isOpen) // 부모로 바뀐 정보 전송
    },
    // 클릭하면 호출
    clickItem(obj) {
      this.selected = obj.index
      this.selectedItem = obj.info
      // console.log(obj)
      this.$emit('clickItem', obj) // 정보를 부모에게 전송
      if (this.useCheck) {
        if (obj.index === 1) {
          this.listInfo.forEach(element => {
            element.checked = obj.checked
            if (element.index > 1) element.class = element.checked ? 'selectItem' : '' // 선택한 아이템 label 색상 변경
          })
        } else {
          obj.class = obj.checked ? 'selectItem' : '' // 선택한 아이템 label 색상 변경
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$textColor: white;
$textColor2: #2c8aff;
$bgColor: rgba(0, 0, 0, 0.7);
$hoverColor: #898989;
$boxColor: #4b4d4f;

aside {
  padding: 0px 0px;
  height: 20px;
  a {
    --color: $boxColor;
    cursor: pointer;
    &:hover {
      color: $textColor;
    }
  }
}

.sidebar {
  background-color: $bgColor;
  width: 300px;
  height: 60vh; // 98vh;
  top: 10px;
  left: -300px;
  position: relative;

  .side {
    position: absolute;
    top: 0px;
    left: 300px;
    width: 180px;
    border: none;
    color: $textColor;
    text-align: center;
    line-height: 22px;
    cursor: pointer;
    .title {
      background: $textColor2;
    }
  }
  // 아이템의 서브 정보
  .sub-info {
    width: 220%;
    color: $textColor;
    background: $bgColor;
    background-color: $bgColor;

    text-align: left;
    .title {
     /* background: $hoverColor; */
     background: #3b3d3f;
      padding:7px 0px;
      text-align: center;
    }
    ul {
      overflow:hidden;

    }
    li{
      letter-spacing: -0.02em;
      border-bottom:1px solid #272729;
      line-height:25px;
      overflow:hidden;
      padding:4px 0px;
    }
    li:hover {
      background: #181818;
      color: #00ff00;
    }
    .dock_info1{float:left;width:25%;color:#898989;text-indent:10px;}
    .dock_info2{float:left;width:75%;}
  }

  .search {
    background: $boxColor;
    padding: 6px 8px 0px 10px;

    .search-input {
      background: $boxColor;
      color: $textColor;
      border: 0px solid none;
      width: 220px !important;
      height: 25px !important;
      font-size: 0.7rem;
    }
    .button {
      background: $hoverColor;
      padding: 10px;
      margin-top: 2px;
      margin-bottom: 10px;
      margin-left: 10px;
      border: 1px solid $hoverColor;
      color: $textColor;
      &:hover {
        border: 1px solid $textColor2;
        background: $textColor2;
      }
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

  > ul {
    margin: 0;
    padding: 0;
    position: absolute;
    color: $textColor;
    width: 100%;
    overflow-y: scroll;
    height: 93%;

    li {
      width: 100%;
      list-style: none;
      text-indent: 15px;
      padding: 10px 0px;
      font-size: 14px;
      line-height:26px;
      .selectAll {
        border-bottom: 1px solid $hoverColor;
        width: 100%;
      }
      .selectItem {
        color: $textColor;
      }
      .checkbox_css {
        width: 20px;
        height: 20px;
        float: right;
        margin-right: 30px;
      }
      .state_icon {
        color: $textColor2;
        font-size: 1.7rem;
        line-height: 90%;
        float: left;
      }
    }
  }

  .btn_t {
    background: $bgColor;
    text-align: center;
    font-size: 0.8rem;
    padding: 2% 15%;
  }
}
</style>
