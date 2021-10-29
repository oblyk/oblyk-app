const GymGradeNewView = () => import(/* webpackChunkName: "GymGradeRouter-GymGradeNewView" */ '@/views/gymGrades/actions/GymGradeNewView')
const GymGradeView = () => import(/* webpackChunkName: "GymGradeRouter-GymGradeView" */ '@/views/gymGrades/GymGradeView')
const GymGradeEditView = () => import(/* webpackChunkName: "GymGradeRouter-GymGradeEditView" */ '@/views/gymGrades/actions/GymGradeEditView')
const GymGradeLineNewView = () => import(/* webpackChunkName: "GymGradeRouter-GymGradeLineNewView" */ '@/views/gymGrades/actions/GymGradeLineNewView')
const GymGradeLineEditView = () => import(/* webpackChunkName: "GymGradeRouter-GymGradeLineEditView" */ '@/views/gymGrades/actions/GymGradeLineEditView')

export default [
  {
    path: '/gyms/:gymId/:gymSlug/grades/:gymGradeId/infos',
    component: GymGradeView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/grades/:gymGradeId/edit',
    component: GymGradeEditView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/grades/new',
    component: GymGradeNewView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },

  // Grade line
  {
    path: '/gyms/:gymId/:gymSlug/grades/:gymGradeId/grade-lines/new',
    component: GymGradeLineNewView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  },
  {
    path: '/gyms/:gymId/:gymSlug/grades/:gymGradeId/grade-lines/:gymGradeLineId/edit',
    component: GymGradeLineEditView,
    props: true,
    meta: {
      requiresAuth: true,
      requiresGymAdministrator: true
    }
  }
]
