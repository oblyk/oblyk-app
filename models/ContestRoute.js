import ActiveData from '@/models/ActiveData'
import ContestRouteApi from '~/services/oblyk-api/ContestRouteApi'

export default class ContestRoute extends ActiveData {
  toJSON () {
    return this._buildJsonObject(ContestRoute)
  }

  _find (gymId, contestId, id) {
    return this._apiFind(ContestRouteApi, gymId, contestId, id)
  }

  get className () {
    return 'ContestRoute'
  }

  get pictureUrl () {
    if (this.picture) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.picture}`
    } else {
      return null
    }
  }

  get pictureLargeUrl () {
    if (this.picture_large) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.picture_large}`
    } else {
      return null
    }
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/contests/${this.contest.id}/${this.contest.slug_name}/routes/${this.id}`
  }

  get adminPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/contests/${this.contest.id}/routes/${this.id}`
  }
}
