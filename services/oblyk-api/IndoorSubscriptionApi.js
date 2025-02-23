import BaseApi from '~/services/oblyk-api/BaseApi'

class IndoorSubscriptionApi extends BaseApi {
  find (gymId, subscriptionId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/indoor_subscriptions/${subscriptionId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  list (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/indoor_subscriptions.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  figures (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/indoor_subscriptions/figures.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  startFreeTrial (gymId) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/indoor_subscriptions/start_free_trial.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  create (gymId, data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/gyms/${gymId}/indoor_subscriptions.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        indoor_subscription: data
      }
    })
  }
}
export default IndoorSubscriptionApi
