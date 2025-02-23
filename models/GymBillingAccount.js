import ActiveData from '@/models/ActiveData'
import GymBillingAccountApi from '~/services/oblyk-api/GymBillingAccountApi'

export default class GymBillingAccount extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymBillingAccount)
  }

  _find (id) {
    return this._apiFind(GymBillingAccountApi, id)
  }

  get className () {
    return 'GymBillingAccount'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/gym-billing-accounts/${this.id}`
  }
}
