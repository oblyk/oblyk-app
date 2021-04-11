import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GymApi extends BaseApi {
  all () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  versions (gymId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  geoJson () {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  gymsAround (latitude, longitude, distance = '20km') {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/gyms_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        latitude: latitude,
        longitude: longitude,
        distance: distance
      }
    })
  }

  find (gymId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym: data
      }
    })
  }

  logo (data, gymId) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/add_logo.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken,
        'Content-Type': 'multipart/form-data'
      },
      data: data
    })
  }

  banner (data, gymId) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/add_banner.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken,
        'Content-Type': 'multipart/form-data'
      },
      data: data
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/gyms.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym: data
      }
    })
  }
}
export default new GymApi()
