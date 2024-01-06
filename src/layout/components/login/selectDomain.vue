<template>
  <DxSelectBox
    :style="item.style"
    :value="item.value"
    :ref="item.ref"
    :data-source="item.itemList"
    :visible="item.visible"
    :search-expr="'label'"
    :value-expr="'value'"
    :display-expr="'label'"
    :show-clear-button="true"
    :placeholder="this.$t(item.placeholder)"
    @value-changed="onValueChanged"
  />
</template>

<script>
import DxSelectBox from 'devextreme-vue/select-box'
import i18n from '@/i18n' // 언어 변환(매칭) component
export default {
  name: 'selectDomain',
  components: { DxSelectBox },
  props: {
    domainData: Object
  },
  data() {
    return {
      item: []
    }
  },
  watch: {
    domainData: {
      deep: true,
      handler() {
        this.item = this.domainData
      }
    }
  },
  created() {
    this.item = this.domainData
  },
  methods: {
    // 내부에서 사용되는 함수를 정의
    onValueChanged(...arg) {
      this.$emit('onValueChanged', arg)
    }
  }
}
</script>

<style lang="scss" scoped></style>
