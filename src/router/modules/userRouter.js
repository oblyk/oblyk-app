import MyAvatarView from '@/views/me/actions/MyAvatarView'
import MyBannerView from '@/views/me/actions/MyBannerView'
import MyEditView from '@/views/me/actions/MyEditView'
import MyAscentsView from '@/views/me/MyAscentsView'
import MySubscribersView from '@/views/me/MySubscribersView'
import MyGuideBooksView from '@/views/me/MyGuideBooksView'
import MyFavoritesView from '@/views/me/MyFavoritesView'
import MessengerView from '@/views/me/MessengerView'

export default [
  {
    path: '/me/:userSlug/avatar',
    component: MyAvatarView,
    meta: {
      title: 'myAvatar',
      showTitle: false,
      showAvatar: true,
      objectName: 'me'
    }
  },
  {
    path: '/me/:userSlug/banner',
    component: MyBannerView,
    meta: {
      title: 'myBanner',
      showTitle: false,
      showAvatar: true,
      objectName: 'me'
    }
  },
  {
    path: '/me/:userSlug/settings',
    component: MyEditView,
    meta: {
      title: 'mySettings',
      showTitle: false,
      showAvatar: true,
      objectName: 'me'
    }
  },
  {
    path: '/me/:userSlug/ascents',
    component: MyAscentsView,
    meta: {
      title: 'myAscents',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/subscribers',
    component: MySubscribersView,
    meta: {
      title: 'mySubscribers',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/guide-books',
    component: MyGuideBooksView,
    meta: {
      title: 'myGuideBooks',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/favorites',
    component: MyFavoritesView,
    meta: {
      title: 'myFavorites',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/messenger',
    component: MessengerView,
    meta: {
      title: 'messenger',
      showTitle: true
    }
  }
]
