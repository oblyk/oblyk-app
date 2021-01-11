import ActiveData from '@/models/ActiveData'
import PhotoApi from '@/services/oblyk-api/photoApi'

export default class Photo extends ActiveData {
  find (id) {
    return this.apiFind(PhotoApi, id)
  }

  url (page = '') {
    return `/photos/${this.illustrable.type}/${this.illustrable.id}/${this.id}/${page}`
  }

  pictureUrl () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.picture}`
  }

  thumbnailUrl () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.thumbnail}`
  }
}
