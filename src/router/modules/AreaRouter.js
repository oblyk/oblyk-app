const AreaNewView = () => import(/* webpackChunkName: "area-routes" */ '@/views/areas/actions/AreaNewView')
const AreaEditView = () => import(/* webpackChunkName: "area-routes" */ '@/views/areas/actions/AreaEditView')
const AreaView = () => import(/* webpackChunkName: "area-routes" */ '@/views/AreaView')
const AreaInfoView = () => import(/* webpackChunkName: "area-routes" */ '@/views/areas/AreaInfoView')
const AreaCragsView = () => import(/* webpackChunkName: "area-routes" */ '@/views/areas/AreaCragsView')
const AddCragInAreaView = () => import(/* webpackChunkName: "area-routes" */ '@/views/areas/actions/AddCragInAreaView')
const AreaPhotosView = () => import(/* webpackChunkName: "area-routes" */ '@/views/areas/AreaPhotosView')

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
      requiresAuth: true
    }
  },
  {
    path: '/areas/:areaId/:areaSlug',
    component: AreaView,
    children: [
      {
        path: '',
        component: AreaInfoView,
        meta: {
          noPaddingTop: true
        }
      },
      {
        path: 'crags',
        component: AreaCragsView,
        meta: {
          noPaddingTop: true
        }
      },
      {
        path: 'photos',
        component: AreaPhotosView,
        meta: {
          noPaddingTop: true
        }
      }
    ]
  }
]
