import ActiveData from '@/models/ActiveData'
import ConversationApi from '~/services/oblyk-api/ConversationApi'
import User from '@/models/User'

export default class ConversationMessage extends ActiveData {
  toJSON () {
    return this._buildJsonObject(ConversationMessage)
  }

  _find (conversationId, id) {
    return this._apiFind(ConversationApi, conversationId, id)
  }

  get className () {
    return 'ConversationMessage'
  }

  get user () {
    return new User(this.creator)
  }
}
