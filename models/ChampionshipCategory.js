import ActiveData from '@/models/ActiveData'
import ChampionshipCategoryApi from '~/services/oblyk-api/ChampionshipCategoryApi'

export default class ChampionshipCategory extends ActiveData {
  toJSON () {
    return this._buildJsonObject(ChampionshipCategory)
  }

  _find (gymId, id) {
    return this._apiFind(ChampionshipCategoryApi, gymId, id)
  }

  get className () {
    return 'ChampionshipCategory'
  }
}
