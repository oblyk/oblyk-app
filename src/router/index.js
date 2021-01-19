import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

import GeneralRouter from '@/router/modules/GeneralRouter'
import WordRouter from '@/router/modules/WordRouter'
import SearchRouter from '@/router/modules/SearchRouter'
import SessionRouter from '@/router/modules/SessionRouter'
import UserRouter from '@/router/modules/UserRouter'
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

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...GeneralRouter,
    ...WordRouter,
    ...SearchRouter,
    ...GymRouter,
    ...GymAdministratorRouter,
    ...GymGradeRouter,
    ...GymSpaceRouter,
    ...GymSectorRouter,
    ...GymRouteRouter,
    ...CragRouter,
    ...SessionRouter,
    ...UserRouter,
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
    ...GuideBookPdfRouter
  ]
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
