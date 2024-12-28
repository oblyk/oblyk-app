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
}
