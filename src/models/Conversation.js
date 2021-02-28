import ActiveData from '@/models/ActiveData'
import ConversationApi from '@/services/oblyk-api/ConversationApi'

export default class Conversation extends ActiveData {
  find (id) {
    return this.apiFind(ConversationApi, id)
  }

  path () {
    return `/me/user/messenger/${this.id}`
  }

  title (loggedInUserUuid) {
    const title = []
    for (const user of this.conversation_users) {
      if (loggedInUserUuid !== user.uuid) {
        title.push(user.name)
      }
    }
    return title.join(', ')
  }
}
