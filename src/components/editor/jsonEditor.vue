<template>
  <vue-json-editor
    id="jsoneditor"
    class="html-editor h-full"
    v-model="content"
    :mode="mode"
    @json-save="$emit('json-save', content)"
    @json-change="$emit('json-change', content)"
    @has-error="$emit('json-error', $event)"
    :show-btns="true"
    :expandedOnStart="true"
  />
</template>

<script>
import vueJsonEditor from 'vue-json-editor'

export default {
  props: {
    value: {
      type: Object,
      default: null
    },
    mode: {
      type: String,
      default: 'code' // tree, code, text, form, view
    }
  },
  components: {
    vueJsonEditor
  },
  watch: {
    value(val) {
      this.content = val
    }
  },
  data() {
    return {
      content: this.value
    }
  }
}
</script>

<style lang="scss" scoped>
// .jsoneditor-outer {
// height: 500px;
// }
</style>
