import UserView from '@/views/UserView'

export default [
  {
    path: '/users/:userId/:userSlug',
    component: UserView,
    meta: {
      title: 'user',
      showTitle: false
    }
  }
]
