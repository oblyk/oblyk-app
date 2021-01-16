import ActiveData from '@/models/ActiveData'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'

export default class GuideBookPaper extends ActiveData {
  find (id) {
    return this.apiFind(GuideBookPaperApi, id)
  }

  path (page = 'infos') {
    return `/guide-book-papers/${this.id}/${this.slug_name}/${page}`
  }

  coverUrl () {
    if (this.cover) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.cover}`
    } else {
      return require('@/assets/svgs/paper-guide-book-default.svg')
    }
  }

  thumbnailCoverUrl () {
    if (this.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.thumbnail_url}`
    } else {
      return require('@/assets/svgs/paper-guide-book-default.svg')
    }
  }
}
