const NotificationsView = () => import(/* webpackChunkName: "NotificationRouter-NotificationsView" */ '@/views/notifications/NotificationsView')

export default [
  {
    path: '/notifications',
    component: NotificationsView,
    meta: {
      requiresAuth: true
    }
  }
]
