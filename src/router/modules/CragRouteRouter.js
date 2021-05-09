const CragRouteView = () => import(/* webpackChunkName: "crag-route-routes" */ '@/views/CragRouteView')
const CragRouteNewView = () => import(/* webpackChunkName: "crag-route-routes" */ '@/views/cragRoutes/actions/CragRouteNewView')
const CragRouteEditView = () => import(/* webpackChunkName: "crag-route-routes" */ '@/views/cragRoutes/actions/CragRouteEditView')

export default [
  {
    path: '/crags/:cragId/:cragSlug/routes/:cragRouteId/:cragRouteSlug/infos',
    component: CragRouteView
  },
  {
    path: '/crags/:cragId/:cragSlug/routes/new',
    component: CragRouteNewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/routes/:cragRouteId/:cragRouteSlug/edit',
    component: CragRouteEditView,
    meta: {
      requiresAuth: true
    }
  }
]
