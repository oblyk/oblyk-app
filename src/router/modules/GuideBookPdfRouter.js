const GuideBookPdfEditView = () => import(/* webpackChunkName: "guide-book-pdf-routes" */ '@/views/guideBookPdfs/actions/GuideBookPdfEditView')

export default [
  {
    path: '/guide-book-pdfs/:guideBookPdfId/edit',
    component: GuideBookPdfEditView
  }
]
