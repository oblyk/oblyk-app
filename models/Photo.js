import ActiveData from '@/models/ActiveData'
import PhotoApi from '~/services/oblyk-api/PhotoApi'
import User from '@/models/User'

export default class Photo extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Photo)
  }

  _find (id) {
    return this._apiFind(PhotoApi, id)
  }

  get className () {
    return 'Photo'
  }

  get path () {
    return `/photos/${this.illustrable.type}/${this.illustrable.id}/${this.id}`
  }

  get pictureUrl () {
    return this.picture
  }

  get thumbnailUrl () {
    return this.thumbnail
  }

  get copy () {
    const copies = []
    if (this.copyright_by) { copies.push('BY') }
    if (this.copyright_nc) { copies.push('NC') }
    if (this.copyright_nd) { copies.push('ND') }

    return copies.join(' - ')
  }

  get Creator () {
    return new User(this.creator)
  }
}
