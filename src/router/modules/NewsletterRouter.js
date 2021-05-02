import NewsletterListView from '@/views/newsletters/NewsletterListView'
import NewsletterNewView from '@/views/newsletters/actions/NewsletterNewView'
import NewsletterEditView from '@/views/newsletters/actions/NewsletterEditView'
import NewsletterView from '@/views/newsletters/NewsletterView'
import NewsletterPhotoListView from '@/views/newsletters/NewsletterPhotoListView'
import NewsletterSubscribeView from '@/views/newsletters/NewsletterSubscribeView'
import NewsletterSuccessSubscribeView from '@/views/newsletters/NewsletterSuccessSubscribeView'
import NewsletterUnsubscribeView from '@/views/newsletters/NewsletterUnsubscribeView'
import NewsletterSuccessUnsubscribeView from '@/views/newsletters/NewsletterSuccessUnsubscribeView'

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
