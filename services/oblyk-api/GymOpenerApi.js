import BaseApi from '~/services/oblyk-api/BaseApi'

class GymOpenerApi extends BaseApi {
  all (gymId, activate = null) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_openers.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: { activate }
    })
  }

  find (gymId, openerId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_openers/${openerId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_openers/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_opener: data
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_openers.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_opener: data
      }
    })
  }

  activate (gymId, gymOpenerId) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${gymId}/gym_openers/${gymOpenerId}/activate.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  deactivate (gymId, gymOpenerId) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${gymId}/gym_openers/${gymOpenerId}/deactivate.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default GymOpenerApi
