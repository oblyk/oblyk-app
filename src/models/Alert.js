import ActiveData from '@/models/ActiveData'
import AlertApi from '@/services/oblyk-api/AlertApi'

export default class Alert extends ActiveData {
  get className () {
    return 'Alert'
  }

  find (id) {
    return this.apiFind(AlertApi, id)
  }

  path (page = 'infos') {
    return `/alerts/${this.id}/${page}`
  }
}
