<template>
  <div class="w-full h-full bg-red-0" style="margin-left: 12px;">
    <vueHorizontalList :items="items" :options="options">
      <!--<template v-slot:nav-prev>
        <div>👈</div>
      </template>
      <template v-slot:nav-next>
        <div>👉</div>
        <svg-icon icon-class="chevron-circle-right-solid"/>
      </template>-->
      <!--<template v-slot:start></template>
      <template v-slot:end></template>-->
      <template v-slot:default="{ item }">
        <div class="item bg-yellow-0" :key="item.title">
          <contentPopup :title="'1차 검사 클린 합격률'" class="cotent_item" @clickExpand="clickExpand" v-if="item.title === '1'">
            <customChart
              chartclass="chart"
              :chartref="chartItmes.ref"
              :chartStyle="'width: 100%; height: 230px;'"
              :options="chartItmes.options"
              :interval="5000"
              :request="chartItmes.chartReq"
              :apiFunc="apiFunc"
              @response="responseChart"
              @clickSeries="testfunc"
              autoresize
            ></customChart>
          </contentPopup>
          <contentPopup :title="'인도 준비 호선 코멘트 현황'" class="cotent_item" @clickExpand="clickExpand" v-if="item.title === '2'">
            <combineList :items="list.combine" @clickItem="clickShipItem" />
          </contentPopup>
          <contentPopup :title="'품질일보'" class="cotent_item" @clickExpand="clickExpand" v-if="item.title === '3'">
            <ulTable :items="list.quality" :icon="'news'" @clickItem="clickTableItem" />
          </contentPopup>
          <contentPopup :title="'품질일보'" class="cotent_item" @clickExpand="clickExpand" v-if="item.title === '4'">
            <ulTable :items="list.quality" :icon="'news'" @clickItem="clickTableItem" />
          </contentPopup>
        </div>
      </template>
    </vueHorizontalList>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

import contentPopup from '@/components/popup/content' // 팝업 창 컴포넌트
import ulTable from '@/components/table/ulTable' // 이미지 + 그리드 테이블
import combineList from '@/components/list/combineList' // 테이블(타이틀 + 그림 + 글자) 리스트
import customChart from '@/components/echart/customChart' // 사용자 정의 차트

import getBar from '../data/bar.js'
import getLine from '../data/line.js'
import getQualityList from '../data/qualityList.js'
import getCombineList from '../data/combineList.js'

import { getDomainListData } from '@/api/system/domainManage' // 도메인 리스트 api 호출

import vueHorizontalList from 'vue-horizontal-list'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'contentOfQuality',
  components: {
    contentPopup,
    ulTable,
    combineList,
    customChart,
    vueHorizontalList
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  props: {
    shipInfo: Object
  },
  data() {
    return {
      isbottomExpand: true,
      isbottomHide: false,
      selected: 1,
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      chartItmes: {
        ref: 'bar',
        options: getBar(),
        chartReq: { test: '1' }
        // ref: 'line',
        // options: getLine()
      },
      list: {
        quality: [], // 품질 정보
        combine: [] // ..
      },
      options: {
        responsive: [
          { end: 768, size: 1 }, //?
          { start: 768, end: 1024, size: 2 },
          { size: 3 }
        ],
        list: {
          windowed: 1200, // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
          padding: 0 // Because: #app {padding: 80px 24px;}
        },
        position: {
          start: 0 // 시작 아이템
        },
        autoplay: {
          play: false, // 자동 시작 여부
          repeat: false, // 반복 여부
          speed: 2500 // 속도
        }
      },
      items: [
        { title: '1', content: 'Content1' },
        { title: '2', content: 'Content2' },
        { title: '3', content: 'Content3' },
        { title: '4', content: 'Content4' }
      ]
    }
  },
  created() {},
  mounted() {
    this.list.quality = getQualityList() // 품질일보 데이터 연결
    this.list.combine = getCombineList() // 호선 정보 데이터 연결
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 차트에 연결하는 api 함수 리턴
    testfunc(item) {
      console.log('testfunc')
    },
    apiFunc(req) {
      return getDomainListData(req)
    },
    // 응답 데이터와 차트 정보 연결
    responseChart(res, refs) {
      console.log('responseChart', res, refs)
    },
    // 호선 리스트에서 호선 선택하면 호출
    clickShipNoItem(item) {
      console.log(item) // 선택한 호선 정보
    },
    // 호선 리스트 open / close
    changeOpenClose(isOpen) {
      this.isbottomExpand = !isOpen
    },
    // 맵 리스트에서 맵 아이템 선택하면 호출
    clickMapItem(item) {
      console.log(item)
    },
    // 슬라이더 아이템 선택하면 호출
    clickSliderItem(item) {
      console.log(item)
    },
    // 이미지를 클릭하면 호출
    clickImage(item) {
      console.log(item) // 선택한 이미지의 정보
    },
    //
    clickShipItem(item) {
      console.log(item) // 선택한 호선 정보
    },
    clickTableItem(item) {
      console.log('clickTableItem', item)
      // alert(item.index + ': ' + item.content)
    },
    // 컨텐츠 창의 확대 버튼 클릭하면 호출
    clickExpand(item) {
      // console.log(item.title, item)
      alert(item.title)
    },
    clickBottomHide() {
      this.isbottomHide = this.isbottomHide ? false : true
      console.log(this.isbottomHide)
    }
  }
}
</script>

<style lang="scss" scoped>
/* css 혹은 less로 스타일 정의하는 부분 */
/* 퍼블리셔 작업 영역 */
// 임베디드 화면 css

// 하단 컨텐츠 css
.cotent_item {
  width: 570px;
  height: 240px;
  background: #151619;
  color: #ffffff;
}

.item {
  overflow: hidden;
  display: flex;
  margin-top: -22px;
  padding-left: 0px;
  padding-right: -5px;

  &.vhl-item {
    padding-left: 0px;
    padding-right: 0px;
  }
}

.vhl-btn-right {
  background: transparent;
  box-shadow: transparent;
}
</style>
