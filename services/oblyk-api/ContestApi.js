import BaseApi from '~/services/oblyk-api/BaseApi'

class ContestApi extends BaseApi {
  all (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  opens () {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/contests/opens.json`,
      headers: {
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  find (gymId, contestId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  timeLine (gymId, contestId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/time_line.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  results (gymId, contestId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/results.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  exportResults (gymId, contestId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/export_results.json`,
      responseType: 'blob',
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest: data
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest: data
      }
    })
  }

  draft (gymId, contestId, draft) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/draft.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest: { draft }
      }
    })
  }
}
export default ContestApi
