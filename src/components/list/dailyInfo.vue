<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <!--현대미포 데일리 정보 선택-->
  <div class="dailyInfo">
    <!--상단 타이틀-->
    <div class="date">
      {{ date }}
      <p class="plus text-white" @click="clickTitle()" v-if="true" @touchstart="clickTitle()">
        <svg-icon :icon-class="isExpandable ? 'minus' : 'plus'" width="100%" />
      </p>
    </div>
    <!--body 정보-->
    <ul v-if="listInfo.length > 0 && isExpandable">
      <li v-for="(item, index) in listInfo" :key="index" @click="clickItem(item, index)">
        <a href="#">
          <div class="title">
            <div class="text01">
              <p class="icon"><svg-icon :icon-class="item.dailyInfo" width="100%" /></p>
              <span class="txt">{{ item.title }}</span>
            </div>
            <div class="text02">{{ item.daily }}</div>
          </div>
        </a>
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
  name: 'dailyInfo',
  components: {
    //
  },
  props: {
    date: {
      type: String,
      default: () => {
        return '2021년 3월 10일(목)'
      }
    },
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
      isExpandable: true,
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
    clickTitle() {
      console.log('clickTitle')
      this.isExpandable = !this.isExpandable
    },
    // .vue 내부에서 사용되는 함수를 정의한다.
    makeItems() {
      this.listInfo = []
      this.items.forEach(item => {
        this.listInfo.push(item)
      })
      console.log('items change', this.listInfo)
    }
  }
}
</script>
<style lang="scss" scoped>
$textColor: white;
$bgColor: #151619;
$hoverColor: #1a7dd2;
$boxColor: #4f5358;

.dailyInfo {
  overflow: hidden;
  .date {
    background: rgba(22, 143, 244, 0.95);
    overflow: hidden;
    padding: 5px 0px;
    margin-bottom: 5px;
    color: #ffffff;
    text-align: center;
    p.plus {
      position: absolute;
      top: 10px;
      right: 20px;
      cursor: pointer;
    }
  }
  li {
    width: 100%;
    --background: $bgColor;
    border: 1px solid $boxColor;

    div.title {
      float: left;
      width: 100%;
      padding: 4% 0px;
      background: rgba(0, 0, 0, 0.9);
      color: $textColor;
      border: 1px solid #6c6c6c;
      margin-bottom: 2%;
      .text01 {
        float: left;
        width: 60%;
      }
      .text01 p.icon {
        position: absolute;
        left: 4%;
        padding-top: 4px;
      }
      .text01 .txt {
        position: absolute;
        left: 11%;
      }
      .text02 {
        text-align: right;
        float: right;
        padding-right: 10px;
        width: 40%;
        color: #6bb788;
        font-weight: bold;
      }
    }
    div.map {
      float: left;
      width: 100%;
      height: 122px;
      text-align: center;
      color: $textColor;
      background: $bgColor;
      margin-bottom: 5px;
    }
    :hover {
      div.title {
        background: rgba(79, 83, 88, 0.9);
      }
      // background: #1a7dd2;
    }
  }
}
/* 애니메이션 진입 및 진출은 다른 지속 시간 및  */
/* 타이밍 기능을 사용할 수 있습니다. */
</style>
