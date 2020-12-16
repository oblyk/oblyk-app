import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '@/views/sessions/SignIn'
import Search from '@/views/Search'
import CragMapPage from '@/views/CragMapPage'
import CragPage from '@/views/CragPage'
import CragInfoPage from '@/views/crags/CragInfoPage'
import CragRoutePage from '@/views/crags/CragRoutePage'
import CragPhotosPage from '@/views/crags/CragPhotosPage'
import CragGuideBooksPage from '@/views/crags/CragGuideBooksPage'
import CragMapDetailsPage from '@/views/crags/CragMapDetailsPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    name: 'Search',
    component: Search,
    meta: {
      title: 'Chercher'
    }
  },
  {
    path: '/maps/crags',
    name: 'CragMapPage',
    component: CragMapPage,
    meta: {
      title: 'Carte des falaises'
    }
  },
  {
    path: '/crags/:cragId/:slug',
    name: 'CragPage',
    component: CragPage,
    props: true,
    meta: {
      title: 'Infos site'
    },
    children: [
      {
        path: 'infos',
        component: CragInfoPage,
        meta: {
          title: 'Infos site'
        }
      },
      {
        path: 'routes',
        component: CragRoutePage,
        meta: {
          title: 'Les lignes'
        }
      },
      {
        path: 'photos',
        component: CragPhotosPage,
        meta: {
          title: 'Photos & Vidéos'
        }
      },
      {
        path: 'guide-books',
        component: CragGuideBooksPage,
        meta: {
          title: 'Les topos'
        }
      },
      {
        path: 'maps',
        component: CragMapDetailsPage,
        meta: {
          title: 'Carte'
        }
      }
    ]
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    meta: {
      title: 'Me connecter'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
