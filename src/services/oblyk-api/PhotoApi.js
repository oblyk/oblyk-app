import axios from 'axios'
import BaseApi from '@/services/oblyk-api/BaseApi'

class PhotoApi extends BaseApi {
  collection (photoIds) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/photos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        photo_ids: photoIds
      }
    })
  }

  find (photoId) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/photos/${photoId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/photos.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken,
        'Content-Type': 'multipart/form-data'
      },
      data: data
    })
  }

  update (data) {
    return axios({
      method: 'PUT',
      url: `${this.baseUrl}/photos/${data.id}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      },
      data: {
        photo: data
      }
    })
  }
}
export default new PhotoApi()
