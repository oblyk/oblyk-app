import BaseApi from '~/services/oblyk-api/BaseApi'

class AlertApi extends BaseApi {
  all (alertableType, alertableId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/alerts.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        alertable_type: alertableType,
        alertable_id: alertableId
      }
    })
  }

  find (alertId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/alerts/${alertId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return this.axios.request({
      method: 'POST',
      url: `${this.baseUrl}/alerts.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        alert: data
      }
    })
  }

  update (data) {
    return this.axios.request({
      method: 'PUT',
      url: `${this.baseUrl}/alerts/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        alert: data
      }
    })
  }

  delete (alertId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/alerts/${alertId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default AlertApi
