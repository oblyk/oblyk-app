import ActiveData from '@/models/ActiveData'
import ClimbingSessionApi from '~/services/oblyk-api/ClimbingSessionApi'

export default class ClimbingSession extends ActiveData {
  toJSON () {
    return this._buildJsonObject(ClimbingSession)
  }

  _find (sessionDate) {
    return this._apiFind(ClimbingSessionApi, sessionDate)
  }

  get className () {
    return 'ClimbingSession'
  }

  get currentUserPath () {
    return `/home/climbing-sessions/${this.session_date}`
  }
}
