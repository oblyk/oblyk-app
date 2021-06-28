import ActiveData from '@/models/ActiveData'
import AreaApi from '@/services/oblyk-api/AreaApi'

export default class Area extends ActiveData {
  get className () {
    return 'Area'
  }

  find (id) {
    return this.apiFind(AreaApi, id)
  }

  coverUrl () {
    if (this.photo.url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.url}`
    } else {
      return '/img/images/default-crag-banner.jpg'
    }
  }

  thumbnailCoverUrl () {
    if (this.photo.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.thumbnail_url}`
    } else {
      return '/img/images/default-crag-banner.jpg'
    }
  }

  path (page = 'infos') {
    return `/areas/${this.id}/${this.slug_name}/${page}`
  }
}
