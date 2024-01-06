import { getUserMenu, getAuthMenu } from '@/api/common/menu'
import { getToken, getUserId } from '@/utils/token'
import store from '@/store'
import { isUseAPI } from '@/utils/check'
import localStore from '@/utils/localStore'
import { getMenuData } from '@/api/system/menuManage' // 메뉴 api 호출

// 아이콘 리스트
const icons = [
  { icon: 'folder', level: 0 },
  { icon: 'menulvl1', level: 1 },
  { icon: 'menulvl2', level: 2 },
  { icon: 'menulvl3', level: 3 }
]

//tree 구성
var SidemenuUtils = {
  setTreeMenu(menuData, authMenuData) {
    var tree = []

    console.log('setTreeMenu')
    this.resolveTreeMenu(menuData, tree, authMenuData)
    //console.log( JSON.stringify(tree));
    //console.log('#last menu : ' + tree[0].menuNm)
    return tree
  },
  setTreeMenuTypeC(menuData) {
    var tree = []
    return menuData
  },
  // 부모 메뉴 정보 만들기

  resolveTreeMenu(menuData, targetMenuItem, authMenuData) {
    console.log('####resolveTreeMenu : ', menuData)
    var childtree = []
    let localPath = ''
    menuData.forEach(menuItem => {
      let findIndex = authMenuData.findIndex(element => element.menuCd == menuItem.id)
      if (findIndex > -1) {
        console.log('resolveTreeMenu', menuItem.id, menuItem.menuNm)
        localPath = menuItem.menuPath
        targetMenuItem.push({
          path: menuItem.menuPath,
          id: menuItem.id.toString(),
          meta: {
            menu_id: menuItem.id.toString(),
            title: menuItem.menuNm,
            icon: this.findIcon(menuItem),
            path: localPath
          },
          childlist: menuItem.children,
          children: []
        })
      }
    })
    this.resolveChildTreeMenu(targetMenuItem, authMenuData, localPath)
  },
  // 자식 메뉴 정보 만들기
  resolveChildTreeMenu(targetMenuItem, authMenuData, localPath) {
    console.log('****resolveChildTreeMenu : ', targetMenuItem)
    targetMenuItem.forEach(element => {
      element.childlist.forEach(child => {
        console.log('****resolveChildTreeMenu : ', element.menuCd + '/' + child.id)
        let findIndex = authMenuData.findIndex(element => element.menuCd == child.id)
        if (findIndex > -1) {
          element.children.push({
            path: child.menuPath,
            id: child.id.toString(),
            prntsCd: child.prntsCd.toString(),
            meta: {
              menu_id: child.id.toString(),
              title: child.menuNm,
              icon: this.findIcon(child),
              path: element.meta.path + '/' + child.menuPath
            },
            childlist: child.children,
            children: []
          })
        }
      })
      if (element.children.length > 0) {
        this.resolveChildTreeMenu(element.children, authMenuData)
      }
    })
  },
  // 기본 아이콘 사용 또는 사용자 정의 아이콘 사용
  findIcon(item) {
    //console.log('##icon 1 '+ icons.find(icon => icon.level === item.level).icon)
    if (!item.icon && !item.icon === '') {
      return icons.find(icon => icon.level === item.level).icon
    }
    if (item.icon === '') {
      return icons.find(icon => icon.level === item.level).icon
    }
    return item.icon
  }
}

export default {
  state: {
    menus: [],
    treeMenus: [],
    flag: {
      asideVisiable: true,
      asideUse: true,
      tagViewUse: true,
      headerUse: true,
      footerUse: true,
      myMenuVisible: false,
      fullscreen: false,
      isLayoutHideMode: false
    }
  },

  //data를 변경할때
  mutations: {
    // 전체 화면에서 레이아웃을 다 감추는 모드 사용 여부
    SET_LAYOUT_HIDE_MODE(state, flag) {
      state.flag.isLayoutHideMode = flag
    },
    SET_HEADER_USE: function(state, flag) {
      state.flag.headerUse = flag
    },
    SET_TAG_VIEW_USE: function(state, flag) {
      state.flag.tagViewUse = flag
    },
    SET_ASIDE_MENU_USE: (state, flag) => {
      state.flag.asideUse = flag
    },
    SET_FOOTER_USE: function(state, flag) {
      state.flag.footerUse = flag
    },
    SET_FULLSCREEN: function(state, flag) {
      state.flag.fullscreen = flag
    },
    SET_MENU: (state, menus) => {
      state.menus = menus
    },
    SET_TREE_MENU: (state, treeMenus) => {
      state.treeMenus = treeMenus
    }
  },

  //methods
  actions: {
    GetMenus({ commit }, userInfo) {
      console.log('######userInfo --> ' + JSON.stringify(userInfo))
      return new Promise((resolve, reject) => {
        // 초기화
        commit('SET_MENU', [])
        commit('SET_TREE_MENU', [])
        let menuList = []
        let menuTreeList = []
        let isTest = false

        if (!isUseAPI() || isTest) {
          console.log('**mock!!' + JSON.stringify(userInfo))
          getAuthMenu({ domainCd: userInfo.domainCd, userId: userInfo.userId })
            .then(responseAuth => {
              window.sessionStorage.setItem('myAuthMenus', JSON.stringify(responseAuth))
              getUserMenu(userInfo.userId)
                .then(response => {
                  // console.log('*********menuTreeList********** ' + JSON.stringify(response))
                  console.log('*********menuList********** ' + JSON.stringify(responseAuth))
                  commit('SET_MENU', response)
                  commit('SET_TREE_MENU', SidemenuUtils.setTreeMenu(response, responseAuth))
                })
                .catch(error => {
                  reject(error)
                }),
                resolve()
            })
            .catch(error => {
              reject(error)
            })
        } else {
          console.log('**api!!')
          //도메인에 해당하는 전체 메뉴 조회
          getMenuData({ domainCd: userInfo.domainCd })
            .then(response => {
              // console.log('######menuResult --> ' + response.list.length)
              //수정사항: 초기셋팅으로 메뉴정보가 하나도 없을 경우
              if (response.list.length > 0) {
                // 사용자권한메뉴조회
                //console.log(JSON.stringify(response.list));

                getAuthMenu({ domainCd: userInfo.domainCd, userId: userInfo.userId }).then(responseAuth => {
                  // console.log('######menuResult(auth)--> ' + responseAuth.list.length)

                  responseAuth.list.forEach((item, index) => {
                    menuList.push({
                      menuCd: item.menuCd,
                      menuNm: item.menuNm,
                      sort: item.sort * 1,
                      useYn: item.useYn
                      // basicAclc: item.basicAclc,
                      // basicAclr: item.basicAclr,
                      // basicAclu: item.basicAclu,
                      // basicAcld: item.basicAcld,
                    })
                    if (item.prntsCd) menuList[index].prntsCd = item.prntsCd
                  })

                  console.log('########## authMenu : ' + JSON.stringify(menuList))

                  // menuTreeList 데이터셋 생성
                  let responseLength = response.list.length
                  let mainLenth = 0
                  // 부모 메뉴 데이터 셋 생성
                  response.list.forEach((item, index) => {
                    //console.log('######menuResult --> ' + index + ' -> ' + item.prntsCd)
                    if (item.prntsCd == '0') {
                      menuTreeList.push({
                        id: item.menuCd,
                        level: item.level * 1,
                        menuCd: item.menuCd,
                        menuNm: item.menuNm,
                        open: true,
                        icon: item.icon,
                        sort: item.sort * 1,
                        useYn: item.useYn,
                        menuPath: item.menuUrl,
                        children: []
                      })
                      responseLength--
                      mainLenth++
                    }
                  })
                  //console.log('###### menuTreeList ####### --> ' + mainLenth + '/' + responseLength + ':' + JSON.stringify(menuTreeList))
                  //console.log('responseLength : ' + responseLength)

                  // 자식 메뉴 데이터 셋 생성
                  while (responseLength > 0) {
                    response.list.forEach((item, index) => {
                      //console.log('###### child item.prntsCd --> ' + item.menuCd + '/' + index + '/' + response.list.length + ' : ' + item.prntsCd + ' ' + item.menuNm + ' level : ' + item.level )

                      if (item.prntsCd != '0' && item.level == '1') {
                        let inx = menuTreeList.findIndex(element => element.id == item.prntsCd)
                        console.log(item)

                        console.log('###### inx1 --> ' + inx)

                        if (inx > -1) {
                          //2021-09-23 by lyj
                          console.log('245 line ' + item.menuNm + '/' + item.prntsCd)
                          menuTreeList[inx].children.push({
                            id: item.menuCd,
                            level: item.level * 1,
                            menuCd: item.menuCd,
                            menuNm: item.menuNm,
                            open: true,
                            icon: item.icon,
                            prntsCd: item.prntsCd,
                            sort: item.sort * 1,
                            useYn: item.useYn,
                            menuPath: item.menuUrl,
                            children: []
                          })
                        }
                        responseLength--
                      } else if (item.prntsCd != '0' && item.level == '2') {
                        for (let i = 0; i < mainLenth; i++) {
                          //console.log('###### menuTreeList --> '+ i + '->' + JSON.stringify(menuTreeList[i].children))
                          let childInx = menuTreeList[i].children.findIndex(element => element.id == item.prntsCd)
                          if (childInx > -1) {
                            menuTreeList[i].children[childInx].children.push({
                              id: item.menuCd,
                              level: item.level * 1,
                              menuCd: item.menuCd,
                              menuNm: item.menuNm,
                              open: true,
                              icon: item.icon,
                              prntsCd: item.prntsCd,
                              sort: item.sort * 1,
                              useYn: item.useYn,
                              menuPath: item.menuUrl,
                              children: []
                            })
                            responseLength--
                          }
                        }
                      }

                      console.log(responseLength)
                    })
                  }
                  console.log('*********menuTreeList LAST********** ' + JSON.stringify(menuTreeList))
                  console.log('*********menuList LAST********** ' + JSON.stringify(menuList))
                  window.sessionStorage.setItem('myAuthMenus', JSON.stringify(menuList))
                  commit('SET_MENU', menuTreeList)
                  commit('SET_TREE_MENU', SidemenuUtils.setTreeMenu(menuTreeList, menuList))
                })
              }
            })
            .catch(error => {
              reject(error)
            }),
            resolve()
        }
      })
    },
    GetMenusTypeC({ commit }, userInfo) {
      console.log('######userInfo --> ' + JSON.stringify(userInfo))
      return new Promise((resolve, reject) => {
        // 초기화
        commit('SET_MENU', [])
        commit('SET_TREE_MENU', [])
        let menuList = []
        let menuTreeList = []
        let isTest = false

        if (!isUseAPI() || isTest) {
          console.log('**mock!!' + JSON.stringify(userInfo))
          getAuthMenu({ domainCd: userInfo.domainCd, userId: userInfo.userId })
            .then(responseAuth => {
              window.sessionStorage.setItem('myAuthMenus', JSON.stringify(responseAuth))
              getUserMenu(userInfo.userId)
                .then(response => {
                  //console.log('*********menuTreeList********** ' + JSON.stringify(response))
                  //console.log('*********menuList********** ' + JSON.stringify(responseAuth))
                  commit('SET_MENU', response)
                  commit('SET_TREE_MENU', SidemenuUtils.setTreeMenuTypeC(response, responseAuth))
                })
                .catch(error => {
                  reject(error)
                }),
                resolve()
            })
            .catch(error => {
              reject(error)
            })
        } else {
          console.log('**api!!')
          //도메인에 해당하는 전체 메뉴 조회
          getMenuData({ domainCd: userInfo.domainCd })
            .then(response => {
              //console.log('######menuResult --> ' + response.list.length)
              //수정사항: 초기셋팅으로 메뉴정보가 하나도 없을 경우
              if (response.list.length > 0) {
                // 사용자권한메뉴조회
                getAuthMenu({ domainCd: userInfo.domainCd, userId: userInfo.userId }).then(responseAuth => {
                  responseAuth.list.forEach((item, index) => {
                    menuList.push({
                      menuCd: item.menuCd,
                      menuNm: item.menuNm,
                      sort: item.sort * 1,
                      useYn: item.useYn
                      // basicAclc: item.basicAclc,
                      // basicAclr: item.basicAclr,
                      // basicAclu: item.basicAclu,
                      // basicAcld: item.basicAcld,
                    })
                    if (item.prntsCd) menuList[index].prntsCd = item.prntsCd
                  })

                  //console.log('########## authMenu : ' + JSON.stringify(menuList))

                  // menuTreeList 데이터셋 생성
                  let responseLength = response.list.length
                  let mainLenth = 0
                  // 부모 메뉴 데이터 셋 생성
                  response.list.forEach((item, index) => {
                    //console.log('######menuResult --> ' + index + ' -> ' + item.prntsCd)
                    if (item.prntsCd == '0') {
                      menuTreeList.push({
                        id: item.menuCd,
                        level: item.level * 1,
                        menuCd: item.menuCd,
                        menuNm: item.menuNm,
                        open: true,
                        icon: item.icon,
                        sort: item.sort * 1,
                        useYn: item.useYn,
                        menuPath: item.menuUrl,
                        children: []
                      })
                      responseLength--
                      mainLenth++
                    }
                  })
                  //console.log('###### menuTreeList ####### --> ' + mainLenth + '/' +responseLength + ':' + JSON.stringify(menuTreeList))
                  // 자식 메뉴 데이터 셋 생성
                  while (responseLength > 0) {
                    response.list.forEach((item, index) => {
                      //console.log('###### item.prntsCd --> '+ index + '/'+ response.list.length+ ' : ' + item.prntsCd)
                      if (item.prntsCd != '0' && item.level == '1') {
                        let inx = menuTreeList.findIndex(element => element.id == item.prntsCd)
                        //console.log('###### inx1 --> '+ inx)
                        menuTreeList[inx].children.push({
                          id: item.menuCd,
                          level: item.level * 1,
                          menuCd: item.menuCd,
                          menuNm: item.menuNm,
                          open: true,
                          icon: item.icon,
                          prntsCd: item.prntsCd,
                          sort: item.sort * 1,
                          useYn: item.useYn,
                          menuPath: item.menuUrl,
                          children: []
                        })
                        responseLength--
                      } else if (item.prntsCd != '0' && item.level == '2') {
                        for (let i = 0; i < mainLenth; i++) {
                          //console.log('###### menuTreeList --> '+ i + '->' + JSON.stringify(menuTreeList[i].children))
                          let childInx = menuTreeList[i].children.findIndex(element => element.id == item.prntsCd)
                          if (childInx > -1) {
                            menuTreeList[i].children[childInx].children.push({
                              id: item.menuCd,
                              level: item.level * 1,
                              menuCd: item.menuCd,
                              menuNm: item.menuNm,
                              open: true,
                              icon: item.icon,
                              prntsCd: item.prntsCd,
                              sort: item.sort * 1,
                              useYn: item.useYn,
                              menuPath: item.menuUrl,
                              children: []
                            })
                            responseLength--
                          }
                        }
                      }
                    })
                  }
                  //console.log('*********menuTreeList********** ' + JSON.stringify(menuTreeList))
                  //console.log('*********menuList********** ' + JSON.stringify(menuList))
                  window.sessionStorage.setItem('myAuthMenus', JSON.stringify(menuList))
                  commit('SET_MENU', menuTreeList)
                  commit('SET_TREE_MENU', SidemenuUtils.setTreeMenuTypeC(menuTreeList, menuList))
                })
              }
            })
            .catch(error => {
              reject(error)
            }),
            resolve()
        }
      })
    },
    SetHeaderUse({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_HEADER_USE', flag)
    },
    SetTagViewUse({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_TAG_VIEW_USE', flag)
    },
    SetASideMenuUse({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_ASIDE_MENU_USE', flag)
    },
    SetFooterUse({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_FOOTER_USE', flag)
    },
    SetLayoutHideMode({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_LAYOUT_HIDE_MODE', flag)
    },
    SetFullScreen({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_FULLSCREEN', flag)
      localStore.set('fullscreen', this.isFullscreen) // 추후 사용이 필요 할 수도 있어서 넣어 둠
      if (store.state.menu.flag.isLayoutHideMode === true) {
        commit('SET_HEADER_USE', !flag)
        commit('SET_TAG_VIEW_USE', !flag)
        commit('SET_ASIDE_MENU_USE', !flag)
        commit('SET_FOOTER_USE', !flag)
      }
    }
  },

  getters: {
    //computed
  }
}
