const GymMapView = () => import(/* webpackChunkName: "GymRouter-GymMapView" */ '@/views/maps/GymMapView')
const GymView = () => import(/* webpackChunkName: "GymRouter-GymView" */ '@/views/GymView')
const GymInfoView = () => import(/* webpackChunkName: "GymRouter-GymInfoView" */ '@/views/gyms/GymInfoView')
const GymEditView = () => import(/* webpackChunkName: "GymRouter-GymEditView" */ '@/views/gyms/actions/GymEditView')
const GymNewView = () => import(/* webpackChunkName: "GymRouter-GymNewView" */ '@/views/gyms/actions/GymNewView')
const GymLogoView = () => import(/* webpackChunkName: "GymRouter-GymLogoView" */ '@/views/gyms/actions/GymLogoView')
const GymBannerView = () => import(/* webpackChunkName: "GymRouter-GymBannerView" */ '@/views/gyms/actions/GymBannerView')
const GymGradeListView = () => import(/* webpackChunkName: "GymRouter-GymGradeListView" */ '@/views/gymGrades/GymGradeListView')
const GymFirstSpaceView = () => import(/* webpackChunkName: "GymRouter-GymFirstSpaceView" */ '@/views/gyms/GymFirstSpaceView')
const GymAdministratorRequiredView = () => import(/* webpackChunkName: "GymRouter-GymAdministratorRequiredView" */ '@/views/gyms/GymAdministratorRequiredView')
const GymAdministrationRequestView = () => import(/* webpackChunkName: "GymRouter-GymAdministrationRequestView" */ '@/views/gyms/GymAdministrationRequestView')
const GymFirstDifficultySystemView = () => import(/* webpackChunkName: "GymRouter-GymFirstDifficultySystemView" */ '@/views/gymGrades/GymFirstDifficultySystemView')
const GymAdminView = () => import(/* webpackChunkName: "GymRouter-GymAdminView" */ '@/views/gyms/GymAdminView')
const GymAdminRoutesView = () => import(/* webpackChunkName: "GymRouter-GymAdminRoutesView" */ '@/views/gyms/GymAdminRoutesView')
const GymAdminRoutesStatisticsView = () => import(/* webpackChunkName: "GymRouter-GymAdminRoutesStatisticsView" */ '@/views/gyms/GymAdminRoutesStatisticsView')
const GymAdminRoutesTablesView = () => import(/* webpackChunkName: "GymRouter-GymAdminRoutesTablesView" */ '@/views/gyms/GymAdminRoutesTablesView')

export default [
  {
    path: '/maps/gyms',
    component: GymMapView
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
        path: '',
        component: GymInfoView,
        meta: {
          noPaddingTop: true
        }
      },
      {
        path: 'first-space',
        component: GymFirstSpaceView,
        meta: {
          noPaddingTop: true
        }
      },
      {
        path: 'administrator-required',
        component: GymAdministratorRequiredView,
        meta: {
          noPaddingTop: true
        }
      }
    ]
  },
  {
    path: '/gyms/:gymId/:gymSlug/edit',
    component: GymEditView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/first-difficulty-system',
    component: GymFirstDifficultySystemView,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/grades-list',
    component: GymGradeListView,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/administration-request',
    component: GymAdministrationRequestView
  },
  {
    path: '/gyms/:gymId/:gymSlug/logo',
    component: GymLogoView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/banner',
    component: GymBannerView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/admin',
    component: GymAdminView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/admin/routes',
    component: GymAdminRoutesView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    },
    children: [
      {
        path: 'tables',
        component: GymAdminRoutesTablesView,
        meta: {
          requiresAuth: true,
          requiresGymAdministrator: true
        }
      },
      {
        path: 'statistics',
        component: GymAdminRoutesStatisticsView,
        meta: {
          requiresAuth: true,
          requiresGymAdministrator: true
        }
      }
    ]
  },
  {
    path: '/gyms/new',
    component: GymNewView,
    meta: {
      requiresAuth: true
    }
  }
]
