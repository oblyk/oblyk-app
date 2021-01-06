import ActiveData from '@/models/ActiveData'
import UserApi from '@/services/oblyk-api/userApi'

export default class User extends ActiveData {
  find (id) {
    return this.apiFind(UserApi, id)
  }

  meUrl (page = 'infos') {
    return `/me/${this.slug_name}/${page}`
  }

  userUrl (tabs = 'infos') {
    return `/users/${this.id}/${this.slug_name}/${tabs}`
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
