import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

import GeneralRoutes from '@/router/modules/general'
import SearchRoutes from '@/router/modules/search'
import SessionRoutes from '@/router/modules/session'
import CragRoutes from '@/router/modules/crag'
import GymRoutes from '@/router/modules/gym'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...GeneralRoutes,
    ...SearchRoutes,
    ...GymRoutes,
    ...CragRoutes,
    ...SessionRoutes
  ]
})

// check if the user is logged in
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isLoggedIn']) {
      next()
      return
    }
    next('/sign-in')
  } else {
    next()
  }
})

export default router
