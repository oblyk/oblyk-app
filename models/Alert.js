import ActiveData from '@/models/ActiveData'
import AlertApi from '~/services/oblyk-api/AlertApi'

export default class Alert extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Alert)
  }

  _find (id) {
    return this._apiFind(AlertApi, id)
  }

  get className () {
    return 'Alert'
  }

  get path () {
    return `/alerts/${this.id}`
  }
}
