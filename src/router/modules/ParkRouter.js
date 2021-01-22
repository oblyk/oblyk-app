import ParkNewView from '@/views/parks/actions/ParkNewView'
import ParkEditView from '@/views/parks/actions/ParkEditView'

export default [
  {
    path: '/crags/:cragId/:cragSlug/parks/new',
    component: ParkNewView,
    meta: {
      requiresAuth: true,
      objectName: 'park',
      showAvatar: false
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/parks/:parkId/edit',
    component: ParkEditView,
    meta: {
      requiresAuth: true,
      objectName: 'park',
      showAvatar: false
    }
  }
]
