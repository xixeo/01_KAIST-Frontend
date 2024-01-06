<template>
  <div class="btnContainer" v-if="this.visible == true">
    <div>
      <button class="btn light-orange-btn btn-sm flex" @click="onClick">
        <div v-if="$t(this.icon) != ''" class="pt-1 pr-1">
          <svg-icon :icon-class="`${this.icon}`" />
        </div>
        {{ $t(this.buttonText) }}
      </button>
    </div>
    <!-- <DxButton>
      <svg-icon icon-class="search" />
    </DxButton> -->
  </div>
</template>

<script>
export default {
  name: 'GridButton',
  data() {
    return {}
  },
  components: {},
  props: {
    // value: {
    //   type: String,
    //   default: null
    // },
    icon: {
      type: String,
      default: 'search'
    },
    cellInfo: {
      type: Object,
      default: () => []
    },
    buttonText: {
      type: String,
      default: 'view'
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClick(e) {
      console.log(this.visible+"visible?")
      this.$emit('btnClick', this.cellInfo)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles/themeB/variables.scss';

.btnContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  flex-basis: auto;
  padding-left: 10px;
  //text-align: center;
  /* display: inline-flex; */
}
</style>
