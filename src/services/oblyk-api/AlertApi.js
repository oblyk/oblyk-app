import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class AlertApi extends BaseApi {
  all (alertableType, alertableId) {
    return axios({
      url: `${this.baseUrl}/alerts.json`,
      params: {
        alertable_type: alertableType,
        alertable_id: alertableId
      },
      method: 'GET'
    })
  }

  find (alertId) {
    return axios({
      url: `${this.baseUrl}/alerts/${alertId}.json`,
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/alerts.json`,
      headers: { Authorization: this.authToken() },
      data: {
        alert: data
      },
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/alerts/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        alert: data
      },
      method: 'PUT'
    })
  }

  delete (alertId) {
    return axios({
      url: `${this.baseUrl}/alerts/${alertId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'DELETE'
    })
  }
}
export default new AlertApi()
