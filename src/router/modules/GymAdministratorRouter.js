const GymAdministratorsView = () => import(/* webpackChunkName: "GymAdministratorRouter-GymAdministratorsView" */ '@/views/gymAdministrators/GymAdministratorsView')
const GymAdministratorNewView = () => import(/* webpackChunkName: "GymAdministratorRouter-GymAdministratorNewView" */ '@/views/gymAdministrators/actions/GymAdministratorNewView')

export default [
  {
    path: '/gyms/:gymId/:gymSlug/administrators',
    component: GymAdministratorsView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/administrators/new',
    component: GymAdministratorNewView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  }
]
