import ActiveData from '@/models/ActiveData'
import GuideBookWebApi from '@/services/oblyk-api/GuideBookWebApi'

export default class GuideBookWeb extends ActiveData {
  get className () {
    return 'GuideBookWeb'
  }

  find (id) {
    return this.apiFind(GuideBookWebApi, id)
  }

  path (page = 'info') {
    return `/guide-book-webs/${this.id}/${page}`
  }

  coverUrl () {
    return '/img/svg/web-guide-book-default.svg'
  }
}
