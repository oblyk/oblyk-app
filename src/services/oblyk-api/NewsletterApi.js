import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class NewsletterApi extends BaseApi {
  all () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/newsletters.json`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken,
        Authorization: this.authToken()
      }
    })
  }

  find (newsletterId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/newsletters/${newsletterId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (newsletterId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/newsletters/${newsletterId}/photos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/newsletters.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        newsletter: data
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/newsletters/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        newsletter: data
      }
    })
  }

  sendNewsletter (newsletterId) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/newsletters/${newsletterId}/send_newsletter.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  delete (newsletterId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/newsletters/${newsletterId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  subscribe (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/subscribes.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data: data
    })
  }

  unsubscribe (data) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/subscribes.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data: data
    })
  }
}
export default new NewsletterApi()
