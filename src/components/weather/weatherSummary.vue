<template>
  <div class="w-full h-full bg-gray-0">
    <div v-for="(item, index) in items" :key="index">
      <div class="weather float-left bg-red-0" :class="setSubClass(index)" v-if="index < weatherFCCount">
        <div class="bg-yellow-0">
          <!--날짜 월/일 요일-->
          <template v-if="item.tmMm">
            <div class="g-blue-0">
              <p class="font">{{ item.dayOfTheWeek }}({{ item.tmDay }})</p>
            </div>
          </template>
          <!--날씨 아이콘-->
          <div class="bg-blue-0" v-if="roateIndex === 0" align="center">
            <img
              :style="[{ height: imgHeight, marginBottom: '-5%'}]"
              :src="require(`@/assets/images/weather/${item.wf}.svg`)"
              :align="'center'"
              :title="item.wfment"
            />
            <p class="font">{{ `${item.taMin}/${item.taMax}℃` }}</p>
          </div>
          <div class="w-full bg-blue-0" v-if="roateIndex === 1">
            <i class="fas fa-water font_icon"></i>
            <p class="font">{{ `${item.hm}%` }}</p>
          </div>
          <div class="w-full bg-blue-0" v-if="roateIndex === 2">
            <i class="fas fa-cloud-rain font_icon"></i>
            <p class="font">{{ `${item.rnRate ? item.rnRate : ' --%'}` }}</p>
          </div>
          <!--
          <div class="w-full h-5 text-center bg-green-0">
            <div class="flex text-red-0" v-if="roateIndex===0">
              <i class="fas fa-temperature-high font_icon"></i>
              <span class="font_data">{{`${item.taMin}/${item.taMax}℃`}}</span>
            </div>
            <div class="flex text-blue-0" v-if="roateIndex===1">
              <i class="fas fa-water font_icon"></i>
              <span class="font_data">{{`${item.hm}%`}}</span>
            </div>
            <div class="flex text-green-0" v-if="roateIndex===2">
              <i class="fas fa-cloud-rain font_icon"></i>
              <span class="font_data">{{`${item.rnRate? item.rnRate: ' --%'}`}}</span>
            </div>
          </div>-->
        </div>
      </div>
    </div>
    <!--<template v-if="weatherForecast[roateIndex] && weatherForecast[roateIndex].tmMm">
      <div class="w-full">
        <p
          class="text-right"
          scrolldelay="200"
          direction="down"
        >{{`${weatherForecast[roateIndex].tmMm}/${weatherForecast[roateIndex].tmDay}(${weatherForecast[roateIndex].dayOfTheWeek}): ${weatherForecast[roateIndex].wfment} [온도: ${weatherForecast[roateIndex].taMin}~${weatherForecast[roateIndex].taMax}℃ / 습도: ${weatherForecast[roateIndex].hm}%]`}}</p>
      </div>
    </template>-->
  </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers'
export default {
  name: 'WeahterSummary',
  components: {
    //
  },
  props: {
    imgHeight: {
      type: String,
      default: '32px'
    },
    useRotate: {
      type: Boolean,
      default: false
    },
    weatherFCCount: {
      type: Number,
      default: 3
    },
    items: {
      type: Array,
      default: function() {
        return [
          { tmMm: '3', tmDay: '17', dayOfTheWeek: '수요일', taMax: 30, taMin: 10, wfment: 'test', wf: 'w01', hm: 50, rnRate: 0 },
          { tmMm: '3', tmDay: '18', dayOfTheWeek: '목요일', taMax: 30, taMin: 10, wfment: 'test', wf: 'w02', hm: 50, rnRate: 0 },
          { tmMm: '3', tmDay: '19', dayOfTheWeek: '금요일', taMax: 30, taMin: 10, wfment: 'test', wf: 'w03', hm: 50, rnRate: 0 }
        ]
      }
    }
  },
  data() {
    return {
      roateIndex: 0
    }
  },
  watch: {
    useRotate(value) {
      console.log('useRotate', value)
      if (value === false) clearInterval(this.t)
      else this.t = setInterval(this.setRotateIndex, 2000)
    }
  },
  mounted() {
    // this.weatherFCCount = this.items.length
    if (this.useRotate) {
      this.t = setInterval(this.setRotateIndex, 2000)
    }
  },
  beforeDestroy() {
    clearInterval(this.t)
  },
  methods: {
    setSubClass(index) {
      let count = this.weatherFCCount
      return {
        'w-full': count === 1,
        'w-1/2': count === 2,
        'w-1/3': count === 3,
        'w-1/4': count === 4,
        'w-1/5': count === 5,
        'w-1/6': count === 6,
        'w-1/7': count === 7,
        hmdpsms_border_select_clr2: this.roateIndex === index
      }
    },
    setRotateIndex() {
      if (this.roateIndex >= 2) this.roateIndex = 0
      else this.roateIndex++
    }
  }
}
</script>
<style lang="scss" scoped>
$fontColor: #fff;
$hoverColor: #1a7dd2;
.weather {
  color: $fontColor;
  line-height: 100%;

  .font {
    vertical-align: center;
    text-align: center !important;
    font-size: 0.7rem;
  }

  .font_icon {
    width: 100%;
    text-align: center;
    vertical-align: center;
    font-size: 130%;
  }
  .font_data {
    width: 100%;
    text-align: center;
    font-size: 0.6rem;
    --font-weight: bold;
    vertical-align: center;
  }

  :hover {
    cursor: pointer;
    background: $hoverColor;
  }
}
</style>
