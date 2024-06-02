import ActiveData from '@/models/ActiveData'
import GymThreeDElementApi from '~/services/oblyk-api/GymThreeDElementApi'

export default class GymThreeDElement extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymThreeDElement)
  }

  _find (gymId, gymThreeDElementId) {
    return this._apiFind(GymThreeDElementApi, gymId, gymThreeDElementId)
  }

  get className () {
    return 'GymThreeDElement'
  }
}
