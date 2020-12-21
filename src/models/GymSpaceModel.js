export default class GymSpaceModel {
  constructor (attributes) {
    for (const attribute in (attributes || {})) {
      this[attribute] = attributes[attribute]
    }
  }

  url () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.id}/${this.slug_name}`
  }

  planUrl () {
    if (this.plan) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.plan}`
    } else {
      return require('@/assets/gym-default-banner.jpg')
    }
  }
}
