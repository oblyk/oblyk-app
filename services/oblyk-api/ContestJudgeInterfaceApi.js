import BaseApi from '~/services/oblyk-api/BaseApi'

class ContestJudgeInterfaceApi extends BaseApi {
  find (gymId, contestId, judgeUuid) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_judge_interfaces/${judgeUuid}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  unlock (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests/${data.contest_id}/contest_judge_interfaces/${data.uuid}/unlock.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        contest_judge: { code: data.code }
      }
    })
  }

  participants (gymId, contestId, judgeUuid, token) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/contest_judge_interfaces/${judgeUuid}/participants.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken,
        HttpContestJudgeToken: token
      }
    })
  }
}
export default ContestJudgeInterfaceApi
