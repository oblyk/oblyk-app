import BaseApi from '~/services/oblyk-api/BaseApi'

class LinkApi extends BaseApi {
  allInLinkable (linkableType, linkableId) {
    return this.axios.request({
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
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/links/${linkId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return this.axios.request({
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
    return this.axios.request({
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
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/links/${linkId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default LinkApi
