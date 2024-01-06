<template>
  <div class="layout-wrapper" style="padding:10px;overflow:hidden;">
    <div class="container-fluid">
      <!-- 디바이스 그룹 조회 -->
      <div v-if="pageType == 'deviceGrpManager'">
        <!-- 타이틀, buttonList -->
        <layout-title
          buttonKind="dxButton"
          :useButtonList="buttonUseList"
          @btnSearch="btnSearch()"
          @btnAdd="grpInsertBtn()"
          @btnDelete="btnDelete()"
        />
        <!-- 조회조건 -->
        <div class="editor-card-theme">
          <editorsLayout ref="deviceGrp" :layoutData="editorOptionData" @onValueChanged="valueChanged"></editorsLayout>
        </div>
        <div style="padding-top:10px">
          <!-- 그리드 영역 -->
          <devDataGrid
            :ref="deviceGrpGrid.properties.gridName"
            height="calc(100vh - 260px)"
            :gridInfo="deviceGrpGrid.properties"
            :dataSource="deviceGrpGrid.data"
          />
        </div>
      </div>

      <!-- 디바이스 그룹 등록 -->
      <div v-if="pageType == 'deviceGrpManagerInsert'" class="layout-wrapper" style="margin-bottom:442px;">
        <div class="container-fluid">
          <layout-title buttonKind="" :useButtonList="buttonUseInsertList" />
        </div>
        <div style="margin-top:30px;">
          <!-- 그룹 등록 리스트 -->
          <div class="container-fluid">
            <editorsLayout ref="grdInsert" :layoutData="grpInsertData" @onBtnClick="grpSaveBtn" @onValueChanged="onValueChanged" />
          </div>
        </div>
      </div>

      <!-- 디바이스 그룹 변경 -->
      <div v-if="pageType == 'deviceGrpManagerUpdate'" class="layout-wrapper" style="margin-bottom:442px;">
        <div class="container-fluid">
          <layout-title buttonKind="" :useButtonList="buttonUseInsertList" />
        </div>
        <div style="margin-top:30px;">
          <!-- 그룹 등록 리스트 -->
          <div class="container-fluid">
            <editorsLayout ref="grdUpdate" :layoutData="grpUpdateData" @onBtnClick="grpUpdateBtn" @onValueChanged="onUpdateValueChanged" />
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
import {
  api_deviceGrpManager_getGroups,
  api_deviceGrpManager_saveGroups,
  api_deviceGrpManager_updateGroups,
  api_deviceGrpManager_deleteGroups,
  api_deviceManager_getUnscribeTopics,
  api_mqttController_unscribeMQTT
} from '@/api/config/deviceGrpManager'
import getDeviceGrpGrid from './data/deviceGrpGrid' // 그리드 옵션 데이터
import getEditorOptions from './data/editorOptions' // 에디터 옵션 데이터
import { getUserId, getDomainCd } from '@/utils/token'
import notify from 'devextreme/ui/notify' // message
import EventBus from '@/components/event-bus' // 그리드 이벤트
import footerText from '../components/footer' //하단 소속명 추가

export default {
  name: 'deviceGrpManager',
  components: {
    layoutTitle,
    devDataGrid,
    getDeviceGrpGrid,
    editorsLayout,
    footerText
  },
  data() {
    return {
      userId: getUserId(),
      pageType: 'deviceGrpManager',
      // deviceGrpManager
      buttonUseList: {
        group: null,
        options: {
          type: 'default',
          searchModeOption: 'containted',
          content: '',
          icon: '',
          style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'btnSearch' }, { id: 'btnAdd' }, { id: 'btnDelete' }]
      },
      //검색조건
      deviceGrpId: '',
      editorOptionData: getEditorOptions().groupCodeData,
      //grid
      deviceGrpGrid: {
        properties: [],
        data: []
      },

      // deviceGrpManager Insert
      buttonUseInsertList: {},
      grpInsertData: getEditorOptions().grpInsertData,

      // deviceGrpManager Update
      grpUpdateData: getEditorOptions().grpUpdateData
    }
  },
  computed: {
    deviceGrpList: function() {
      return this.$refs[this.deviceGrpGrid.properties.gridName].dataGrid //Main Grid
    }
  },
  async created() {
    this.pageType = 'deviceGrpManager'
    this.userDomainCd = getDomainCd() // 세션정보에서 현재사용자 도메인 세팅
    //this.param.domainCd = this.userDomainCd
    //await this.compareDomain() // master 도메인과 현재사용자 도메인 비교
    //await this.getStatusSelectBox() // 상태 select Box 데이터 받아옴
    await this.deviceListSelect()
    await this.btnSearch() // 도메인 그리드 조회
    // 그리드 cell 클릭 이벤트
    EventBus.$on(this.$route.name + '_' + this.deviceGrpGrid.properties.gridName + '_CellDblClick', e => {
      this.cellClick(e)
    })
  },
  beforeMount() {
    this.deviceGrpGrid.properties = getDeviceGrpGrid().gridProperties
  },
  methods: {
    //////////////////////
    // deviceGrdManager
    //////////////////////

    // 그리드 cell 클릭 시
    cellClick(e) {
      if (e.key && e.columnIndex !== 0) {
        this.pageType = 'deviceGrpManagerUpdate'
        this.$route.meta.menu_id = 'MENU045'
        this.grpUpdateData.editorList[0].value = e.data.deviceGrpId
        this.grpUpdateData.editorList[1].value = e.data.deviceGrpNm
        this.grpUpdateData.editorList[2].value = e.data.useYN
        this.grpUpdateData.editorList[3].value = e.data.dashUseYN
        this.grpUpdateData.editorList[2].value = this.grpUpdateData.editorList[2].value === 'Y' ? true : false
        this.grpUpdateData.editorList[3].value = this.grpUpdateData.editorList[3].value === 'Y' ? true : false
        this.grpUpdateData.editorList[4].value = e.data.description
        this.grpUpdateData.editorList[5].value = getUserId()
      }
    },

    // input box 값 변경
    valueChanged(...arg) {
      if (arg[0][0] === 'deviceGrpId') this.deviceGrpId = arg[0][1].value
    },

    // device group select box
    deviceListSelect() {
      api_deviceGrpManager_getGroups()
        .then(response => {
          let deviceGrpSelectBox = this.$refs.deviceGrp.$options.propsData.layoutData.editorList[0]
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

      EventBus.$on(this.$route.name + '_' + this.deviceGrpGrid.properties.gridName + '_CellDblClick', e => {
        this.cellClick(e)
      })

      this.deviceGrpGrid.data = []

      api_deviceGrpManager_getGroups()
        .then(response => {
          //grid id set
          response.list.forEach((element, index) => {
            element.id = element.deviceGrpId
            element.no = index + 1
          })
          if (this.deviceGrpId == '') {
            this.deviceGrpGrid.data = response.list
          } else {
            response.list.forEach(element => {
              if (element.deviceGrpId.includes(this.deviceGrpId) == true) {
                this.deviceGrpGrid.data.push(element)
              }
            })
          }
          notify(this.$t('Search.success'), 'success', 300)
        })
        .catch(error => {
          console.log(error)
          this.$vToastify.error({ body: error.message })
        })
        .finally(() => {
          this.endLoading()
        })
    },

    // device 그룹 추가 페이지 이동
    grpInsertBtn() {
      this.pageType = 'deviceGrpManagerInsert'
      this.$route.meta.menu_id = 'MENU044'
    },

    btnDelete() {
      let selectedRows = []
      selectedRows = this.$refs[this.deviceGrpGrid.properties.gridName].dataGrid.getSelectedRowsData()

      if (selectedRows.length === 0) {
        this.$vToastify.warning({ body: this.$t('Selection_Data') })
        return
      }
      //삭제확인 메세지
      this.$vToastify
        .prompt({
          body: this.$t('그룹에 포함된 디바이스 기기들도 모두 삭제합니다.<br>그래도 삭제하시겠습니까?'),
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

      // topic unsubscribe
      let deviceGrpIdList = []
      selectedRows.forEach(item => {
        deviceGrpIdList.push(item.deviceGrpId)
      })

      //2개 이상 디바이스들과 연결되어 있는 토픽 제외 처리 2021-10-29 by lyj
      let deviceTopicList = []
      api_deviceManager_getUnscribeTopics(deviceGrpIdList)
        .then(response => {
          response.list.forEach(topic => {
            if (topic != null && topic != '') {
              deviceTopicList.push(topic)
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          //삭제 처리(토큰 리스트가 없다고 해서 기준정보 삭제처리가 안되면 안되니까 by lyj )
          api_deviceGrpManager_deleteGroups(selectedRows)
            .then(response => {
              //구독 해제 하기
              if (deviceTopicList.length != 0) {
                let deleteTopicData = {
                  clientId: 'mqtt_cient_sub_iot',
                  topic: deviceTopicList
                }
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

    //////////////////////////
    // deviceGrpManager Insert
    //////////////////////////

    insertInit() {
      this.grpInsertData.editorList[0].value = ''
      this.grpInsertData.editorList[1].value = ''
      this.grpInsertData.editorList[2].value = ''
      this.grpInsertData.editorList[3].value = ''
      this.grpInsertData.editorList[4].value = ''
      this.grpInsertData.editorList[5].value = getUserId()

      this.pageType = 'deviceGrpManager'
      this.$route.meta.menu_id = 'MENU041'
      this.deviceGrpId = ''
    },

    // editor box 데이터 변경
    onValueChanged(...arg) {
      // 에디터 박스 데이터 변경
      this.grpInsertData.editorList.forEach(list => {
        if (list.id === arg[0][0]) list.value = arg[0][1].value
      })
    },

    grpSaveBtn(e) {
      if (e.id == 'btnAdd') {
        this.openLoading('Saving')

        this.grpInsertData.editorList[2].value = this.grpInsertData.editorList[2].value === true ? 'Y' : 'N'
        this.grpInsertData.editorList[3].value = this.grpInsertData.editorList[3].value === true ? 'Y' : 'N'

        let saveData = {
          deviceGrpId: this.grpInsertData.editorList[0].value,
          deviceGrpNm: this.grpInsertData.editorList[1].value,
          useYN: this.grpInsertData.editorList[2].value,
          dashUseYN: this.grpInsertData.editorList[3].value,
          description: this.grpInsertData.editorList[4].value,
          insertId: this.grpInsertData.editorList[5].value
        }

        if (this.verification(saveData)) {
          api_deviceGrpManager_saveGroups(JSON.stringify(saveData))
            .then(response => {
              notify(this.$t('Search.success'), 'success', 300)
              this.insertInit()
              this.deviceListSelect()
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
          this.endLoading()
        }
      } else if (e.id == 'btnCancel') {
        this.insertInit()
        this.btnSearch()
      }
    },

    verification(saveData) {
      let list = []
      let msg = ''
      if (saveData.deviceGrpId === '') list.push(this.$t('label.grp_cd'))
      if (list.length > 0) {
        list.forEach((item, index) => {
          msg += item
        })
        this.$vToastify.warning({ body: msg + this.$t('msg.required_item') }) // 에러 메시지 출력
        return false
      } else {
        return true
      }
    },

    //////////////////////////
    // deviceGrdManager Update
    //////////////////////////

    onUpdateValueChanged(...arg) {
      // 에디터 박스 데이터 변경
      this.grpUpdateData.editorList.forEach(list => {
        if (list.id === arg[0][0]) list.value = arg[0][1].value
      })
    },

    updateInit() {
      this.pageType = 'deviceGrpManager'
      this.$route.meta.menu_id = 'MENU041'
      this.deviceGrpId = ''
    },

    grpUpdateBtn(e) {
      if (e.id == 'btnAdd') {
        this.openLoading('Saving')
        this.grpUpdateData.editorList[2].value = this.grpUpdateData.editorList[2].value === true ? 'Y' : 'N'
        this.grpUpdateData.editorList[3].value = this.grpUpdateData.editorList[3].value === true ? 'Y' : 'N'
        let saveData = {
          deviceGrpId: this.grpUpdateData.editorList[0].value,
          deviceGrpNm: this.grpUpdateData.editorList[1].value,
          useYN: this.grpUpdateData.editorList[2].value,
          dashUseYN: this.grpUpdateData.editorList[3].value,
          description: this.grpUpdateData.editorList[4].value,
          updateId: this.grpUpdateData.editorList[5].value
        }

        api_deviceGrpManager_updateGroups(JSON.stringify(saveData))
          .then(response => {
            notify(this.$t('Search.success'), 'success', 300)
          })
          .catch(error => {
            console.log(error + 'error')
            this.$vToastify.error({ body: error.message })
          })
          .finally(() => {
            this.updateInit()
            this.btnSearch()
            this.endLoading()
          })
      } else if (e.id == 'btnCancel') {
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
