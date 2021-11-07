import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class OrganizationApi extends BaseApi {
  find (organizationId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/organizations/${organizationId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  accessKey (organizationId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/organizations/${organizationId}/api_access_token.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  refreshApiAccessToken (organizationId) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/organizations/${organizationId}/refresh_api_access_token.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return axios({
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
    return axios({
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
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/organizations/${organizationId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new OrganizationApi()
