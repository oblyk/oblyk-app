export default class GymModel {
  constructor (attributes) {
    for (const attribute in (attributes || {})) {
      this[attribute] = attributes[attribute]
    }
  }

  url (tabs = 'infos') {
    return `/gyms/${this.id}/${this.slug_name}/${tabs}`
  }

  editUrl () {
    return `/gyms/${this.id}/${this.slug_name}/edit`
  }

  bannerUrl () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.banner}`
  }

  logoUrl () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.logo}`
  }
}
