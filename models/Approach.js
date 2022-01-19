import ActiveData from '@/models/ActiveData'
import ApproachApi from '~/services/oblyk-api/ApproachApi'
import Crag from '@/models/Crag'

export default class Approach extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Approach)
  }

  _find (cragId, cragSectorId) {
    return this._apiFind(ApproachApi, cragId, cragSectorId)
  }

  get className () {
    return 'Approach'
  }

  get path () {
    return `/crags/${this.crag.id}/${this.crag.slug_name}/approaches/${this.id}`
  }

  get Crag () {
    return new Crag({ attributes: this.crag })
  }
}
