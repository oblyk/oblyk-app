import ActiveData from '@/models/ActiveData'
import ConversationApi from '~/services/oblyk-api/ConversationApi'

export default class Conversation extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Conversation)
  }

  _find (id) {
    return this._apiFind(ConversationApi, id)
  }

  get className () {
    return 'Conversation'
  }

  get path () {
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
