import ActiveData from '@/models/ActiveData'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'

export default class GuideBookPaper extends ActiveData {
  get className () {
    return 'GuideBookPaper'
  }

  find (id) {
    return this.apiFind(GuideBookPaperApi, id)
  }

  path (page = '') {
    const subPath = page !== '' ? `/${page}` : ''
    return `/guide-book-papers/${this.id}/${this.slug_name}${subPath}`
  }

  coverUrl () {
    if (this.cover) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.cover}`
    } else {
      return '/img/svg/paper-guide-book-default.svg'
    }
  }

  thumbnailCoverUrl () {
    if (this.thumbnail_url) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.thumbnail_url}`
    } else {
      return '/img/svg/paper-guide-book-default.svg'
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
        icon: 'mdi-hand-coin',
        labelKey: 'components.guideBookPaper.fundingStatusExplain.contributes_to_financing'
      }
    } else if (this.funding_status === 'not_contributes_to_financing') {
      return {
        displayed: true,
        color: 'red',
        icon: 'mdi-currency-usd-off',
        labelKey: 'components.guideBookPaper.fundingStatusExplain.not_contributes_to_financing'
      }
    } else {
      return {
        displayed: false,
        color: 'gray',
        icon: 'mdi-help-circle-outline',
        labelKey: 'components.guideBookPaper.fundingStatusExplain.undefined'
      }
    }
  }
}
