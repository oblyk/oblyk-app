import ActiveData from '@/models/ActiveData'
import LinkApi from '~/services/oblyk-api/LinkApi'

export default class Link extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Link)
  }

  _find (id) {
    return this._apiFind(LinkApi, id)
  }

  get className () {
    return 'Link'
  }

  get path () {
    return `/links/${this.id}`
  }
}
