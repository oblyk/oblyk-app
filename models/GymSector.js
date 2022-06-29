import ActiveData from '@/models/ActiveData'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'

export default class GymSector extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymSector)
  }

  _find (gymId, spaceId, sectorId) {
    return this._apiFind(GymSectorApi, gymId, spaceId, sectorId)
  }

  get className () {
    return 'GymSector'
  }

  get path () {
    return `/gym-spaces/${this.gym.id}/${this.gym.slug_name}/spaces/${this.gym_space.id}/${this.gym_space.slug_name}/sectors/${this.id}`
  }

  get jsonPolygon () {
    return JSON.parse(this.polygon)
  }
}
