import ActiveData from '@/models/ActiveData'
import GymThreeDAssetApi from '~/services/oblyk-api/GymThreeDAssetApi'

export default class GymThreeDAsset extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymThreeDAsset)
  }

  _find (gymId, gymThreeDAssetId) {
    return this._apiFind(GymThreeDAssetApi, gymId, gymThreeDAssetId)
  }

  get className () {
    return 'GymThreeDAsset'
  }
}
