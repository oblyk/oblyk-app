import AscentCragRouteNewView from '@/views/ascentCragRoutes/actions/AscentCragRouteNewView'
import AscentCragRouteEditView from '@/views/ascentCragRoutes/actions/AscentCragRouteEditView'

export default [
  {
    path: '/crags/:cragId/:cragSlug/routes/:cragRouteId/:cragRouteSlug/ascents/new',
    component: AscentCragRouteNewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/routes/:cragRouteId/:cragRouteSlug/ascents/:ascentCragRouteId/edit',
    component: AscentCragRouteEditView,
    meta: {
      requiresAuth: true
    }
  }
]
