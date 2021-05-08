import ActiveData from '@/models/ActiveData'
import Crag from '@/models/Crag'
import GuideBookPaper from '@/models/GuideBookPaper'
import Author from '@/models/Author'
import ArticleApi from '@/services/oblyk-api/ArticleApi'

export default class Article extends ActiveData {
  find (id) {
    return this.apiFind(ArticleApi, id)
  }

  path (page = null) {
    page = page ? `/${page}` : ''
    return `/articles/${this.id}/${this.slug_name}${page}`
  }

  coverUrl () {
    if (this.cover_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.cover_url}`
    } else {
      return '/img/images/default-crag-banner.jpg'
    }
  }

  thumbnailCoverUrl () {
    if (this.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.thumbnail_url}`
    } else {
      return '/img/images/default-crag-banner.jpg'
    }
  }

  get Author () {
    return new Author(this.author)
  }

  get Crags () {
    const crags = []
    for (const crag of this.crags) {
      crags.push(new Crag(crag))
    }
    return crags
  }

  get GuideBookPapers () {
    const guideBookPapers = []
    for (const guideBookPaper of this.guide_book_papers) {
      guideBookPapers.push(new GuideBookPaper(guideBookPaper))
    }
    return guideBookPapers
  }
}
