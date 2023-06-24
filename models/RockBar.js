import ActiveData from '@/models/ActiveData'
import RockBarApi from '~/services/oblyk-api/RockBarApi'
import Crag from '~/models/Crag'
import CragSector from '~/models/CragSector'

export default class RockBar extends ActiveData {
  toJSON () {
    return this._buildJsonObject(RockBar)
  }

  _find (CragId, id) {
    return this._apiFind(RockBarApi, CragId, id)
  }

  get className () {
    return 'RockBar'
  }

  get Crag () {
    return new Crag({ attributes: this.crag })
  }

  get CragSector () {
    return new CragSector({ attributes: this.crag_sector })
  }
}
