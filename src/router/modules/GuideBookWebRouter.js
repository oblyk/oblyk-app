const GuideBookWebEditView = () => import(/* webpackChunkName: "GuideBookWebRouter-GuideBookWebEditView" */ '@/views/guideBookWebs/actions/GuideBookWebEditView')

export default [
  {
    path: '/guide-book-webs/:guideBookWebId/edit',
    component: GuideBookWebEditView
  }
]
