import ActiveData from '@/models/ActiveData'
import ConversationApi from '@/services/oblyk-api/ConversationApi'
import User from '@/models/User'

export default class ConversationMessage extends ActiveData {
  get className () {
    return 'ConversationMessage'
  }

  find (conversationId, id) {
    return this.apiFind(ConversationApi, conversationId, id)
  }

  get user () {
    return new User(this.creator)
  }
}
