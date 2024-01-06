<template>
  <div class="text-ar flex float-right">
    <button class="btn light-blue-btn btn-sm flex" v-for="btn in buttonList" :key="`btn_${btn.id}`" @click="clickButton(btn)">
      <div class="pt-1 pr-1">
        <svg-icon :icon-class="`${btn.icon}`" />
      </div>
      {{ $t(btn.text) }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'buttonList',
  props: {
    useBtnList: {
      type: Array,
      default: () => ['btnSearch']
    }
  },

  data() {
    return {
      buttonList: [
        { id: 'btnSearch', text: 'btnSearch', icon: 'search' },
        { id: 'btnAdd', text: 'btnAdd', icon: 'plus' },
        { id: 'btnSave', text: 'btnSave', icon: 'save' },
        { id: 'btnDelete', text: 'btnDelete', icon: 'trash' },
        { id: 'btnChoice', text: 'btnChoice', icon: 'choice' },
        { id: 'btnPrint', text: 'btnPrint', icon: 'print' },
        { id: 'btnClose', text: 'btnClose', icon: 'close' },
        { id: 'btnConfirm', text: 'btnConfirm', icon: 'confirm' },
        { id: 'btnCancel', text: 'btnCancel', icon: 'cancel' },
        { id: 'btnLable', text: 'btnLable', icon: 'lable' },
        { id: 'btnCopy', text: 'btnCopy', icon: 'copy' }
      ]
    }
  },
  created() {
    // let menuCd = ''
    // let savAh = '',
    //   schAh = '',
    //   delAh = '',
    //   exlAh = '',
    //   fn1Ah = '',
    //   fn2Ah = '',
    //   fn3Ah //fn1Ah : Print
    // let menu_id = this.$route.meta.menu_id

    // let authMenus = JSON.parse(window.sessionStorage.getItem('myAuthMenus'))
    // let findMenu = authMenus.find(element => element.menu_id == menu_id)

    // if (findMenu != null) {
    //   menuCd = findMenu.menuCd
    // }

    //menu id로 권한 찾기
    // let find = authGrps.find(element => element.menuCd == menuCd)
    // if (find != null) {
    //   schAh = find.schAh //조회
    //   savAh = find.savAh //저장
    //   delAh = find.delAh //삭제
    //   fn1Ah = find.fn1Ah //출력
    // }
    //버튼권한별 View
    // let authButtonList = this.buttonList.filter(btn => {
    //   if (this.$store.state.user.userId == 'system' || this.$store.state.user.userId == 'dev') {
    //     //system, dev 권한 제외
    //     return this.useBtnList.includes(btn.id)
    //   } else {
    //     if (
    //       (btn.id == 'btnSearch' && schAh == 'Y') ||
    //       (btn.id == 'btnAdd' && savAh == 'Y') ||
    //       (btn.id == 'btnSave' && savAh == 'Y') ||
    //       (btn.id == 'btnDelete' && delAh == 'Y') ||
    //       (btn.id == 'btnPrint' && savAh == 'Y')
    //     ) {
    //       return this.useBtnList.includes(btn.id)
    //     }
    //   }
    // })

    // 버튼 권한을 적용하지않음
    let authButtonList = []
    this.useBtnList.forEach(useList => {
      this.buttonList.forEach(item => {
        if (useList === item.id) authButtonList.push(item)
      })
    })
    this.buttonList = authButtonList
  },

  methods: {
    clickButton(targetButton) {
      this.$emit('btnClick', targetButton)
    }
  }
}
</script>
