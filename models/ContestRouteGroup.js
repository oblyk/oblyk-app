import ActiveData from '@/models/ActiveData'
import ContestRouteGroupApi from '~/services/oblyk-api/ContestRouteGroupApi'
import Gym from '~/models/Gym'

export default class ContestRouteGroup extends ActiveData {
  toJSON () {
    return this._buildJsonObject(ContestRouteGroup)
  }

  _find (gymId, contestId, stageId, stepId, id) {
    return this._apiFind(
      ContestRouteGroupApi,
      gymId,
      contestId,
      stageId,
      stepId,
      id
    )
  }

  get className () {
    return 'ContestRouteGroup'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/contests/${this.contest.id}/${this.contest.slug_name}`
  }

  get adminPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/contests/${this.contest.id}`
  }

  get Gym () {
    return new Gym({ attributes: this.gym })
  }
}
