import ActiveData from '@/models/ActiveData'
import CommentApi from '~/services/oblyk-api/CommentApi'

export default class Comment extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Comment)
  }

  _find (id) {
    return this._apiFind(CommentApi, id)
  }

  get className () {
    return 'Comment'
  }

  get path () {
    return `/comments/${this.id}`
  }
}
