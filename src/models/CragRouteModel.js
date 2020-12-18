export default class CragRouteModel {
  constructor (attributes) {
    for (const attribute in (attributes || {})) {
      this[attribute] = attributes[attribute]
    }
  }

  url (tabs = 'infos') {
    return `/crag-routes/${this.id}/${this.slug_name}`
  }

  cover () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.url}`
  }
}
