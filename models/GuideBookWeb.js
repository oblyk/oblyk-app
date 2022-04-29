import ActiveData from '@/models/ActiveData'
import GuideBookWebApi from '~/services/oblyk-api/GuideBookWebApi'

export default class GuideBookWeb extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GuideBookWeb)
  }

  _find (id) {
    return this._apiFind(GuideBookWebApi, id)
  }

  get className () {
    return 'GuideBookWeb'
  }

  get path () {
    return `/guide-book-webs/${this.id}`
  }

  get coverUrl () {
    return '/svg/web-guide-book-default.svg'
  }
}
