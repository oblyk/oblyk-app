import ActiveData from '@/models/ActiveData'
import LikeApi from '~/services/oblyk-api/LikeApi'

export default class Like extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Like)
  }

  _find (id) {
    return this._apiFind(LikeApi, id)
  }

  get className () {
    return 'Like'
  }

  get path () {
    return `/likes/${this.id}`
  }
}
