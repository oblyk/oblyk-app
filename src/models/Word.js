import ActiveData from '@/models/ActiveData'
import WordApi from '@/services/oblyk-api/WordApi'

export default class Word extends ActiveData {
  get className () {
    return 'Word'
  }

  find (id) {
    return this.apiFind(WordApi, id)
  }

  path (page = '') {
    const subPath = page !== '' ? `/${page}` : ''
    return `/words/${this.id}/${this.slug_name}${subPath}`
  }

  glossaryPath () {
    return '/glossary'
  }
}
