<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" :viewBox="svgPath.viewBox" :fill="background" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
    <template v-if="options.use && options.fill && options.fill.use">
      <defs>
        <linearGradient :id="'svg' + id" :x1="options.fill.x1" :y1="options.fill.y1" :x2="options.fill.x2" :y2="options.fill.y2">
          <stop :offset="options.fill.percent + '%'" :stop-color="options.fill.color" />
          <stop :offset="options.fill.percent + '%'" :stop-color="options.backColor" />
        </linearGradient>
      </defs>
      <path :fill="'url(#svg' + id + ')'" :d="svgPath.d" />
    </template>
  </svg>
</template>

<script>
import { isExternal } from '@/utils/validate'
import { uuid } from 'vue-uuid'

export default {
  name: 'svgicon',
  props: {
    iconClass: {
      type: String
      // required: true
    },
    className: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => {
        return {
          use: false,
          iconClass: null,
          className: '',
          svgId: null,
          backColor: 'currentColor',
          fill: {
            use: false,
            percent: 0,
            color: 'rgb(145, 204, 117)',
            x1: '0%',
            y1: '0%',
            x2: '100%',
            y2: '0%'
          }
        }
      }
    },
    backColor: {
      type: String,
      default: 'currentColor'
    }
  },
  data() {
    return {
      id: uuid.v1(),
      isChange: true
    }
  },
  mounted() {
    if (this.options && this.options.svgId) this.id = this.options.svgId
  },
  watch: {
    /// option 값이 변경되면 button을 새로 그리도록 함
    options() {
      console.log('options change', this.options)
    }
    // options: {
    //   deep: true,
    //   handler() {
    //     console.log('options change')
    //     // if (this.isChange === false) return
    //     // this.isChange = false
    //     // let t = setInterval(() => {
    //     //   console.log('setInterval')
    //     //   this.isChange = true
    //     //   clearInterval(t)
    //     // }, 500)
    //   }
    // }
  },
  computed: {
    isExternal() {
      return isExternal(this.options && this.options.iconClass ? this.options.iconClass : this.iconClass)
    },
    background() {
      return this.options && this.options.backColor ? this.options.backColor : this.backColor
    },
    iconName() {
      let name = this.options.use ? `#icon-${this.options.iconClass}` : `#icon-${this.iconClass}`
      // console.log(name)
      return name
    },
    svgClass() {
      if (this.options.use) {
        if (this.options.className) {
          return 'svg-icon ' + this.options.className
        }
      } else {
        if (this.className) {
          return 'svg-icon ' + this.className
        }
      }
      return 'svg-icon'
    },
    styleExternalIcon() {
      let iconClass = this.options.use && this.options.iconClass ? this.options.iconClass : this.iconClass
      return {
        mask: `url(${iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${iconClass}) no-repeat 50% 50%`
      }
    },
    svgPath() {
      let temp = ''
      let viewBox = ''
      let svg = require('@/assets/icons/svg/' + (this.options.use ? this.options.iconClass : this.iconClass) + '.svg')
      if (svg) {
        viewBox = svg.default.viewBox
        let content = svg.default.content
        if (content) {
          temp = content.substr(content.indexOf('<path'))
          if (temp) {
            temp = temp.substr(temp.indexOf('d="'))
            if (temp) {
              temp = temp.substr(3)
              if (temp) {
                temp = temp.substr(0, temp.indexOf('"'))
              }
            }
          }
        }
      }
      return { viewBox: viewBox, d: temp }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  --fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
