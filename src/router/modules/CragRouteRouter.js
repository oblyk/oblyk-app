import CragRouteView from '@/views/CragRouteView'
import CragRouteNewView from '@/views/cragRoutes/actions/CragRouteNewView'
import CragRouteEditView from '@/views/cragRoutes/actions/CragRouteEditView'

export default [
  {
    path: '/crags/:cragId/:cragSlug/routes/:cragRouteId/:cragRouteSlug/infos',
    component: CragRouteView,
    meta: {
      objectName: 'crag',
      showAvatar: false
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/routes/new',
    component: CragRouteNewView,
    meta: {
      requiresAuth: true,
      objectName: 'crag',
      showAvatar: false
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/routes/:cragRouteId/:cragRouteSlug/edit',
    component: CragRouteEditView,
    meta: {
      requiresAuth: true,
      objectName: 'cragRoute',
      showAvatar: false
    }
  }
]
