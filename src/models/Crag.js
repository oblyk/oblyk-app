import ActiveData from '@/models/ActiveData'
import CragApi from '@/services/oblyk-api/cragApi'

export default class Crag extends ActiveData {
  find (id) {
    return this.apiFind(CragApi, id)
  }

  url (tabs = 'infos') {
    return `/crags/${this.id}/${this.slug_name}/${tabs}`
  }

  coverUrl () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.url}`
  }
}
