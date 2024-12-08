import ActiveData from '@/models/ActiveData'
import ContestCategoryApi from '~/services/oblyk-api/ContestCategoryApi'
import Gym from '~/models/Gym'
import Contest from '~/models/Contest'

export default class ContestCategory extends ActiveData {
  toJSON () {
    return this._buildJsonObject(ContestCategory)
  }

  _find (gymId, contestId, id) {
    return this._apiFind(ContestCategoryApi, gymId, contestId, id)
  }

  get className () {
    return 'ContestCategory'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/contests/${this.contest.id}/${this.contest.slug_name}/categories/${this.id}/${this.slug_name}`
  }

  get adminPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/contests/${this.contest.id}/categories/${this.id}`
  }

  get Gym () {
    return new Gym({ attributes: this.gym })
  }

  get Contest () {
    return new Contest({ attributes: this.contest })
  }
}
