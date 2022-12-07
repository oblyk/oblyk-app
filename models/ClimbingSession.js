import ActiveData from '@/models/ActiveData'
import ClimbingSessionApi from '~/services/oblyk-api/ClimbingSessionApi'

export default class ClimbingSession extends ActiveData {
  toJSON () {
    return this._buildJsonObject(ClimbingSession)
  }

  _find (id) {
    return this._apiFind(ClimbingSessionApi, id)
  }

  get className () {
    return 'ClimbingSession'
  }

  get path () {
    return `/climbing-sessions/${this.id}`
  }
}
