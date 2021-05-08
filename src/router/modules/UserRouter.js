const UserView = () => import(/* webpackChunkName: "user-routes" */ '@/views/UserView')
const UserAscentsView = () => import(/* webpackChunkName: "user-routes" */ '@/views/users/UserAscentsView')
const UserProfileView = () => import(/* webpackChunkName: "user-routes" */ '@/views/users/UserProfileView')
const UserSubscribesView = () => import(/* webpackChunkName: "user-routes" */ '@/views/users/UserSubscribesView')
const UserFollowersView = () => import(/* webpackChunkName: "user-routes" */ '@/views/users/UserFollowersView')
const UserMediaView = () => import(/* webpackChunkName: "user-routes" */ '@/views/users/UserMediaView')
const UserPhotoView = () => import(/* webpackChunkName: "user-routes" */ '@/views/users/UserPhotoView')
const UserVideoView = () => import(/* webpackChunkName: "user-routes" */ '@/views/users/UserVideoView')

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
