<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <!--전체 메뉴 경로 보이기-->
      <template v-if="visibleAllPath">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
          <!-- <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>-->

          <span
            v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
            class="no-redirect"
          >
            {{
            title(item.meta.menu_id, item.meta.title)
            }}
          </span>
          <span v-else>{{ title(item.meta.menu_id, item.meta.title) }}</span>
          <!-- <a v-else @click.prevent="handleLink(item)">{{ title(item.meta.menu_id, item.meta.title) }}</a> -->
        </el-breadcrumb-item>
      </template>
      <!--마지막 경로 이름만 출력-->
      <template v-else>
        <el-tooltip
          :content="getFullPath()"
          :effect="'dark'"
          placement="right"
          :key="levelList[levelList.length-1].path"
        >
          <el-breadcrumb-item :key="levelList[levelList.length-1].path">
            <span
              class="no-redirect"
            >{{ title(levelList[levelList.length-1].meta.menu_id, levelList[levelList.length-1].meta.title) }}</span>
          </el-breadcrumb-item>
        </el-tooltip>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  props: {
    visibleAllPath: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },

  methods: {
    // 전체 경로를 만들어서 반환
    getFullPath() {
      let path = ''
      this.levelList.forEach((element, index) => {
        if (index > 0) path += ' / '
        path += element.meta.title
      })
      return path
    },
    getBreadcrumb() {
      // only show routes with meta.title
      //let matched = this.$route.matched.filter(item => item.meta && item.meta.title && item.meta.menu_id)
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        //matched = [{ path: '/dashboard', meta: { menu_id:'MOA1040', title:this.$i18n.t('MOA1040')}}].concat(matched)
        matched = [{ path: '/dashboard', meta: { title: 'PATH' } }].concat(matched)
      }
      //this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.menu_id&& item.meta.breadcrumb !== false)
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name

      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    title(menu_id, router_title) {
      if (menu_id != null) {
        return this.$i18n.t(menu_id.toString()) === menu_id.toString() ? router_title : this.$i18n.t(menu_id.toString())
      } else {
        return router_title
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$baseColor: #97a8be;
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  //line-height: 50px;
  line-height: 60px;
  margin-left: 1px;

  .no-redirect {
    color: $baseColor;
    cursor: text;
  }
}
</style>
