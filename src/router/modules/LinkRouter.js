const LinkNewView = () => import(/* webpackChunkName: "link-routes" */ '@/views/links/actions/LinkNewView')
const LinkEditView = () => import(/* webpackChunkName: "link-routes" */ '@/views/links/actions/LinkEditView')

export default [
  {
    path: '/links/:linkableType/:linkableId/new',
    component: LinkNewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/links/:linkId/edit',
    component: LinkEditView,
    meta: {
      requiresAuth: true
    }
  }
]
