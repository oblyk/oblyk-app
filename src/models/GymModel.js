export default class GymModel {
  constructor (attributes) {
    for (const attribute in (attributes || {})) {
      this[attribute] = attributes[attribute]
    }
  }

  url (tabs = 'infos') {
    return `/gyms/${this.id}/${this.slug_name}/${tabs}`
  }

  editUrl (action = 'edit') {
    return `/gyms/${this.id}/${this.slug_name}/${action}`
  }

  bannerUrl () {
    if (this.banner) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.banner}`
    } else {
      return require('@/assets/gym-default-banner.jpg')
    }
  }

  logoUrl () {
    if (this.logo) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.logo}`
    } else {
      return require('@/assets/svgs/gym-default-logo.svg')
    }
  }
}
