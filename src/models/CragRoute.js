import ActiveData from '@/models/ActiveData'

export default class CragRoute extends ActiveData {
  path (tabs = 'infos') {
    return `/crag-routes/${this.id}/${this.slug_name}`
  }

  cover () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.photo.url}`
  }
}
