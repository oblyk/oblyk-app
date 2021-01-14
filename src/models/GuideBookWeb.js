import ActiveData from '@/models/ActiveData'
import GuideBookWebApi from '@/services/oblyk-api/GuideBookWebApi'

export default class GuideBookWeb extends ActiveData {
  find (id) {
    return this.apiFind(GuideBookWebApi, id)
  }

  coverUrl () {
    return require('@/assets/svgs/web-guide-book-default.svg')
  }
}
