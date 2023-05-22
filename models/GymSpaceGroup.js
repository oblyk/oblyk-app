import ActiveData from '@/models/ActiveData'
import GymSpaceGroupApi from '~/services/oblyk-api/GymSpaceGroupApi'
import Gym from '@/models/Gym'

export default class GymSpaceGroup extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymSpaceGroup)
  }

  _find (gymId, spaceGroupId) {
    return this._apiFind(GymSpaceGroupApi, gymId, spaceGroupId)
  }

  get className () {
    return 'GymSpaceGroup'
  }

  get gymPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}`
  }

  get Gym () {
    return new Gym({ attributes: this.gym })
  }
}
