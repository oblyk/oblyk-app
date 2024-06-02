import BaseApi from '~/services/oblyk-api/BaseApi'

class GymThreeDAssetApi extends BaseApi {
  all (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_three_d_assets.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  find (gymId, id) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_three_d_assets/${id}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_three_d_assets/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_three_d_asset: data
      }
    })
  }

  addPicture (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_three_d_assets/${data.id}/add_picture.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_three_d_asset: data
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_three_d_assets.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_three_d_asset: data
      }
    })
  }

  delete (gymId, id) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/gym_three_d_assets/${id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default GymThreeDAssetApi
