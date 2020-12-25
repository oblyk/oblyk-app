import ActiveData from '@/models/ActiveData'
import GymSpaceApi from '@/services/oblyk-api/gymSpaceApi'
import GymSector from '@/models/GymSector'

export default class GymSpace extends ActiveData {
  find (gymId, spaceId) {
    return this.apiFind(GymSpaceApi, gymId, spaceId)
  }

  url (tabs = 'plan') {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.id}/${this.slug_name}/${tabs}`
  }

  planUrl () {
    if (this.plan) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.plan}`
    } else {
      return require('@/assets/gym-default-banner.jpg')
    }
  }

  newSectorUrl () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.id}/${this.slug_name}/sectors/new`
  }

  get GymSectors () {
    const sectors = []
    if (!this.gym_sectors) return sectors

    for (const sector of this.gym_sectors) {
      sectors.push(new GymSector(sector))
    }
    return sectors
  }
}
