export default class CragModel {
  constructor (attributes) {
    for (const attribute in (attributes || {})) {
      this[attribute] = attributes[attribute]
    }
  }

  url (tabs = 'infos') {
    return `/crags/${this.id}/${this.slug_name}/${tabs}`
  }

  coverUrl () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.url}`
  }
}
