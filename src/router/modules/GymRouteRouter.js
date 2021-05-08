const GymRouteNewView = () => import(/* webpackChunkName: "gym-route-routes" */ '@/views/gymRoutes/actions/GymRouteNewView')
const GymRouteEditView = () => import(/* webpackChunkName: "gym-route-routes" */ '@/views/gymRoutes/actions/GymRouteEditView')
const GymRoutePictureView = () => import(/* webpackChunkName: "gym-route-routes" */ '@/views/gymRoutes/actions/GymRoutePictureView')
const GymRouteThumbnailView = () => import(/* webpackChunkName: "gym-route-routes" */ '@/views/gymRoutes/actions/GymRouteThumbnailView')

export default [
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/sectors/:gymSectorId/routes/new',
    component: GymRouteNewView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym'
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/routes/:gymRouteId/edit',
    component: GymRouteEditView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym'
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/routes/:gymRouteId/picture',
    component: GymRoutePictureView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym'
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/routes/:gymRouteId/thumbnail',
    component: GymRouteThumbnailView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym'
    }
  }
]
