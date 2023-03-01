import ActiveData from '@/models/ActiveData'
import Gym from '~/models/Gym'
import GymAdministratorApi from '~/services/oblyk-api/GymAdministratorApi'
import User from '~/models/User'

export default class GymAdministrator extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymAdministrator)
  }

  _find (gymId, administratorId) {
    return this._apiFind(GymAdministratorApi, gymId, administratorId)
  }

  get className () {
    return 'GymAdministrator'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/administrators/${this.id}`
  }

  get Gym () {
    if (this.gym) {
      return new Gym({ attributes: this.gym })
    } else {
      return null
    }
  }

  get User () {
    if (this.user) {
      return new User({ attributes: this.user })
    } else {
      return null
    }
  }
}
