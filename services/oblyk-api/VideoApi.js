import BaseApi from '~/services/oblyk-api/BaseApi'

class VideoApi extends BaseApi {
  find (videoId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/videos/${videoId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  create (data) {
    return this.axios.request({
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
    return this.axios.request({
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
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/videos/${videoId}.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default VideoApi
