import ActiveData from '@/models/ActiveData'
import AscentCragRouteApi from '@/services/oblyk-api/AscentCragRouteApi'
import Crag from '@/models/Crag'
import CragRoute from '@/models/CragRoute'

export default class AscentCragRoute extends ActiveData {
  get className () {
    return 'AscentCragRoute'
  }

  find (id) {
    return this.apiFind(AscentCragRouteApi, id)
  }

  path (page = 'infos') {
    return `${this.CragRoute.path('ascents')}/${this.id}/${page}`
  }

  get Crag () {
    return new Crag(this.crag)
  }

  get CragRoute () {
    const cragRoute = new CragRoute(this.crag_route)
    cragRoute.crag = this.crag
    return cragRoute
  }
}
