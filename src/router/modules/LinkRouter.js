import LinkNewView from '@/views/links/actions/LinkNewView'
import LinkEditView from '@/views/links/actions/LinkEditView'

export default [
  {
    path: '/links/:linkableType/:linkableId/new',
    component: LinkNewView,
    meta: {
      requiresAuth: true,
      title: 'newLink',
      showTitle: false
    }
  },
  {
    path: '/links/:linkId/edit',
    component: LinkEditView,
    meta: {
      requiresAuth: true,
      objectName: 'link'
    }
  }
]
