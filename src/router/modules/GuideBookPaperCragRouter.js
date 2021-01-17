import AddCragInGuideBookView from '@/views/guideBookPaperCrags/actions/AddCragInGuideBookView'

export default [
  {
    path: '/guide-book-papers/:guideBookPaperId/:guideBookPaperSlug/add-crag',
    component: AddCragInGuideBookView,
    meta: {
      requiresAuth: true,
      objectName: 'guideBookPaper',
      showAvatar: true
    }
  }
]
