<template>
  <!-- HTML 정의하는 부분 -->
  <div class="layout-wrapper" style="padding:10px">
    <div class="container-fluid">
      <!-- 타이틀 및 button -->
      <layoutTitle
        buttonKind="dxButton"
        :useButtonList="buttonUseList"
        @btnSearch="btnSearch()"
        @btnAdd="btnAdd()"
        @btnSave="btnSave()"
        @btnDelete="btnDelete()"
      />
    </div>
    <!-- 조회조건 -->
    <div class="editor-card-theme">
      <editorsLayout ref="domain" :layoutData="domainData" @changInput="changInput"></editorsLayout>
    </div>
    <div style="padding-top:10px">
      <!-- 그리드 영역 -->
      <div class="lg:flex">
        <div class="lg:w-3/5" style="padding-right:0.5rem;">
          <div class="col-sm-6 text-white m-1">
            <i class="fas fa-info-circle mr-1"></i>
            {{ $t('label.asgn_list') }}
          </div>
          <!-- Tree 그리드 영역 -->
          <dxTreeList
            :ref="asgnTreeGrid.properties.treeName"
            height="calc(100vh - 300px)"
            :treeInfo="asgnTreeGrid.properties"
            :dataSource="asgnTreeGridData"
            :expandedRowKeys="asgnTreeGrid.expandedRowKeys"
            :selectedRowKeys="asgnTreeGrid.selectedRowKeys"
          />
        </div>
        <!-- 조직 정보 리스트 -->
        <div class="lg:w-2/5" style="padding-left:0.5rem;">
          <div class="col-sm-6 text-white m-1">
            <i class="fas fa-info-circle mr-1"></i>
            {{ $t('label.asgn_info') }}
          </div>
          <editorsLayout
            ref="asgnInfo"
            :layoutData="asgnInfoData"
            @onBtnClick="onCheckClick"
            @onValueChanged="onValueChanged"
          ></editorsLayout>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dxTreeList } from '@/components/DevExtreme/grid' // 트리 그리드 컴포넌트
import layoutTitle from '@/components/layoutTitle' // Title & Button 컴포넌트
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import getEditorOptions from './data/editorOptions' // 에디터 옵션 데이터
import getasgnGrid from './data/asgnGrid' // 그리드 옵션 데이터
import { getCmCode } from '@/api/system/cmCodeManage' // 공통코드 api 호출
import { getDomainListData } from '@/api/system/domainManage' // 도메인 api 호출
import { getAsgnData, checkAsgnCdData, updateAsgnData, deleteAsgnData } from '@/api/system/asgnManage' // 조직 api 호출
import EventBus from '@/components/event-bus' // 그리드 이벤트
import notify from 'devextreme/ui/notify' // message
import { getDomainCd } from '@/utils/token'
import envs from '@/envs'
// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  name: 'organizationManage',
  components: {
    layoutTitle,
    dxTreeList,
    editorsLayout
  },
  // .vue 내부에서 사용되는 model
  data() {
    return {
      userDomainCd: '', //로그인시 도메인 코드
      cardVisible: true, // 조회 조건 card visible
      // layoutTitle 버튼 리스트
      buttonUseList: {
        group: null,
        options: {
          type: 'default',
          searchModeOption: 'containted',
          content: '',
          icon: '',
          style: 'width: 130px; margin-top: 0.1%;margin-left: 0.1%;'
        }, // 버튼 리스트 옵션
        list: [{ id: 'btnSearch' }, { id: 'btnAdd' }, { id: 'btnDelete' }, { id: 'btnSave' }] // 리스트
      },
      // 트리 그리드 정보
      asgnTreeGrid: {
        properties: [], //TreeList Main Column 정보
        expandedRowKeys: [], // 처음 조회시 펼쳐질 ID
        firstData: [], // 조회기준 데이터
        clickRow: null, // 클릭한 ROW
        clickKey: null, // 클릭한 ROW의 key
        selectedRowKeys: [], // 선택된 row
        addId: 1 // 추가 ID
      },
      asgnTreeGridData: [], // TreeList Main Data
      changeGridData: [], // 조회 후 변경된 데이터
      changeCount: true,
      domainData: getEditorOptions().domainData, // 도메인 정보
      asgnInfoData: getEditorOptions().asgnInfoData, // 메뉴 정보 레이아웃 옵션
      paramDomainCode: '', // 파라미터 도메인 코드
      domainCode: '', // 현재 조회된 도메인 코드
      duplicateCheck: [], // 조직 코드 체크
      beforeClickRow: [] // 이전 클릭 ROW
    }
  },
  watch: {
    // 그리드 조회 후 데이터 변경시
    asgnTreeGridData: {
      deep: true,
      handler() {
        if (this.changeCount) {
          let allData = _.cloneDeep(this.asgnTreeGridData).filter(x => {
            return x.__created__ != true
          })
          if (allData.length > 0) {
            this.changeGridData.forEach((first, index) => {
              if (JSON.stringify(first) !== JSON.stringify(allData[index]) && !allData[index].__created__) {
                this.asgnTreeGrid.selectedRowKeys.push(first.id) // 해당 Row 선택
                this.changeGridData[index] = allData[index] // 변경된 데이터 업데이트
                this.asgnTreeGridData.forEach(item => {
                  if (item.id === first.id) item.__modified__ = true
                }) // __modified__ 추가
              }
            })
          }
        }
      }
    }
  },
  computed: {
    treeAsgn() {
      return this.$refs[this.asgnTreeGrid.properties.treeName].treeList // Main TreeList
    }
  },
  async created() {
    this.userDomainCd = getDomainCd() // 세션정보에서 현재사용자 도메인 세팅
    this.paramDomainCode = this.userDomainCd
    this.domainData.editorList[0].value = this.paramDomainCode
    await this.compareDomain() // master 도메인과 현재사용자 도메인 비교
    await this.initSelectBox()
    // DOM이 만들어 지기 전 실행 되는 곳
    EventBus.$on(this.$route.name + '_' + this.asgnTreeGrid.properties.treeName + '_FocusedRowChanged', e => {
      this.focusedRowChanged(e)
    })
    EventBus.$on(this.$route.name + '_' + this.asgnTreeGrid.properties.treeName + '_Add', e => {
      this.btnAdd(e)
    }) // Tree 추가버튼
  },
  beforeMount() {
    this.asgnTreeGrid.properties = getasgnGrid().asgnGridProperties
    this.asgnTreeGrid.properties.focusedRowKey = 0
  },
  methods: {
    // master 도메인과 현재사용자 도메인 비교
    compareDomain() {
      // 도메인이 같지않을 때
      if (envs.masterDomain !== getDomainCd()) {
        this.cardVisible = false
      }
    },
    // Select Box 데이터 생성
    initSelectBox() {
      // 도메인 select Box 데이터 받아옴
      getDomainListData({ domainStatusCd: '' }).then(res => {
        let domainSelectBox = this.$refs.domain.$options.propsData.layoutData.editorList[0]
        res.list.forEach(item => {
          domainSelectBox.itemList.push({
            value: item.domainCd,
            label: item.domainNm
          })
        })
        this.paramDomainCode = domainSelectBox.value
        this.btnSearch() // 조회
      })
    },
    // 조직형식 selectbox 데이터 호출
    getAsgnTypeSelectBox() {
      let param = { domainCd: this.domainCode, level: '1', prntsCd: 'A001', useYn: 'Y' }
      // 조직형식 Select Box 데이터 생성
      getCmCode(param).then(res => {
        let asgnTypeSelectBox = this.$refs.asgnInfo.$options.propsData.layoutData.editorList[0]
        asgnTypeSelectBox.itemList = [] // 초기화
        res.list.forEach(item => {
          asgnTypeSelectBox.itemList.push({
            value: item.codeNm,
            label: item.codeNm
          })
        })
      })
    },
    // 추가
    btnAdd(e) {
      let prntsCd = 0 // 부모메뉴 ID
      if (!this.asgnTreeGridData.some(el => el.asgnCd === this.asgnTreeGrid.clickKey)) this.asgnTreeGrid.clickKey = null // 선택된 key 초기화
      if (this.asgnTreeGrid.clickKey !== null) prntsCd = this.asgnTreeGrid.clickKey // 추가되는 parent key
      this.asgnTreeGrid.expandedRowKeys.push(prntsCd) // 펼쳐질 key
      let newRow = {
        domainCd: this.domainCode,
        id: this.asgnTreeGrid.addId,
        asgnNm: '',
        asgnType: '',
        asgnCd: '',
        prntsCd: prntsCd, // prntsCd가 null이면 추가안됨
        sort: 1,
        level: 0,
        note: '',
        insertDt: '',
        insertId: '',
        updateDt: '',
        updateId: ''
      } // 추가될 row 데이터 셋
      this.asgnTreeGrid.selectedRowKeys.push(newRow.id) // 해당 Row 선택
      this.$refs[this.asgnTreeGrid.properties.treeName].addRow(newRow) // row 추가
      this.asgnTreeGrid.addId++ // id값 +
      if (prntsCd === 0) notify(this.$t('msg.add_success'), 'success', 1000)
      if (prntsCd !== 0) notify(this.$t('msg.check_add_success'), 'success', 1000)
    },
    // 조회
    btnSearch() {
      // 메뉴 그리드 생성
      this.openLoading('msg.searching')
      this.asgnTreeGridData = [] // 그리드 데이터 초기화
      // api 호출
      getAsgnData({ domainCd: this.paramDomainCode })
        .then(res => {
          res.list.forEach(item => {
            item.id = item.asgnCd
            item.level = item.level * 1 // level 자료형 변경
          }) // id 값 추가
          notify(this.$t('msg.search_success'), 'success', 1000) // 성공 메시지
          this.asgnTreeGrid.selectedRowKeys = [] // 체크 항목 초기화
          this.changeCount = false
          this.asgnTreeGridData = res.list // 그리드 데이터
          this.asgnTreeGrid.clickKey = null // 클릭한 key 초기화
          this.asgnTreeGrid.firstData = _.cloneDeep(res.list) // 조회초기값 저장
          this.changeGridData = this.asgnTreeGrid.firstData
          this.duplicateCheck = [] // 조직코드 중복체크 초기화
          this.domainCode = this.paramDomainCode // 도메인 코드 저장
          this.asgnTreeGrid.addId = 1 // 추가 id값 초기화
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.endLoading()
          this.getAsgnTypeSelectBox() // 조직형식 데이터 호출
          this.changeCount = true
          // 에디터 박스 데이터 초기화
          this.asgnInfoData.editorList.forEach(list => {
            if (list.id === 'sort') {
              list.value = 0
            } else {
              list.value = ''
            }
          })
        })
    },
    // 저장
    btnSave() {
      let saveData = []
      this.asgnTreeGridData.forEach(row => {
        if (row.__created__ || row.__modified__) saveData.push(row)
      })
      if (this.verification(saveData)) {
        // 저장 api 호출
        updateAsgnData(saveData)
          .then(res => {
            notify(this.$t('msg.save_success'), 'success', 1000)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            this.btnSearch()
          })
      }
    },
    //  체크
    verification(saveData) {
      if (saveData && saveData[0]) {
        // let unCheckList = [] // 에러 메시지에 들어갈 Row가 변경되었는데 선택되지 않은 key 리스트
        // let unCheckMsg = ''
        // let uniqueList = Array.from(new Set(this.asgnTreeGrid.changeRowKey)) // 중복 제거
        // // 순번 바뀐 ROW 중 체크안된 항목 검색
        // uniqueList.forEach((list, index) => {
        //   if (!saveData.some(el => el.id === list)) {
        //     this.asgnTreeGridData.forEach(item => {
        //       if (item.id === list) unCheckList.push(item.asgnNm)
        //     })
        //   }
        // })
        // unCheckList.forEach((item, index) => {
        //   unCheckMsg += item
        //   if (unCheckList.length - 1 !== index) unCheckMsg += ', '
        // })
        // if (unCheckList.length > 0) {
        //   this.$vToastify.warning({ body: this.$t('msg.must_check') + ' (' + unCheckMsg + ')' }) // 에러 메시지 출력
        //   return false // 실패
        // } else {
        for (let i = 0; i < saveData.length; i++) {
          if (saveData[i].__created__ && !this.duplicateCheck.some(el => el === saveData[i].id)) {
            // 조직코드 중복확인 체크
            this.$vToastify.warning({ body: this.$t('label.asgn_cd') + ' ' + this.$t('msg.no_duplicate_check') }) // 에러 메시지 출력
            return false // 실패
          }
        }
        let list = [] // 에러 메시지에 들어갈 컬럼 리스트
        let msg = '' // 에러 메시지
        for (let i = 0; i < saveData.length; i++) {
          if (saveData[i].asgnType === '') list.push(this.$t('label.asgn_type')) // 빈값 체크
          if (saveData[i].asgnCd === '') list.push(this.$t('label.asgn_cd')) // 빈값 체크
          if (saveData[i].asgnNm === '') list.push(this.$t('label.asgn_nm')) // 빈값 체크
          if (saveData[i].sort === '') list.push(this.$t('label.sort')) // 빈값 체크
          if (list.length > 0) {
            list.forEach((item, index) => {
              msg += item
              if (list.length - 1 !== index) msg += ', '
            })
            this.$vToastify.warning({ body: msg + this.$t('msg.required_item') }) // 에러 메시지 출력
            return false // 실패
          } else {
            return true // 성공
          }
        }
        // }
      } else {
        notify(this.$t('msg.no_change'), 'warning', 1000)
      }
    },
    // 삭제
    btnDelete() {
      let selectedRows = this.treeAsgn.getSelectedRowsData() // 체크된 Row 체크
      let deleteData = selectedRows
      this.asgnTreeGridData.forEach(row => {
        selectedRows.forEach(selectRow => {
          if (row.prntsCd === selectRow.asgnCd) deleteData.push(row)
        })
      }) // 선택항목 자식 row도 포함
      if (deleteData.length > 0) {
        this.$vToastify // 삭제확인 메세지
          .prompt({
            body: this.$t('msg.delete_qustion'),
            answers: { Yes: true, No: false },
            mode: 'prompt'
          })
          .then(value => {
            if (value) {
              // api 호출
              deleteAsgnData(deleteData)
                .then(res => {
                  notify(this.$t('msg.delete_success'), 'success', 1000)
                })
                .catch(error => {
                  console.log(error)
                })
                .finally(() => {
                  this.btnSearch()
                })
            }
          })
      } else {
        notify(this.$t('msg.delete_no_checked'), 'warning', 1000)
      }
    },
    // row sort 변경
    checkRowSort(row) {
      if (this.beforeClickRow && row) {
        if (this.beforeClickRow.key && row.key) {
          if (this.beforeClickRow.key === row.key || row.data.sort === null) {
            if (row.data.sort !== null) {
              let beforeIndex = this.beforeClickRow.node.parent.children // row 변경전 위치
              beforeIndex.splice(
                beforeIndex.findIndex(el => el.key === row.key),
                1
              ) // row 변경전 위치의 해당 row 제거
              beforeIndex.forEach((item, index) => {
                this.asgnTreeGridData[this.asgnTreeGridData.findIndex(el => el.id === item.key)].sort = index + 1
              }) // row 변경전 위치의 sort 변경
            }
            this.nowSortChange(row.node.parent.children) // 현재 sort 변경
          } else {
            let itemPrntsCd = this.beforeClickRow.node.parent.key // 부모코드
            if (this.asgnTreeGridData[this.asgnTreeGridData.findIndex(el => el.id === this.beforeClickRow.key)].prntsCd !== itemPrntsCd) {
              let beforeIndex = this.beforeClickRow.node.parent.children // row 변경전 위치
              beforeIndex.splice(
                beforeIndex.findIndex(el => el.key === row.key),
                1
              ) // row 변경전 위치의 해당 row 제거
              beforeIndex.forEach((item, index) => {
                this.asgnTreeGridData[this.asgnTreeGridData.findIndex(el => el.id === item.key)].sort = index + 1
              }) // row 변경전 위치의 sort 변경
            }
            this.nowSortChange(row.node.parent.children) // 현재 sort 변경
          }
        } else {
          this.nowSortChange(row.node.parent.children) // 현재 sort 변경
        }
      } else {
        if (row) {
          // 이전 위치에 대한 데이터가 없을 때
          this.nowSortChange(row.node.parent.children) // 현재 sort 변경
        } else if (this.beforeClickRow) {
          // 현재 위치에 대한 데이터가 없을 때
          let beforeIndex = this.beforeClickRow.node.parent.children // row 변경전 위치
          let itemPrntsCd = '' // 부모코드
          let sortCount = 2
          beforeIndex.splice(
            beforeIndex.findIndex(el => el.key === this.beforeClickRow.key),
            1
          ) // row 변경전 위치의 해당 row 제거
          beforeIndex.forEach((item, index) => {
            this.asgnTreeGridData[this.asgnTreeGridData.findIndex(el => el.id === item.key)].sort = index + 1
          }) // row 변경전 위치의 sort 변경
          this.asgnTreeGridData.forEach(item => {
            if (item.id === this.beforeClickRow.key) itemPrntsCd = item.prntsCd
          }) // 이동된 row 부모코드 찾기
          this.asgnTreeGridData.forEach(item => {
            if (item.prntsCd === itemPrntsCd) {
              if (item.id === this.beforeClickRow.key) {
                item.sort = 1
              } else {
                item.sort = sortCount
                sortCount++
              }
            }
          })
        }
      }
    },
    // 현재 level의 sort 체인지
    nowSortChange(nowRow) {
      // row 변경후 위치
      nowRow.forEach((item, index) => {
        this.asgnTreeGridData[this.asgnTreeGridData.findIndex(el => el.id === item.key)].sort = index + 1
      })
    },
    // 그리드 ROW 클릭 시
    focusedRowChanged(e) {
      this.checkRowSort(e.row) // row sort 변경
      // 클릭한 메뉴 정보 조회
      if (e.row) {
        this.asgnInfoData.editorList.forEach(data => {
          data.value = '' // 초기화
          if (data.id === 'sort') data.value = 1 // 초기화
          data.value = e.row.data[data.id] // 데이터 매칭
        })
        this.asgnTreeGridData.forEach((item, index) => {
          if (item.id === e.row.key) this.asgnTreeGrid.clickRow = index
        })
        this.asgnTreeGrid.clickKey = e.row.key
        let button = this.asgnInfoData.editorList[2].option.options
        if (e.row.data.__created__ && !this.duplicateCheck.some(el => el === e.row.data.id)) {
          this.asgnInfoData.editorList[1].option.disabled = false // 중복확인전 코드 영역
          // 중복확인 전 버튼 변경
          button.type = 'normal'
          button.content = 'duplicate_check'
          button.disabled = false
        } else {
          this.asgnInfoData.editorList[1].option.disabled = true // 중복확인된 코드 영역
          // 중복확인된 버튼 변경
          button.type = 'default'
          button.content = 'duplicate_check_ok'
          button.disabled = true
        }
        this.beforeClickRow = e.row //이전 클릭 row에 저장
      }
      this.isDuplicate(this.duplicateCheck)
    },
    // 조회조건 select box 데이터 변경
    changInput(...arg) {
      this.paramDomainCode = arg[0][1].value
    },
    // editor box 데이터 변경
    onValueChanged(...arg) {
      // 그리드 데이터 변경
      if (this.asgnTreeGrid.clickKey !== null) {
        this.asgnTreeGridData[this.asgnTreeGrid.clickRow][arg[0][0]] = arg[0][1].value
        // 에디터 박스 데이터 변경
        this.asgnInfoData.editorList.forEach(list => {
          if (list.id === arg[0][0]) {
            list.value = arg[0][1].value
          }
        })
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
    },
    // 중복 확인 버튼
    onCheckClick(...arg) {
      let addList = [] // 추가된 조직코드 리스트
      if (this.asgnTreeGridData[this.asgnTreeGrid.clickRow] && this.asgnTreeGridData[this.asgnTreeGrid.clickRow].asgnCd) {
        let checkCode = this.asgnTreeGridData[this.asgnTreeGrid.clickRow]
        // 중복코드 검사 api 호출
        checkAsgnCdData({ asgnCd: checkCode.asgnCd, domainCd: this.domainCode }).then(res => {
          // 변경된 조직코드 리스트 생성
          this.asgnTreeGridData.forEach(data => {
            if (data.__created__ || data.__modified__) addList.push(data.asgnCd)
          })
          let filterList = addList.filter(el => el !== '')
          if (!this.isDuplicate(filterList)) {
            if (res.body > 0 || !checkCode.__created__) {
              notify(this.$t('msg.duplicate_check'), 'warning', 1000) // DB에 중복된 코드 존재
            } else {
              notify(this.$t('msg.duplicate_check_success'), 'success', 1000) // 성공
              this.duplicateCheck.push(this.asgnTreeGrid.clickKey) // 중복확인완료 리스트에 추가
              this.asgnInfoData.editorList[1].option.disabled = true // 중복확인된 코드 영역
              // 중복확인된 버튼 변경
              let button = this.asgnInfoData.editorList[2].option.options
              button.type = 'default'
              button.content = 'duplicate_check_ok'
              button.disabled = true
            }
          } else {
            notify(this.$t('msg.duplicate_check'), 'warning', 1000) // 수정된 항목 중 중복된 코드 존재
          }
        })
      } else {
        notify(this.$t('msg.no_code'), 'warning', 1000) //코드 내용이 없음
      }
    },
    // 배열 중복 여부 체크
    isDuplicate(arr) {
      const isDup = arr.some(function(x) {
        return arr.indexOf(x) !== arr.lastIndexOf(x)
      })
      return isDup // true면 중복 존재
    }
  }
}
</script>

<style lang="less" scoped>
/* css 혹은 less로 스타일 정의하는 부분 */
</style>
