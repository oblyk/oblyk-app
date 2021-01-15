import ActiveData from '@/models/ActiveData'
import PlaceOfSaleApi from '@/services/oblyk-api/PlaceOfSaleApi'

export default class PlaceOfSale extends ActiveData {
  find (GuideBookPaperId, id) {
    return this.apiFind(PlaceOfSaleApi, GuideBookPaperId, id)
  }
}
