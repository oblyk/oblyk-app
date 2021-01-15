import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class VideoApi extends BaseApi {
  find (videoId) {
    return axios({
      url: `${this.baseUrl}/videos/${videoId}.json`,
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/videos.json`,
      headers: { Authorization: this.authToken() },
      data: {
        video: data
      },
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/videos/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        video: data
      },
      method: 'PUT'
    })
  }

  delete (videoId) {
    return axios({
      url: `${this.baseUrl}/videos/${videoId}.json`,
      headers: { Authorization: this.authToken() },
      method: 'DELETE'
    })
  }
}
export default new VideoApi()
