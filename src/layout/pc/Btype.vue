<template>
  <div :class="classObj" class="app-wrapper" style="overflow:none;">
    <div v-if="device === 'mobile' && sidebar.opened && isVisibleLayout('asideUse')" class="drawer-bg" @click="handleClickOutside" />
    <!--사이드바-->
    <sidebar class="sidebar-container theme-b" v-if="isVisibleLayout('asideUse')" />
    <!--Top 바-->
    <navbar v-if="isVisibleLayout('headerUse')" :titleOption="titleOptions" :visible="{ weather: true }" style="position:fixed;width:100%;" />
    <div
      :class="{ hasTagsView: needTagsView }"
      class="main-container"
      :style="this.$store.state.menu.flag.asideUse ? '' : 'margin-left: 0px;'"
      style="top:50px;"
    >
      <!--태그 뷰-->
      <div :class="{ 'fixed-header': fixedHeader }" v-if="isVisibleLayout('tagViewUse')">
        <tags-view v-if="needTagsView" />
      </div>
      <!--메인 뷰-->
      <app-main id="app-main" style="overflow:auto;" />
      <!-- <tags-view v-if="needTagsView" /> -->
    </div>
  </div>
</template>

<script>
import Navbar from '@/layout/components/pc/themeB/navbar'
import Sidebar from '@/layout/components/pc/themeB/sidebar'
import TagsView from '@/layout/components/pc/themeB/tagview'
import ResizeMixin from '@/layout/mixin/ResizeHandler'
import AppMain from '@/layout/components/AppMain.vue'
import { mapState } from 'vuex'
import store from '@/store'

export default {
  name: 'layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      titleOptions: {
        isOnlyImage: true,
        image: require('@/assets/images/ci/topLogo.png'), //2021-10-13
        title: 'HYUNDAI',
        subTitle: 'MIPO DOCKYARD'
      }
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => false //state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },

  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    isVisibleLayout(layout) {
      return this.$store.state.menu.flag[layout] || !this.$store.state.menu.flag.isLayoutHideMode
    }
  },
  created() {
    console.log('#Btype.vue')
  },
  mounted() {
    console.log('#Btype.vue-1')
    require('@/assets/scss/styles/themeB/index.scss')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles/themeB/mixin.scss';
@import '@/assets/scss/styles/themeB/variables.scss';

.app-wrapper {
  @include clearfix;
  @include position(relative, 100%, 100%);
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  top: 0;
  @include position(absolute, 100%, 100%);
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
