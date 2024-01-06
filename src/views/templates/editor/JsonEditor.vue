<template>
  <div class="hasNavAndTags" :class="this.$store.state.menu.flag.fullscreen ? 'isFullView' : ''">
    <el-button @click="test"> test</el-button>
    <JsonEditor :value="content" @json-change="content = $event" @json-save="content = $event"></JsonEditor>
    <!-- <html-editor :value="content" @text-change="content = $event" /> -->
  </div>
</template>

<script>
import JsonEditor from '@/components/editor/jsonEditor'
export default {
  name: 'htmlEditorTeamplate',
  components: {
    JsonEditor
  },
  data() {
    return {
      content: {
        json: [{ name: 'Dirk', age: 1234 }, { name: 'Jason' }]
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
