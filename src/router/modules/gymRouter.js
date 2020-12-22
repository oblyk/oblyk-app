import GymMapView from '@/views/maps/GymMapView'
import GymView from '@/views/GymView'
import GymInfoView from '@/views/gyms/GymInfoView'
import GymEditView from '@/views/gyms/actions/GymEditView'
import GymNewView from '@/views/gyms/actions/GymNewView'
import GymLogoView from '@/views/gyms/actions/GymLogoView'
import GymBannerView from '@/views/gyms/actions/GymBannerView'

export default [
  {
    path: '/maps/gyms',
    name: 'GymMapView',
    component: GymMapView,
    meta: {
      title: 'Carte des salles'
    }
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
    path: '/gyms/:gymId/:slug/logo',
    name: 'GymLogo',
    component: GymLogoView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/gyms/:gymId/:slug/banner',
    name: 'GymBanner',
    component: GymBannerView,
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
  }
]
