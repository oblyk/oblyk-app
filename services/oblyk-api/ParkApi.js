import BaseApi from '~/services/oblyk-api/BaseApi'

class ParkApi extends BaseApi {
  all (cragId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/parks.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJsonAround (cragId, parkId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/parks/geo_json_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        exclude_id: parkId
      }
    })
  }

  find (cragId, parkId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/public/crags/${cragId}/parks/${parkId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/public/crags/${data.crag_id}/parks.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        park: data
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/public/crags/${data.crag_id}/parks/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        park: data
      }
    })
  }
}
export default ParkApi
