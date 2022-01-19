import BaseApi from '~/services/oblyk-api/BaseApi'

class PhotoApi extends BaseApi {
  collection (photoIds) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/photos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        photo_ids: photoIds
      }
    })
  }

  find (photoId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/photos/${photoId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  update (data) {
    return this.axios.request({
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
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/photos/${photoId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default PhotoApi
