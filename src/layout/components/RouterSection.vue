<template>
  <div class="main-box mx-auto p-4 xl:p-0">
    <keep-alive v-if="!isLocal" :include="cachedViews">
      <router-view :key="key"/>
    </keep-alive>
    <router-view v-else :key="key"/>
  </div>
</template>


<script>
export default {
  name: 'RouterSection',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    },
    isLocal() {
      return process.env.NODE_ENV === 'development'
    }
  }
}
</script>

<style lang="less" scoped>
.main-box {
  min-height: 500px;
}
</style>