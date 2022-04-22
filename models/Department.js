import ActiveData from '@/models/ActiveData'

export default class Department extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Department)
  }

  get className () {
    return 'Department'
  }

  get path () {
    return `/escalade-en/${this.country.slug_name}/${this.department_number}/${this.slug_name}`
  }
}
