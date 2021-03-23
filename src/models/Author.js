import ActiveData from '@/models/ActiveData'
import AuthorApi from '@/services/oblyk-api/AuthorApi'

export default class Author extends ActiveData {
  find (id) {
    return this.apiFind(AuthorApi, id)
  }

  coverUrl () {
    if (this.cover) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.cover}`
    } else {
      return require('@/assets/default-crag-banner.jpg')
    }
  }

  thumbnailCoverUrl () {
    if (this.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.thumbnail_url}`
    } else {
      return require('@/assets/default-crag-banner.jpg')
    }
  }
}
