<template>
  <div>
    <template v-if="tooltip">
      <p :class="iconClass?iconClass:''">
        <svg-icon :id="getIconId" :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" @mouseenter="toggleDefault" @mouseleave="toggleDefault"/>
        <DxTooltip
          :position="tooltip.placement"
          :visible="defaultVisible"
          :close-on-outside-click="false"
          :target="getTooltipId"
        >
          {{content_title(tooltip.id)}}
        </DxTooltip>
      </p>
    </template>
    <template v-else>
      <p :class="iconClass?iconClass:''">
        <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click"/>
      </p>
    </template>
    <!-- <svg-icon icon-class="fullscreen" @click="click" /> -->

    <!-- <svg-icon icon-class="fullscreen" @click="click" /> -->
    <!-- <fullscreen ref="fullscreen" @change="fullscreenChange"> -->
    <!-- <svg-icon icon-class="fullscreen" /> -->
    <!-- <font-awesome-icon icon="plus" /> -->
    <!-- <i class="fa fa-arrows-alt" aria-hidden="true" @click="click"></i> -->
  </div>
</template>


<script>
import screenfull from 'screenfull'
import localStore from '@/utils/localStore'
import { DxTooltip } from 'devextreme-vue/tooltip';
// import store from '@/store'

export default {
  name: 'screenfull',
  components: {
    DxTooltip
  },
  props: {
    iconClass: {
      type: String,
      default: () => {
        return ''
      }
    },
    isFullscreen: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: Object
      // default: () => {
      //   return { id: '', mode: 'light', placement: 'bottom' }
      // }
    }
  },
  data() {
    return {
      defaultVisible: false
    }
  },
  watch: {
    toggle() {
      console.log('toggle change')
      this.toggle = !this.toggle
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  computed: {
    getIconId() {
      let iconId = this.tooltip.id ? this.tooltip.id : 'fullScreen'
      return ''+iconId
    },
    getTooltipId() {
      let tooltipId = this.tooltip.id ? this.tooltip.id : 'fullScreen'
      return '#' + tooltipId
    },
  },
  methods: {
    content_title(id) {
      return this.$i18n.t(id)
    },
    click() {
      screenfull.toggle() // 웹 브라우저의 전체화면 on/off
    },
    change() {
      // console.log('change', screenfull.isFullscreen)
      this.isFullscreen = screenfull.isFullscreen
      this.$store.dispatch('SetFullScreen', this.isFullscreen)
    },
    init() {
      screenfull.on('change', this.change)
    },
    toggleDefault() {
      
      this.defaultVisible = !this.defaultVisible;
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
