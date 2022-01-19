import ActiveData from '@/models/ActiveData'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import Gym from '@/models/Gym'
import GymRoute from '@/models/GymRoute'
import User from '@/models/User'

export default class AscentGymRoute extends ActiveData {
  toJSON () {
    return this._buildJsonObject(AscentGymRoute)
  }

  _find (id) {
    return this._apiFind(AscentGymRouteApi, id)
  }

  get className () {
    return 'AscentGymRoute'
  }

  get path () {
    return `${this.GymRoute.path}/ascents/${this.id}`
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
