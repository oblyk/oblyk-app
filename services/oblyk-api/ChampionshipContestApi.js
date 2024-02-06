import BaseApi from '~/services/oblyk-api/BaseApi'

class ChampionshipContestApi extends BaseApi {
  create (gymId, championshipId, contestId) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/championships/${championshipId}/championship_contests.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        championship: {
          contest_id: contestId
        }
      }
    })
  }

  delete (gymId, championshipId, contestId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/championships/${championshipId}/championship_contests/delete.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        championship: {
          contest_id: contestId
        }
      }
    })
  }
}
export default ChampionshipContestApi
