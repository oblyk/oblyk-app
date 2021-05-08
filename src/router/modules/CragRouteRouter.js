const CragRouteView = () => import(/* webpackChunkName: "crag-route-routes" */ '@/views/CragRouteView')
const CragRouteNewView = () => import(/* webpackChunkName: "crag-route-routes" */ '@/views/cragRoutes/actions/CragRouteNewView')
const CragRouteEditView = () => import(/* webpackChunkName: "crag-route-routes" */ '@/views/cragRoutes/actions/CragRouteEditView')

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
