let apiPathRoot = '' // hrmslite_

export default {
  name: 'IGMES',

  systemId: 'igFramework',

  apiVersion: '1.0.0.',

  masterDomain: 'admin', // 최고권한 도메인

  // local 개발환경에서 작업 시, restful mockup 서버 url 정보
  // 차후, 개발 서버가 구축되면 그곳으로 변경
  //devUrl: 'http://localhost:8081', //by lyj
  devUrl: '/',

  buildUrl: '/',

  // 웹소켓 연결 주소
  websocketUrl: '',

  stompClient: null,

  framework: {
    // 상세 로그 출력 여부
    showDetailLog: true, //by lyj false- > true
    // local 개발환경에서 작업 시, restful api 서버를 사용 여부
    // false일 경우 mockup으로 framework에서 제공되는 기본 셋을 사용
    useRestfulAPI: true,
    // API 등 Error 발생 시, Global 하게 출력할 에러 팝업 내에서 메시지 형식을 리스트 형식으로 사용 여부
    useErrorList: false,
    // 빌드된 이후에도 mockup을 사용할 경우 true로 셋팅
    // useRestfulAPI 보다 더 상위. useRestfulAPI값이 true여도 이 값이 true 면 무시된다.
    onlyMockup: false, //by 윤주 일단 전체 목업안되게 막음
    // framework에서는 지원하는 locale형식을 작성해야 한다.
    // 이 값을 각 Locale의 ID로 하며, 서버 조회 및 분기를 한다.
    supportLocales: [
      {
        id: 'ko',
        name: '한국어'
      },
      {
        id: 'en',
        name: 'English'
      }
    ],
    // 서버에서 i18n 데이터를 가져와 적용할 것인가 설정하는 부분
    // true일 경우 서버를 조회하는 로직이 수행되고, false일 경우 서버를 조회하지 않고 local의 기본 값을 사용한다.
    getI18nDataFromServer: false,
    // 전역 api path
    api_path: {
      menus: `${apiPathRoot}menus`, // 메뉴관리 api path
      programs: `${apiPathRoot}programs`, // 프로그램 관리 api path
      filePath: `${apiPathRoot}file`, // 파일 api path
      logPath: `${apiPathRoot}log`, // 접속자 관리 api path
      usermenuauths: `${apiPathRoot}usermenuauths` // 사용자별 메뉴권한 api path
    },
    template: {
      color: '',
      // 테마 사용 시, 사용될 기본 값 (차후, localStorage로 저장되어 개인화 됨)
      pc: 'themeB',
      mobile: 'themeB',
      // mobile 테마를 사용할 여부. 사용하지 않으면 PC만 동작한다.
      useMobile: true,
      // 기본 화면으로 사용될 1depth 메뉴 ID
      home: 'MN001',

      // 테마 리스트 정의
      pcThemes: [
        {
          id: 'themeB',
          name: 'pcBtype',
          component: () => import('@/layout/pc/Btype'),
          elementui: 'themeB',
          echart: 'themeB',
          devExtreme: 'themeB',
          layoutHideMode: true
        }
      ]
    },
    // login 하지 않아도 접근이 가능한 URL 항목 리스트
    whiteList: ['/login']
  }
}
