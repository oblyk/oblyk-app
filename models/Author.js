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
      return this.cover_url
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get thumbnailCoverUrl () {
    if (this.thumbnail_url) {
      return this.thumbnail_url
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }
}
