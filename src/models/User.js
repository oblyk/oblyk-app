import ActiveData from '@/models/ActiveData'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import UserApi from '@/services/oblyk-api/UserApi'

export default class User extends ActiveData {
  find (id) {
    return this.apiFind(UserApi, id)
  }

  findCurrent () {
    return this.apiFind(CurrentUserApi)
  }

  mePath (page = '') {
    return `/me/${this.slug_name}/${page}`
  }

  userPath () {
    return `/users/${this.uuid}/${this.slug_name}`
  }

  avatarUrl () {
    if (this.avatar) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.avatar}`
    } else {
      return require('@/assets/svgs/user-default-avatar.svg')
    }
  }

  bannerUrl () {
    if (this.banner) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.banner}`
    } else {
      return require('@/assets/user-default-banner.jpg')
    }
  }

  climbingTypes () {
    const list = []
    if (this.sport_climbing) list.push('sport_climbing')
    if (this.bouldering) list.push('bouldering')
    if (this.multi_pitch) list.push('multi_pitch')
    if (this.trad_climbing) list.push('trad_climbing')
    if (this.aid_climbing) list.push('aid_climbing')
    if (this.deep_water) list.push('deep_water')
    if (this.via_ferrata) list.push('via_ferrata')
    if (this.pan) list.push('pan')
    return list
  }
}
