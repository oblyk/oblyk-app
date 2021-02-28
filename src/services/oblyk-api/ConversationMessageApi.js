import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class ConversationMessageApi extends BaseApi {
  all (conversationId) {
    return axios({
      url: `${this.baseUrl}/conversations/${conversationId}/conversation_messages.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  find (conversationId, messageId) {
    return axios({
      url: `${this.baseUrl}/conversations/${conversationId}/conversation_messages/${messageId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/conversations/${data.conversation_id}/conversation_messages.json`,
      headers: { Authorization: this.authToken() },
      data: {
        conversation_message: data
      },
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/conversations/${data.conversation_id}/conversation_messages/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        conversation_message: data
      },
      method: 'PUT'
    })
  }

  delete (conversationId, conversationMessageId) {
    return axios({
      url: `${this.baseUrl}/conversations/${conversationId}/conversation_messages/${conversationMessageId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'DELETE'
    })
  }
}
export default new ConversationMessageApi()
