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

  delete (photoId) {
    return axios({
      method: 'DELETE',
      url: `${this.baseUrl}/photos/${photoId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default new PhotoApi()
