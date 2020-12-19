import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

// Global
import HomeView from '../views/HomeView.vue'
import SearchView from '@/views/SearchView'
// Session
import SignInView from '@/views/sessions/SignInView'
import SignUpView from '@/views/sessions/SignUpView'
// Crag
import CragMapView from '@/views/maps/CragMapView'
import CragView from '@/views/CragView'
import CragInfoView from '@/views/crags/CragInfoView'
import CragRouteView from '@/views/crags/CragRouteView'
import CragPhotosView from '@/views/crags/CragPhotosView'
import CragGuideBooksView from '@/views/crags/CragGuideBooksView'
import CragMapDetailsView from '@/views/crags/CragMapDetailsView'
// Gym
import GymMapView from '@/views/maps/GymMapView'
import GymView from '@/views/GymView'
import GymInfoView from '@/views/gyms/GymInfoView'
import GymEditView from '@/views/gyms/actions/GymEditView'
import GymNewView from '@/views/gyms/actions/GymNewView'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
      meta: {
        title: 'Oblyk'
      }
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/search',
      name: 'SearchView',
      component: SearchView,
      meta: {
        title: 'Chercher'
      }
    },
    {
      path: '/maps/crags',
      name: 'CragMapView',
      component: CragMapView,
      meta: {
        title: 'Carte des falaises'
      }
    },
    {
      path: '/maps/gyms',
      name: 'GymMapView',
      component: GymMapView,
      meta: {
        title: 'Carte des salles'
      }
    },
    {
      path: '/crags/:cragId/:slug',
      name: 'CragView',
      component: CragView,
      props: true,
      meta: {
        title: 'Infos site'
      },
      children: [
        {
          path: 'infos',
          component: CragInfoView,
          meta: {
            title: 'Infos site'
          }
        },
        {
          path: 'routes',
          component: CragRouteView,
          meta: {
            title: 'Les lignes'
          }
        },
        {
          path: 'photos',
          component: CragPhotosView,
          meta: {
            title: 'Photos & Vidéos'
          }
        },
        {
          path: 'guide-books',
          component: CragGuideBooksView,
          meta: {
            title: 'Les topos'
          }
        },
        {
          path: 'maps',
          component: CragMapDetailsView,
          meta: {
            title: 'Carte'
          }
        }
      ]
    },
    {
      path: '/gyms/:gymId/:slug',
      name: 'GymView',
      component: GymView,
      props: true,
      meta: {
        title: 'Infos salle'
      },
      children: [
        {
          path: 'infos',
          component: GymInfoView,
          meta: {
            title: 'Infos salle'
          }
        }
      ]
    },
    {
      path: '/gyms/:gymId/:slug/edit',
      name: 'GymEdit',
      component: GymEditView,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/gyms/new',
      name: 'GymNew',
      component: GymNewView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign-in',
      name: 'SignInView',
      component: SignInView,
      meta: {
        title: 'Me connecter'
      }
    },
    {
      path: '/sign-up',
      name: 'SignUpView',
      component: SignUpView,
      meta: {
        title: 'Me créer un compte'
      }
    }
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
