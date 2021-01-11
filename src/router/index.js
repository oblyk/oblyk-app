import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

import GeneralRouter from '@/router/modules/generalRouter'
import WordRouter from '@/router/modules/wordRouter'
import SearchRouter from '@/router/modules/searchRouter'
import SessionRouter from '@/router/modules/sessionRouter'
import UserRouter from '@/router/modules/userRouter'
import CragRouter from '@/router/modules/cragRouter'
import GymRouter from '@/router/modules/gymRouter'
import GymAdministratorRouter from '@/router/modules/gymAdministratorRouter'
import GymSpaceRouter from '@/router/modules/gymSpaceRouter'
import GymSectorRouter from '@/router/modules/gymSectorRouter'
import GymRouteRouter from '@/router/modules/gymRouteRouter'
import GymGradeRouter from '@/router/modules/gymGradeRouter'
import PhotoRouter from '@/router/modules/photoRouter'

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
    ...PhotoRouter
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
