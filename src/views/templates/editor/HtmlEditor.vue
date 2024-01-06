<template>
  <div class="hasNavAndTags" :class="this.$store.state.menu.flag.fullscreen ? 'isFullView' : ''">
    <HtmlEditor :value="content" @text-change="content = $event"></HtmlEditor>
    <!-- <html-editor :value="content" @text-change="content = $event" /> -->
  </div>
</template>

<script>
import HtmlEditor from '@/components/editor/htmlEditor'

export default {
  name: 'htmlEditorTeamplate',
  components: {
    HtmlEditor
  },
  data() {
    return {
      content: 'TEST'
    }
  },
  methods: {}
}
</script>

<style></style>
