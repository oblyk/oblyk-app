import GymGradeNewView from '@/views/gymGrades/actions/GymGradeNewView'
import GymGradeView from '@/views/gymGrades/GymGradeView'
import GymGradeEditView from '@/views/gymGrades/actions/GymGradeEditView'
import GymGradeLineNewView from '@/views/gymGrades/actions/GymGradeLineNewView'
import GymGradeLineEditView from '@/views/gymGrades/actions/GymGradeLineEditView'

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
