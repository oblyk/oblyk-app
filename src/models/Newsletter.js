import ActiveData from '@/models/ActiveData'
import NewsletterApi from '@/services/oblyk-api/NewsletterApi'

export default class Newsletter extends ActiveData {
  find (id) {
    return this.apiFind(NewsletterApi, id)
  }

  path (page = null) {
    page = page ? `/${page}` : ''
    return `/newsletters/${this.id}/${this.slug_name}${page}`
  }

  sent () {
    return this.sent
  }
}
