import ActiveData from '@/models/ActiveData'
import ApproachApi from '@/services/oblyk-api/ApproachApi'
import Crag from '@/models/Crag'

export default class Approach extends ActiveData {
  get className () {
    return 'Approach'
  }

  find (cragId, cragSectorId) {
    return this.apiFind(ApproachApi, cragId, cragSectorId)
  }

  path (page = 'infos') {
    return `/crags/${this.crag.id}/${this.crag.slug_name}/approaches/${this.id}/${page}`
  }

  get Crag () {
    return new Crag(this.crag)
  }
}
