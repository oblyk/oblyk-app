import BaseApi from '~/services/oblyk-api/BaseApi'

class GymAdministrationApi extends BaseApi {
  assigned () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gym_administrations/assigned.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  requested () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gym_administrations/requested.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  acceptRequested (requestId, gymType) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gym_administrations/accept_request.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        id: requestId,
        gym_type: gymType
      }
    })
  }

  deleteRequested (requestId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gym_administrations/delete_request.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        id: requestId
      }
    })
  }

  addOption (gymId, optionType) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gym_administrations/add_option.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_id: gymId,
        option_type: optionType
      }
    })
  }

  deleteOption (gymId, optionType) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gym_administrations/delete_option.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_id: gymId,
        option_type: optionType
      }
    })
  }
}
export default GymAdministrationApi
