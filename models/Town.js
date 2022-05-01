import ActiveData from '@/models/ActiveData'
import TownApi from '~/services/oblyk-api/TownApi'

export default class Town extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Town)
  }

  _find (id = null) {
    return this._apiFind(TownApi, id)
  }

  get className () {
    return 'Town'
  }

  get path () {
    return `/escalade-autour-de/${this.slug_name}`
  }
}
