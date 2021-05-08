const ReportNewView = () => import(/* webpackChunkName: "report-routes" */ '@/views/reports/actions/ReportNewView')

export default [
  {
    path: '/reports/:reportableType/:reportableId/new',
    component: ReportNewView,
    meta: {
      requiresAuth: true,
      title: 'report',
      showTitle: false
    }
  }
]
