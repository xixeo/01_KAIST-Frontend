<template>
  <div class="datePicker p-2 w-full flex ' + options.class" :style="options.style">
    <span
      v-if="options.title"
      :class="options.title.class + ' label text-white'"
      :style="labelStyle"
    >{{ this.$t(options.title.label) }}</span>
    <el-date-picker
      v-model="options.value"
      type="daterange"
      align="right"
      :start-placeholder="this.$t(options.option.placeholder[0])"
      :end-placeholder="this.$t(options.option.placeholder[1])"
      default-value="2021-02-01"
      :class="options.option.class"
      :style="boxStyle"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'datePicker',
  data() {
    return {
      labelStyle: 'float:left;text-align:left;',
      boxStyle: 'float:right;'
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return ''
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.getStyle()
      }
    }
  },
  created() {
    this.getStyle()
  },
  methods: {
    getStyle() {
      if (this.options.title) {
        if (this.options.title.class) {
          if (this.options.title.icon === 'red') this.options.title.class + ' title_icon_red'
          if (this.options.title.icon === 'blue') this.options.title.class + ' title_icon_blue'
        } else {
          if (this.options.title.icon === 'red') this.options.title.class = ' title_icon_red'
          if (this.options.title.icon === 'blue') this.options.title.class = ' title_icon_blue'
        }
        if (this.options.title.width) this.labelStyle += `width: ${this.options.title.width};`
        if (this.options.title.style) this.labelStyle += `${this.options.title.style};`
      }
      if (this.options.option.width) this.boxStyle += `width: ${this.options.option.width};`
      if (this.options.option.style) this.boxStyle += `${this.options.option.style};`
      if (!this.options.option.placeholder) this.options.option.placeholder = ['label.start_dt', 'label.end_dt']
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles/themeB/variables.scss';
.title_icon_red {
  position: relative;
  padding-left: 15px;
  display: inline-block;
  &::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background: #f54949;
    top: calc(36px / 2);
    left: 0;
  }
}
.title_icon_blue {
  position: relative;
  padding-left: 15px;
  display: inline-block;
  &::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background: #2ec9f8;
    top: calc(36px / 2);
    left: 0;
  }
}

.datePicker {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  flex-basis: auto;

  .label {
    //flex-basis: 80px;
    line-height: 40px;
    text-align: right;
  }
}
</style>
