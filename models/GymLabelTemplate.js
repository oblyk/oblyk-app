import ActiveData from '@/models/ActiveData'
import Gym from '~/models/Gym'
import GymLabelTemplateApi from '~/services/oblyk-api/GymLabelTemplateApi'

export default class GymLabelTemplate extends ActiveData {
  toJSON () {
    return this._buildJsonObject(GymLabelTemplate)
  }

  _find (gymId, labelTemplateId) {
    return this._apiFind(GymLabelTemplateApi, gymId, labelTemplateId)
  }

  get className () {
    return 'GymLabelTemplate'
  }

  get path () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/label-templates/${this.id}`
  }

  get listPath () {
    return `/gyms/${this.gym.id}/${this.gym.slug_name}/admins/label-templates`
  }

  get Gym () {
    if (this.gym) {
      return new Gym({ attributes: this.gym })
    } else {
      return null
    }
  }
}
