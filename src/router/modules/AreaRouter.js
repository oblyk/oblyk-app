import AreaNewView from '@/views/areas/actions/AreaNewView'
import AreaEditView from '@/views/areas/actions/AreaEditView'
import AreaView from '@/views/AreaView'
import AreaInfoView from '@/views/areas/AreaInfoView'
import AreaCragsView from '@/views/areas/AreaCragsView'
import AddCragInAreaView from '@/views/areas/actions/AddCragInAreaView'
import AreaPhotosView from '@/views/areas/AreaPhotosView'

export default [
  {
    path: '/areas/new',
    component: AreaNewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/areas/:areaId/:areaSlug/edit',
    component: AreaEditView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/areas/:areaId/:areaSlug/add-crag',
    component: AddCragInAreaView,
    meta: {
      requiresAuth: true,
      objectName: 'area',
      showAvatar: true
    }
  },
  {
    path: '/areas/:areaId/:areaSlug',
    component: AreaView,
    meta: {
      objectName: 'area'
    },
    children: [
      {
        path: 'infos',
        component: AreaInfoView,
        meta: {
          noPaddingTop: true,
          objectName: 'area'
        }
      },
      {
        path: 'crags',
        component: AreaCragsView,
        meta: {
          noPaddingTop: true,
          objectName: 'area'
        }
      },
      {
        path: 'photos',
        component: AreaPhotosView,
        meta: {
          noPaddingTop: true,
          objectName: 'area'
        }
      }
    ]
  }
]
