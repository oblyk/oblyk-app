const GymMapView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/maps/GymMapView')
const GymView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/GymView')
const GymInfoView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/gyms/GymInfoView')
const GymEditView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/gyms/actions/GymEditView')
const GymNewView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/gyms/actions/GymNewView')
const GymLogoView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/gyms/actions/GymLogoView')
const GymBannerView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/gyms/actions/GymBannerView')
const GymGradeListView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/gymGrades/GymGradeListView')
const GymFirstSpaceView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/gyms/GymFirstSpaceView')
const GymAdministratorRequiredView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/gyms/GymAdministratorRequiredView')
const GymAdministrationRequestView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/gyms/GymAdministrationRequestView')
const GymFirstDifficultySystemView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/gymGrades/GymFirstDifficultySystemView')
const GymAdminView = () => import(/* webpackChunkName: "gym-routes" */ '@/views/gyms/GymAdminView')

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
