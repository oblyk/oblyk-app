const GymSpaceView = () => import(/* webpackChunkName: "gym-space-routes" */ '@/views/gymSpaces/GymSpaceView')
const GymSpaceNewView = () => import(/* webpackChunkName: "gym-space-routes" */ '@/views/gymSpaces/actions/GymSpaceNewView')
const GymSpaceEditView = () => import(/* webpackChunkName: "gym-space-routes" */ '@/views/gymSpaces/actions/GymSpaceEditView')
const GymSpacePlanView = () => import(/* webpackChunkName: "gym-space-routes" */ '@/views/gymSpaces/actions/GymSpacePlanView')
const SelectGymSectorView = () => import(/* webpackChunkName: "gym-space-routes" */ '@/views/gymRoutes/SelectGymSectorView')

export default [
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/plan',
    component: GymSpaceView,
    props: true,
    meta: {
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/edit',
    component: GymSpaceEditView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/upload-plan',
    component: GymSpacePlanView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/new',
    component: GymSpaceNewView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/select-sector',
    component: SelectGymSectorView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  }
]
