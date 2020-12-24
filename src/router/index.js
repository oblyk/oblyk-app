import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

import GeneralRouter from '@/router/modules/generalRouter'
import SearchRouter from '@/router/modules/searchRouter'
import SessionRouter from '@/router/modules/sessionRouter'
import CragRouter from '@/router/modules/cragRouter'
import GymRouter from '@/router/modules/gymRouter'
import GymSpaceRouter from '@/router/modules/gymSpaceRouter'
import GymSectorRouter from '@/router/modules/gymSectorRouter'
import GymGradeRouter from '@/router/modules/gymGradeRouter'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...GeneralRouter,
    ...SearchRouter,
    ...GymRouter,
    ...GymGradeRouter,
    ...GymSpaceRouter,
    ...GymSectorRouter,
    ...CragRouter,
    ...SessionRouter
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

export default router
