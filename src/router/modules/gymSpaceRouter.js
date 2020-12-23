import GymSpaceView from '@/views/gymSapces/GymSpaceView'
import GymSpaceNewView from '@/views/gymSapces/actions/GymSpaceNewView'
import GymSpaceEditView from '@/views/gymSapces/actions/GymSpaceEditView'
import GymSpacePlanView from '@/views/gymSapces/actions/GymSpacePlanView'

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
