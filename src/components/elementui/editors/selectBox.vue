<template>
  <div>
    <!--<el-tooltip
      v-if="options || options.tooltip"
      :placement="options.tooltip ? options.tooltip.placement : 'top'"
      :effect="options.tooltip ? options.tooltip.effect : 'light'"
      :visible="false"
      :content="options.tooltip ? options.tooltip : value"
    >-->
    <template v-if="!options"> </template>
    <template v-else-if="options">
      <el-select
        :class="options.class"
        :style="options.style"
        v-model="value"
        :multiple="options.multiple"
        :collapse-tags="options.collapseTags"
        :filterable="options.filterable"
        :disabled="options.disabled"
        :clearable="options.clearable"
        :no-match-text="options.noMatchText"
        :no-data-text="options.noDataText"
        :allow-create="options.allowCreate"
        :default-first-option="options.defaultFirstOption"
        :placeholder="options.placeholder"
        @focus="$emit('focusItem', options.id)"
        @change="$emit('changeItem', { id: options.id, value: value })"
      >
        <template v-if="options.group">
          <!--그룹-->
          <el-option-group v-for="group in options.options" :key="group.label" :label="group.label">
            <template v-if="group.options && group.options.length > 0">
              <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </template>
          </el-option-group>
        </template>
        <template v-else>
          <!--개별 아이템-->
          <el-option
            v-for="item in options.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :automatic-dropdown="item.automaticDropdown"
          ></el-option>
        </template>
      </el-select>
    </template>
    <!--</el-tooltip>-->
  </div>
</template>

<script>
// import DxButton from 'devextreme-vue/button'
// import DxTooltip from 'devextreme-vue/tooltip'
import { uuid } from 'vue-uuid'

export default {
  name: 'elSelectBox',
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
    this.value = this.options.value
  },
  mounted() {
    // this.id = uuid.v1()
  },
  methods: {
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
