import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class GymGradeLineApi extends BaseApi {
  find (gymId, gradeId, gradeLineId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_grades/${gradeId}/gym_grade_lines/${gradeLineId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_grades/${data.gym_grade_id}/gym_grade_lines/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_grade_line: data
      }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_grades/${data.gym_grade_id}/gym_grade_lines.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym_grade_line: data
      }
    })
  }

  delete (data) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_grades/${data.gym_grade_id}/gym_grade_lines/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new GymGradeLineApi()
