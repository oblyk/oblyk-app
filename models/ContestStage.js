import ActiveData from '@/models/ActiveData'
import ContestStageApi from '~/services/oblyk-api/ContestStageApi'
import Gym from '~/models/Gym'

export default class ContestStage extends ActiveData {
  toJSON () {
    return this._buildJsonObject(ContestStage)
  }

  _find (gymId, contestId, id) {
    return this._apiFind(ContestStageApi, gymId, contestId, id)
  }

  get className () {
    return 'ContestStage'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/contests/${this.contest.id}/${this.contest.slug_name}/stages/${this.id}/${this.slug_name}`
  }

  get adminPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/contests/${this.contest.id}/stages/${this.id}`
  }

  get Gym () {
    return new Gym({ attributes: this.gym })
  }
}
