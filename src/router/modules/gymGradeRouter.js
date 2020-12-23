import GymGradeNewView from '@/views/gymGrades/actions/GymGradeNewView'
import GymGradeView from '@/views/gymGrades/GymGradeView'
import GymGradeEditView from '@/views/gymGrades/actions/GymGradeEditView'

export default [
  {
    path: '/gyms/:gymId/:gymSlug/grades/:gymGradeId/infos',
    component: GymGradeView,
    props: true
  },
  {
    path: '/gyms/:gymId/:gymSlug/grades/:gymGradeId/edit',
    component: GymGradeEditView,
    props: true
  },
  {
    path: '/gyms/:gymId/:gymSlug/grades/new',
    component: GymGradeNewView,
    props: true
  }
]
