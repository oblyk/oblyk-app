import ActiveData from '@/models/ActiveData'
import AuthorApi from '~/services/oblyk-api/AuthorApi'

export default class Author extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Author)
  }

  _find (id) {
    return this._apiFind(AuthorApi, id)
  }

  get className () {
    return 'Author'
  }

  get path () {
    return `/authors/${this.id}`
  }

  get coverUrl () {
    if (this.cover_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.cover_url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get thumbnailCoverUrl () {
    if (this.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.thumbnail_url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }
}
