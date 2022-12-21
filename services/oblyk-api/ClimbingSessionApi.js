import BaseApi from '~/services/oblyk-api/BaseApi'

class ClimbingSessionApi extends BaseApi {
  list (page, filters = {}) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/climbing_sessions.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page,
        gym_ids: filters?.gym_ids,
        crag_ids: filters?.crag_ids,
        only_crag: filters?.only_crag || false,
        only_gym: filters?.only_gym || false
      }
    })
  }

  find (climbingSessionSessionDate) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/current_users/climbing_sessions/${climbingSessionSessionDate}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/current_users/climbing_sessions/${data.session_date}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        climbing_session: data
      }
    })
  }
}
export default ClimbingSessionApi
