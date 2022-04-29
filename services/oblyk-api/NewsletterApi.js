import BaseApi from '~/services/oblyk-api/BaseApi'

class NewsletterApi extends BaseApi {
  all () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/newsletters.json`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken,
        Authorization: this.authToken()
      }
    })
  }

  find (newsletterId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/newsletters/${newsletterId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  photos (newsletterId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/newsletters/${newsletterId}/photos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return this.axios.request({
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
    return this.axios.request({
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
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/newsletters/${newsletterId}/send_newsletter.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  delete (newsletterId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/newsletters/${newsletterId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  subscribe (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/subscribes.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data
    })
  }

  unsubscribe (data) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/subscribes.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      data
    })
  }
}
export default NewsletterApi
