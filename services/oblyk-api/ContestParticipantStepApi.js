import BaseApi from '~/services/oblyk-api/BaseApi'

class ContestParticipantStepApi extends BaseApi {
  subscribe (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gymId}/contests/${data.contestId}/contest_participant_steps/subscribe.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest_participant_step: {
          contest_participant_id: data.participantId,
          contest_stage_step_id: data.stepId,
          subscribe: data.subscribe
        }
      }
    })
  }
}
export default ContestParticipantStepApi
