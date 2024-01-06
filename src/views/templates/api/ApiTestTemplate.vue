<template>
  <!-- HTML 정의하는 부분 -->
  <!-- 1차 퍼블리셔가 작업 영역 -->
  <!-- 2차 개발자가 Template 화 작업 진행-->
  <div>
    <div>
      <h2>API Test 템플릿</h2>
    </div>
    <div style="padding: 10px">
      <el-button type="primary" style="height: 40px;width:40px" icon="el-icon-edit" circle @click="testMethod"></el-button>
    </div>
    <div style="padding: 10px">
      <el-button type="primary" style="height: 40px;width:40px" icon="el-icon-edit" circle @click="testMethod2"></el-button>
    </div>
    <div style="padding: 10px">
      <input style="width:400px" placeholder="method 입력창 ex) POST" v-model="method" />
      <br>
      <a>ex) POST </a>
      <br>
      <br>
      <input style="width:400px" placeholder="URL 입력창 ex) /api/main/getQMCompDate" v-model="url" />
      <br>
      <a>ex) /api/main/getQMCompDate </a>
      <br>
      <br>
      <textarea style="height: 400px;width:400px" :placeholder="dataSample" v-model="data">
      </textarea>
      <br>
      <a>   ex)
            {
                "infoUrl" : "cleanAcceptanceRate", 
                "inputDay":"300",
                "inputWeek":"200",
                "inputMonth":"10"
            }
       </a>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import { api_testQMCompDate, api_testMenu, api_test, api_test2 } from '@/api/template/gridTemplate' // api 호출
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'ApiTestTemplate',
  components: {
    //
  },
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
        url: '',
        data: '',
        method: '',
        dataSample:'DATA입력창 ex) { "infoUrl" : "cleanAcceptanceRate", "inputDate":"300", "inputWeek":"200", "inputMonth":"10" }',
    }
  },
  created() {
    //
  }, 
  beforeMount() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    testMethod(){
        api_test(this.url, JSON.parse(this.data), this.method).then(res => {
            console.log(' @data:', res)
        })
    },
    testMethod2(){
        api_test2().then(res => {
            console.log(' @data2:', res)
        })
    }
  }
}
</script>
