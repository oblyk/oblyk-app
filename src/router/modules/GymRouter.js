import GymMapView from '@/views/maps/GymMapView'
import GymView from '@/views/GymView'
import GymInfoView from '@/views/gyms/GymInfoView'
import GymEditView from '@/views/gyms/actions/GymEditView'
import GymNewView from '@/views/gyms/actions/GymNewView'
import GymLogoView from '@/views/gyms/actions/GymLogoView'
import GymBannerView from '@/views/gyms/actions/GymBannerView'
import GymGradeListView from '@/views/gymGrades/GymGradeListView'
import GymFirstSpaceView from '@/views/gyms/GymFirstSpaceView'
import GymAdministratorRequiredView from '@/views/gyms/GymAdministratorRequiredView'
import GymAdministrationRequestView from '@/views/gyms/GymAdministrationRequestView'
import GymFirstDifficultySystemView from '@/views/gymGrades/GymFirstDifficultySystemView'
import GymAdminView from '@/views/gyms/GymAdminView'

export default [
  {
    path: '/maps/gyms',
    component: GymMapView,
    meta: {
      title: 'gymMap',
      showTitle: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug',
    component: GymView,
    props: true,
    meta: {
      noPaddingTop: true
    },
    children: [
      {
        path: 'infos',
        component: GymInfoView,
        meta: {
          noPaddingTop: true,
          objectName: 'gym'
        }
      },
      {
        path: 'first-space',
        component: GymFirstSpaceView,
        meta: {
          noPaddingTop: true,
          objectName: 'gym'
        }
      },
      {
        path: 'administrator-required',
        component: GymAdministratorRequiredView,
        meta: {
          noPaddingTop: true,
          objectName: 'gym'
        }
      }
    ]
  },
  {
    path: '/gyms/:gymId/:gymSlug/edit',
    component: GymEditView,
    props: true,
    meta: {
      requiresAuth: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/first-difficulty-system',
    component: GymFirstDifficultySystemView,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/grades-list',
    component: GymGradeListView,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/administration-request',
    component: GymAdministrationRequestView,
    meta: {
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/logo',
    component: GymLogoView,
    props: true,
    meta: {
      requiresAuth: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/banner',
    component: GymBannerView,
    props: true,
    meta: {
      requiresAuth: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/admin',
    component: GymAdminView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/new',
    component: GymNewView,
    meta: {
      requiresAuth: true,
      title: 'newGym',
      showTitle: false
    }
  }
]
