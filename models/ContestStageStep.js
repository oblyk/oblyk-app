import ActiveData from '@/models/ActiveData'
import ContestStageStepApi from '~/services/oblyk-api/ContestStageStepApi'
import Gym from '~/models/Gym'

export default class ContestStageStep extends ActiveData {
  toJSON () {
    return this._buildJsonObject(ContestStageStep)
  }

  _find (gymId, contestId, stageId, id) {
    return this._apiFind(ContestStageStepApi, gymId, contestId, stageId, id)
  }

  get className () {
    return 'ContestStageStep'
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
