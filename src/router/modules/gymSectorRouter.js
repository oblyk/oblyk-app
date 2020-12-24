import GymSectorNewView from '@/views/gymSectors/actions/GymSectorNewView'
import GymSectorEditView from '@/views/gymSectors/actions/GymSectorEditView'

export default [
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/sectors/new',
    component: GymSectorNewView,
    props: true
  },
  {
    path: '/gyms/:gymId/:gymSlug/spaces/:gymSpaceId/:gymSpaceSlug/sectors/:gymSectorId/edit',
    component: GymSectorEditView,
    props: true
  }
]
