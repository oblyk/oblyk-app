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

  results (gymId, contestId, byTeam = false, unisex = false) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/results.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        by_team: byTeam,
        unisex
      }
    })
  }

  exportResults (gymId, contestId, byTeam = false) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/export_results.json`,
      responseType: 'blob',
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        by_team: byTeam
      }
    })
  }

  statistics (gymId, contestId, filters = {}) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/statistics.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        genre: filters.genre,
        category_id: filters.category_id,
        exclude_without_ascents: filters.exclude_without_ascents
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

  archived (gymId, contestId, archived) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/${archived ? 'archived' : 'unarchived'}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  delete (gymId, contestId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default ContestApi
