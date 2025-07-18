import BaseApi from '~/services/oblyk-api/BaseApi'

class GymApi extends BaseApi {
  all (ids = null, page = null, perPage = null, options = { latitude: null, longitude: null, order: null }) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        ids,
        page,
        per_page: perPage,
        latitude: options.latitude,
        longitude: options.longitude,
        order: options.order
      }
    })
  }

  versions (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/versions.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  routesCount (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/routes_count.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  routes (gymId, gymSpaceId = null, dismounted = false) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        dismounted,
        gym_space_id: gymSpaceId
      }
    })
  }

  treeStructures (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/tree_structures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  treeRoutes (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/tree_routes.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  search (query) {
    const CancelToken = this.axios.CancelToken
    this.tokenSearchSource = CancelToken.source()

    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/search.json?query=${query}`,
      cancelToken: this.tokenSearchSource.token,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  rank (gymId, params) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/ascent_scores.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params
    })
  }

  geoJson (minimalistic = true) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/geo_json.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        minimalistic
      }
    })
  }

  gymsAround (latitude, longitude, distance = 20) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/gyms_around.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        latitude,
        longitude,
        distance
      }
    })
  }

  find (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/gyms/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym: data
      }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        gym: data
      }
    })
  }

  figures (gymId, figureType) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        figures: figureType
      }
    })
  }

  comments (gymId, page) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/comments.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  videos (gymId, page) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/videos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      params: {
        page
      }
    })
  }

  threeD (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/three_d.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  stripeCustomerPortal (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/stripe_customer_portal.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default GymApi
