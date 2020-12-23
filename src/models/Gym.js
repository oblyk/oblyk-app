import ActiveData from '@/models/ActiveData'
import GymApi from '@/services/oblyk-api/gymApi'

export default class Gym extends ActiveData {
  find (id) {
    return this.apiFind(GymApi, id)
  }

  url (tabs = 'infos') {
    return `/gyms/${this.id}/${this.slug_name}/${tabs}`
  }

  editUrl (action = 'edit') {
    return `/gyms/${this.id}/${this.slug_name}/${action}`
  }

  bannerUrl () {
    if (this.banner) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.banner}`
    } else {
      return require('@/assets/gym-default-banner.jpg')
    }
  }

  logoUrl () {
    if (this.logo) {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.logo}`
    } else {
      return require('@/assets/svgs/gym-default-logo.svg')
    }
  }

  climbingTypes () {
    const list = []
    if (this.bouldering) list.push('bouldering')
    if (this.sport_climbing) list.push('sport_climbing')
    if (this.pan) list.push('pan')
    if (this.fun_climbing) list.push('fun_climbing')
    if (this.training_space) list.push('training_space')
    return list
  }

  firstSpaceUrl () {
    const space = this.gym_spaces[0]
    return (space) ? `/gyms/${this.id}/${this.slug_name}/spaces/${space.id}/${space.slug_name}` : ''
  }
}
