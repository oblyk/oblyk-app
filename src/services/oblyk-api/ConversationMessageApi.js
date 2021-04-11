import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class ConversationMessageApi extends BaseApi {
  all (conversationId, page = 1) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/conversations/${conversationId}/conversation_messages.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page: page
      }
    })
  }

  lastMessages (conversationId, date) {
    return axios({
      url: `${this.baseUrl}/conversations/${conversationId}/conversation_messages/last_messages.json`,
      method: 'GET',
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        posted_after_at: date
      }
    })
  }

  find (conversationId, messageId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/conversations/${conversationId}/conversation_messages/${messageId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/conversations/${data.conversation_id}/conversation_messages.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        conversation_message: data
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/conversations/${data.conversation_id}/conversation_messages/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        conversation_message: data
      }
    })
  }

  delete (conversationId, conversationMessageId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/conversations/${conversationId}/conversation_messages/${conversationMessageId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new ConversationMessageApi()
