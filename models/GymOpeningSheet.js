import ActiveData from '@/models/ActiveData'
import GymOpeningSheetApi from '~/services/oblyk-api/GymOpeningSheetApi'

export default class GymOpeningSheet extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymOpeningSheet)
  }

  _find (gymId, sheetId) {
    return this._apiFind(GymOpeningSheetApi, gymId, sheetId)
  }

  get className () {
    return 'GymOpeningSheet'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/opening-sheets/${this.id}`
  }
}
