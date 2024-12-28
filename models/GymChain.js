import ActiveData from '@/models/ActiveData'
import GymChainApi from '~/services/oblyk-api/GymChainApi'

export default class GymChain extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymChain)
  }

  _find (slugName) {
    return this._apiFind(GymChainApi, slugName)
  }

  get className () {
    return 'GymChain'
  }

  get path () {
    return `/gym-chains/${this.slug_name}`
  }

  get adminPath () {
    return `/gym-chains/${this.slug_name}/admins`
  }
}
