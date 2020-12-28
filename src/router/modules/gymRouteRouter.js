import GymRouteNewView from '@/views/gymRoutes/actions/GymRouteNewView'
import GymRouteEditView from '@/views/gymRoutes/actions/GymRouteEditView'
import GymRoutePictureView from '@/views/gymRoutes/actions/GymRoutePictureView'
import GymRouteThumbnailView from '@/views/gymRoutes/actions/GymRouteThumbnailView'

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
