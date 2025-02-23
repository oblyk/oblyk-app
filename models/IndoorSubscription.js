import ActiveData from '@/models/ActiveData'
import IndoorSubscriptionApi from '~/services/oblyk-api/IndoorSubscriptionApi'

export default class IndoorSubscription extends ActiveData {
  toJSON () {
    return this._buildJsonObject(IndoorSubscription)
  }

  _find (id) {
    return this._apiFind(IndoorSubscriptionApi, id)
  }

  get className () {
    return 'IndoorSubscription'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/indoor-subscriptions/${this.id}`
  }
}
