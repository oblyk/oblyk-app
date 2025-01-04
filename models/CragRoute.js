import ActiveData from '@/models/ActiveData'
import CragSector from '@/models/CragSector'
import Crag from '@/models/Crag'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'

export default class CragRoute extends ActiveData {
  toJSON () {
    return this._buildJsonObject(CragRoute)
  }

  _find (CragId, id) {
    return this._apiFind(CragRouteApi, CragId, id)
  }

  get className () {
    return 'CragRoute'
  }

  get path () {
    return `/crag-routes/${this.id}/${this.slug_name}`
  }

  get aPath () {
    return `/crags/${this.crag.id}/${this.crag.slug_name}/routes/${this.id}/${this.slug_name}`
  }

  get CragSector () {
    if (this.crag_sector === null) { return null }
    const cragSector = new CragSector({ attributes: this.crag_sector })
    cragSector.crag = this.crag
    return cragSector
  }

  get Crag () {
    return new Crag({ attributes: this.crag })
  }

  get difficultyAppreciationStatus () {
    const appreciation = this.difficulty_appreciation
    if (appreciation >= 0.6) {
      return 'hard'
    } else if (appreciation >= 0.2) {
      return 'pretty_hard'
    } else if (appreciation >= -0.2) {
      return 'just'
    } else if (appreciation >= -0.6) {
      return 'pretty_soft'
    } else {
      return 'soft'
    }
  }
}
