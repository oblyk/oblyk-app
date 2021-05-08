const AscentCragRouteNewView = () => import(/* webpackChunkName: "ascent-crag-route-routes" */ '@/views/ascentCragRoutes/actions/AscentCragRouteNewView')
const AscentCragRouteEditView = () => import(/* webpackChunkName: "ascent-crag-route-routes" */ '@/views/ascentCragRoutes/actions/AscentCragRouteEditView')

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
