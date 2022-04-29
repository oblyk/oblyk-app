import BaseApi from '~/services/oblyk-api/BaseApi'

class NotificationApi extends BaseApi {
  all (page = 1, unreadOnly = 'true') {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/notifications.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        unread_only: unreadOnly,
        page
      }
    })
  }

  unreadCount () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/notifications/unread_count.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  read (notificationId) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/notifications/${notificationId}/read.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  readAll () {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/notifications/read_all.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default NotificationApi
