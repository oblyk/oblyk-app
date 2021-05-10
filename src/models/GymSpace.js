import ActiveData from '@/models/ActiveData'
import GymSpaceApi from '@/services/oblyk-api/GymSpaceApi'
import GymSector from '@/models/GymSector'
import GymRoute from '@/models/GymRoute'
import Gym from '@/models/Gym'

export default class GymSpace extends ActiveData {
  find (gymId, spaceId) {
    return this.apiFind(GymSpaceApi, gymId, spaceId)
  }

  gymPath (tabs = 'infos') {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/${tabs}`
  }

  path (tabs = 'plan') {
    return `${this.gymPath('spaces')}/${this.id}/${this.slug_name}/${tabs}`
  }

  planUrl () {
    if (this.plan) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.plan}`
    } else {
      return '/img/images/gym-default-banner.jpg'
    }
  }

  get Gym () {
    return new Gym(this.gym)
  }

  get GymSectors () {
    const sectors = []
    if (!this.gym_sectors) return sectors

    for (const sector of this.gym_sectors) {
      sectors.push(new GymSector(sector))
    }
    return sectors
  }

  get GymRoutes () {
    const routes = []
    if (!this.gym_routes) return routes

    for (const route of this.gym_routes) {
      routes.push(new GymRoute(route))
    }
    return routes
  }
}
