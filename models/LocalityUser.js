import ActiveData from '@/models/ActiveData'
import LocalityUserApi from '~/services/oblyk-api/LocalityUserApi'
import User from '~/models/User'

export default class LocalityUser extends ActiveData {
  toJSON () {
    return this._buildJsonObject(LocalityUser)
  }

  _find (id) {
    return this._apiFind(LocalityUserApi, id)
  }

  get className () {
    return 'LocalityUser'
  }

  get path () {
    return `/home/locality_users/${this.id}`
  }

  get User () {
    return new User({ attributes: this.user })
  }
}
