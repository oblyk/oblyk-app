const ApproachNewView = () => import(/* webpackChunkName: "approach-routes" */ '@/views/approaches/actions/ApproachNewView')
const ApproachEditView = () => import(/* webpackChunkName: "approach-routes" */ '@/views/approaches/actions/ApproachEditView')

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
