const CurrentUserAvatarView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/actions/CurrentUserAvatarView')
const CurrentUserBannerView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/actions/CurrentUserBannerView')
const CurrentUserAscentsView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserAscentsView')
const CurrentUserSubscribesView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserSubscribesView')
const CurrentUserGuideBooksView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserGuideBooksView')
const CurrentUserFavoritesView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserFavoritesView')
const CurrentUserPartnerSettingsView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/actions/CurrentUserPartnerSettingsView')
const CurrentUserSettingsView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserSettingsView')
const CurrentUserEditView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/actions/CurrentUserEditView')
const CurrentUserSendListView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserSendListView')
const CurrentUserTickListView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserTickListView')
const CurrentUserAnalytiksView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserAnalytiksView')
const CurrentUserProjectView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserProjectView')
const CurrentUserMapView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserMapView')
const CurrentUserPrivacyView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/actions/CurrentUserPrivacyView')
const CurrentUserCommunityView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserCommunityView')
const CurrentUserFollowersView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserFollowersView')
const CurrentUserFavoriteCragsView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserFavoriteCragsView')
const CurrentUserFavoriteGymsView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/CurrentUserFavoriteGymsView')
const CurrentUserNotificationSettingsView = () => import(/* webpackChunkName: "current-user-routes" */ '@/views/currentUsers/actions/CurrentUserNotificationSettingsView')

export default [
  {
    path: '/maps/my-map',
    component: CurrentUserMapView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/me/:userSlug/avatar',
    component: CurrentUserAvatarView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/me/:userSlug/banner',
    component: CurrentUserBannerView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/me/:userSlug/settings',
    component: CurrentUserSettingsView,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'general',
        component: CurrentUserEditView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'privacy',
        component: CurrentUserPrivacyView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'partner',
        component: CurrentUserPartnerSettingsView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'notifications',
        component: CurrentUserNotificationSettingsView,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/me/:userSlug/ascents',
    component: CurrentUserAscentsView,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'send-list',
        component: CurrentUserSendListView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'tick-list',
        component: CurrentUserTickListView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'projects',
        component: CurrentUserProjectView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'analytiks',
        component: CurrentUserAnalytiksView,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/me/:userSlug/community',
    component: CurrentUserCommunityView,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'followers',
        component: CurrentUserFollowersView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'subscribes',
        component: CurrentUserSubscribesView,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/me/:userSlug/guide-books',
    component: CurrentUserGuideBooksView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/me/:userSlug/favorites',
    component: CurrentUserFavoritesView,
    meta: {
      requiresAuth: true
    },

    children: [
      {
        path: 'crags',
        component: CurrentUserFavoriteCragsView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'gyms',
        component: CurrentUserFavoriteGymsView,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]
