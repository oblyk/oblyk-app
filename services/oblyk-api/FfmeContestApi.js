import BaseApi from '~/services/oblyk-api/BaseApi'

class FfmeContestApi extends BaseApi {
  find (contest, ffmeContestId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${contest.gym_id}/contests/${contest.id}/ffme_contests/${ffmeContestId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests/${data.contest_id}/ffme_contests.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        ffme_contest: data
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.gym_id}/contests/${data.contest_id}/ffme_contests/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        ffme_contest: data
      }
    })
  }

  sendResults (gymId, contestId, ffmeContestId) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/ffme_contests/${ffmeContestId}/send_results.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  getLink (gymId, contestId, ffmeContestId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/contests/${contestId}/ffme_contests/${ffmeContestId}/link.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default FfmeContestApi
