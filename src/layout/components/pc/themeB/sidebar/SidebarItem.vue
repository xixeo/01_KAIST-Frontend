<template>
  <div v-if="!item.hidden">
    <!-- 자식이 없는 메뉴 -->
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :id="item.id"
          @click.native="handleSelect"
          class="el-test-item"
          :class="{ 'submenu-title-noDropdown': !isNest }"
          :index="resolvePath(onlyOneChild.path)"
        >
          <div class="el-menu__title flex pt-6">
            <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
            <span class="svg-icon span w-2/3 -mt-5">{{ title(onlyOneChild.meta.menu_id, onlyOneChild.meta.title) }}</span>
            
          </div>
        </el-menu-item>
      </app-link>
    </template>
    <!-- 자식이 있는 메뉴 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <!-- <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" /> -->
        <!--<item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="title(item.meta.menu_id, item.meta.title)"
        />-->
        <!-- 메뉴 타이틀의 아이콘 -->
        <div class="flex w-64 pt-6" v-if="item.meta">
          <item :icon="item.meta && item.meta.icon" />
          <span class="svg-icon span w-2/3 -mt-5">{{ title(onlyOneChild.meta.menu_id, onlyOneChild.meta.title) }}</span>
        </div>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>

    <!-- <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>-->

    <!-- <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>-->
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: {
    Item,
    AppLink
  },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  mounted() {
    //console.log('SidebarItem', this.item.id, this.item.path, JSON.stringify(this.item.children))
  },
  methods: {
    handleSelect(e) {
      console.log(e)
      if (e.isTrusted === true) {
        var t = setInterval(() => {
          var menu = document.getElementById(this.item.id)
          menu?.click()
          clearInterval(t)
        }, 100)
      }
      // console.log('handleSelect', e)
    },
    hasOneShowingChild(children = [], parent) {
      if (parent.alwaysShow === false) return false //
      const showingChildren = children.filter(item => {
        // console.log('hasOneShowingChild', item.meta.menu_id, item.meta.title, item.hidden)
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })
      // console.log('hasOneShowingChild parent is', parent.id, showingChildren.length)

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length > 1) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return false
      } else if (showingChildren.length === 1) {
        return true
      }
      // Show parent if there are no child router to display
      else if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        // console.log('hasOneShowingChild onlyOneChild is', this.onlyOneChild)
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    title(menuCd, router_title) {
      //console.log(this.$i18n.t(menuCd))
      //console.log(menuCd + '/' + router_title)
      return router_title //2021-09-23 by lyj
      //return this.$i18n.t(menu_id.toString()) === menu_id.toString() ? router_title : this.$i18n.t(menu_id.toString())
    }
  }
}
</script>
