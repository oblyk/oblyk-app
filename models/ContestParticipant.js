import ActiveData from '@/models/ActiveData'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'

export default class ContestParticipant extends ActiveData {
  toJSON () {
    return this._buildJsonObject(ContestParticipant)
  }

  _find (gymId, contestId, id) {
    return this._apiFind(ContestParticipantApi, gymId, contestId, id)
  }

  get className () {
    return 'ContestParticipant'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/contests/${this.contest.id}/${this.contest.slug_name}`
  }

  get adminPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/contests/${this.contest.id}/participants`
  }
}
