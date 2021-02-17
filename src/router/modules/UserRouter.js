import MyAvatarView from '@/views/me/actions/MyAvatarView'
import MyBannerView from '@/views/me/actions/MyBannerView'
import MyAscentsView from '@/views/me/MyAscentsView'
import MySubscribersView from '@/views/me/MySubscribersView'
import MyGuideBooksView from '@/views/me/MyGuideBooksView'
import MyFavoritesView from '@/views/me/MyFavoritesView'
import MessengerView from '@/views/me/MessengerView'
import MyPartnerSettingsView from '@/views/me/actions/MyPartnerSettingsView'
import MySettingsView from '@/views/me/MySettingsView'
import MyEditView from '@/views/me/actions/MyEditView'
import MySendListView from '@/views/me/MySendListView'
import MyTickListView from '@/views/me/MyTickListView'
import MyAnalytiksView from '@/views/me/MyAnalytiksView'

export default [
  {
    path: '/me/:userSlug/avatar',
    component: MyAvatarView,
    meta: {
      requiresAuth: true,
      title: 'myAvatar',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/banner',
    component: MyBannerView,
    meta: {
      requiresAuth: true,
      title: 'myBanner',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/settings',
    component: MySettingsView,
    meta: {
      requiresAuth: true,
      title: 'mySettings',
      showTitle: false
    },
    children: [
      {
        path: 'general',
        component: MyEditView,
        meta: {
          requiresAuth: true,
          title: 'mySettings',
          showTitle: false
        }
      },
      {
        path: 'partner',
        component: MyPartnerSettingsView,
        meta: {
          requiresAuth: true,
          title: 'myPartnerSettings',
          showTitle: false
        }
      }
    ]
  },
  {
    path: '/me/:userSlug/ascents',
    component: MyAscentsView,
    meta: {
      requiresAuth: true,
      title: 'myAscents',
      showTitle: true
    },
    children: [
      {
        path: 'send-list',
        component: MySendListView,
        meta: {
          requiresAuth: true,
          title: 'myAscents',
          showTitle: true
        }
      },
      {
        path: 'tick-list',
        component: MyTickListView,
        meta: {
          requiresAuth: true,
          title: 'myAscents',
          showTitle: true
        }
      },
      {
        path: 'analytiks',
        component: MyAnalytiksView,
        meta: {
          requiresAuth: true,
          title: 'myAscents',
          showTitle: true
        }
      }
    ]
  },
  {
    path: '/me/:userSlug/subscribers',
    component: MySubscribersView,
    meta: {
      requiresAuth: true,
      title: 'mySubscribers',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/guide-books',
    component: MyGuideBooksView,
    meta: {
      requiresAuth: true,
      title: 'myGuideBooks',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/favorites',
    component: MyFavoritesView,
    meta: {
      requiresAuth: true,
      title: 'myFavorites',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/messenger',
    component: MessengerView,
    meta: {
      requiresAuth: true,
      title: 'messenger',
      showTitle: true
    }
  }
]
