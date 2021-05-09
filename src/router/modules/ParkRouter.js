const ParkNewView = () => import(/* webpackChunkName: "park-routes" */ '@/views/parks/actions/ParkNewView')
const ParkEditView = () => import(/* webpackChunkName: "park-routes" */ '@/views/parks/actions/ParkEditView')

export default [
  {
    path: '/crags/:cragId/:cragSlug/parks/new',
    component: ParkNewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/parks/:parkId/edit',
    component: ParkEditView,
    meta: {
      requiresAuth: true
    }
  }
]
