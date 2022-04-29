import ActiveData from '@/models/ActiveData'
import PlaceOfSaleApi from '~/services/oblyk-api/PlaceOfSaleApi'

export default class PlaceOfSale extends ActiveData {
  toJSON () {
    return this._buildJsonObject(PlaceOfSale)
  }

  _find (GuideBookPaperId, id) {
    return this._apiFind(PlaceOfSaleApi, GuideBookPaperId, id)
  }

  get className () {
    return 'PlaceOfSale'
  }
}
