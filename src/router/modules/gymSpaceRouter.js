import GymSpaceView from '@/views/gymSpaces/GymSpaceView'
import GymSpaceNewView from '@/views/gymSpaces/actions/GymSpaceNewView'
import GymSpaceEditView from '@/views/gymSpaces/actions/GymSpaceEditView'
import GymSpacePlanView from '@/views/gymSpaces/actions/GymSpacePlanView'

export default [
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/plan',
    component: GymSpaceView,
    props: true
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/edit',
    component: GymSpaceEditView,
    props: true
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/upload-plan',
    component: GymSpacePlanView,
    props: true
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/new',
    component: GymSpaceNewView,
    props: true
  }
]
