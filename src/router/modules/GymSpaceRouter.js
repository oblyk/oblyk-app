const GymSpaceView = () => import(/* webpackChunkName: "GymSpaceRouter-GymSpaceView" */ '@/views/gymSpaces/GymSpaceView')
const GymSpaceNewView = () => import(/* webpackChunkName: "GymSpaceRouter-GymSpaceNewView" */ '@/views/gymSpaces/actions/GymSpaceNewView')
const GymSpaceEditView = () => import(/* webpackChunkName: "GymSpaceRouter-GymSpaceEditView" */ '@/views/gymSpaces/actions/GymSpaceEditView')
const GymSpacePlanView = () => import(/* webpackChunkName: "GymSpaceRouter-GymSpacePlanView" */ '@/views/gymSpaces/actions/GymSpacePlanView')
const SelectGymSectorView = () => import(/* webpackChunkName: "GymSpaceRouter-SelectGymSectorView" */ '@/views/gymRoutes/SelectGymSectorView')

export default [
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/plan',
    component: GymSpaceView,
    props: true
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/edit',
    component: GymSpaceEditView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/upload-plan',
    component: GymSpacePlanView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/new',
    component: GymSpaceNewView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/select-sector',
    component: SelectGymSectorView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  }
]
