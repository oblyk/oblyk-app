import BaseApi from '~/services/oblyk-api/BaseApi'

class VideoApi extends BaseApi {
  find (videoId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/videos/${videoId}.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken }
    })
  }

  all (viewableType, viewableId) {
    return this.axios.request({
      method: 'GET',
      url: `${this.baseUrl}/videos.json`,
      headers: { HttpApiAccessToken: this.apiAccessToken },
      params: {
        viewable_type: viewableType,
        viewable_id: viewableId
      }
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

  moderateByGymAdministrator (videoId) {
    return this.axios.request({
      method: 'DELETE',
      url: `${this.baseUrl}/videos/${videoId}/moderate_by_gym_administrator.json`,
      headers: {
        Authorization: this.authToken(),
        HttpApiAccessToken: this.apiAccessToken
      }
    })
  }
}
export default VideoApi
