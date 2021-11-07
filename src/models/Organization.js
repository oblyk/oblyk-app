import ActiveData from '@/models/ActiveData'
import OrganizationApi from '@/services/oblyk-api/OrganizationApi'

export default class Organization extends ActiveData {
  get className () {
    return 'Organization'
  }

  find (id) {
    return this.apiFind(OrganizationApi, id)
  }

  path (page = '') {
    const subPath = page !== '' ? `/${page}` : ''
    return `/organizations/${this.id}/${this.slug_name}${subPath}`
  }
}
