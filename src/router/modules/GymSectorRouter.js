const GymSectorNewView = () => import(/* webpackChunkName: "gym-sector-routes" */ '@/views/gymSectors/actions/GymSectorNewView')
const GymSectorEditView = () => import(/* webpackChunkName: "gym-sector-routes" */ '@/views/gymSectors/actions/GymSectorEditView')

export default [
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/sectors/new',
    component: GymSectorNewView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym'
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/sectors/:gymSectorId/edit',
    component: GymSectorEditView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym'
    }
  }
]
