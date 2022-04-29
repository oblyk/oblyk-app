import ActiveData from '@/models/ActiveData'
import Crag from '@/models/Crag'
import GuideBookPaper from '@/models/GuideBookPaper'
import Author from '@/models/Author'
import ArticleApi from '~/services/oblyk-api/ArticleApi'

export default class Article extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Article)
  }

  _find (id) {
    return this._apiFind(ArticleApi, id)
  }

  get className () {
    return 'Article'
  }

  get path () {
    return `/articles/${this.id}/${this.slug_name}`
  }

  get coverUrl () {
    if (this.cover_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.cover_url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get croppedCoverUrl () {
    if (this.cover_cropped_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.cover_cropped_url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get thumbnailCoverUrl () {
    if (this.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.thumbnail_url}`
    } else {
      return '/images/default-crag-banner.jpg'
    }
  }

  get Author () {
    return new Author({ attributes: this.author })
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
