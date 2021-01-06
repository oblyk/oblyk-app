import UserAvatarView from '@/views/users/actions/UserAvatarView'

export default [
  {
    path: '/me/:userSlug/avatar',
    component: UserAvatarView,
    meta: {
      title: 'userAvatar',
      showTitle: false,
      showAvatar: true,
      objectName: 'me'
    }
  }
]
