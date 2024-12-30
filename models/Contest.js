import ActiveData from '@/models/ActiveData'
import ContestApi from '~/services/oblyk-api/ContestApi'
import Gym from '~/models/Gym'

export default class Contest extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Contest)
  }

  _find (gymId, id) {
    return this._apiFind(ContestApi, gymId, id)
  }

  get className () {
    return 'Contest'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/contests/${this.id}/${this.slug_name}`
  }

  get rankersPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/contests/rankers/${this.id}/${this.slug_name}`
  }

  get adminPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/contests/${this.id}`
  }

  get Gym () {
    return new Gym({ attributes: this.gym })
  }
}
