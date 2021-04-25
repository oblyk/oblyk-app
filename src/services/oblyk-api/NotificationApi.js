import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class NotificationApi extends BaseApi {
  all (page = 1, unreadOnly = 'true') {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/notifications.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page: page,
        unread_only: unreadOnly
      }
    })
  }

  unreadCount () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/notifications/unread_count.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  read (notificationId) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/notifications/${notificationId}/read.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  readAll () {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/notifications/read_all.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new NotificationApi()
