import GymAdministratorsView from '@/views/gymAdministrators/GymAdministratorsView'
import GymAdministratorNewView from '@/views/gymAdministrators/actions/GymAdministratorNewView'

export default [
  {
    path: '/gyms/:gymId/:gymSlug/administrators',
    component: GymAdministratorsView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/administrators/new',
    component: GymAdministratorNewView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  }
]
