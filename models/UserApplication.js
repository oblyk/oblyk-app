import ActiveData from '@/models/ActiveData'
import UserApplicationApi from '~/services/oblyk-api/UserApplicationApi'

export default class UserApplication extends ActiveData {
  toJSON () {
    return this._buildJsonObject(UserApplication)
  }

  _find (id) {
    return this._apiFind(UserApplicationApi, id)
  }

  get className () {
    return 'UserApplication'
  }
}
