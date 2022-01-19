import ActiveData from '@/models/ActiveData'
import NewsletterApi from '~/services/oblyk-api/NewsletterApi'

export default class Newsletter extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Newsletter)
  }

  _find (id) {
    return this._apiFind(NewsletterApi, id)
  }

  get className () {
    return 'Newsletter'
  }

  get path () {
    return `/newsletters/${this.id}/${this.slug_name}`
  }
}
