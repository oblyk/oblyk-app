const NotificationsView = () => import(/* webpackChunkName: "notification-routes" */ '@/views/notifications/NotificationsView')

export default [
  {
    path: '/notifications',
    component: NotificationsView,
    meta: {
      title: 'notifications',
      showTitle: true
    }
  }
]
