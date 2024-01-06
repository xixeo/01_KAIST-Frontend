<template>
  <!--<el-card ></el-card>-->
  <el-card :body-style="{ padding: '0px', height: '100%' }" v-draggable="draggableValue">
    <div class="quality_title grid grid-rows-1 grid-cols-10" v-if="title">
      <!-- 타이틀 -->
      <span :class="`col-start-1 col-span-${this.icons.titleSpan}`">{{ title }}</span>
      <!--드래그 여부-->
      <el-tooltip :content="this.$i18n.t('Draggable')" :effect="'dark'" placement="top" v-if="draggable && draggable.useFixDragIcon">
        <p :class="`col-start-${this.icons.fix} col-span-1 text-2xl ml-1`" @click="clickDraggable">
          <svg-icon :options="this.iconList.draggable" />
          <!--<svg-icon :iconClass="this.draggableValue.stopDragging === false ? 'pushpin_off' : 'pushpin_on'" />-->
        </p>
      </el-tooltip>
      <!--펼치기/접기 버튼-->
      <el-tooltip :content="this.$i18n.t('collapse')" :effect="'dark'" placement="top" v-if="this.collapsable && collapsable.use">
        <p :class="`col-start-${this.icons.collapse} col-span-1 text-2xl ml-1`" @click="clickCollapse">
          <svg-icon :iconClass="isCollapsable ? 'zoomin' : 'zoomout'" />
        </p>
      </el-tooltip>
      <!--전체화면 버튼-->
      <el-tooltip :content="this.$i18n.t('fullscreen')" :effect="'dark'" placement="top" v-if="useFullScreen">
        <p :class="`col-start-${this.icons.fullscreen} col-span-1 text-2xl ml-1`" @click="clickFullscreen">
          <svg-icon :options="iconList.fullscreen" />
        </p>
      </el-tooltip>
      <!--닫기 버튼-->
      <el-tooltip :content="this.$i18n.t('close')" :effect="'dark'" placement="top" v-if="this.closable && closable.use">
        <p :class="`col-start-${this.icons.closable} col-span-1 text-2xl ml-1`" @click="clickClose">
          <svg-icon :options="iconList.close" />
        </p>
      </el-tooltip>
    </div>
    <slot v-if="(title && !isCollapsable) || !isCollapsable">
      <p>{{ content }}</p>
      <!-- 팝업의 내용에 들어갈 컴포넌트에 data, callback으로 받을 props가 있어야 함. -->
      <component :is="component" v-bind="{ data, callback }" :close="handleWrapperClick"></component>
    </slot>
  </el-card>
</template>

<script>
// import { Draggable } from 'draggable-vue-directive'

import localStore from '@/utils/localStore'
import _ from 'lodash'
import datas from './data/data'

export default {
  name: 'contentPopup',
  components: {},
  // directives: {
  //   Draggable,
  // },
  props: {
    draggable: {
      type: Object,
      default: () => {
        return {
          stopDragging: true, // 드래그 미사용 여부
          isStorePosition: true, // 위치 저장 여부
          resetInitialPos: true, // 화면 출력시 최초 위치 설정 여부
          useFixDragIcon: false // 아이콘 출력 여부
        }
      }
    },
    popupClass: {
      type: String
    },
    /// 드래그 사용시 반드시 필요함
    popupID: {
      type: String,
      default: 'test'
    },
    title: {
      type: String,
      // default: 'test', // 타이틀이 필요 없는 경우를 위해서 기본 값을 제거함
      require: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    inBody: {
      type: Boolean,
      require: false,
      default: false
    },
    content: {
      type: String,
      default: 'test',
      require: false
    },
    component: {
      type: Function,
      required: false
    },
    data: {
      type: Object,
      required: false
    },
    callback: {
      type: Function,
      required: false
    },
    isStorePosition: {
      type: Boolean,
      default: false
    },
    useFullScreen: {
      type: Boolean,
      default: true
    },
    collapsable: {
      type: Object
    },
    closable: {
      type: Object
    },
    close: Function
  },
  data() {
    return {
      iconList: datas(),
      // 드래그 설정 변수
      draggableValue: {
        handle: undefined,
        stopDragging: true, // 드래그 사용 여부
        resetInitialPos: false,
        initialPosition: {}
        // boundingRect:
        // boundingElement
        // boundingRectMargin,
        // onPositionChange: function(positionDiff, pos, event) {
        //   if (pos) console.log(positionDiff, pos.left, pos.top)
        // }
        // onDragStart: function
        // onDragEnd: function
      },
      contents: false,
      options: {
        // 템플릿선택 스크롤 옵셥
        vuescroll: {
          mode: 'native', // default : native
          sizeStrategy: 'percent', // default : percent
          detectResize: true // DOM 크기 감지 여부
        },
        rail: {
          opacity: 0, // default : 0
          size: '10px', // 가로크기, default : 6px
          specifyBorderRadius: false, // default : false
          gutterOfEnds: '2px', // X축, Y축 양 끝에서의 거리, default : 2px
          gutterOfSide: '2px', // 컨테이너 측면으로부터 거리, default : 2px
          keepShow: false // 레일을 계속 보여줄지 여부, default : false
        },
        bar: {
          onlyShowBarOnScroll: true, // 스크롤하는 동안 막대 만 표시, default : true
          keepShow: true, // 계속 보여줄지 여부, default : false
          background: '#656a76', // @subColor_05
          opacity: 0.8,
          hoverStyle: false,
          specifyBorderRadius: false, // 막내의 테두리 반경, default : false(string으로 지정)
          minSize: 0, // bar의 최소 크기 0~1, default : 0
          size: '10px', // default : 6px
          disable: false // bar 사용안함, default : false
        },
        // 스크롤 좌우 버튼
        scrollButton: {
          enable: false // 사용 가능 여부 default : false
        },
        scrollPanel: {
          // 기본은 세로 스크롤만 가능
          scrollingY: true, // 스크롤 할 것인지 여부, default : true
          scrollingX: false // 스크롤 할 것인지 여부, default : true
        }
      },
      useCollapsable: false,
      isCollapsable: false,
      icons: {
        titleSpan: 6,
        fix: 7,
        collapse: 8,
        fullscreen: 9,
        closable: 10
      }
    }
  },
  watch: {
    // 아이템 리스트 갱신하면 데이터 복사 및 갱신
    draggable() {
      _.merge(this.draggableValue, this.draggable)
    },
    collapse() {
      this.useCollapsable = this.collapse.use
      this.isCollapsable = this.collapse.flag
    }
  },
  mounted() {
    // document.body.appendChild(this.$el)
    // if (this.inBody)
    // {
    //  document.body.appendChild(this.$el)
    // }

    this.setIconPos()

    // 펼치기 사용 여부 및 기본 값 설정
    if (this.collapse) {
      this.useCollapsable = this.collapse.use
      this.isCollapsable = this.collapse.flag
    }
    // 데이터 복사
    _.merge(this.draggableValue, this.draggable)
    // 위치 저장할 경우 함수 연결
    if (this.draggable.isStorePosition) {
      this.draggableValue.onPositionChange = this.posChange
    }
    // 마지막에 저장되어 있는 위치로 이동
    if (this.draggable.resetInitialPos) {
      let data = localStore.get(`position:${this.popupID}`)
      if (data) {
        data = JSON.parse(data)
        console.log('resetInitialPos', data.pos.left, data.pos.left)
        this.draggableValue.initialPosition = { left: data.pos.left, top: data.pos.top }
      }
    }
  },
  methods: {
    // icon 위치 배치
    setIconPos() {
      let iconCount = 10
      if (this.closable && this.closable.use) {
        this.icons.closable = iconCount
        // console.log('useClosable', iconCount)
        iconCount--
      }
      if (this.useFullScreen) {
        this.icons.fullscreen = iconCount
        // console.log('useFullScreen', iconCount)
        iconCount--
      }
      if (this.collapsable && this.collapsable.use) {
        this.icons.collapse = iconCount
        // console.log('collapsable', iconCount)
        iconCount--
      }
      if (this.draggable && this.draggable.useFixDragIcon) {
        this.icons.fix = iconCount
        // console.log('useFixDragIcon', iconCount)
        iconCount--
      }
      this.icons.titleSpan = iconCount
    },
    // 움직인 위치 정보 저장
    posChange(positionDiff, pos, event) {
      if (this.draggable.stopDragging && this.draggableValue.stopDragging) return
      if (pos && pos.left && pos.top && positionDiff.x !== 0 && positionDiff.y !== 0) {
        // console.log(positionDiff, pos, event)
        localStore.set(`position:${this.popupID}`, JSON.stringify({ diff: positionDiff, pos: pos, event: event }))
      }
    },
    // 드래그 설정 버튼
    clickDraggable() {
      this.draggableValue.stopDragging = !this.draggableValue.stopDragging
      this.iconList.draggable.iconClass = this.draggableValue.stopDragging ? 'pushpin_on' : 'pushpin_off'

      // 플래그 변경시 최초 위치로 이동하는 문제를 보정하도록 함
      if (this.draggableValue.stopDragging === false) {
        let data = localStore.get(`position:${this.popupID}`)
        if (data) {
          data = JSON.parse(data)
          this.draggableValue.initialPosition = { left: data.pos.left, top: data.pos.top }
        }
      }
    },
    clickCollapse() {
      console.log('clickCollapse')
      this.isCollapsable = !this.isCollapsable
      this.$emit('clickCollapse', this.isCollapsable)
    },
    // 확대 버튼
    clickFullscreen() {
      this.$emit('clickExpand', this)
    },
    // 종료 버튼
    clickClose() {
      console.log('clickClose')
      this.$emit('clickClose', false)
    },
    handleWrapperClick(id, res) {
      /*if (this.callback) {
        this.callback(res)
      } else {
        this.$emit('close', {
          id: id,
          ok: res === 'yes'
        })
      }*/
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tooltip {
  border: none;
}
.el-card {
  border: 0px solid #fff;
  border-radius: 0.2rem;
}
.quality_title {
  padding: 10px 0px 10px 10px;
  background: #4b4d4f;
  span {
    float: right;
    padding: 0px 10px 0px 0px;
    font-size: 100%;
    // &:hover {
    // --color: #ff0000;
    // transition: all 0.6s;
    // transform: scale(1.2);
    // }
  }
  &:hover {
    background: #168ff4;
    transition: all 0.6s;
  }
}
</style>
