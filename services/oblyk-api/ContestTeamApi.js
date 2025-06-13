import BaseApi from '~/services/oblyk-api/BaseApi'

class ContestTeamApi extends BaseApi {
  all (gymId, contestId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_teams.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  find (gymId, contestId, teamId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_teams/${teamId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests/${data.contest_id}/contest_teams.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest_team: data
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests/${data.contest_id}/contest_teams/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest_team: data
      }
    })
  }

  delete (gymId, contestId, teamId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_teams/${teamId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default ContestTeamApi
