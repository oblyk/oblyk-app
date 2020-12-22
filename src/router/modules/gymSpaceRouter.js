import GymSpaceView from '@/views/gymSapces/GymSpaceView'
import GymSpaceNewView from '@/views/gymSapces/actions/GymSpaceNewView'

export default [
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:slug',
    name: 'GymSpace',
    component: GymSpaceView,
    props: true
  },

  {
    path: '/gyms/:gymId/:gymSlug/spaces/new',
    name: 'GymSpace',
    component: GymSpaceNewView,
    props: true
  }
]
