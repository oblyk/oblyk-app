import ActiveData from '@/models/ActiveData'
import VideoApi from '~/services/oblyk-api/VideoApi'

export default class Video extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Video)
  }

  _find (id) {
    return this._apiFind(VideoApi, id)
  }

  get className () {
    return 'Video'
  }

  get path () {
    return `/videos/${this.viewable_type}/${this.viewable_id}/${this.id}`
  }
}
