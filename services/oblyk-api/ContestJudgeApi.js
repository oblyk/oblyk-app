import BaseApi from '~/services/oblyk-api/BaseApi'

class ContestJudgeApi extends BaseApi {
  all (gymId, contestId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_judges.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  find (gymId, contestId, judgeId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_judges/${judgeId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests/${data.contest_id}/contest_judges.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest_judge: data
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests/${data.contest_id}/contest_judges/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest_judge: data
      }
    })
  }

  delete (gymId, contestId, judgeId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_judges/${judgeId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  addRoutes (gymId, contestId, judgeId, routeIds) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_judges/${judgeId}/add_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest_judge: { contest_route_ids: routeIds }
      }
    })
  }

  deleteRoute (gymId, contestId, judgeId, routeId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_judges/${judgeId}/delete_route.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest_route_id: routeId
      }
    })
  }
}
export default ContestJudgeApi
