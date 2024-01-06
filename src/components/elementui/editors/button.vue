<template>
  <div class="buttonContainer">
    <el-tooltip
      v-if="options.tooltip || options.content || options.text"
      :placement="options.tooltip ? options.tooltip.placement : 'top'"
      :effect="options.tooltip ? options.tooltip.effect : 'light'"
      :visible="isTooltipVisible"
      :content="options.tooltip ? options.tooltip : options.content ? options.content : options.text.content"
    >
      <template v-if="!options">
        <el-button
          :style="`height: ${height}; width: ${width};font-size:${fontSize};color:${fontColor};`"
          :type="btntype"
          :disabled="disabled"
          :icon="icon"
          @click="onClick"
        >
          {{ btntext }}
        </el-button>
      </template>
      <template v-else-if="options">
        <!--v-permission="options.permission ? options.permission : []"-->
        <el-button
          :id="getID"
          v-if="isChange === true"
          :class="options.class"
          :style="options.style"
          :type="options.type"
          :icon="options.icon"
          :disabled="options.disabled"
          @click="$emit('btnClick', options.id, $event)"
          @mouseover.native="isTooltipVisible = true"
          @mouseleave.native="isTooltipVisible = false"
          :plain="options.stylingMode === 'palin' ? true : false"
          :round="options.stylingMode === 'round' ? true : false"
          :circle="options.stylingMode === 'circle' ? true : false"
          :autofocus="options.autofocus"
          :loading="options.loding"
          ><!--fas icon-->
          <span :class="options.svg || options.fas ? 'flex' : ''">
            <!--icon-->
            <i v-if="options.fas" :style="options.fas.style" :class="options.fas.icon"></i>
            <svg-icon v-if="options.svg" class="" :calss="options.svg.class" :style="options.svg.style" :icon-class="options.svg.icon" />
            <!--text-->
            <span v-if="options.text" class="pb-1" :calss="options.text.class" :style="options.text.style">{{ options.text.content }}</span>
            <span v-else-if="options.content" class="dx-button-text">{{ options.content }}</span>
          </span>
        </el-button>
      </template>
    </el-tooltip>
  </div>
</template>

<script>
// import DxButton from 'devextreme-vue/button'
// import DxTooltip from 'devextreme-vue/tooltip'
import { uuid } from 'vue-uuid'

export default {
  name: 'elBtn',
  data() {
    return {
      id: uuid.v1(),
      isChange: true,
      isTooltipVisible: false
    }
  },
  components: {
    // DxButton,
    // DxTooltip
  },
  props: {
    options: {
      type: Object, // text, primary, success, info, warning, danger
      default: () => null
    },
    btnid: {
      type: String
      // required: true
    },
    btntext: {
      type: String,
      default: () => {
        return ''
      }
    },
    btntype: {
      type: String,
      default: () => {
        return 'default'
      }
    },
    btnstyling: {
      type: String,
      default: () => {
        return 'contained'
      }
    },
    width: {
      type: String,
      default: function() {
        return '80px'
      }
    },
    height: {
      type: String,
      default: function() {
        return '30px'
      }
    },
    fontSize: {
      type: String,
      default: function() {
        return '1em'
      }
    },
    fontColor: {
      type: String,
      default: function() {
        return 'white'
      }
    },
    icon: {
      type: String,
      default: function() {
        return ''
      }
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  watch: {
    /// option 값이 변경되면 button을 새로 그리도록 함
    options: {
      deep: true,
      handler() {
        if (this.isChange === false) return
        this.isChange = false
        let t = setInterval(() => {
          console.log('options change id', this.options.icon)
          this.isChange = true
          clearInterval(t)
        }, 500)
      }
    }
  },
  computed: {
    getID() {
      // console.log('getID', this.options.id, this.btnid)
      return this.options.id ? this.options.id : this.btnid
    },
    tooltipID() {
      // console.log('tooltipID', this.id)
      let tooltip = this.options.id ? this.options.id : this.btnid
      return '#' + tooltip
    }
  },
  mounted() {
    // this.id = uuid.v1()
  },
  methods: {
    onClick(e) {
      this.$emit('btnClick', this.btnid, e)
    },
    onTooltip() {
      this.isTooltipVisible = !this.isTooltipVisible
      // console.log('onTooltip', this.isTooltipVisible)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles/themeB/variables.scss';

// .buttonContainer {
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: flex-start;
//   align-items: stretch;
//   flex-basis: auto;
//   /* display: inline-flex; *///

//   .label {
//     //flex-basis: 80px;
//     line-height: 36px;
//     text-align: right;
//   }
// }
</style>
