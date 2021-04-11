import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GymGradeApi extends BaseApi {
  all (gymId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_grades.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  find (gymId, gradeId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_grades/${gradeId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_grades/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_grade: data
      }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_grades.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_grade: data
      }
    })
  }

  delete (data) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${data.gym.id}/gym_grades/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new GymGradeApi()
