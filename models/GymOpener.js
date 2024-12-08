import ActiveData from '@/models/ActiveData'
import Gym from '~/models/Gym'
import GymOpenerApi from '~/services/oblyk-api/GymOpenerApi'
import User from '~/models/User'

export default class GymOpener extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymOpener)
  }

  _find (gymId, openerId) {
    return this._apiFind(GymOpenerApi, gymId, openerId)
  }

  get className () {
    return 'GymOpener'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/openers/${this.id}`
  }

  get listPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/openers`
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
