import ActiveData from '@/models/ActiveData'
import GuideBookPaperApi from '~/services/oblyk-api/GuideBookPaperApi'

export default class GuideBookPaper extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GuideBookPaper)
  }

  _find (id) {
    return this._apiFind(GuideBookPaperApi, id)
  }

  get className () {
    return 'GuideBookPaper'
  }

  get path () {
    return `/guide-book-papers/${this.id}/${this.slug_name}`
  }

  get coverUrl () {
    if (this.cover) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.cover}`
    } else {
      return '/svg/paper-guide-book-default.svg'
    }
  }

  get thumbnailCoverUrl () {
    if (this.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.thumbnail_url}`
    } else {
      return '/svg/paper-guide-book-default.svg'
    }
  }

  get haveArticles () {
    return ((this.articles_count || 0) > 0)
  }

  get fundingAttributes () {
    if (this.funding_status === 'contributes_to_financing') {
      return {
        displayed: true,
        color: 'green',
        labelKey: 'components.guideBookPaper.fundingStatusExplain.contributes_to_financing'
      }
    } else if (this.funding_status === 'not_contributes_to_financing') {
      return {
        displayed: true,
        color: 'red',
        labelKey: 'components.guideBookPaper.fundingStatusExplain.not_contributes_to_financing'
      }
    } else {
      return {
        displayed: false,
        color: 'gray',
        labelKey: 'components.guideBookPaper.fundingStatusExplain.undefined'
      }
    }
  }

  get proposeAlternatives () {
    return (this.funding_status === 'not_contributes_to_financing')
  }
}
