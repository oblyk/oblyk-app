const CurrentUserAvatarView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserAvatarView" */ '@/views/currentUsers/actions/CurrentUserAvatarView')
const CurrentUserBannerView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserBannerView" */ '@/views/currentUsers/actions/CurrentUserBannerView')
const CurrentUserAscentsView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserAscentsView" */ '@/views/currentUsers/CurrentUserAscentsView')
const CurrentUserSubscribesView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserSubscribesView" */ '@/views/currentUsers/CurrentUserSubscribesView')
const CurrentUserGuideBooksView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserGuideBooksView" */ '@/views/currentUsers/CurrentUserGuideBooksView')
const AddGuideBookOnLibraryView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserGuideBooksView" */ '@/views/currentUsers/actions/AddGuideBookOnLibraryView')
const CurrentUserFavoritesView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserFavoritesView" */ '@/views/currentUsers/CurrentUserFavoritesView')
const CurrentUserPartnerSettingsView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserPartnerSettingsView" */ '@/views/currentUsers/actions/CurrentUserPartnerSettingsView')
const CurrentUserSettingsView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserSettingsView" */ '@/views/currentUsers/CurrentUserSettingsView')
const CurrentUserEditView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserEditView" */ '@/views/currentUsers/actions/CurrentUserEditView')
const CurrentUserSendListView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserSendListView" */ '@/views/currentUsers/CurrentUserSendListView')
const CurrentUserTickListView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserTickListView" */ '@/views/currentUsers/CurrentUserTickListView')
const CurrentUserAnalytiksView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserAnalytiksView" */ '@/views/currentUsers/CurrentUserAnalytiksView')
const CurrentUserProjectView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserProjectView" */ '@/views/currentUsers/CurrentUserProjectView')
const CurrentUserMapView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserMapView" */ '@/views/currentUsers/CurrentUserMapView')
const CurrentUserPrivacyView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserPrivacyView" */ '@/views/currentUsers/actions/CurrentUserPrivacyView')
const CurrentUserCommunityView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserCommunityView" */ '@/views/currentUsers/CurrentUserCommunityView')
const CurrentUserFollowersView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserFollowersView" */ '@/views/currentUsers/CurrentUserFollowersView')
const CurrentUserFavoriteCragsView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserFavoriteCragsView" */ '@/views/currentUsers/CurrentUserFavoriteCragsView')
const CurrentUserFavoriteGymsView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserFavoriteGymsView" */ '@/views/currentUsers/CurrentUserFavoriteGymsView')
const CurrentUserNotificationSettingsView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserNotificationSettingsView" */ '@/views/currentUsers/actions/CurrentUserNotificationSettingsView')
const CurrentUserOtherSettingsView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserOtherSettingsView" */ '@/views/currentUsers/actions/CurrentUserOtherSettingsView')
const CurrentUserMediaView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserMediaView" */ '@/views/currentUsers/CurrentUserMediaView')
const CurrentUserPhotoView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserPhotoView" */ '@/views/currentUsers/CurrentUserPhotoView')
const CurrentUserVideoView = () => import(/* webpackChunkName: "CurrentUserRouter-CurrentUserVideoView" */ '@/views/currentUsers/CurrentUserVideoView')

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
      },
      {
        path: 'others',
        component: CurrentUserOtherSettingsView,
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
    path: '/me/:userSlug/media',
    component: CurrentUserMediaView,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'photos',
        component: CurrentUserPhotoView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'videos',
        component: CurrentUserVideoView,
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
    path: '/me/:userSlug/guide-books/add',
    component: AddGuideBookOnLibraryView,
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
