import ApproachNewView from '@/views/approaches/actions/ApproachNewView'
import ApproachEditView from '@/views/approaches/actions/ApproachEditView'

export default [
  {
    path: '/crags/:cragId/:cragSlug/approaches/new',
    component: ApproachNewView,
    meta: {
      requiresAuth: true,
      objectName: 'crag',
      showAvatar: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/approaches/:approachId/edit',
    component: ApproachEditView,
    meta: {
      requiresAuth: true,
      objectName: 'crag',
      showAvatar: true
    }
  }
]
