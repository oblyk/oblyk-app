const NewsletterListView = () => import(/* webpackChunkName: "NewsletterRouter-NewsletterListView" */ '@/views/newsletters/NewsletterListView')
const NewsletterNewView = () => import(/* webpackChunkName: "NewsletterRouter-NewsletterNewView" */ '@/views/newsletters/actions/NewsletterNewView')
const NewsletterEditView = () => import(/* webpackChunkName: "NewsletterRouter-NewsletterEditView" */ '@/views/newsletters/actions/NewsletterEditView')
const NewsletterView = () => import(/* webpackChunkName: "NewsletterRouter-NewsletterView" */ '@/views/newsletters/NewsletterView')
const NewsletterPhotoListView = () => import(/* webpackChunkName: "NewsletterRouter-NewsletterPhotoListView" */ '@/views/newsletters/NewsletterPhotoListView')
const NewsletterSubscribeView = () => import(/* webpackChunkName: "NewsletterRouter-NewsletterSubscribeView" */ '@/views/newsletters/NewsletterSubscribeView')
const NewsletterSuccessSubscribeView = () => import(/* webpackChunkName: "NewsletterRouter-NewsletterSuccessSubscribeView" */ '@/views/newsletters/NewsletterSuccessSubscribeView')
const NewsletterUnsubscribeView = () => import(/* webpackChunkName: "NewsletterRouter-NewsletterUnsubscribeView" */ '@/views/newsletters/NewsletterUnsubscribeView')
const NewsletterSuccessUnsubscribeView = () => import(/* webpackChunkName: "NewsletterRouter-NewsletterSuccessUnsubscribeView" */ '@/views/newsletters/NewsletterSuccessUnsubscribeView')

export default [
  {
    path: '/newsletters',
    component: NewsletterListView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true
    }
  },

  {
    path: '/newsletters/new',
    component: NewsletterNewView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true
    }
  },
  {
    path: '/newsletters/:newsletterId/:newsletterSlug/edit',
    component: NewsletterEditView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true
    }
  },
  {
    path: '/newsletters/:newsletterId/:newsletterSlug',
    component: NewsletterView,
    meta: {
      noPaddingTop: false
    }
  },
  {
    path: '/newsletters/:newsletterId/:newsletterSlug/photos',
    component: NewsletterPhotoListView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true
    }
  },
  {
    path: '/newsletters/subscribe',
    component: NewsletterSubscribeView
  },
  {
    path: '/newsletters/successful-subscribe',
    component: NewsletterSuccessSubscribeView
  },
  {
    path: '/newsletters/unsubscribe',
    component: NewsletterUnsubscribeView
  },
  {
    path: '/newsletters/successful-unsubscribe',
    component: NewsletterSuccessUnsubscribeView
  }
]
