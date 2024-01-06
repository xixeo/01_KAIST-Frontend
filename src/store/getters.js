
/**
 * getter를 사용하면 module화로 구성된 store에 접근이 용이할 수 있도록,
 * Alias 적용 가능함
 * 각 component에서 사용 예
 * ※ 선언
 * ------------------------------------------
 * import { mapGetters } from 'vuex'
 * ...mapGetters([
      'roles'
    ])
 * ------------------------------------------
 * mapGetters로 적용한 타겟들은 this로 접근이 가능
 */

export default {
    getUid: state=> state.uid,
    getIsAuth: state=>state.isAuth,
    getErrorState: state => state.errorState,

    token: state => state.user.token,
    // roles: state => state.user.roles,
    // visitedViews: state => state.tagsView.visitedViews,

    cachedViews: state => state.tagsView.cachedViews,
    visitedViews: state => state.tagsView.visitedViews,
    device: state => state.app.device,


    sidebar: state => state.app.sidebar
}