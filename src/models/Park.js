import ActiveData from '@/models/ActiveData'
import ParkApi from '@/services/oblyk-api/ParkApi'
import Crag from '@/models/Crag'

export default class Park extends ActiveData {
  find (cragId, parkId) {
    return this.apiFind(ParkApi, cragId, parkId)
  }

  path (page = 'infos') {
    return `/crags/${this.crag.id}/${this.crag.slug_name}/parks/${this.id}/${page}`
  }

  get Crag () {
    return new Crag(this.crag)
  }
}
