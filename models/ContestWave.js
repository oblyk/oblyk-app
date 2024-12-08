import ActiveData from '@/models/ActiveData'
import ContestWaveApi from '~/services/oblyk-api/ContestWaveApi'
import Gym from '~/models/Gym'
import Contest from '~/models/Contest'

export default class ContestWave extends ActiveData {
  toJSON () {
    return this._buildJsonObject(ContestWave)
  }

  _find (gymId, contestId, id) {
    return this._apiFind(ContestWaveApi, gymId, contestId, id)
  }

  get className () {
    return 'ContestWave'
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

  get Contest () {
    return new Contest({ attributes: this.contest })
  }
}
