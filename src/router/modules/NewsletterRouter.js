const NewsletterListView = () => import(/* webpackChunkName: "newsletter-routes" */ '@/views/newsletters/NewsletterListView')
const NewsletterNewView = () => import(/* webpackChunkName: "newsletter-routes" */ '@/views/newsletters/actions/NewsletterNewView')
const NewsletterEditView = () => import(/* webpackChunkName: "newsletter-routes" */ '@/views/newsletters/actions/NewsletterEditView')
const NewsletterView = () => import(/* webpackChunkName: "newsletter-routes" */ '@/views/newsletters/NewsletterView')
const NewsletterPhotoListView = () => import(/* webpackChunkName: "newsletter-routes" */ '@/views/newsletters/NewsletterPhotoListView')
const NewsletterSubscribeView = () => import(/* webpackChunkName: "newsletter-routes" */ '@/views/newsletters/NewsletterSubscribeView')
const NewsletterSuccessSubscribeView = () => import(/* webpackChunkName: "newsletter-routes" */ '@/views/newsletters/NewsletterSuccessSubscribeView')
const NewsletterUnsubscribeView = () => import(/* webpackChunkName: "newsletter-routes" */ '@/views/newsletters/NewsletterUnsubscribeView')
const NewsletterSuccessUnsubscribeView = () => import(/* webpackChunkName: "newsletter-routes" */ '@/views/newsletters/NewsletterSuccessUnsubscribeView')

export default [
  {
    path: '/newsletters',
    component: NewsletterListView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true,
      title: 'newsletters',
      showTitle: true
    }
  },

  {
    path: '/newsletters/new',
    component: NewsletterNewView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true,
      title: 'newsletters',
      showTitle: true
    }
  },
  {
    path: '/newsletters/:newsletterId/:newsletterSlug/edit',
    component: NewsletterEditView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true,
      title: 'editNewsletter',
      showTitle: true
    }
  },
  {
    path: '/newsletters/:newsletterId/:newsletterSlug',
    component: NewsletterView,
    meta: {
      objectName: 'newsletter',
      noPaddingTop: false,
      showTitle: true
    }
  },
  {
    path: '/newsletters/:newsletterId/:newsletterSlug/photos',
    component: NewsletterPhotoListView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true,
      title: 'newsletterPhotos',
      showTitle: true
    }
  },
  {
    path: '/newsletters/subscribe',
    component: NewsletterSubscribeView,
    meta: {
      title: 'newsletterSubscribe',
      showTitle: true
    }
  },
  {
    path: '/newsletters/successful-subscribe',
    component: NewsletterSuccessSubscribeView,
    meta: {
      title: 'newsletterSubscribe',
      showTitle: true
    }
  },
  {
    path: '/newsletters/unsubscribe',
    component: NewsletterUnsubscribeView,
    meta: {
      title: 'newsletterUnsubscribe',
      showTitle: true
    }
  },
  {
    path: '/newsletters/successful-unsubscribe',
    component: NewsletterSuccessUnsubscribeView,
    meta: {
      title: 'newsletterUnsubscribe',
      showTitle: true
    }
  }
]
