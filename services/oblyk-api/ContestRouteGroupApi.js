import BaseApi from '~/services/oblyk-api/BaseApi'

class ContestRouteGroupApi extends BaseApi {
  all (gymId, contestId, stageId, stepId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_stages/${stageId}/contest_stage_steps/${stepId}/contest_route_groups.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  find (gymId, contestId, stageId, stepId, groupId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_stages/${stageId}/contest_stage_steps/${stepId}/contest_route_groups/${groupId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests/${data.contest_id}/contest_stages/${data.contest_stage_id}/contest_stage_steps/${data.contest_stage_step_id}/contest_route_groups/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest_route_group: data
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests/${data.contest_id}/contest_stages/${data.contest_stage_id}/contest_stage_steps/${data.contest_stage_step_id}/contest_route_groups.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest_route_group: data
      }
    })
  }

  delete (gymId, contestId, stageId, stepId, groupId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_stages/${stageId}/contest_stage_steps/${stepId}/contest_route_groups/${groupId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default ContestRouteGroupApi
