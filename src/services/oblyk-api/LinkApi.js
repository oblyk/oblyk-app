import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class LinkApi extends BaseApi {
  allInLinkable (linkableType, linkableId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/links.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        linkable_type: linkableType,
        linkable_id: linkableId
      }
    })
  }

  find (linkId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/links/${linkId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/links.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        link: data
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/links/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        link: data
      }
    })
  }

  delete (linkId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/links/${linkId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new LinkApi()
