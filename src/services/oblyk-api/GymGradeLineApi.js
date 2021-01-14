import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GymGradeLineApi extends BaseApi {
  find (gymId, gradeId, gradeLineId) {
    return axios({
      url: `${this.baseUrl}/gyms/${gymId}/gym_grades/${gradeId}/gym_grade_lines/${gradeLineId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'GET'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_grades/${data.gym_grade_id}/gym_grade_lines/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym_grade_line: data
      },
      method: 'PUT'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_grades/${data.gym_grade_id}/gym_grade_lines.json`,
      headers: { Authorization: this.authToken() },
      data: {
        gym_grade_line: data
      },
      method: 'POST'
    })
  }

  delete (data) {
    return axios({
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_grades/${data.gym_grade_id}/gym_grade_lines/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      method: 'DELETE'
    })
  }
}
export default new GymGradeLineApi()
