import CragRouteView from '@/views/CragRouteView'

export default [
  {
    path: '/crags/:cragId/:cragSlug/routes/:cragRouteId/:cragRouteSlug/infos',
    component: CragRouteView,
    meta: {
      requiresAuth: true,
      objectName: 'crag',
      showAvatar: false
    }
  }
]
