import ActiveData from '@/models/ActiveData'
import PhotoApi from '@/services/oblyk-api/PhotoApi'
import User from '@/models/User'

export default class Photo extends ActiveData {
  get className () {
    return 'Photo'
  }

  find (id) {
    return this.apiFind(PhotoApi, id)
  }

  path (page = '') {
    return `/photos/${this.illustrable.type}/${this.illustrable.id}/${this.id}/${page}`
  }

  pictureUrl () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.picture}`
  }

  thumbnailUrl () {
    return `${process.env.VUE_APP_OBLYK_API_URL}${this.thumbnail}`
  }

  get copy () {
    const copies = []
    if (this.copyright_by) copies.push('BY')
    if (this.copyright_nc) copies.push('NC')
    if (this.copyright_nd) copies.push('ND')

    return copies.join(' - ')
  }

  get Creator () {
    return new User(this.creator)
  }
}
