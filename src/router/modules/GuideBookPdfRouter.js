import GuideBookPdfEditView from '@/views/guideBookPdfs/actions/GuideBookPdfEditView'

export default [
  {
    path: '/guide-book-pdfs/:guideBookPdfId/edit',
    component: GuideBookPdfEditView,
    meta: {
      title: 'guideBookPdf',
      showTitle: false
    }
  }
]
