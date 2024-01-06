<template>
  <div style="width:100%;">
    <!--<el-tooltip
      v-if="options || options.tooltip"
      :placement="options.tooltip ? options.tooltip.placement : 'top'"
      :effect="options.tooltip ? options.tooltip.effect : 'light'"
      :visible="false"
      :content="options.tooltip ? options.tooltip : value"
    >-->
    <template v-if="!options"> </template>
    <template v-else-if="options">
      <template v-if="options.group">
        <el-radio-group
          :class="options.class"
          :style="options.style"
          :size="options.size"
          :text-color="options.textColor"
          :fill="options.fill"
          v-model="value"
          @change="change"
        >
          <el-radio-button
            v-for="item in options.options"
            :key="item.value"
            :label="item.value"
            :border="item.border"
            :disabled="item.disabled"
            :size="item.size"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </template>
      <template v-else>
        <el-radio
          v-for="item in options.options"
          :key="item.value"
          v-model="value"
          :class="options.class"
          :style="options.style"
          :label="item.value"
          :border="options.border ? options.border : item.border"
          :disabled="item.disabled"
          :size="item.size"
          @change="change"
        >
          {{ item.label }}</el-radio
        >
      </template>
    </template>
    <!--</el-tooltip>-->
  </div>
</template>

<script>
// import DxTooltip from 'devextreme-vue/tooltip'
import { uuid } from 'vue-uuid'

export default {
  name: 'elRadioBtn',
  data() {
    return {
      id: uuid.v1(),
      isChange: true,
      isTooltipVisible: false,
      value: ''
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
    options() {
      if (this.isChange === false) return
      this.isChange = false
      this.value = this.options.value
      let t = setInterval(() => {
        // console.log('setInterval')
        this.isChange = true
        clearInterval(t)
      }, 500)
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
  created() {
    // console.log('radio created', this.options)
    this.value = this.options.value
  },
  mounted() {
    // this.id = uuid.v1()
  },
  methods: {
    onTooltip() {
      this.isTooltipVisible = !this.isTooltipVisible
      // console.log('onTooltip', this.isTooltipVisible)
    },
    change(e) {
      // console.log(e)
      this.$emit('onChange', e)
    }
  }
}
</script>

<style lang="scss"></style>
