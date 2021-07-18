import ActiveData from '@/models/ActiveData'
import AscentGymRouteApi from '@/services/oblyk-api/AscentGymRouteApi'
import Gym from '@/models/Gym'
import GymRoute from '@/models/GymRoute'
import User from '@/models/User'

export default class AscentGymRoute extends ActiveData {
  get className () {
    return 'AscentGymRoute'
  }

  find (id) {
    return this.apiFind(AscentGymRouteApi, id)
  }

  path (page = 'infos') {
    return `${this.GymRoute.path('ascents')}/${this.id}/${page}`
  }

  get Gym () {
    return new Gym(this.gym)
  }

  get GymRoute () {
    const gymRoute = new GymRoute(this.gym_route)
    gymRoute.gym = this.gym
    return gymRoute
  }

  get User () {
    return new User(this.user)
  }
}
