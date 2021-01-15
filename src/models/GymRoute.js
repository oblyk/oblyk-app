import ActiveData from '@/models/ActiveData'
import GymRouteApi from '@/services/oblyk-api/GymRouteApi'
import GymSector from '@/models/GymSector'
import GymSpace from '@/models/GymSpace'

export default class GymRoute extends ActiveData {
  find (gymId, spaceId, routeId) {
    return this.apiFind(GymRouteApi, gymId, spaceId, routeId)
  }

  path (tabs = 'infos') {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.gym_space.id}/${this.gym_space.slug_name}/routes/${this.id}/${tabs}`
  }

  gymSpacePath (tabs = 'plan') {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.gym_space.id}/${this.gym_space.slug_name}/${tabs}`
  }

  gymSectorPath (tabs = 'infos') {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.gym_space.id}/${this.gym_space.slug_name}/sectors/${this.gym_sector_id}/${tabs}`
  }

  pictureUrl () {
    if (this.hasPicture) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.picture}`
    } else {
      return require('@/assets/svgs/missing-picture.svg')
    }
  }

  get hasPicture () {
    return (this.picture)
  }

  thumbnailUrl () {
    if (this.thumbnail) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.thumbnail}`
    } else {
      return require('@/assets/svgs/gym-route-default-picture.svg')
    }
  }

  get GymSector () {
    return new GymSector(this.gym_sector)
  }

  get GymSpace () {
    return new GymSpace(this.gym_space)
  }
}
