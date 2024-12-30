import ActiveData from '@/models/ActiveData'
import UserApi from '~/services/oblyk-api/UserApi'

export default class User extends ActiveData {
  toJSON () {
    return this._buildJsonObject(User)
  }

  _find (name) {
    return this._apiFind(UserApi, name)
  }

  get className () {
    return 'User'
  }

  get currentUserPath () {
    return '/home'
  }

  get userPath () {
    return `/climbers/${this.slug_name}`
  }

  get path () {
    return this.userPath
  }

  get climbingTypes () {
    const list = []
    if (this.sport_climbing) { list.push('sport_climbing') }
    if (this.bouldering) { list.push('bouldering') }
    if (this.multi_pitch) { list.push('multi_pitch') }
    if (this.trad_climbing) { list.push('trad_climbing') }
    if (this.aid_climbing) { list.push('aid_climbing') }
    if (this.deep_water) { list.push('deep_water') }
    if (this.via_ferrata) { list.push('via_ferrata') }
    if (this.pan) { list.push('pan') }
    return list
  }
}
