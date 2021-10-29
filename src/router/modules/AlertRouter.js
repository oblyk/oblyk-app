const AlertEditView = () => import(/* webpackChunkName: "AlertRouter-AlertEditView" */ '@/views/alerts/actions/AlertEditView')
const AlertNewView = () => import(/* webpackChunkName: "AlertRouter-AlertNewView" */ '@/views/alerts/actions/AlertNewView')

export default [
  {
    path: '/alerts/:alertableType/:alertableId/new',
    component: AlertNewView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true
    }
  },
  {
    path: '/alerts/:alertId/edit',
    component: AlertEditView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true
    }
  }
]
