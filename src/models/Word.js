import ActiveData from '@/models/ActiveData'
import WordApi from '@/services/oblyk-api/wordApi'

export default class Word extends ActiveData {
  find (id) {
    return this.apiFind(WordApi, id)
  }

  url (page = 'infos') {
    return `/words/${this.id}/${this.slug_name}/${page}`
  }

  glossaryUrl () {
    return '/glossary'
  }
}
