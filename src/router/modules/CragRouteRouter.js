const CragRouteView = () => import(/* webpackChunkName: "CragRouteRouter-CragRouteView" */ '@/views/CragRouteView')
const CragRouteNewView = () => import(/* webpackChunkName: "CragRouteRouter-CragRouteNewView" */ '@/views/cragRoutes/actions/CragRouteNewView')
const CragRouteEditView = () => import(/* webpackChunkName: "CragRouteRouter-CragRouteEditView" */ '@/views/cragRoutes/actions/CragRouteEditView')

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
