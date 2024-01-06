<template>
  <vue-editor class="html-editor" v-model="content" @text-change="$emit('text-change', content)" />
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  props: {
    value: {
      type: String,
      default: null
    }
  },
  components: {
    VueEditor
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
// .html-editor>>> {

// }
</style>
