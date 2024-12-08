import BaseApi from '~/services/oblyk-api/BaseApi'

class GymChainApi extends BaseApi {
  find (gymChainSlug) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gym_chains/${gymChainSlug}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJson (gymChainSlug) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gym_chains/${gymChainSlug}/gyms_geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gym_chains/${data.slug_name}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_chain: data
      }
    })
  }
}
export default GymChainApi
