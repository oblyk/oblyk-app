import ActiveData from '@/models/ActiveData'
import GymApi from '~/services/oblyk-api/GymApi'

export default class Gym extends ActiveData {
  toJSON () {
    return this._buildJsonObject(Gym)
  }

  _find (id) {
    return this._apiFind(GymApi, id)
  }

  get className () {
    return 'Gym'
  }

  get path () {
    return `/gyms/${this.id}/${this.slug_name}`
  }

  get adminPath () {
    return `/gyms/${this.id}/${this.slug_name}/admins`
  }

  get spacePath () {
    return `/gyms/${this.id}/${this.slug_name}/spaces`
  }

  get firstSpacePath () {
    const space = (this.gym_spaces || [])[0]
    return (space) ? `${this.spacePath}/${space.id}/${space.slug_name}` : ''
  }

  get climbingTypes () {
    const list = []
    if (this.bouldering) { list.push('bouldering') }
    if (this.sport_climbing) { list.push('sport_climbing') }
    if (this.pan) { list.push('pan') }
    if (this.fun_climbing) { list.push('fun_climbing') }
    if (this.training_space) { list.push('training_space') }
    return list
  }

  get climbableTypes () {
    const list = []
    if (this.bouldering) { list.push('bouldering') }
    if (this.sport_climbing) { list.push('sport_climbing') }
    if (this.pan) { list.push('pan') }
    return list
  }
}
