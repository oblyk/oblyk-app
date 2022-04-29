import ActiveData from '@/models/ActiveData'
import WordApi from '~/services/oblyk-api/WordApi'

export default class Word extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Word)
  }

  _find (id = null) {
    return this._apiFind(WordApi, id)
  }

  get className () {
    return 'Word'
  }

  get path () {
    return `/words/${this.id}/${this.slug_name}`
  }

  get glossaryPath () {
    return '/glossary'
  }
}
