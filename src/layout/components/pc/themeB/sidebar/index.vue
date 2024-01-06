<template>
  <div :class="{'has-logo':showLogo}">
    <div class="d-flex">
      <menuicon
        id="menuicon-container"
        :is-active="sidebar.opened"
        class="menuicon-container"

        @toggleClick="toggleSideBar"
      />
      <breadcrumb
        :visibleAllPath="false"
        v-if="!isCollapse"
        id="breadcrumb-container"
        class="breadcrumb-container"
      />
    </div>
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" /> -->
        <sidebar-item
          v-for="route in myMenus"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import menuicon from '@/components/menuicon'
import breadcrumb from '@/components/breadcrumb'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/scss/styles/themeB/variables.scss'
import Layout from '@/layout'
import { getToken, getUserId, getDomainCd } from '@/utils/token'

export default {
  components: {
    menuicon,
    breadcrumb,
    SidebarItem,
    Logo
  },
  data() {
    return {
      token: ''
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    myMenus() {
      console.log('*******themeB ->'+ getUserId() + ' / ' + getDomainCd() )
      console.log('this.$store.state.menu.treeMenus.length : ' + this.$store.state.menu.treeMenus.length)

      if (this.$store.state.menu.treeMenus.length == 0) {
        this.token = getToken()
        this.$store.dispatch('GetMenus', { userId: getUserId(), domainCd: getDomainCd() })
       console.log('*******themeB ->this.$store.state.menu.treeMenus.length == 0')
        return this.$store.state.menu.treeMenus

      }
      else
        return this.$store.state.menu.treeMenus
    }
  }
}
</script>
