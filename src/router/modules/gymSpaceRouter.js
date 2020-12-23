import GymSpaceView from '@/views/gymSapces/GymSpaceView'
import GymSpaceNewView from '@/views/gymSapces/actions/GymSpaceNewView'
import GymSpaceEditView from '@/views/gymSapces/actions/GymSpaceEditView'

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
    path: '/gyms/:gymId/:gymSlug/spaces/new',
    component: GymSpaceNewView,
    props: true
  }
]
