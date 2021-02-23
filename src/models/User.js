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
}
