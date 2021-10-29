const GuideBookPdfEditView = () => import(/* webpackChunkName: "GuideBookPdfRouter-GuideBookPdfEditView" */ '@/views/guideBookPdfs/actions/GuideBookPdfEditView')

export default [
  {
    path: '/guide-book-pdfs/:guideBookPdfId/edit',
    component: GuideBookPdfEditView
  }
]
