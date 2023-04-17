import ActiveData from '@/models/ActiveData'
import LocalityApi from '~/services/oblyk-api/LocalityApi'

export default class Locality extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Locality)
  }

  _find (id) {
    return this._apiFind(LocalityApi, id)
  }

  get className () {
    return 'Locality'
  }

  get path () {
    return `/localities/${this.id}`
  }
}
