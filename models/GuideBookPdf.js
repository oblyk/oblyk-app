import ActiveData from '@/models/ActiveData'
import GuideBookPdfApi from '~/services/oblyk-api/GuideBookPdfApi'

export default class GuideBookPdf extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GuideBookPdf)
  }

  _find (id) {
    return this._apiFind(GuideBookPdfApi, id)
  }

  get className () {
    return 'GuideBookPdf'
  }

  get path () {
    return `/guide-book-pdfs/${this.id}`
  }

  get url () {
    return this.pdf_file
  }

  get coverUrl () {
    return '/svg/pdf-guide-book-default.svg'
  }
}
