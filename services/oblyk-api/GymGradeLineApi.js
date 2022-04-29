import BaseApi from '~/services/oblyk-api/BaseApi'

class GymGradeLineApi extends BaseApi {
  find (gymId, gradeId, gradeLineId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/gym_grades/${gradeId}/gym_grade_lines/${gradeLineId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return this.axios.request({
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
    return this.axios.request({
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
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${data.gym_id}/gym_grades/${data.gym_grade_id}/gym_grade_lines/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default GymGradeLineApi
