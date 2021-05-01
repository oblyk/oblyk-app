import CurrentUserAvatarView from '@/views/currentUsers/actions/CurrentUserAvatarView'
import CurrentUserBannerView from '@/views/currentUsers/actions/CurrentUserBannerView'
import CurrentUserAscentsView from '@/views/currentUsers/CurrentUserAscentsView'
import CurrentUserSubscribesView from '@/views/currentUsers/CurrentUserSubscribesView'
import CurrentUserGuideBooksView from '@/views/currentUsers/CurrentUserGuideBooksView'
import CurrentUserFavoritesView from '@/views/currentUsers/CurrentUserFavoritesView'
import CurrentUserPartnerSettingsView from '@/views/currentUsers/actions/CurrentUserPartnerSettingsView'
import CurrentUserSettingsView from '@/views/currentUsers/CurrentUserSettingsView'
import CurrentUserEditView from '@/views/currentUsers/actions/CurrentUserEditView'
import CurrentUserSendListView from '@/views/currentUsers/CurrentUserSendListView'
import CurrentUserTickListView from '@/views/currentUsers/CurrentUserTickListView'
import CurrentUserAnalytiksView from '@/views/currentUsers/CurrentUserAnalytiksView'
import CurrentUserProjectView from '@/views/currentUsers/CurrentUserProjectView'
import CurrentUserMapView from '@/views/currentUsers/CurrentUserMapView'
import CurrentUserPrivacyView from '@/views/currentUsers/actions/CurrentUserPrivacyView'
import CurrentUserCommunityView from '@/views/currentUsers/CurrentUserCommunityView'
import CurrentUserFollowersView from '@/views/currentUsers/CurrentUserFollowersView'
import CurrentUserFavoriteCragsView from '@/views/currentUsers/CurrentUserFavoriteCragsView'
import CurrentUserFavoriteGymsView from '@/views/currentUsers/CurrentUserFavoriteGymsView'

export default [
  {
    path: '/maps/my-map',
    component: CurrentUserMapView,
    meta: {
      requiresAuth: true,
      title: 'myMap',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/avatar',
    component: CurrentUserAvatarView,
    meta: {
      requiresAuth: true,
      title: 'myAvatar',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/banner',
    component: CurrentUserBannerView,
    meta: {
      requiresAuth: true,
      title: 'myBanner',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/settings',
    component: CurrentUserSettingsView,
    meta: {
      requiresAuth: true,
      title: 'mySettings',
      showTitle: true
    },
    children: [
      {
        path: 'general',
        component: CurrentUserEditView,
        meta: {
          requiresAuth: true,
          title: 'mySettings',
          showTitle: true
        }
      },
      {
        path: 'privacy',
        component: CurrentUserPrivacyView,
        meta: {
          requiresAuth: true,
          title: 'mySettings',
          showTitle: true
        }
      },
      {
        path: 'partner',
        component: CurrentUserPartnerSettingsView,
        meta: {
          requiresAuth: true,
          title: 'mySettings',
          showTitle: true
        }
      }
    ]
  },
  {
    path: '/me/:userSlug/ascents',
    component: CurrentUserAscentsView,
    meta: {
      requiresAuth: true,
      title: 'myAscents',
      showTitle: true
    },
    children: [
      {
        path: 'send-list',
        component: CurrentUserSendListView,
        meta: {
          requiresAuth: true,
          title: 'myAscents',
          showTitle: true
        }
      },
      {
        path: 'tick-list',
        component: CurrentUserTickListView,
        meta: {
          requiresAuth: true,
          title: 'myAscents',
          showTitle: true
        }
      },
      {
        path: 'projects',
        component: CurrentUserProjectView,
        meta: {
          requiresAuth: true,
          title: 'myAscents',
          showTitle: true
        }
      },
      {
        path: 'analytiks',
        component: CurrentUserAnalytiksView,
        meta: {
          requiresAuth: true,
          title: 'myAscents',
          showTitle: true
        }
      }
    ]
  },
  {
    path: '/me/:userSlug/community',
    component: CurrentUserCommunityView,
    meta: {
      requiresAuth: true,
      title: 'mySubscribers',
      showTitle: true
    },
    children: [
      {
        path: 'followers',
        component: CurrentUserFollowersView,
        meta: {
          requiresAuth: true,
          title: 'mySubscribers',
          showTitle: true
        }
      },
      {
        path: 'subscribes',
        component: CurrentUserSubscribesView,
        meta: {
          requiresAuth: true,
          title: 'mySubscribers',
          showTitle: true
        }
      }
    ]
  },
  {
    path: '/me/:userSlug/guide-books',
    component: CurrentUserGuideBooksView,
    meta: {
      requiresAuth: true,
      title: 'myGuideBooks',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/favorites',
    component: CurrentUserFavoritesView,
    meta: {
      requiresAuth: true,
      title: 'myFavorites',
      showTitle: true
    },

    children: [
      {
        path: 'crags',
        component: CurrentUserFavoriteCragsView,
        meta: {
          requiresAuth: true,
          title: 'myFavorites',
          showTitle: true
        }
      },
      {
        path: 'gyms',
        component: CurrentUserFavoriteGymsView,
        meta: {
          requiresAuth: true,
          title: 'myFavorites',
          showTitle: true
        }
      }
    ]
  }
]
