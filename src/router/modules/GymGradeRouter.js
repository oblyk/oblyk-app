const GymGradeNewView = () => import(/* webpackChunkName: "gym-grade-routes" */ '@/views/gymGrades/actions/GymGradeNewView')
const GymGradeView = () => import(/* webpackChunkName: "gym-grade-routes" */ '@/views/gymGrades/GymGradeView')
const GymGradeEditView = () => import(/* webpackChunkName: "gym-grade-routes" */ '@/views/gymGrades/actions/GymGradeEditView')
const GymGradeLineNewView = () => import(/* webpackChunkName: "gym-grade-routes" */ '@/views/gymGrades/actions/GymGradeLineNewView')
const GymGradeLineEditView = () => import(/* webpackChunkName: "gym-grade-routes" */ '@/views/gymGrades/actions/GymGradeLineEditView')

export default [
  {
    path: '/gyms/:gymId/:gymSlug/grades/:gymGradeId/infos',
    component: GymGradeView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/grades/:gymGradeId/edit',
    component: GymGradeEditView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/grades/new',
    component: GymGradeNewView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  },

  // Grade line
  {
    path: '/gyms/:gymId/:gymSlug/grades/:gymGradeId/grade-lines/new',
    component: GymGradeLineNewView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/grades/:gymGradeId/grade-lines/:gymGradeLineId/edit',
    component: GymGradeLineEditView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true,
      objectName: 'gym',
      showAvatar: true
    }
  }
]
