<template>
  <!-- HTML 정의하는 부분 -->
  <div class="layout-wrapper" style="padding:10px;overflow:hidden;">
    <div class="container-fluid">
      <!-- 디바이스 조회 -->
      <div v-if="pageType == 'deviceManager'">
        <!-- 타이틀, buttonList -->
        <layout-title
          buttonKind="dxButton"
          :useButtonList="buttonUseList"
          @btnSearch="btnSearch()"
          @btnAdd="deviceInsertBtn()"
          @btnDelete="btnDelete()"
        />
        <!-- 조회조건 -->
        <div class="editor-card-theme">
          <editorsLayout ref="device" :layoutData="editorOptionData" @onValueChanged="valueChanged"></editorsLayout>
        </div>
        <div style="padding-top:10px">
          <!-- 그리드 영역 -->
          <devDataGrid
            :ref="deviceGrid.properties.gridName"
            height="calc(100vh - 260px)"
            :gridInfo="deviceGrid.properties"
            :dataSource="deviceGrid.data"
          />
        </div>
      </div>

      <!-- 디바이스 등록 -->
      <div v-if="pageType == 'deviceManagerInsert'" style="margin-bottom:330px;">
        <div class="container-fluid">
          <layout-title buttonKind="" :useButtonList="buttonUseInsertList" />
        </div>
        <div style="margin-top:30px;">
          <!-- 그룹 등록 리스트 -->
          <div class="container-fluid">
            <editorsLayout ref="deviceInsert" :layoutData="deviceInsertData" @onBtnClick="deviceSaveBtn" @onValueChanged="onValueChanged" />
          </div>
        </div>
      </div>

      <!-- 디바이스 변경 -->
      <div v-if="pageType == 'deviceManagerUpdate'" style="margin-bottom:330px;">
        <div class="container-fluid">
          <layout-title buttonKind="" :useButtonList="buttonUseInsertList" />
        </div>
        <div style="margin-top:30px;">
          <!-- 그룹 등록 리스트 -->
          <div class="container-fluid">
            <editorsLayout ref="deviceUpdate" :layoutData="deviceUpdateData" @onBtnClick="deviceUpdateBtn" @onValueChanged="onUpdateValueChanged" />
          </div>
        </div>
      </div>

      <footerText></footerText>
    </div>
  </div>
</template>

<script>
import layoutTitle from '@/components/layoutTitle' // title component
import { devDataGrid } from '@/components/DevExtreme/grid' // 그리드 컴포넌트
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import { api_deviceGrpManager_getGroups } from '@/api/config/deviceGrpManager'
import {
  api_deviceManager_getDevices,
  api_deviceManager_getDevices_ofGroup,
  api_deviceManager_getDevice,
  api_deviceManager_getDevice_ofDevice,
  api_deviceManager_insertDevice,
  api_deviceManager_updateDevice,
  api_deviceManager_deleteDevices,
  api_deviceManager_getUnscribeTopicsInDevice,
  api_mqttController_subscribeMqtt,
  api_mqttController_unscribeMQTT
} from '@/api/config/deviceManager'
import { getChildCmCodeList } from '@/api/system/cmCodeManage'
import getDeviceGrid from './data/deviceGrid' // 그리드 옵션 데이터
import getEditorOptions from './data/editorOptions' // 에디터 옵션 데이터
import { getUserId, getDomainCd } from '@/utils/token'
import notify from 'devextreme/ui/notify' // message
import EventBus from '@/components/event-bus' // 그리드 이벤트
import footerText from '../components/footer' //하단 소속명 추가

export default {
  name: 'deviceManager',
  components: {
    layoutTitle,
    devDataGrid,
    getDeviceGrid,
    editorsLayout,
    footerText
  },
  data() {
    return {
      userId: getUserId(),
      pageType: 'deviceManager',
      deviceTypeList: [],
      // deviceManager
      buttonUseList: {
        group: null,
        options: {
          type: 'default',
          searchModeOption: 'containted',
          content: '',
          icon: '',
          style: 'background-color: #ea7c69; width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'btnSearch' }, { id: 'btnAdd' }, { id: 'btnDelete' }]
      },
      //검색조건
      deviceGrpId: '',
      deviceId: '',
      editorOptionData: getEditorOptions().deviceSearchData,
      //grid
      deviceGrid: {
        properties: [],
        data: []
      },
      // deviceManager Insert
      buttonUseInsertList: {},
      deviceInsertData: getEditorOptions().deviceInsertData,
      // deviceManager Update
      deviceUpdateData: getEditorOptions().deviceUpdateData,
      topic: ''
    }
  },
  async created() {
    //device Group selectbox
    this.userDomainCd = getDomainCd()
    await this.deviceListSelect()
    await this.btnSearch()
    // EventBus.$on(this.$route.name + '_' + this.deviceGrid.properties.gridName + '_CellClick', e => {
    //   this.cellClick(e)
    // })
    EventBus.$on(this.$route.name + '_' + this.deviceGrid.properties.gridName + '_btnClick', e => {
      this.subClick(e)
    })

    // 공동코드 조회
    var commonCode = await Promise.all([getChildCmCodeList({ domainCd: this.userDomainCd, codeCd: 'DEF004' })])
    this.deviceTypeList = commonCode[0].list
  },
  computed: {
    deviceList() {
      return this.$refs[this.deviceGrid.properties.gridName].dataGrid //Main Grid
    }
  },
  beforeMount() {
    this.deviceGrid.properties = getDeviceGrid().gridProperties
  },
  methods: {
    //////////////////////
    // deviceManager
    //////////////////////

    // input box 값 변경
    valueChanged(...arg) {
      if (arg[0][0] === 'deviceGrpId') {
        this.deviceGrpId = arg[0][1].value
      }
      if (arg[0][0] === 'deviceId') {
        this.deviceId = arg[0][1].value
      }
    },

    // 그리드 cell 클릭
    cellClick(e) {
      console.log(e)
      if (e.key && e.columnIndex !== 0 && e.rowType == 'data') {
        this.pageType = 'deviceManagerUpdate'
        this.$route.meta.menu_id = 'MENU047'

        api_deviceGrpManager_getGroups()
          .then(response => {
            // device group set
            let deviceInsertBox = this.$refs.deviceUpdate.$options.propsData.layoutData.editorList[3]
            response.list.forEach(item => {
              deviceInsertBox.itemList.push({
                value: item.deviceGrpId,
                label: item.deviceGrpNm
              })
            })
            // device type set
            let deviceTypeBox = this.$refs.deviceUpdate.$options.propsData.layoutData.editorList[4]
            this.deviceTypeList.forEach(item => {
              deviceTypeBox.itemList.push({
                value: item.codeCd,
                label: item.codeNm
              })
            })
            notify(this.$t('Search.success'), 'success', 300)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.deviceUpdateData.editorList[1].value = e.data.deviceUniqueId
            this.deviceUpdateData.editorList[2].value = e.data.deviceNm
            this.deviceUpdateData.editorList[3].value = e.data.deviceGrpId
            this.deviceUpdateData.editorList[4].value = e.data.deviceType
            //devicetype label
            this.deviceUpdateData.editorList[5].value = e.data.apiUseYN
            this.deviceUpdateData.editorList[6].value = e.data.subUseYN
            this.deviceUpdateData.editorList[7].value = e.data.dashUseYN

            this.deviceUpdateData.editorList[5].value = this.deviceUpdateData.editorList[5].value === 'Y' ? true : false
            this.deviceUpdateData.editorList[6].value = this.deviceUpdateData.editorList[6].value === 'Y' ? true : false
            this.deviceUpdateData.editorList[7].value = this.deviceUpdateData.editorList[7].value === 'Y' ? true : false
            this.deviceUpdateData.editorList[8].value = String(e.data.deviceTimeout)
            // topic /# 제거
            if (e.data.topic != null && e.data.topic != '') {
              this.deviceUpdateData.editorList[10].value = e.data.topic.slice(0, -2)
            } else {
              this.deviceUpdateData.editorList[10].value = e.data.topic
            }
            this.topic = this.deviceUpdateData.editorList[10].value

            this.deviceUpdateData.editorList[11].value = e.data.description
            this.deviceUpdateData.editorList[12].value = getUserId()
          })
      }
    },

    // device group select box
    deviceListSelect() {
      api_deviceGrpManager_getGroups()
        .then(response => {
          let deviceGrpSelectBox = this.$refs.device.$options.propsData.layoutData.editorList[0]
          deviceGrpSelectBox.itemList = [{ value: '', label: '전체' }]
          response.list.forEach(item => {
            deviceGrpSelectBox.itemList.push({
              value: item.deviceGrpId,
              label: item.deviceGrpNm
            })
          })
          notify(this.$t('Search.success'), 'success', 300)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.endLoading()
        })
    },

    btnSearch() {
      this.openLoading('msg.searching')
      EventBus.$on(this.$route.name + '_' + this.deviceGrid.properties.gridName + '_CellDblClick', e => {
        this.cellClick(e)
      })

      this.deviceGrid.data = []
      var dataList = []

      if (this.deviceGrpId == '' && this.deviceId == '') {
        api_deviceManager_getDevices()
          .then(response => {
            //grid id, no, topic set
            response.list.forEach((element, index) => {
              element.id = element.deviceId
              element.no = index + 1
              element.subscribeVisible = element.topic == '' || element.topic == null ? false : true
              element.deviceUniqueId = element.deviceUniqueId
              element.groupingStr = element.deviceGrpNm + '(' + element.deviceGrpId + ')'
              element.topic = element.topic != null && element.topic != '' ? element.topic + '/#' : null //by lyj
              dataList.push(element)
            })
            this.deviceGrid.data = dataList
            notify(this.$t('Search.success'), 'success', 300)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.endLoading()
          })
      } else if (this.deviceGrpId != '' && this.deviceId == '') {
        api_deviceManager_getDevices_ofGroup(this.deviceGrpId)
          .then(response => {
            //grid id, no, topic set
            response.list.forEach((element, index) => {
              element.id = element.deviceId
              element.no = index + 1
              element.subscribeVisible = element.topic == '' ? false : true
              element.groupingStr = element.deviceGrpNm + '(' + element.deviceGrpId + ')'
              element.topic = element.topic != null && element.topic != '' ? element.topic + '/#' : null //by lyj
              dataList.push(element)
            })
            this.deviceGrid.data = response.list
            notify(this.$t('Search.success'), 'success', 300)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.endLoading()
          })
      } else if (this.deviceGrpId == '' && this.deviceId != '') {
        api_deviceManager_getDevice_ofDevice(this.deviceId)
          .then(response => {
            //grid id, no, topic set
            response.list.forEach((element, index) => {
              element.id = element.deviceId
              element.no = index + 1
              element.subscribeVisible = element.topic == '' ? false : true
              element.groupingStr = element.deviceGrpNm + '(' + element.deviceGrpId + ')'
              element.topic = element.topic != null && element.topic != '' ? element.topic + '/#' : null //by lyj
              dataList.push(element)
            })
            this.deviceGrid.data = response.list
            notify(this.$t('Search.success'), 'success', 300)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.endLoading()
          })
      } else {
        api_deviceManager_getDevice(this.deviceGrpId, this.deviceId)
          .then(response => {
            //grid id, no, topic set
            response.list.forEach((element, index) => {
              element.id = element.deviceId
              element.no = index + 1
              element.subscribeVisible = element.topic == '' ? false : true
              element.groupingStr = element.deviceGrpNm + '(' + element.deviceGrpId + ')'
              element.topic = element.topic != null && element.topic != '' ? element.topic + '/#' : null //by lyj
              dataList.push(element)
            })
            this.deviceGrid.data = response.list
            notify(this.$t('Search.success'), 'success', 300)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.endLoading()
          })
      }
    },

    // device 추가 페이지 이동
    deviceInsertBtn() {
      this.pageType = 'deviceManagerInsert'
      this.$route.meta.menu_id = 'MENU046'

      // device insert selectBox set
      api_deviceGrpManager_getGroups()
        .then(response => {
          //device group set
          let deviceInsertBox = this.$refs.deviceInsert.$options.propsData.layoutData.editorList[3]
          response.list.forEach(item => {
            deviceInsertBox.itemList.push({
              value: item.deviceGrpId,
              label: item.deviceGrpNm
            })
          })
          // device type set
          let deviceTypeBox = this.$refs.deviceInsert.$options.propsData.layoutData.editorList[4]
          this.deviceTypeList.forEach(item => {
            deviceTypeBox.itemList.push({
              value: item.codeCd,
              label: item.codeNm
            })
          })
          notify(this.$t('Search.success'), 'success', 300)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.endLoading()
        })
    },

    btnDelete() {
      var selectedRows = []

      selectedRows = this.$refs[this.deviceGrid.properties.gridName].dataGrid.getSelectedRowsData()
      if (selectedRows.length === 0) {
        this.$vToastify.warning({ body: this.$t('Selection_Data') })
        return
      }
      // 삭제확인 메세지
      this.$vToastify
        .prompt({
          body: this.$t('기기를 삭제하시겠습니까?'),
          answers: { Yes: true, No: false },
          mode: 'prompt'
        })
        .then(value => {
          if (value) {
            this.Delete(selectedRows)
          }
        })
    },

    Delete(selectedRows) {
      this.openLoading('Deleting')

      let deleteTopicData = {
        clientId: 'mqtt_cient_sub_iot',
        topic: []
      }

      let DevUniqueIDList = []

      selectedRows.forEach(row => {
        //console.log(row)
        DevUniqueIDList.push(row.deviceUniqueId)
      })

      //삭제가능한 토큰인지 체크
      api_deviceManager_getUnscribeTopicsInDevice(DevUniqueIDList)
        .then(response => {
          // 2개 이상 디바이스들과 연결되 토픽은 제외 처리 20221-10-29 by lyj
          // get unsubscribe topic

          response.list.forEach(topic => {
            if (topic != null && topic != '') {
              deleteTopicData.topic.push(topic)
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          //기준정보 삭제 api 호출
          api_deviceManager_deleteDevices(selectedRows)
            .then(response => {
              //토큰 구독 해제
              if (deleteTopicData.topic.length != 0) {
                api_mqttController_unscribeMQTT(JSON.stringify(deleteTopicData))
                  .then(response => {
                    console.log(JSON.stringify(deleteTopicData) + ' unscribe!')
                    //notify(this.$t('[topic] 구독 되었습니다.'), 'success', 300)
                  })
                  .catch(error => {
                    this.$vToastify.error({ body: error.message })
                  })
                  .finally(() => {
                    this.endLoading()
                  })
              }

              notify(this.$t('Delete.success'), 'success', 300)
            })
            .catch(error => {
              console.log(error)
              this.$vToastify.error({ body: error.message })
            })
            .finally(() => {
              this.endLoading()
              this.btnSearch()
            })
        })
    },

    subClick(e) {
      let topic = ''

      if (e.data.topic != null && e.data.topic != '') {
        topic = e.data.topic.slice(0, -2)
      } else {
        topic = e.data.topic
      }

      let saveData = {
        clientId: 'mqtt_cient_sub_iot',
        topic: [topic]
      }
      api_mqttController_subscribeMqtt(JSON.stringify(saveData))
        .then(response => {
          notify(this.$t('[topic] 구독 되었습니다.'), 'success', 300)
        })
        .catch(error => {
          this.$vToastify.error({ body: error.message })
        })
        .finally(() => {
          this.endLoading()
        })
    },

    //////////////////////////
    // deviceManager Insert
    //////////////////////////

    insertInit() {
      // search data 초기화
      this.deviceGrpId = ''
      this.deviceId = ''

      this.deviceInsertData.editorList[0].value = ''
      this.deviceInsertData.editorList[1].value = ''
      this.deviceInsertData.editorList[2].value = ''
      this.deviceInsertData.editorList[3].value = ''
      this.deviceInsertData.editorList[4].value = ''
      this.deviceInsertData.editorList[3].itemList = []
      this.deviceInsertData.editorList[4].itemList = []
      this.deviceInsertData.editorList[5].value = true
      this.deviceInsertData.editorList[6].value = true
      this.deviceInsertData.editorList[7].value = true
      this.deviceInsertData.editorList[8].value = '60'
      this.deviceInsertData.editorList[10].value = ''
      this.deviceInsertData.editorList[11].value = ''

      this.$route.meta.menu_id = 'MENU042'
      this.pageType = 'deviceManager'
    },

    // device 기기 저장
    deviceSaveBtn(e) {
      if (e.id == 'btnAdd') {
        this.openLoading('Saving')
        this.deviceInsertData.editorList[5].value = this.deviceInsertData.editorList[5].value === true ? 'Y' : 'N'
        this.deviceInsertData.editorList[6].value = this.deviceInsertData.editorList[6].value === true ? 'Y' : 'N'
        this.deviceInsertData.editorList[7].value = this.deviceInsertData.editorList[7].value === true ? 'Y' : 'N'

        let saveData = {
          deviceId: this.deviceInsertData.editorList[1].value,
          deviceUniqueId: this.deviceInsertData.editorList[1].value,
          deviceNm: this.deviceInsertData.editorList[2].value,
          deviceGrpId: this.deviceInsertData.editorList[3].value,
          deviceType: this.deviceInsertData.editorList[4].value,
          apiUseYN: this.deviceInsertData.editorList[5].value,
          subUseYN: this.deviceInsertData.editorList[6].value,
          dashUseYN: this.deviceInsertData.editorList[7].value,
          deviceTimeout: parseInt(this.deviceInsertData.editorList[8].value),
          topic: this.deviceInsertData.editorList[10].value,
          description: this.deviceInsertData.editorList[11].value,
          insertId: this.deviceInsertData.editorList[12].value
        }

        if (this.verification(saveData)) {
          api_deviceManager_insertDevice(JSON.stringify(saveData))
            .then(response => {
              // topic subscribe
              if (saveData.topic != '') {
                let saveTopicData = {
                  clientId: 'mqtt_cient_sub_iot',
                  topic: [saveData.topic]
                }
                api_mqttController_subscribeMqtt(JSON.stringify(saveTopicData))
                  .then(response => {
                    notify(this.$t('[topic] 구독 되었습니다.'), 'success', 300)
                  })
                  .catch(error => {
                    this.$vToastify.error({ body: error.message })
                  })
                  .finally(() => {
                    this.endLoading()
                  })
              }

              notify(this.$t('Search.success'), 'success', 300)
              this.insertInit()
              this.btnSearch()
            })
            .catch(error => {
              this.$vToastify.error({ body: error.message })
            })
            .finally(() => {
              this.endLoading()
            })
        } else {
          this.endLoading()
        }
      } else {
        this.insertInit()
        this.btnSearch()
      }
    },

    // editor box 데이터 변경
    onValueChanged(...arg) {
      // 에디터 박스 데이터 변경
      this.deviceInsertData.editorList.forEach(list => {
        if (list.id === arg[0][0]) list.value = arg[0][1].value
      })
    },

    verification(saveData) {
      let list = []
      let msg = ''

      if (saveData.deviceUniqueId === '') list.push(this.$t('label.device_id'))
      if (saveData.deviceGrpId === '') list.push(this.$t('label.device_grp'))

      if (list.length > 0) {
        list.forEach((item, index) => {
          msg += item
          if (list.length - 1 !== index) msg += ','
        })
        this.$vToastify.warning({ body: msg + this.$t('msg.required_item') }) // 에러 메시지 출력
        return false // 실패
      } else {
        return true
      }
    },

    //////////////////////////
    // deviceManager Update
    //////////////////////////

    updateInit() {
      // search data 초기화
      this.deviceGrpId = ''
      this.deviceId = ''

      this.deviceUpdateData.editorList[3].itemList = []
      this.deviceUpdateData.editorList[4].itemList = []
      this.$route.meta.menu_id = 'MENU042'
      this.pageType = 'deviceManager'
    },

    onUpdateValueChanged(...arg) {
      // 에디터 박스 데이터 변경
      this.deviceUpdateData.editorList.forEach(list => {
        if (list.id === arg[0][0]) list.value = arg[0][1].value
      })
    },

    deviceUpdateBtn(e) {
      if (e.id == 'btnAdd') {
        this.openLoading('Saving')
        this.deviceUpdateData.editorList[5].value = this.deviceUpdateData.editorList[5].value === true ? 'Y' : 'N'
        this.deviceUpdateData.editorList[6].value = this.deviceUpdateData.editorList[6].value === true ? 'Y' : 'N'
        this.deviceUpdateData.editorList[7].value = this.deviceUpdateData.editorList[7].value === true ? 'Y' : 'N'

        let saveData = {
          deviceId: this.deviceUpdateData.editorList[1].value,
          deviceUniqueId: this.deviceUpdateData.editorList[1].value,
          deviceNm: this.deviceUpdateData.editorList[2].value,
          deviceGrpId: this.deviceUpdateData.editorList[3].value,
          deviceType: this.deviceUpdateData.editorList[4].value,
          apiUseYN: this.deviceUpdateData.editorList[5].value,
          subUseYN: this.deviceUpdateData.editorList[6].value,
          dashUseYN: this.deviceUpdateData.editorList[7].value,
          deviceTimeout: parseInt(this.deviceUpdateData.editorList[8].value),
          topic: this.deviceUpdateData.editorList[10].value,
          description: this.deviceUpdateData.editorList[11].value,
          updateId: this.deviceUpdateData.editorList[12].value
        }

        api_deviceManager_updateDevice(JSON.stringify(saveData))
          .then(response => {
            // topic unsubscribe
            if (this.topic != '' && this.topic != null) {
              let deleteTopicData = {
                clientId: 'mqtt_cient_sub_iot',
                topic: [this.topic]
              }
              api_mqttController_unscribeMQTT(JSON.stringify(deleteTopicData))
                .then(response => {
                  //notify(this.$t('[topic] 구독 되었습니다.'), 'success', 300)
                })
                .catch(error => {
                  this.$vToastify.error({ body: error.message })
                })
                .finally(() => {
                  this.endLoading()
                })
            }

            // topic subscribe
            if (saveData.topic != '' && saveData.topic != null) {
              let saveTopicData = {
                clientId: 'mqtt_cient_sub_iot',
                topic: [saveData.topic]
              }
              api_mqttController_subscribeMqtt(JSON.stringify(saveTopicData))
                .then(response => {
                  notify(this.$t('[topic] 구독 되었습니다.'), 'success', 300)
                })
                .catch(error => {
                  this.$vToastify.error({ body: error.message })
                })
                .finally(() => {
                  this.endLoading()
                })
            }

            notify(this.$t('Search.success'), 'success', 300)
            this.updateInit()
            this.btnSearch()
          })
          .catch(error => {
            console.log(error + 'error')
            this.$vToastify.error({ body: error.message })
          })
          .finally(() => {
            this.endLoading()
          })
      } else {
        this.updateInit()
        this.btnSearch()
      }
    },

    // 데이터 로딩
    openLoading(msg) {
      this.$vToastify.loader({
        title: this.$t('msg.working'),
        body: this.$t(msg)
      })
    },
    // 로딩 종료
    endLoading() {
      this.$vToastify.stopLoader()
    }
  }
}
</script>
