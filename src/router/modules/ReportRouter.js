const ReportNewView = () => import(/* webpackChunkName: "ReportRouter-ReportNewView" */ '@/views/reports/actions/ReportNewView')

export default [
  {
    path: '/reports/:reportableType/:reportableId/new',
    component: ReportNewView,
    meta: {
      requiresAuth: true
    }
  }
]
