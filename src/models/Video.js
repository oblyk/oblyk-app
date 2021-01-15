import ActiveData from '@/models/ActiveData'
import VideoApi from '@/services/oblyk-api/VideoApi'

export default class Video extends ActiveData {
  find (id) {
    return this.apiFind(VideoApi, id)
  }

  path (page = '') {
    return `/videos/${this.viewable_type}/${this.viewable_id}/${this.id}/${page}`
  }
}
