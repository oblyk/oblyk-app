import BaseApi from '~/services/oblyk-api/BaseApi'

class ChampionshipCategoryApi extends BaseApi {
  all (gymId, championshipId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/championships/${championshipId}/championship_categories.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  contestCategories (gymId, championshipId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/championships/${championshipId}/championship_categories/contest_categories.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (gymId, championshipId, data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/championships/${championshipId}/championship_categories.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        championship_category: data
      }
    })
  }

  delete (gymId, championshipId, id) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/gyms/${gymId}/championships/${championshipId}/championship_categories/${id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default ChampionshipCategoryApi
