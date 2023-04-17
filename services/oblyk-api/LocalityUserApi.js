import BaseApi from '~/services/oblyk-api/BaseApi'

class LocalityUserApi extends BaseApi {
  all (only_active = false) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/locality_users.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: { only_active }
    })
  }

  find (id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/locality_users/${id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/locality_users.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        locality_user: data
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/locality_users/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        locality_user: data
      }
    })
  }

  deactivate (id) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/locality_users/${id}/deactivate.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  activate (id) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/locality_users/${id}/activate.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  delete (id) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/locality_users/${id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default LocalityUserApi
