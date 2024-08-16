import BaseApi from '~/services/oblyk-api/BaseApi'

class GymSpaceApi extends BaseApi {
  all (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  assets (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/assets.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  groups (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/groups.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  find (gymId, spaceId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  threeDElements (gymId, spaceId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}/three_d_elements.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_space: data
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_spaces.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_space: data
      }
    })
  }

  delete (gymId, spaceId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/gym_spaces/${spaceId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default GymSpaceApi
