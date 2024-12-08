import ActiveData from '@/models/ActiveData'
import GymLevelApi from '~/services/oblyk-api/GymLevelApi'

export default class GymLevel extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymLevel)
  }

  _find (id) {
    return this._apiFind(GymLevelApi, id)
  }

  get className () {
    return 'GymLevel'
  }
}
