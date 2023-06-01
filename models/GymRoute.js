import ActiveData from '@/models/ActiveData'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymSector from '@/models/GymSector'
import GymSpace from '@/models/GymSpace'
import Gym from '@/models/Gym'

export default class GymRoute extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymRoute)
  }

  _find (gymId, spaceId, routeId) {
    return this._apiFind(GymRouteApi, gymId, spaceId, routeId)
  }

  get className () {
    return 'GymRoute'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.gym_space.id}/${this.gym_space.slug_name}/routes/${this.id}`
  }

  get pathInSpace () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.gym_space.id}/${this.gym_space.slug_name}?route=${this.id}`
  }

  get gymSpacePath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.gym_space.id}/${this.gym_space.slug_name}`
  }

  get pictureUrl () {
    if (this.hasPicture) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.picture}`
    } else {
      return '/svg/missing-picture.svg'
    }
  }

  get hasPicture () {
    return (this.picture)
  }

  get hasTags () {
    let tagCounter = 0
    for (const section of this.sections) {
      tagCounter += section?.tags?.length || 0
    }
    return tagCounter > 0
  }

  get hasStyles () {
    let styleCounter = 0
    for (const section of this.sections) {
      styleCounter += section?.styles?.length || 0
    }
    return styleCounter > 0
  }

  get thumbnailUrl () {
    if (this.thumbnail) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.thumbnail}`
    } else {
      return '/svg/gym-route-default-picture.svg'
    }
  }

  get GymSector () {
    return new GymSector({ attributes: this.gym_sector })
  }

  get GymSpace () {
    return new GymSpace({ attributes: this.gym_space })
  }

  get Gym () {
    return new Gym({ attributes: this.gym })
  }
}
