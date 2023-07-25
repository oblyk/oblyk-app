import BaseApi from '~/services/oblyk-api/BaseApi'

class GymRouteStatisticApi extends BaseApi {
  figures (gymId, filters) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/statistics/gym_route_statistics/figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: { filters }
    })
  }

  grades (gymId, filters) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/statistics/gym_route_statistics/routes_by_grades.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: { filters }
    })
  }

  levels (gymId, filters) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/statistics/gym_route_statistics/routes_by_levels.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: { filters }
    })
  }

  notes (gymId, filters) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/statistics/gym_route_statistics/notes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: { filters }
    })
  }

  appreciationFigures (gymId, filters) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/statistics/gym_route_statistics/appreciation_figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: { filters }
    })
  }

  openingFrequencies (gymId, filters) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/statistics/gym_route_statistics/opening_frequencies.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: { filters }
    })
  }
}
export default GymRouteStatisticApi
