import ActiveData from '@/models/ActiveData'
import GymSectorApi from '@/services/oblyk-api/GymSectorApi'

export default class GymSector extends ActiveData {
  find (gymId, spaceId, sectorId) {
    return this.apiFind(GymSectorApi, gymId, spaceId, sectorId)
  }

  url (tabs = 'infos') {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.gym_space.id}/${this.gym_space.slug_name}/sectors/${this.id}/${tabs}`
  }

  get jsonPolygon () {
    return JSON.parse(this.polygon)
  }
}
