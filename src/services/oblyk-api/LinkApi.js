import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class LinkApi extends BaseApi {
  allInLinkable (linkableType, linkableId) {
    return axios({
      url: `${this.baseUrl}/links.json`,
      params: {
        linkable_type: linkableType,
        linkable_id: linkableId
      },
      method: 'GET'
    })
  }

  find (linkId) {
    return axios({
      url: `${this.baseUrl}/links/${linkId}.json`,
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/links.json`,
      headers: { Authorization: this.authToken() },
      data: {
        link: data
      },
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/links/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        link: data
      },
      method: 'PUT'
    })
  }

  delete (data) {
    return axios({
      url: `${this.baseUrl}/links.json`,
      headers: { Authorization: this.authToken() },
      data: data,
      method: 'DELETE'
    })
  }
}
export default new LinkApi()
