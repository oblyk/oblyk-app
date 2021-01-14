import ActiveData from '@/models/ActiveData'
import GuideBookPdfApi from '@/services/oblyk-api/GuideBookPdfApi'

export default class GuideBookPdf extends ActiveData {
  find (id) {
    return this.apiFind(GuideBookPdfApi, id)
  }

  coverUrl () {
    return require('@/assets/svgs/pdf-guide-book-default.svg')
  }
}
