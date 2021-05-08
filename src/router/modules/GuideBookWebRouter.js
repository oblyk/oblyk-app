const GuideBookWebEditView = () => import(/* webpackChunkName: "guide-book-web-routes" */ '@/views/guideBookWebs/actions/GuideBookWebEditView')

export default [
  {
    path: '/guide-book-webs/:guideBookWebId/edit',
    component: GuideBookWebEditView,
    meta: {
      title: 'guideBookWeb',
      showTitle: false
    }
  }
]
