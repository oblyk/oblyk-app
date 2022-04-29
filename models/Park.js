import ActiveData from '@/models/ActiveData'
import ParkApi from '~/services/oblyk-api/ParkApi'
import Crag from '@/models/Crag'

export default class Park extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Park)
  }

  _find (cragId, parkId) {
    return this._apiFind(ParkApi, cragId, parkId)
  }

  get className () {
    return 'Park'
  }

  get path () {
    return `/crags/${this.crag.id}/${this.crag.slug_name}/parks/${this.id}`
  }

  get Crag () {
    return new Crag({ attributes: this.crag })
  }
}
