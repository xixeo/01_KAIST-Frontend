<template>
  <!-- HTML 정의하는 부분 -->
  <div class="layout-wrapper" style="padding:10px;overflow:hidden;">
    <div class="container-fluid">

      <!-- 데이터 표시관리 조회 -->
      <div v-if="pageType == 'deviceDispManager'" >      
        <!-- 타이틀, buttonList -->
        <layout-title buttonKind="dxButton" :useButtonList="buttonUseList" @btnSearch="btnSearch()" @btnAdd="dispInsertBtn()" @btnDelete="btnDelete()" />    
        <!-- 조회조건 -->
        <div class="editor-card-theme">
          <editorsLayout ref="deviceDisp" :layoutData="editorOptionData" @onValueChanged="valueChanged"></editorsLayout>
        </div>
        <div style="padding-top:10px">
        <!-- 그리드 영역 -->
          <devDataGrid :ref="deviceDispGrid.properties.gridName" height="calc(100vh - 260px)"
          :gridInfo="deviceDispGrid.properties" :dataSource="deviceDispGrid.data" />
        </div>
      </div>

      <!-- 데이터 표시관리 등록 -->
      <div v-if="pageType == 'dispManagerInsert'" style="margin-bottom:218px;">
        <div class="container-fluid">
          <layout-title buttonKind="" :useButtonList="buttonUseInsertList" />
        </div>
        <div style="margin-top:30px;">
          <!-- 그룹 등록 리스트 -->
          <div class="container-fluid" >
            <editorsLayout ref="dispInsert"  :layoutData="dispInsertData" @onBtnClick="dispSaveBtn" @onValueChanged="onValueChanged" />
          </div>
        </div>
      </div>

      <!-- 데이터 표시관리 변경 -->
      <div v-if="pageType == 'dispManagerUpdate'" style="margin-bottom:218px;">
        <div class="container-fluid">
          <layout-title buttonKind="" :useButtonList="buttonUseInsertList" />
        </div>
        <div style="margin-top:30px;">
          <!-- 그룹 등록 리스트 -->
          <div class="container-fluid" >
            <editorsLayout ref="dispUpdate" :layoutData="dispUpdateData" @onBtnClick="dispUpdateBtn" @onValueChanged="onUpdateValueChanged"/>
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
import { api_deviceDispManager_getDataDispFormat, api_deviceDispManager_insertDisplayFormat,
         api_deviceDispManager_updateDisplayFormat, api_deviceDispManager_deleteDisplayFormat } from '@/api/config/deviceDispManager'
import { getChildCmCodeList } from '@/api/system/cmCodeManage'
import getDeviceDispGrid from './data/deviceDispGrid' // 그리드 옵션 데이터
import getEditorOptions from './data/editorOptions' // 에디터 옵션 데이터
import { getUserId, getDomainCd } from '@/utils/token'
import notify from 'devextreme/ui/notify' // message
import EventBus from '@/components/event-bus' // 그리드 이벤트
import footerText from '../components/footer' //하단 소속명 추가

export default {
  name: 'deviceDispManager',
  components:{
    layoutTitle,
    devDataGrid,
    getDeviceDispGrid,
    editorsLayout,
    footerText
  },
  data(){
    return{
      userId : getUserId(),
      pageType: 'deviceDispManager',
      displayColList: [],

      // deviceDispManager
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
      dispGubnList: [],
      dispGubn: '',
      dispGubnCode: '',
      editorOptionData: getEditorOptions().dispSearchData,

      grpList: [],
      deviceDispGrid: {
        properties: [],
        data : []
      },

      // deviceDispManager Insert
      buttonUseInsertList:{},
      dispInsertData: getEditorOptions().dispInsertData, 

      // deviceDispManager Update
      dispUpdateData: getEditorOptions().dispUpdateData, 
    }
  },
  async created(){
    this.userDomainCd = getDomainCd()
    EventBus.$on(this.$route.name + '_' + this.deviceDispGrid.properties.gridName + '_CellDblClick', e => {
      this.cellClick(e)
    })
    await this.deviceListSelect()

    // 공동코드 조회
    var commonCode = await Promise.all([getChildCmCodeList({ domainCd: this.userDomainCd, codeCd: 'DEF005' }),
                                        getChildCmCodeList({ domainCd: this.userDomainCd, codeCd: 'DEF001' })    
    ])
    commonCode[0].list.forEach(item =>{ 
      this.displayColList.push({
        value: item.codeCd,
        label: item.codeCd,
        codeNm: item.codeNm
      })
    })
    this.displayColList.push({value: 'admin', label:'사용자지정'})
    this.dispInsertData.editorList[2].itemList = this.displayColList

    commonCode[1].list.forEach(item => {
      this.dispGubnList.push({
        value: item.codeCd,
        label: item.codeNm
      })
    })
    this.editorOptionData.editorList[0].itemList = this.dispGubnList
    this.editorOptionData.editorList[0].value = this.dispGubnList[2].value
    this.dispGubn = this.editorOptionData.editorList[0].value
    this.dispGubnCode = this.editorOptionData.editorList[1].value

    this.btnSearch()
  },
  computed:{
    dispDeviceList(){
      return this.$refs[this.deviceDispGrid.properties.gridName].dataGrid //Main Grid
    }
  },
  beforeMount(){
    this.deviceDispGrid.properties = getDeviceDispGrid().gridProperties
  },
  methods:{

    //////////////////////
    // deviceDispManager
    //////////////////////

    // 그리드 cell 클릭
    cellClick(e){
      if(e.key && e.columnIndex !== 0){
        this.$route.meta.menu_id = 'MENU049'
        this.pageType = 'dispManagerUpdate'    

        console.log(e.data.displayOrder)
        console.log(typeof(e.data.displayOrder))
        console.log(this.dispUpdateData.editorList[10].value)

        this.dispUpdateData.editorList[0].value = e.data.dispGubn
        this.dispUpdateData.editorList[1].value = e.data.dispGubnCode
        this.dispUpdateData.editorList[2].value = e.data.displayCol
        this.dispUpdateData.editorList[3].value = e.data.displayColNm
        this.dispUpdateData.editorList[4].value = e.data.fieldtype
        this.dispUpdateData.editorList[5].value = e.data.format
        this.dispUpdateData.editorList[6].value = e.data.alignment
        this.dispUpdateData.editorList[7].value = e.data.width
        this.dispUpdateData.editorList[8].value = e.data.max
        this.dispUpdateData.editorList[9].value = e.data.fixed
        this.dispUpdateData.editorList[10].value = e.data.required
        this.dispUpdateData.editorList[11].value = e.data.displayOrder
        this.dispUpdateData.editorList[12].value = (e.data.useYN === 'Y') ? true : false;
        this.dispUpdateData.editorList[13].value = e.data.description
      }
    },

    // input box 값 변경
    valueChanged(...arg) {      
      
      if (arg[0][0] === 'dispGubn') {        
        this.dispGubn = arg[0][1].value
        let dispCodetBox = this.$refs.deviceDisp.$options.propsData.layoutData.editorList[1]
        if(this.dispGubn == 'DEFAULT'){
          dispCodetBox.option.type = 'input'
          dispCodetBox.option.kind = 'text'
          dispCodetBox.value = 'DEFAULT'
          dispCodetBox.option.readOnly = true          
          this.dispGubnCode = 'DEFAULT'
        }else if(this.dispGubn == 'GROUP'){
          dispCodetBox.option.type = 'select'
          dispCodetBox.option.kind = 'default'
          dispCodetBox.option.readOnly = false
          dispCodetBox.itemList = [{value: '', label:'전체'}]
          dispCodetBox.value = ''
          this.dispGubnCode = ''
          this.grpList.forEach(item =>{
            dispCodetBox.itemList.push({
              value: item.value,
              label: item.label
            })
          })
        }else{
          dispCodetBox.option.type = 'input'
          dispCodetBox.option.kind = 'text'
          dispCodetBox.option.readOnly = false
          dispCodetBox.value = ''
          this.dispGubnCode = ''
        }
      }
      if(arg[0][0] === 'dispGubnCode'){
        this.dispGubnCode = arg[0][1].value
      }
    },

    deviceListSelect(){  

      api_deviceGrpManager_getGroups().then(response => {        
          response.list.forEach(item => {
            this.grpList.push({
              value: item.deviceGrpId,
              label: item.deviceGrpId+'('+item.deviceGrpNm+')'
            })
          })
          notify(this.$t('Search.success'), 'success', 300)
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.endLoading()
        })   
    },

    btnSearch(){
      this.openLoading('msg.searching')

      EventBus.$on(this.$route.name + '_' + this.deviceDispGrid.properties.gridName + '_CellDblClick', e => {
        this.cellClick(e)
      })

      this.deviceDispGrid.data = []
      let searchData = {
        dispGubn: this.dispGubn,
        dispGubnCode: this.dispGubnCode
      }

      api_deviceDispManager_getDataDispFormat(searchData).then(response => {        
        //grid id set
        response.list.forEach((element,index) => {
          element.id = element.dispGubn + element.dispGubnCode + element.displayCol
          element.no = index+1
        })
          this.deviceDispGrid.data = response.list
          notify(this.$t('Search.success'), 'success', 300)
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.endLoading()
      })
    },

    dispInsertBtn(){
      this.pageType = 'dispManagerInsert'
      this.$route.meta.menu_id = 'MENU048'

      let dispGubnBox = this.dispInsertData.editorList[0]
      dispGubnBox.itemList = this.dispGubnList
    },

    btnDelete(){
      var selectedRows = []
      selectedRows = this.$refs[this.deviceDispGrid.properties.gridName].dataGrid.getSelectedRowsData()

      if (selectedRows.length === 0) {
        this.$vToastify.warning({body: this.$t("Selection_Data"),})
        return 
      }

      //삭제확인 메세지
      this.$vToastify.prompt({
        body: this.$t("컬럼을 삭제하시겠습니까?<br>"),
        answers: { Yes: true, No: false },
        mode: "prompt"
      }).then (value => {
        if(value){
          this.Delete(selectedRows)
        }
      })
    },

    Delete(selectedRows){
      this.openLoading("Deleting")

      api_deviceDispManager_deleteDisplayFormat(selectedRows).then(response => {
        if (response.status < 0) {
          this.$vToastify.error({body: response.error.message})
        }
        else {
          notify(this.$t("Delete.success"), "success", 300);       
        }            
      }).catch((error)   => {
      console.log(error) 
      }).finally(() => {
        this.endLoading()
        this.btnSearch()      
      })        
    },



    //////////////////////////
    // deviceDispManager Insert
    //////////////////////////

    // editor box 데이터 변경
    onValueChanged(...arg) {
      
      // 에디터 박스 데이터 변경
      this.dispInsertData.editorList.forEach(list => {
        if (list.id === arg[0][0]) {
          list.value = arg[0][1].value
          if(list.id == 'dispGubn'){
            let dispCodeBox = this.$refs.dispInsert.$options.propsData.layoutData.editorList[1]
            if(list.value == 'DEFAULT'){
              dispCodeBox.option.type = 'input'
              dispCodeBox.option.kind = 'text'
              dispCodeBox.value = 'DEFAULT'
              dispCodeBox.option.readOnly = true
            }else if(list.value == 'GROUP'){
              dispCodeBox.option.type = 'select'
              dispCodeBox.option.kind = 'default'
              dispCodeBox.option.readOnly = false
              dispCodeBox.itemList = this.grpList
              dispCodeBox.value = ''
            }else{
              dispCodeBox.option.type = 'input'
              dispCodeBox.option.kind = 'text'
              dispCodeBox.option.readOnly = false
              dispCodeBox.value = ''
            }
          }
          if(list.id == 'displayCol'){
            // 사용자 지정
            if(list.value != 'admin'){
              this.displayColList.forEach(item=> {
                if(item.value == list.value){
                  this.dispInsertData.editorList[3].option.visible = false
                  this.dispInsertData.editorList[4].position.col[0] = 5
                  this.dispInsertData.editorList[4].title.width =  '17%'
                  this.dispInsertData.editorList[4].value = item.codeNm
                }
              })
            }
            else{
              this.dispInsertData.editorList[3].option.visible = true
              this.dispInsertData.editorList[4].position.col[0] = 7
              this.dispInsertData.editorList[4].title.width =  '10%'
              this.dispInsertData.editorList[4].value = ''
            }
          }        
        }        
      })
    },

    insertInit(){

      // search data 초기화
      this.dispGubn =  ''
      this.dispGubnCode = ''

      this.dispInsertData.editorList[0].value = 'DEFAULT'
      this.dispInsertData.editorList[1].option.type = 'input'
      this.dispInsertData.editorList[1].option.kind = 'text'
      this.dispInsertData.editorList[1].option.readOnly = true
      this.dispInsertData.editorList[1].value = 'DEFAULT'
      this.dispInsertData.editorList[2].value = ''
      this.dispInsertData.editorList[3].value = ''
      this.dispInsertData.editorList[4].value = ''
      this.dispInsertData.editorList[5].value = 'string'
      this.dispInsertData.editorList[6].value = ''
      this.dispInsertData.editorList[7].value = 'center'
      this.dispInsertData.editorList[8].value = '100'
      this.dispInsertData.editorList[9].value = '50'
      this.dispInsertData.editorList[10].value = false
      this.dispInsertData.editorList[11].value = false
      this.dispInsertData.editorList[12].value = 0
      this.dispInsertData.editorList[13].value = true
      this.dispInsertData.editorList[14].value = ''

      this.dispInsertData.editorList[3].option.visible = false
      this.dispInsertData.editorList[4].position.col[0] = 5
      this.dispInsertData.editorList[4].title.width =  '17%'

      this.$route.meta.menu_id = 'MENU043'
      this.pageType = 'deviceDispManager'
    },

    dispSaveBtn(e){
      if(e.id == 'btnAdd'){
        this.openLoading("Saving")
        this.dispInsertData.editorList[13].value = (this.dispInsertData.editorList[13].value === true) ? 'Y' : 'N'; 

        let saveData = {
          dispGubn: this.dispInsertData.editorList[0].value,
          dispGubnCode: this.dispInsertData.editorList[1].value,
          displayCol: this.dispInsertData.editorList[2].value,
          displayColNm: this.dispInsertData.editorList[4].value,
          fieldtype: this.dispInsertData.editorList[5].value,
          format: this.dispInsertData.editorList[6].value,
          alignment: this.dispInsertData.editorList[7].value,
          width: this.dispInsertData.editorList[8].value,
          max: this.dispInsertData.editorList[9].value,
          fixed: this.dispInsertData.editorList[10].value,
          required: this.dispInsertData.editorList[11].value,
          displayOrder: this.dispInsertData.editorList[12].value,
          useYN: this.dispInsertData.editorList[13].value,
          description: this.dispInsertData.editorList[14].value,
          insertId: this.dispInsertData.editorList[15].value
        }
        if(this.dispInsertData.editorList[2].value == 'admin'){
          saveData.displayCol = this.dispInsertData.editorList[3].value
        }
        if(this.verification(saveData)){
          api_deviceDispManager_insertDisplayFormat(JSON.stringify(saveData)).then(response => {
            notify(this.$t('Search.success'), 'success', 300) 
            this.insertInit()
            this.btnSearch()   
          }).catch((error) => {
            notify(this.$t('msg.no_save'), 'success', 300)
            console.log(error+'error')
          }).finally(() => {
            this.endLoading()     
          }) 
        }
        else{
          this.endLoading()     
        }
      }else{
        this.insertInit()
        this.btnSearch()
      }
    },

    // validation check
    verification(saveData){

      let list = []
      let msg = ''
      if(saveData.dispGubn === '') list.push(this.$t('label.disp_gubn'))
      if(saveData.dispGubnCode === '') list.push(this.$t('label.disp_gubn_code'))
      if(saveData.displayCol === '') list.push(this.$t('label.display_col'))
      if(saveData.fieldtype === '') list.push(this.$t('label.fieldtype'))
      if(saveData.alignment === '') list.push(this.$t('label.alignment'))

      if(list.length > 0){
        list.forEach((item,index) => {
          msg += item
          if(list.length -1 !== index) msg += ','
        })
        this.$vToastify.warning({ body: msg + this.$t('msg.required_item') }) // 에러 메시지 출력
        return false // 실패
      }else{
        return true
      }
    },



    //////////////////////////
    // deviceDispManager Update
    //////////////////////////

    updateInit(){
      this.$route.meta.menu_id = 'MENU043'
      this.pageType = 'deviceDispManager'    
    },

    onUpdateValueChanged(...arg) {
      // 에디터 박스 데이터 변경
      this.dispUpdateData.editorList.forEach(list => {
        if (list.id === arg[0][0]) {
          list.value = arg[0][1].value
        }
      })
    },

    dispUpdateBtn(e){
      if(e.id == 'btnAdd'){
        this.openLoading("Saving")
        this.dispUpdateData.editorList[12].value = (this.dispUpdateData.editorList[12].value === true) ? 'Y' : 'N'
        
        let saveData = {
          dispGubn: this.dispUpdateData.editorList[0].value,
          dispGubnCode: this.dispUpdateData.editorList[1].value,
          displayCol: this.dispUpdateData.editorList[2].value,
          displayColNm: this.dispUpdateData.editorList[3].value,
          fieldtype: this.dispUpdateData.editorList[4].value,
          format: this.dispUpdateData.editorList[5].value,
          alignment: this.dispUpdateData.editorList[6].value,
          width: this.dispUpdateData.editorList[7].value,
          max: this.dispUpdateData.editorList[8].value,
          fixed: this.dispUpdateData.editorList[9].value,
          required: this.dispUpdateData.editorList[10].value,
          displayOrder: this.dispUpdateData.editorList[11].value,
          useYN: this.dispUpdateData.editorList[12].value,
          description: this.dispUpdateData.editorList[13].value,
          updateId: this.dispUpdateData.editorList[14].value
        }

        api_deviceDispManager_updateDisplayFormat(JSON.stringify(saveData)).then(response => {
          if(response.status < 0){
            this.$vToastify.error({body: response.error.message})
          }
          else{
            notify(this.$t('Search.success'), 'success', 300)  
            this.updateInit()    
            this.btnSearch()
          }
        }).catch((error) => {
            console.log(error+'error')
        }).finally(() => { 
          this.endLoading()
        }) 
      }
      else{
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
