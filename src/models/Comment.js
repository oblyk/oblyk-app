import ActiveData from '@/models/ActiveData'
import CommentApi from '@/services/oblyk-api/CommentApi'

export default class Comment extends ActiveData {
  find (id) {
    return this.apiFind(CommentApi, id)
  }

  url (page = 'infos') {
    return `/comments/${this.id}/${page}`
  }
}
