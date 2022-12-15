import ActiveData from '@/models/ActiveData'
import ColorSystemApi from '~/services/oblyk-api/ColorSystemApi'

export default class ColorSystem extends ActiveData {
  toJSON () {
    return this._buildJsonObject(ColorSystem)
  }

  _find (id) {
    return this._apiFind(ColorSystemApi, id)
  }

  get className () {
    return 'ColorSystem'
  }

  get path () {
    return `/color-systems/${this.id}`
  }
}
