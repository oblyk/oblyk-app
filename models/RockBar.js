import ActiveData from '@/models/ActiveData'
import RockBarApi from '~/services/oblyk-api/RockBarApi'

export default class RockBar extends ActiveData {
  toJSON () {
    return this._buildJsonObject(RockBar)
  }

  _find (CragId, id) {
    return this._apiFind(RockBarApi, CragId, id)
  }

  get className () {
    return 'RockBar'
  }
}
