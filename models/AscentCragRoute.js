import ActiveData from '@/models/ActiveData'
import AscentCragRouteApi from '~/services/oblyk-api/AscentCragRouteApi'
import Crag from '@/models/Crag'
import CragRoute from '@/models/CragRoute'

export default class AscentCragRoute extends ActiveData {
  toJSON () {
    return this._buildJsonObject(AscentCragRoute)
  }

  _find (id) {
    return this._apiFind(AscentCragRouteApi, id)
  }

  get className () {
    return 'AscentCragRoute'
  }

  get path () {
    return `${this.CragRoute.path}/ascents/${this.id}`
  }

  get Crag () {
    return new Crag(this.crag)
  }

  get CragRoute () {
    const cragRoute = new CragRoute({ attributes: this.crag_route })
    cragRoute.crag = this.crag
    return cragRoute
  }
}
