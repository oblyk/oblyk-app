import ActiveData from '@/models/ActiveData'
import ChampionshipApi from '~/services/oblyk-api/ChampionshipApi'
import Gym from '~/models/Gym'

export default class Championship extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Championship)
  }

  _find (gymId, id) {
    return this._apiFind(ChampionshipApi, gymId, id)
  }

  get className () {
    return 'Championship'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/championships/${this.id}/${this.slug_name}`
  }

  get adminPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/championships/${this.id}`
  }

  get Gym () {
    return new Gym({ attributes: this.gym })
  }
}
