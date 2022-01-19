import BaseApi from '~/services/oblyk-api/BaseApi'

class OrganizationApi extends BaseApi {
  find (organizationId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/organizations/${organizationId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  accessKey (organizationId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/organizations/${organizationId}/api_access_token.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  refreshApiAccessToken (organizationId) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/organizations/${organizationId}/refresh_api_access_token.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/organizations.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        organization: data
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/organizations/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        organization: data
      }
    })
  }

  delete (organizationId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/organizations/${organizationId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default OrganizationApi
