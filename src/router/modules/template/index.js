import Layout from '@/layout'

const templateRouter = {
  path: '/template',
  component: Layout,
  meta: { menu_id: 'MENU004', title: '템플릿' },
  children: [
    {
      path: 'devExtremeTemplate',
      name: 'devExtremeTemplate',
      component: () => import('@/views/index.vue'),
      meta: { menu_id: 'TEMPLATE001', title: 'devExtreme템플릿' },
      children: [
        {
          path: 'gridTemplate',
          name: 'gridTemplate',
          component: () => import('@/views/templates/devExtreme/GridIndex.vue'),
          meta: { menu_id: 'TEMPLATE_DEVEXTREME_001', title: '그리드 템플릿' }
        },
        {
          path: 'buttonTemplate',
          name: 'buttonTemplate',
          component: () => import('@/views/templates/devExtreme/Button.vue'),
          meta: { menu_id: 'TEMPLATE_DEVEXTREME_002', title: '버튼 템플릿' }
        },
        {
          path: 'chartTemplate',
          name: 'chartTemplate',
          component: () => import('@/views/templates/devExtreme/Index.vue'),
          meta: { menu_id: 'TEMPLATE_DEVEXTREME_003', title: '차트 템플릿' }
        },
        {
          path: 'mapTemplate',
          name: 'mapTemplate',
          component: () => import('@/views/templates/devExtreme/Map.vue'),
          meta: { menu_id: 'MENU23', title: 'Map 템플릿' }
        }
      ]
    },
    {
      path: 'echartTemplate',
      name: 'echartTemplate',
      component: () => import('@/views/templates/EChart/Index.vue'),
      meta: { menu_id: 'TEMPLATE002', title: 'EChart 템플릿' }
    },
    {
      path: 'elementUITemplate',
      name: 'elementUITemplate',
      component: () => import('@/views/templates/elementUI/Index.vue'),
      meta: { menu_id: 'TEMPLATE003', title: 'ElementUI 템플릿' }
    },
    {
      path: 'gisMapTemplate',
      name: 'gisMapTemplate',
      component: () => import('@/views/index.vue'),
      meta: { menu_id: 'TEMPLATE004', title: 'GISMap 템플릿' },
      children: [
        {
          path: 'openLayerTemplate',
          name: 'openLayerTemplate',
          component: () => import('@/views/templates/gisMap/openlayer.vue'),
          meta: { menu_id: 'TEMPLATE018', title: 'OpenLayers 템플릿' }
        },
        {
          path: 'windyTemplate',
          name: 'windyTemplate',
          component: () => import('@/views/templates/gisMap/windy.vue'),
          meta: { menu_id: 'TEMPLATE019', title: 'windy 템플릿' }
        }
      ]
    },
    {
      path: 'embedTemplate',
      name: 'embedTemplate',
      component: () => import('@/views/templates/Embed/Index.vue'),
      meta: { menu_id: 'TEMPLATE005', title: 'Embed 템플릿' }
    },
    {
      path: 'itemListTemplate',
      name: 'itemListTemplate',
      component: () => import('@/views/templates/itemList/Index.vue'),
      meta: { menu_id: 'TEMPLATE006', title: 'itemList 템플릿' }
    },
    {
      path: 'itemList2Template',
      name: 'itemList2Template',
      component: () => import('@/views/templates/itemList2/Index.vue'),
      meta: { menu_id: 'TEMPLATE007', title: '수직 이미지 스크롤바 템플릿' }
    },
    {
      path: 'popupTableTemplate',
      name: 'popupTableTemplate',
      component: () => import('@/views/templates/popup/popupTable.vue'),
      meta: { menu_id: 'TEMPLATE008', title: '팝업 테이블 템플릿' }
    },
    {
      path: 'weatherTemplate',
      name: 'weatherTemplate',
      component: () => import('@/views/templates/weather/weatherForecast.vue'),
      meta: { menu_id: 'TEMPLATE009', title: '기상 템플릿' }
    },
    {
      path: 'pdfTemplate',
      name: 'pdfTemplate',
      component: () => import('@/views/index.vue'),
      meta: { menu_id: 'TEMPLATE010', title: 'pdf템플릿' },
      children: [
        {
          path: 'pdfViewerIFrameTemplate',
          name: 'pdfViewerIFrameTemplate',
          component: () => import('@/views/templates/pdf/pdfViewerIFrame.vue'),
          meta: { menu_id: 'TEMPLATE011', title: 'pdf 뷰어(IFrame) 템플릿' }
        },
        {
          path: 'pdfViewerTemplate',
          name: 'pdfViewerTemplate',
          component: () => import('@/views/templates/pdf/pdfViewer.vue'),
          meta: { menu_id: 'TEMPLATE012', title: 'pdf 뷰어 템플릿' }
        },
        {
          path: 'pdfSaveTemplate',
          name: 'pdfSaveTemplate',
          component: () => import('@/views/templates/pdf/pdfSave.vue'),
          meta: { menu_id: 'TEMPLATE013', title: 'pdf 저장 템플릿' }
        }
      ]
    },
    {
      path: '3DTemplate',
      name: '3DTemplate',
      component: () => import('@/views/templates/3D/unityViewer.vue'),
      meta: { menu_id: 'TEMPLATE014', title: '3D 템플릿' }
    },
    {
      path: 'itemPlaceTemplate',
      name: 'itemPlaceTemplate',
      component: () => import('@/views/templates/image/Index.vue'),
      meta: { menu_id: 'MENU24', title: '물품배치 템플릿' }
    },
    {
      path: 'editorTemplate',
      name: 'editorTemplate',
      component: () => import('@/views/index.vue'),
      meta: { menu_id: 'TEMPLATE015', title: 'editor 템플릿' },
      children: [
        {
          path: 'htmlEditorTemplate',
          name: 'htmlEditorTemplate',
          component: () => import('@/views/templates/editor/HtmlEditor.vue'),
          meta: { menu_id: 'TEMPLATE016', title: 'html Editor 템플릿' }
        },
        {
          path: 'jsonEditorTemplate',
          name: 'jsonEditorTemplate',
          component: () => import('@/views/templates/editor/JsonEditor.vue'),
          meta: { menu_id: 'TEMPLATE017', title: 'json Editor 템플릿' }
        }
      ]
    },
    {
      path: 'apiTestTemplate',
      name: 'apiTestTemplate',
      component: () => import('@/views/templates/api/ApiTestTemplate.vue'),
      meta: { menu_id: 'TEMPLATE020', title: 'apiTest 템플릿' }
    },
    {
      path: 'reportTemplate',
      name: 'reportTemplate',
      component: () => import('@/views/templates/report/Index.vue'),
      meta: { menu_id: 'TEMPLATE021', title: 'report 템플릿' }
    }
  ]
}
export default templateRouter
