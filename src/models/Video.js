import ActiveData from '@/models/ActiveData'
import VideoApi from '@/services/oblyk-api/VideoApi'

export default class Video extends ActiveData {
  find (id) {
    return this.apiFind(VideoApi, id)
  }

  path (page = '') {
    return `/videos/${this.viewable.type}/${this.viewable.id}/${this.id}/${page}`
  }
}
