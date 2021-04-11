import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class VideoApi extends BaseApi {
  find (videoId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/videos/${videoId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/videos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        video: data
      }
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/videos/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        video: data
      }
    })
  }

  delete (videoId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/videos/${videoId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new VideoApi()
