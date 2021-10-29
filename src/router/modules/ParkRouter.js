const ParkNewView = () => import(/* webpackChunkName: "ParkRouter-ParkNewView" */ '@/views/parks/actions/ParkNewView')
const ParkEditView = () => import(/* webpackChunkName: "ParkRouter-ParkEditView" */ '@/views/parks/actions/ParkEditView')

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
