const AddCragInGuideBookView = () => import(/* webpackChunkName: "GuideBookPaperCragRouter-AddCragInGuideBookView" */ '@/views/guideBookPaperCrags/actions/AddCragInGuideBookView')

export default [
  {
    path: '/guide-book-papers/:guideBookPaperId/:guideBookPaperSlug/add-crag',
    component: AddCragInGuideBookView,
    meta: {
      requiresAuth: true
    }
  }
]
