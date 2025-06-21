import BaseApi from '~/services/oblyk-api/BaseApi'

class ContestParticipantAscentApi extends BaseApi {
  all (gymId, contestId, contestRouteId = null) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_participant_ascents.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        contest_route_id: contestRouteId
      }
    })
  }

  create (data) {
    const token = data.contest_participant_token.replace('.', '-')
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests/${data.contest_id}/contest_participants/${token}/contest_participant_ascents.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest_participant_ascent: data
      }
    })
  }

  bulk (data) {
    const token = data.contest_participant_token.replace('.', '-')
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests/${data.contest_id}/contest_participants/${token}/contest_participant_ascents/bulk.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest_participant_ascent: data
      }
    })
  }
}
export default ContestParticipantAscentApi
