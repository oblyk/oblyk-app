import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class PhotoApi extends BaseApi {
  find (photoId) {
    return axios({
      url: `${this.baseUrl}/photos/${photoId}.json`,
      method: 'GET'
    })
  }

  create (data) {
    return axios({
      url: `${this.baseUrl}/photos.json`,
      headers: {
        Authorization: this.authToken(),
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      method: 'POST'
    })
  }

  update (data) {
    return axios({
      url: `${this.baseUrl}/photos/${data.id}.json`,
      headers: { Authorization: this.authToken() },
      data: {
        photo: data
      },
      method: 'PUT'
    })
  }
}
export default new PhotoApi()
