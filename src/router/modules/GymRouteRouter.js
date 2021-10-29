const GymRouteNewView = () => import(/* webpackChunkName: "GymRouteRouter-GymRouteNewView" */ '@/views/gymRoutes/actions/GymRouteNewView')
const GymRouteEditView = () => import(/* webpackChunkName: "GymRouteRouter-GymRouteEditView" */ '@/views/gymRoutes/actions/GymRouteEditView')
const GymRoutePictureView = () => import(/* webpackChunkName: "GymRouteRouter-GymRoutePictureView" */ '@/views/gymRoutes/actions/GymRoutePictureView')
const GymRouteThumbnailView = () => import(/* webpackChunkName: "GymRouteRouter-GymRouteThumbnailView" */ '@/views/gymRoutes/actions/GymRouteThumbnailView')

export default [
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/sectors/:gymSectorId/routes/new',
    component: GymRouteNewView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/routes/:gymRouteId/edit',
    component: GymRouteEditView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/routes/:gymRouteId/picture',
    component: GymRoutePictureView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/routes/:gymRouteId/thumbnail',
    component: GymRouteThumbnailView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  }
]
