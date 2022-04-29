import ActiveData from '@/models/ActiveData'
import OrganizationApi from '~/services/oblyk-api/OrganizationApi'

export default class Organization extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Organization)
  }

  _find (id) {
    return this._apiFind(OrganizationApi, id)
  }

  get className () {
    return 'Organization'
  }

  get path () {
    return `/organizations/${this.id}/${this.slug_name}`
  }
}
