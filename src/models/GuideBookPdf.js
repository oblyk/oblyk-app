import ActiveData from '@/models/ActiveData'
import GuideBookPdfApi from '@/services/oblyk-api/GuideBookPdfApi'

export default class GuideBookPdf extends ActiveData {
  get className () {
    return 'GuideBookPdf'
  }

  find (id) {
    return this.apiFind(GuideBookPdfApi, id)
  }

  path (page = 'info') {
    return `/guide-book-pdfs/${this.id}/${page}`
  }

  get url () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.pdf_file}`
  }

  coverUrl () {
    return '/img/svg/pdf-guide-book-default.svg'
  }
}
