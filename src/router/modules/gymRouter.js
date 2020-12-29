import GymMapView from '@/views/maps/GymMapView'
import GymView from '@/views/GymView'
import GymInfoView from '@/views/gyms/GymInfoView'
import GymEditView from '@/views/gyms/actions/GymEditView'
import GymNewView from '@/views/gyms/actions/GymNewView'
import GymLogoView from '@/views/gyms/actions/GymLogoView'
import GymBannerView from '@/views/gyms/actions/GymBannerView'
import GymGradeListView from '@/views/gyms/GymGradeListView'
import GymFirstSpaceView from '@/views/gyms/GymFirstSpaceView'
import GymAdministratorRequiredView from '@/views/gyms/GymAdministratorRequiredView'
import GymAdministrationRequestView from '@/views/gyms/GymAdministrationRequestView'
import GymFirstDifficultySystemView from '@/views/gyms/GymFirstDifficultySystemView'

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
    path: '/gyms/:gymId/:gymSlug',
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
      },
      {
        path: 'first-space',
        component: GymFirstSpaceView
      },
      {
        path: 'first-difficulty-system',
        component: GymFirstDifficultySystemView
      },
      {
        path: 'administrator-required',
        component: GymAdministratorRequiredView
      },
      {
        path: 'grades-list',
        component: GymGradeListView,
        meta: {
          title: 'Liste des difficultés',
          requiresAuth: true,
          requiresGymAdministrator: true
        }
      }
    ]
  },
  {
    path: '/gyms/:gymId/:gymSlug/edit',
    name: 'GymEdit',
    component: GymEditView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/administration-request',
    component: GymAdministrationRequestView
  },
  {
    path: '/gyms/:gymId/:gymSlug/logo',
    name: 'GymLogo',
    component: GymLogoView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/banner',
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
