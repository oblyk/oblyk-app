import axios from 'axios'
import BaseApi from '@/services/oblyk-api/baseApi'

class GymGradeApi extends BaseApi {
  all (gymId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_grades.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  find (gymId, gradeId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_grades/${gradeId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_grades/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym_grade: data
      },
      method: 'PUT'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_grades.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym_grade: data
      },
      method: 'POST'
    })
  }

  delete (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym.id}/gym_grades/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      method: 'DELETE'
    })
  }
}
export default new GymGradeApi()
