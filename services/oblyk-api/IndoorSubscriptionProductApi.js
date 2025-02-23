import BaseApi from '~/services/oblyk-api/BaseApi'

class IndoorSubscriptionProductApi extends BaseApi {
  find (gymId, subscriptionId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/indoor_subscription_products/${subscriptionId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }

  list (gymId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/gyms/${gymId}/indoor_subscription_products.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default IndoorSubscriptionProductApi
