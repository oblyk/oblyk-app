export default class UserModel {
  constructor (attributes) {
    for (const attribute in (attributes || {})) {
      this[attribute] = attributes[attribute]
    }
  }

  url (tabs = 'infos') {
    return `/users/${this.id}/${this.slug_name}/${tabs}`
  }

  avatarUrl () {
    if (this.avatar) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.avatar.url}`
    } else {
      return require('@/assets/svgs/user-default-avatar.svg')
    }
  }

  bannerUrl () {
    if (this.banner) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.banner.url}`
    } else {
      return require('@/assets/user-default-banner.jpg')
    }
  }
}
