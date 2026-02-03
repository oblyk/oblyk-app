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

  get Creator () {
    return new User(this.creator)
  }
}
