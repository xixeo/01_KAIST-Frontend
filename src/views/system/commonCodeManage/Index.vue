<template>
  <!-- HTML 정의하는 부분 -->
  <div class="layout-wrapper" style="padding:10px">
    <div class="container-fluid">
      <!-- 타이틀 및 button -->
      <layoutTitle buttonKind="dxButton" :useButtonList="buttonUseList" @btnSearch="btnSearch()" />
    </div>
    <!-- 조회조건 -->
    <div class="editor-card-theme">
      <editorsLayout ref="cmCode" :layoutData="editorOptionData" @onValueChanged="valueChanged"></editorsLayout>
    </div>
    <div style="padding-top:10px">
      <div class="lg:flex">
        <!-- 부모 공통코드 그리드 영역 -->
        <div class="lg:w-2/5" style="padding-right:0.5rem;">
          <div style="display: flex; justify-content: space-between;">
            <div style="height:36px ; " class="col-sm-3 text-white m-1">
              <i class="fas fa-info-circle mr-1" />
              {{ $t('label.prntsCmCode') }}
            </div>
            <div style="height:36px;" class="col-sm-2 text-white m-1">
              <dxButtonList :useBtnList="btnButtonlList" @btnClick="onClick($event.options)"></dxButtonList>
            </div>
          </div>
          <devDataGrid
            height="calc(100vh - 300px)"
            :gridInfo="cmCodeGrid.properties"
            :dataSource="cmCodeGrid.data"
            :ref="cmCodeGrid.properties.gridName"
          ></devDataGrid>
        </div>
        <!-- 자식 공통코드 그리드 영역 -->
        <div class="lg:w-3/5" style="padding-left:0.5rem;">
          <div style="display: flex;justify-content: space-between;">
            <div style="height:36px; " class="col-sm-10 text-white m-1">
              <i class="fas fa-info-circle mr-1" />
              {{ $t('label.childCmCode') }}
            </div>
            <div style="height:36px;" class="col-sm-27 text-white m-1">
              <dxButtonList :useBtnList="btnButtonDetailList" @btnClick="onClickDetail($event.options)"></dxButtonList>
            </div>
          </div>
          <devDataGrid
            height="calc(100vh - 300px)"
            :gridInfo="cmCodeDetailGrid.properties"
            :dataSource="cmCodeDetailGrid.data"
            :ref="cmCodeDetailGrid.properties.gridName"
          ></devDataGrid>
        </div>
      </div>
    </div>
    <RowInfoPopup
      ref="rowInfoPopup"
      :popupData="popup.data"
      :editorData="popup.editorData"
      @complete="savePopupData"
      @onValueChanged="onValueChanged"
      @onContentReady="onContentReady"
    />
  </div>
</template>

<script>
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
import layoutTitle from '@/components/layoutTitle' // Title & Button 컴포넌트
import { devDataGrid } from '@/components/DevExtreme/grid' // 그리드 컴포넌트
import getCmCodeGrid from './data/cmCodeGrid' // 그리드 옵션 데이터
import getCmCodeDetailGrid from './data/cmCodeDetailGrid' // 디테일 그리드 옵션 데이터
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import getEditorOptions from './data/editorOptions' // 에디터 옵션 데이터
import { getAllCmCode, getCmCode, createCmCode, deleteCmCode } from '@/api/system/cmCodeManage' // 도메인 리스트 api 호출
import { getDomainListData } from '@/api/system/domainManage' // 도메인 리스트 api 호출
import notify from 'devextreme/ui/notify' // message
import EventBus from '@/components/event-bus' // 그리드 이벤트
import { dxButtonList } from '@/components/DevExtreme/editors' // 에디터 컴포넌트
import { RowInfoPopup } from '@/components/DevExtreme/popups' // Info 팝업
import getPopupEditorOptions from './data/popupEditorOptions' // 팝업 에디터 옵션 데이터
import { getDomainCd } from '@/utils/token'
import envs from '@/envs'

export default {
  name: 'commonCodeManage',
  components: {
    devDataGrid,
    layoutTitle,
    editorsLayout,
    dxButtonList,
    RowInfoPopup
  },
  // .vue 내부에서 사용되는 model
  data() {
    return {
      //도메인코드
      userDomainCd: '', //로그인시 도메인 코드
      // layoutTitle 버튼 리스트
      buttonUseList: {
        group: null,
        options: {
          type: 'default',
          searchModeOption: 'containted',
          content: '',
          icon: '',
          style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'btnSearch' }]
      },
      //하단 편집버튼리스트
      btnButtonList: {
        group: {
          stylingMode: 'outlined',
          selectionMode: 'single'
        },
        options: {
          type: 'default',
          stylingMode: 'containted',
          content: '',
          icon: '',
          style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'btnAdd' }, { id: 'btnSave' }, { id: 'btnDelete' }]
      },
      btnButtonlList: {
        group: {
          stylingMode: 'outlined',
          selectionMode: 'single'
        },
        options: {
          type: 'default',
          stylingMode: 'containted',
          content: '',
          icon: '',
          style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'btnAdd' }, { id: 'btnSave' }, { id: 'btnDelete' }, { id: 'btnExportXlsx' }]
      },
      btnButtonDetailList: {
        group: {
          stylingMode: 'outlined',
          selectionMode: 'single'
        },
        options: {
          type: 'default',
          stylingMode: 'containted',
          content: '',
          icon: '',
          style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        },
        list: [{ id: 'btnAdd' }, { id: 'btnSave' }, { id: 'btnDelete' }, { id: 'btnExportXlsx' }]
      },
      // 팝업 정보
      popup: {
        data: {
          title: 'label.cmcode',
          panelButton: {
            group: {
              stylingMode: 'outlined',
              selectionMode: 'single', // 하나만 선택 가능
              selectedKeys: [this.$t('basic_info')] // 버튼 리스트 중 선택된 key
            },
            options: {
              type: 'default',
              stylingMode: 'containted',
              content: '',
              style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
            },
            list: [{ id: 'basic_info' }]
          },
          width: '50%', // 팝업 가로
          height: '50%', // 팝업 높이
          okButtonLabel: '', // ok버튼
          valiData: false, // 데이터 검증
          count: 0 // watch
        },
        editorData: getPopupEditorOptions().popupData
      },
      // 공통코드 editor list 정보
      editorOptionData: getEditorOptions().cmCodeData,
      param: {
        codeCd: '',
        //codeNm: '',
        domainCd: ''
      },
      commonCodeList: [], // 공통 코드 리스트 중복체크
      // 그리드 정보
      cmCodeGrid: {
        properties: [], // 그리드 설정 정보
        data: [] // 그리드 데이터
      },
      cmCodeDetailGrid: {
        properties: [], // 그리드 설정 정보
        data: [] // 그리드 데이터
      },
      selectCmCode: false,
      selectCodeCd: '',

      validation: [], // validation 데이터
      validationCount: 0, // watch로 validation 값을 받음
      saveData: {}
    }
  },
  watch: {
    validationCount: {
      deep: true,
      handler() {
        if (this.saveData.domainCd && this.validation.length < 1) {
          this.saveDataList() // 데이터 저장
          this.validation = [] // validation 초기화
        } else if (this.saveData.domainCd && this.validation.length > 0) {
          notify(this.$t('msg.no_save'), 'warning', 1000)
        }
        this.saveData = {}
      }
    }
  },
  computed: {
    cmCodeList() {
      // domain dataGrid
      return this.$refs[this.cmCodeGrid.properties.gridName].dataGrid
    },
    cmCodeDetailList() {
      // domain dataGrid
      return this.$refs[this.cmCodeDetailGrid.properties.gridName].dataGrid
    }
  },
  async created() {
    this.userDomainCd = getDomainCd() // 세션정보에서 현재사용자 도메인 세팅
    this.param.domainCd = this.userDomainCd
    await this.compareDomain() // master 도메인과 현재사용자 도메인 비교
    await this.getSelectList() // select Box 데이터 받아옴
    await this.btnSearch() // 도메인 그리드 조회
    // 그리드 cell 클릭 이벤트
    EventBus.$on(this.$route.name + '_' + this.cmCodeGrid.properties.gridName + '_CellClick', e => {
      this.cellClick(e)
    })
  },
  beforeMount() {
    // dataGrid Column 정보
    this.cmCodeGrid.properties = getCmCodeGrid().cmCodeGridProperties
    this.cmCodeDetailGrid.properties = getCmCodeDetailGrid().cmCodeDetailGridProperties
  },
  mounted() {
    this.init()
  },
  methods: {
    // master 도메인과 현재사용자 도메인 비교
    compareDomain() {
      // 도메인이 같지않을 때
      if (envs.masterDomain !== getDomainCd()) {
        this.editorOptionData.editorList[0].option.visible = false
        this.editorOptionData.editorList[1].position.col = [1, 2]
        //this.editorOptionData.editorList[2].position.col = [3, 2]
      }
    },
    init() {
      this.selectCmCode = false
      this.selectCodeCd = ''
      this.cmCodeGrid.data = []
      this.cmCodeDetailGrid.data = []
    },
    // 도메인 그리드 조회
    btnSearch() {
      this.openLoading('msg.searching')
      //this.init()
      getAllCmCode(this.param)
        .then(res => {
          res.list.forEach(item => {
            item.id = item.codeCd // id 값 추가
            this.commonCodeList.push(item.codeCd)
          })
          notify(this.$t('msg.search_success'), 'success', 500)
          this.cmCodeGrid.data = res.list

          //2021-10-15 BY LYJ search시 detail list 목록 조회 버그 수정 start [[
          let param = {
            domainCd: this.param.domainCd,
            level: '1',
            prntsCd: this.selectCodeCd == undefined || this.selectCodeCd == '' ? res.list[0].codeCd : this.selectCodeCd
          }
          this.btnDetailSearch(param)
          //2021-10-15 BY LYJ search시 detail list 목록 조회 버그 수정 end ]]
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.endLoading()
        })
    },
    btnDetailSearch(detailParam) {
      this.cmCodeDetailGrid.data = []
      getCmCode(detailParam)
        .then(res => {
          res.list.forEach((item, index) => {
            item.id = item.codeCd + index // id 값 추가
          })
          //notify(this.$t('msg.search_success'), 'success', 500)
          //console.log('***detail : ' +JSON.stringify(res.list))
          this.cmCodeDetailGrid.data = res.list
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.endLoading()
        })
    },
    // 그리드 cell 클릭 시
    cellClick(e) {
      // 클릭한 cell 정보 조회
      if (e.key && e.columnIndex !== 0) {
        let param = {
          domainCd: this.param.domainCd,
          level: '1',
          prntsCd: e.row.data.codeCd
        }
        this.popup.editorData.basic_info.editorList[0].validation.asyncList = [] // 도메인코드 validation 초기화
        this.btnDetailSearch(param)
        this.selectCmCode = true
        this.selectCodeCd = e.row.data.codeCd
      }
    },
    // select box 값 변경
    valueChanged(...arg) {
      //console.log('######' + arg[0][0] + '-->' + arg[0][1].value)
      if (arg[0][0] === 'domainCd') {
        this.param.domainCd = arg[0][1].value
        this.getCmCodeList()
        //this.btnSearch() //
      } else if (arg[0][0] === 'codeCd') {
        this.param.codeCd = arg[0][1].value
        //this.btnSearch() //
      } 
      // else if (arg[0][0] === 'codeNm') {
      //   this.param.codeNm = arg[0][1].value
      //   //this.btnSearch() //
      // }
    },
    // 도메인 select Box 데이터 받아옴
    getSelectList() {
      //도에인코드 리스트
      getDomainListData({ domainStatusCd: '' }).then(res => {
        // console.log("domainRef:",this.$refs);
        let domainSelectBox = this.$refs.cmCode.$options.propsData.layoutData.editorList[0]
        // domainSelectBox.itemList = [{value:'',label:"전체"}]
        // 도메인 이름 select box 데이터 추가
        res.list.forEach(item => {
          //console.log("domain item:",JSON.stringify(item));
          domainSelectBox.itemList.push({
            value: item.domainCd,
            label: item.domainNm
          })
        })
        domainSelectBox.value = this.userDomainCd
      })

      this.getCmCodeList()
    },
    getCmCodeList() {
      // 공통코드 리스트
      getAllCmCode(this.param)
        .then(res => {
          let cmCodeSelectBox = this.$refs.cmCode.$options.propsData.layoutData.editorList[1]
          cmCodeSelectBox.itemList = []
          cmCodeSelectBox.itemList.push({
            value: '',
            label: '전체'
          })

          // let cmNameSelectBox = this.$refs.cmCode.$options.propsData.layoutData.editorList[2]
          // cmNameSelectBox.itemList = []
          // cmNameSelectBox.itemList.push({
          //   value: '',
          //   label: '전체'
          // })

          res.list.forEach(item => {
            // 도메인 이름 select box 데이터 추가
            cmCodeSelectBox.itemList.push({
              value: item.codeCd,
              label: item.codeCd+'('+item.codeNm+')'
            })

            // 도메인 이름 select box 데이터 추가
            // cmNameSelectBox.itemList.push({
            //   value: item.codeNm,
            //   label: item.codeNm
            // })
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    //하단 편집버튼 클릭
    onClick(e) {
      console.log('main ', e)
      if (e.id == 'btnAdd') {
        this.addRow()
      } else if (e.id == 'btnSave') {
        this.saveRow()
      } else if (e.id == 'btnDelete') {
        this.btnDelete('M')
      } else if (e.id == 'btnExportXlsx') {
        this.exportExcel('M')
      }
    },
    onClickDetail(e) {
      console.log('detail ', e)
      if (e.id == 'btnAdd') {
        this.addRowDetail()
      } else if (e.id == 'btnSave') {
        this.saveRowDetail()
      } else if (e.id == 'btnDelete') {
        this.btnDelete('D')
      } else if (e.id == 'btnExportXlsx') {
        this.exportExcel('D')
      }
    },
    saveDataList() {
      //console.log('##saveDataList' + JSON.stringify(this.saveData))
      let saveCmcode = []
      saveCmcode.push(this.saveData)

      // api 호출
      createCmCode(saveCmcode)
        .then(res => {
          //notify(this.$t('msg.save_success'), 'success', 300)
          this.$refs.rowInfoPopup.onClose() // 성공
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.btnSearch()
        })
    },
    async saveRowDetail() {
      let saveDataList = this.cmCodeDetailList.getSelectedRowsData() // 체크된 Row 체크

      saveDataList.forEach(item => {
        item.level = 1
        item.useYn = 'Y'
        item.domainCd = this.param.domainCd
        item.prntsCd = this.selectCodeCd
      })

      //validation 체크
      let valCheckMsg = ''
      let valCheck = true
      await saveDataList.forEach((saveData, index) => {
        let valCheckResult = this.Validation(saveData)
        if (!valCheckResult.success) {
          valCheck = false
          valCheckMsg = valCheckResult.msg
        }
      })
      if (!valCheck) {
        console.log('valcheck')
        this.$vToastify.warning({ body: valCheckMsg + this.$t('msg.required_item') })
      }

      await saveDataList.forEach((saveData, index) => {
        if (valCheck) {
          let dataList = [] // 수정/추가될 ROW 리스트
          dataList.push(saveData)
          // api 호출
          createCmCode(dataList)
            .then(res => {
              notify(this.$t('msg.save_success'), 'success', 300)
            })
            .catch(error => {
              console.log(error)
            })
            .finally(() => {
              this.btnSearch()
            })
        }
      })
    },
    // 데이터 검증 (추후 키 중복확인 로직 추가)
    Validation(saveData) {
      //console.log('## saveData : ' + JSON.stringify(saveData))
      if (saveData) {
        this.popup.data.valiData = false
        let list = []
        let msg = ''
        if (saveData.codeCd === '' || typeof saveData.codeCd === 'undefined') {
          list.push(this.$t('label.child_cmcode_cd'))
        }
        if (saveData.codeNm === '' || typeof saveData.codeNm === 'undefined') {
          list.push(this.$t('label.child_cmcode_nm'))
        }
        if (list.length > 0) {
          list.forEach((item, index) => {
            msg += item
            if (list.length - 1 !== index) msg += ', '
          })
          //this.$vToastify.warning({ body: msg + this.$t('msg.required_item') })
          return { success: false, msg: msg } // 에러 메시지 출력
        } else {
          this.popup.data.valiData = true
          return { success: true, msg: 'success' } // 성공
        }
      }
    },
    // 팝업관련
    // 수정, 추가 버튼
    savePopupData(...arg) {
      this.saveData = {} // 수정/추가될 ROW
      let dataList = [] // 수정/추가될 ROW 리스트
      this.saveData['level'] = '0'
      this.saveData['domainCd'] = this.param.domainCd
      this.saveData['useYn'] = 'Y'
      this.popup.data.panelButton.list.forEach(panel => {
        this.popup.editorData[panel.id].editorList.forEach(item => {
          this.saveData[item.id] = item.value
        })
      })

      if (arg[0] === 'new') {
        this.saveData.__created__ = true
      } else {
        this.saveData.__modified__ = true
      }
    },
    // 팝업 editor box 값 변경
    onValueChanged(...arg) {
      console.log('##onValueChanged', arg[0][0])
      let argData = arg[0][0]
      this.popup.data.panelButton.list.forEach(panel => {
        this.popup.editorData[panel.id].editorList.forEach(item => {
          if (item.id === argData[0]) {
            item.value = argData[1].value // popup 데이터 변경
          }
        })
      })
    },
    // Row 추가
    addRow() {
      //console.log('###########addrow1 : ' + JSON.stringify(this.commonCodeList))
      this.popup.data.okButtonLabel = 'btnAdd' // ok 버튼 라벨
      this.popup.editorData.basic_info.editorList[0].validation.asyncList = this.commonCodeList // 도메인 코드 중복 체크
      this.popup.data.panelButton.list.forEach(panel => {
        this.popup.editorData[panel.id].editorList.forEach(item => {
          if (item.id === 'joined_period') {
            item.value = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
          } else {
            item.value = ''
          }
        })
      }) // 팝업 데이터 초기화
      this.popup.data.count++ // watch에 걸기
      this.$refs.rowInfoPopup.open('new')
    },
    addRowDetail() {
      let maxSort = 1
      if (this.cmCodeDetailGrid.data.length > 0) {
        let sortData = this.cmCodeDetailGrid.data.map(function(v) {
          if (typeof v.sort === 'undefined') {
            return null
          }
          return v.sort
        })
        if (!isNaN(Math.max.apply(null, sortData))) {
          maxSort = Math.max.apply(null, sortData) + 1
        }
      }
      if (this.selectCmCode) {
        let newRow = {
          useYn: 'Y',
          level: '1',
          domainCd: this.param.domainCd,
          sort: maxSort
        }
        this.$refs[this.cmCodeDetailGrid.properties.gridName].addRow(newRow)
      }
    },
    exportExcel(param) {
      if (param == 'M') {
        let context = this.$refs[this.cmCodeGrid.properties.gridName].dataGrid
        this.$refs[this.cmCodeGrid.properties.gridName].onExporting(context, 'commonCode.xlsx')
      } else if (param == 'D') {
        let context = this.$refs[this.cmCodeDetailGrid.properties.gridName].dataGrid
        this.$refs[this.cmCodeDetailGrid.properties.gridName].onExporting(context, 'detailCommonCode.xlsx')
      }
    },
    // 삭제
    btnDelete(param) {
      let lvl = 0
      let selectedRows = ''
      if (param == 'M') {
        lvl = 0
        selectedRows = this.cmCodeList.getSelectedRowsData() // 체크된 Row 체크
      } else if (param == 'D') {
        lvl = 1
        selectedRows = this.cmCodeDetailList.getSelectedRowsData() // 체크된 Row 체크
      }

      selectedRows.forEach(item => {
        item.domainCd = this.param.domainCd // 도메인코드 추가
        item.level = lvl // 레벨 추가
      })
      //삭제확인 메세지
      this.$vToastify
        .prompt({
          body: this.$t('msg.delete_qustion'),
          answers: { Yes: true, No: false },
          mode: 'prompt'
        })
        .then(value => {
          if (value) {
            // api 호출
            deleteCmCode(selectedRows)
              .then(res => {
                notify(this.$t('msg.delete_success'), 'success', 300)
              })
              .catch(error => {
                console.log(error)
              })
              .finally(() => {
                this.btnSearch()
              })
          }
        })
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
    },
    // summary 리스트 준비
    onContentReady(...arg) {
      let argData = arg[0][0]
      this.validation = argData // validaiton 리스트 추가
      this.validationCount++ // watch
      console.log('summary Ready:', argData)
    }
  }
}
</script>

<style lang="less" scoped>
/* css 혹은 less로 스타일 정의하는 부분 */
</style>
