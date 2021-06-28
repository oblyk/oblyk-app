import ActiveData from '@/models/ActiveData'
import CommentApi from '@/services/oblyk-api/CommentApi'

export default class Comment extends ActiveData {
  get className () {
    return 'Comment'
  }

  find (id) {
    return this.apiFind(CommentApi, id)
  }

  path (page = 'infos') {
    return `/comments/${this.id}/${page}`
  }
}
