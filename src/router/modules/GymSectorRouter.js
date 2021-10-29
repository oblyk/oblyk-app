const GymSectorNewView = () => import(/* webpackChunkName: "GymSectorRouter-GymSectorNewView" */ '@/views/gymSectors/actions/GymSectorNewView')
const GymSectorEditView = () => import(/* webpackChunkName: "GymSectorRouter-GymSectorEditView" */ '@/views/gymSectors/actions/GymSectorEditView')

export default [
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/sectors/new',
    component: GymSectorNewView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/sectors/:gymSectorId/edit',
    component: GymSectorEditView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  }
]
