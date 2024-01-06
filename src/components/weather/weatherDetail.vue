<template>
  <div class="w-64 h-full bg-green-300" style="height:100px;">
    <div v-for="(item, index) in weatherForecast" :key="index">
      <div class="float-left bg-red-0" :class="setSubClass(index)" v-if="index < weatherFCCount">
        <div class="w-full h-full bg-yellow-0">
          <!--날짜 월/일 요일-->
          <template v-if="item.tmMm">
            <div class="pb-1 h-6">{{item.tmMm}} / {{item.tmDay}} {{item.dayOfTheWeek}}</div>
          </template>
          <div class="flex w-full">
            <!--날씨 아이콘-->
            <div class="float-left p-1 bg-bule-0 w-1/6">
              <img
                class="w-full h-full"
                :src="require(`@/assets/images/weather/${item.wf}.svg`)"
                :title="item.wfment"
              >
            </div>
            <div class="h-full float-left bg-green-0 weather_info">
              <!--온도-->
              <div class="w-full float-left table_row bg-red-0">
                <div class="table_cell text-red-600">
                  <div class="flex">
                    <i class="fas fa-temperature-high font_icon"></i>
                    <span class="font_data">{{`${item.taMin}/${item.taMax}℃`}}</span>
                  </div>
                </div>
              </div>
              <!--습도-->
              <div class="w-full float-left table_row bg-blue-0">
                <div class="table_cell text-blue-600">
                  <div class="flex">
                    <i class="w-1/3 fas fa-water font_icon"></i>
                    <span class="font_data">{{`${item.hm}%`}}</span>
                  </div>
                </div>
              </div>
              <!--강수-->
              <div class="w-full float-left table_row bg-green-0">
                <div class="table_cell text-green-600 flex bg-red-300">
                  <div class="flex">
                    <i class="w-1/3 fas fa-cloud-rain font_icon"></i>
                    <span class="font_data">{{`${item.rnRate? item.rnRate: ' --%'}`}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  name: 'WeahterDetail',
  components: {
    //
  },
  props: {
    weatherFCCount: {
      type: Number,
      default: 3
    },
    weatherForecast: {
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
  mounted() {
    this.t = setInterval(this.setRotateIndex, 12000)
  },
  beforeDestroy() {
    clearInterval(this.t)
  },
  data() {
    return {
      roateIndex: 0
    }
  },
  methods: {
    setSubClass(index) {
      let weatherFCCount = this.weatherFCCount
      return {
        'w-full': weatherFCCount === 1,
        'w-1/2': weatherFCCount === 2,
        'w-1/3': weatherFCCount === 3,
        'w-1/4': weatherFCCount === 4,
        'w-1/5': weatherFCCount === 5,
        'w-1/6': weatherFCCount === 6,
        'w-1/7': weatherFCCount === 7,
        hmdpsms_border_select_clr2: this.roateIndex === index
      }
    },
    setRotateIndex() {
      if (this.roateIndex >= this.weatherFCCount - 1) this.roateIndex = 0
      else this.roateIndex++
    }
  }
}
</script>
<style scoped>
.font_icon {
  --background-color: red;
  width: 33%;
  height: 17px;
  position: flex;
  text-align: right;
  vertical-align: center;
  padding-top: 2px;
}
.font_data {
  --background-color: blue;
  position: flex;
  width: 100%;
  height: 100%;
  text-align: right;
  font-size: 1rem;
  font-weight: bold;
  vertical-align: center;
}
.weather_icon {
  width: 45%;
}
.weather_info {
  width: 55%;
}
.table_row {
  height: 15px;
  display: table;
}
.table_cell {
  display: table-cell;
  vertical-align: middle;
}
@media screen and (max-width: 1280px) {
  .weather_icon {
    width: 33%;
  }
  .weather_info {
    width: 66%;
  }
  .font_data {
    font-size: 0.6rem;
  }
}
</style>
