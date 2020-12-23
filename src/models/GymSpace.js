import ActiveData from '@/models/ActiveData'
import GymSpaceApi from '@/services/oblyk-api/gymSpaceApi'

export default class GymSpace extends ActiveData {
  find (gymId, spaceId) {
    return this.apiFind(GymSpaceApi, gymId, spaceId)
  }

  url (tabs = 'infos') {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.id}/${this.slug_name}/infos`
  }

  planUrl () {
    if (this.plan) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.plan}`
    } else {
      return require('@/assets/gym-default-banner.jpg')
    }
  }
}
