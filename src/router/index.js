import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

import GeneralRouter from '@/router/modules/GeneralRouter'
import WordRouter from '@/router/modules/WordRouter'
import SessionRouter from '@/router/modules/SessionRouter'
import CurrentUserRouter from '@/router/modules/CurrentUserRouter'
import CragRouter from '@/router/modules/CragRouter'
import GymRouter from '@/router/modules/GymRouter'
import GymAdministratorRouter from '@/router/modules/GymAdministratorRouter'
import GymSpaceRouter from '@/router/modules/GymSpaceRouter'
import GymSectorRouter from '@/router/modules/GymSectorRouter'
import GymRouteRouter from '@/router/modules/GymRouteRouter'
import GymGradeRouter from '@/router/modules/GymGradeRouter'
import PhotoRouter from '@/router/modules/PhotoRouter'
import GuideBookPaperRouter from '@/router/modules/GuideBookPaperRouter'
import LinkRouter from '@/router/modules/LinkRouter'
import CommentRouter from '@/router/modules/CommentRouter'
import ReportRouter from '@/router/modules/ReportRouter'
import VideoRouter from '@/router/modules/VideoRouter'
import PlaceOfSaleRouter from '@/router/modules/PlaceOfSaleRouter'
import GuideBookPaperCragRouter from '@/router/modules/GuideBookPaperCragRouter'
import VersionRouter from '@/router/modules/VersionRouter'
import GuideBookWebRouter from '@/router/modules/GuideBookWebRouter'
import GuideBookPdfRouter from '@/router/modules/GuideBookPdfRouter'
import CragSectorRouter from '@/router/modules/CragSectorRouter'
import ParkRouter from '@/router/modules/ParkRouter'
import ApproachRouter from '@/router/modules/ApproachRouter'
import CragRouteRouter from '@/router/modules/CragRouteRouter'
import AreaRouter from '@/router/modules/AreaRouter'
import AscentCragRouteRouter from '@/router/modules/AscentCragRouteRouter'
import UserRouter from '@/router/modules/UserRouter'
import PartnerRouter from '@/router/modules/PartnerRouter'
import MessengerRouter from '@/router/modules/MessengerRouter'
import AlertRouter from '@/router/modules/AlertRouter'
import ArticleRouter from '@/router/modules/ArticleRouter'
import AuthorRouter from '@/router/modules/AuthorRouter'
import NotFoundView from '@/views/errors/NotFoundView'
import NotificationRouter from '@/router/modules/NotificationRouter'
import NewsletterRouter from '@/router/modules/NewsletterRouter'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...GeneralRouter,
    ...WordRouter,
    ...GymRouter,
    ...GymAdministratorRouter,
    ...GymGradeRouter,
    ...GymSpaceRouter,
    ...GymSectorRouter,
    ...GymRouteRouter,
    ...CragRouter,
    ...SessionRouter,
    ...CurrentUserRouter,
    ...PhotoRouter,
    ...GuideBookPaperRouter,
    ...GuideBookPaperCragRouter,
    ...LinkRouter,
    ...CommentRouter,
    ...ReportRouter,
    ...VideoRouter,
    ...PlaceOfSaleRouter,
    ...VersionRouter,
    ...GuideBookWebRouter,
    ...GuideBookPdfRouter,
    ...CragSectorRouter,
    ...ParkRouter,
    ...ApproachRouter,
    ...CragRouteRouter,
    ...AreaRouter,
    ...AscentCragRouteRouter,
    ...UserRouter,
    ...PartnerRouter,
    ...MessengerRouter,
    ...AlertRouter,
    ...ArticleRouter,
    ...AuthorRouter,
    ...NotificationRouter,
    ...NewsletterRouter,
    {
      path: '*',
      component: NotFoundView
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.meta.nestedPages === undefined || to.meta.nestedPages !== from.meta.nestedPages) {
        return { x: 0, y: 0 }
      }
    }
  }
})

// check if the user is logged in
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isLoggedIn']) {
      next()
      return
    }
    next(`/sign-in?redirect_to=${to.fullPath}`)
  } else {
    next()
  }
})

// check if the user is super admin
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresSuperAdmin)) {
    if (store.getters['auth/isSuperAdmin']) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

// check if the user is an gym administrator
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresGymAdministrator)) {
    const administeredGyms = store.getters['auth/administeredGyms']
    const gymId = parseInt(to.params.gymId)
    if (administeredGyms.includes(gymId)) {
      next()
      return
    }
    next(`/gyms/${to.params.gymId}/${to.params.gymSlug}/administrator-required`)
  } else {
    next()
  }
})
export default router
