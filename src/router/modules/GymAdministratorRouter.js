const GymAdministratorsView = () => import(/* webpackChunkName: "gym-administrator-routes" */ '@/views/gymAdministrators/GymAdministratorsView')
const GymAdministratorNewView = () => import(/* webpackChunkName: "gym-administrator-routes" */ '@/views/gymAdministrators/actions/GymAdministratorNewView')

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
