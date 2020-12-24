import ActiveData from '@/models/ActiveData'
import GymSectorApi from '@/services/oblyk-api/gymSectorApi'

export default class GymSector extends ActiveData {
  find (gymId, spaceId, sectorId) {
    return this.apiFind(GymSectorApi, gymId, spaceId, sectorId)
  }

  url (tabs = 'infos') {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/sectors/${this.id}/${this.slug_name}/${tabs}`
  }
}
