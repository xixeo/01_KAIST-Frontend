<template>
  <div>
    <template v-if="tooltip">
      <!-- 아이콘 대신 title -->
      <div v-if="title">
        <a @click="click" class="flex">
          <div v-if="image">
            <img :id="getIconId" :src="image" class="pt-1" style="width:45px;" @mouseenter="toggleDefault" @mouseleave="toggleDefault">
            <DxTooltip
              :position="tooltip.placement"
              :visible="defaultVisible"
              :close-on-outside-click="false"
              :target="getTooltipId"
            >
              {{content_title(tooltip.id)}}
            </DxTooltip>
          </div>
          <div v-else-if="iconClass">
            <svg-icon :id="getIconId" :icon-class="iconClass" :style="iconStyle" @mouseenter="toggleDefault" @mouseleave="toggleDefault"/>
            <DxTooltip
              :position="tooltip.placement"
              :visible="defaultVisible"
              :close-on-outside-click="false"
              :target="getTooltipId"
            >
              {{content_title(tooltip.id)}}
            </DxTooltip>
          </div>
          <div>
            {{$t(title)}}
            <span class="sub-title" v-if="subTitle!=''">{{$t(subTitle)}}</span>
          </div>
        </a>
      </div>
      <!-- 아이콘 -->
      <div v-else-if="iconClass">
        <svg-icon :id="getIconId" :icon-class="iconClass" @click="click" @mouseenter="toggleDefault" @mouseleave="toggleDefault"/>
        <DxTooltip
          :position="tooltip.placement"
          :visible="defaultVisible"
          :close-on-outside-click="false"
          :target="getTooltipId"
        >
          {{content_title(tooltip.id)}}
        </DxTooltip>
      </div>
      <div v-else-if="isOnlyImage && image">
        <img :src="image">
      </div>
    </template>
    <template v-else>
      <!-- 아이콘 -->
      <div v-if="iconClass">
        <svg-icon :icon-class="iconClass" @click="click"/>
      </div>
      <div v-else-if="isOnlyImage && image">
        <img :src="image">
      </div>
      <!-- 아이콘 대신 title -->
      <div v-else-if="title">
        <a @click="click" class="flex">
          <div v-if="image">
            <img :src="image" class="pt-1" style="width:45px;">
          </div>
          <div>
            {{$t(title)}}
            <span class="sub-title" v-if="subTitle!=''">{{$t(subTitle)}}</span>
          </div>
        </a>
      </div>
    </template>
  </div>
</template>

<script>
import { DxTooltip } from 'devextreme-vue/tooltip';
export default {
  name: 'headicons',
  components: {
    DxTooltip
  },
  props: {
    iconClass: {
      type: String,
      required: true
    },
    iconStyle: {
      type: String,
      default: ''
    },
    isOnlyImage: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    useToolTip: {
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
  methods: {
    click() {
      this.$emit('HeadiconClick')
    },
    content_title(id) {
      return this.$i18n.t(id)
    },
    toggleDefault() {
      this.defaultVisible = !this.defaultVisible;
    },
  },
  computed: {
    getIconId() {
      let iconId = this.tooltip.id ? this.tooltip.id : 'icon'
      return ''+iconId
    },
    getTooltipId() {
      let tooltipId = this.tooltip.id ? this.tooltip.id : 'icon'
      return '#' + tooltipId
    },
  },
  mounted() {
    console.log('# headicons : ' + this.defaultVisible)
  }
}
</script>

<style lang="scss" scoped>
.sub-title {
  display: block;
  text-align: left;
  font-size: 0.78rem; // 1.18rem;
  line-height: 1rem;
  margin-left: 1%;
}
</style>
