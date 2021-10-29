const UserView = () => import(/* webpackChunkName: "UserRoute-UserView" */ '@/views/UserView')
const UserAscentsView = () => import(/* webpackChunkName: "UserRoute-UserAscentsView" */ '@/views/users/UserAscentsView')
const UserProfileView = () => import(/* webpackChunkName: "UserRoute-UserProfileView" */ '@/views/users/UserProfileView')
const UserSubscribesView = () => import(/* webpackChunkName: "UserRoute-UserSubscribesView" */ '@/views/users/UserSubscribesView')
const UserFollowersView = () => import(/* webpackChunkName: "UserRoute-UserFollowersView" */ '@/views/users/UserFollowersView')
const UserMediaView = () => import(/* webpackChunkName: "UserRoute-UserMediaView" */ '@/views/users/UserMediaView')
const UserPhotoView = () => import(/* webpackChunkName: "UserRoute-UserPhotoView" */ '@/views/users/UserPhotoView')
const UserVideoView = () => import(/* webpackChunkName: "UserRoute-UserVideoView" */ '@/views/users/UserVideoView')

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
        },
        children: [
          {
            path: 'photos',
            component: UserPhotoView,
            meta: {
              noPaddingTop: true
            }
          },
          {
            path: 'videos',
            component: UserVideoView,
            meta: {
              noPaddingTop: true
            }
          }
        ]
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
