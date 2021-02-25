import UserView from '@/views/UserView'
import UserAscentsView from '@/views/users/UserAscentsView'
import UserProfileView from '@/views/users/UserProfileView'
import UserSubscribesView from '@/views/users/UserSubscribesView'
import UserFollowersView from '@/views/users/UserFollowersView'
import UserMediaView from '@/views/users/UserMediaView'

export default [
  {
    path: '/users/:userUuid/:userSlug',
    component: UserView,
    meta: {
      noPaddingTop: true
    },
    children: [
      {
        path: 'profile',
        component: UserProfileView,
        meta: {
          noPaddingTop: true
        }
      },
      {
        path: 'subscribes',
        component: UserSubscribesView,
        meta: {
          noPaddingTop: true
        }
      },
      {
        path: 'followers',
        component: UserFollowersView,
        meta: {
          noPaddingTop: true
        }
      },
      {
        path: 'media',
        component: UserMediaView,
        meta: {
          noPaddingTop: true
        }
      },
      {
        path: 'ascents',
        component: UserAscentsView,
        meta: {
          noPaddingTop: true
        }
      }
    ]
  }
]
