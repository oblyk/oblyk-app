import ActiveData from '@/models/ActiveData'
import AreaApi from '~/services/oblyk-api/AreaApi'

export default class Area extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Area)
  }

  _find (id) {
    return this._apiFind(AreaApi, id)
  }

  get className () {
    return 'Area'
  }

  get path () {
    return `/areas/${this.id}/${this.slug_name}`
  }

  get formsPath () {
    return `/areas/${this.id}/forms`
  }
}
