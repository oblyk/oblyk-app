const AreaNewView = () => import(/* webpackChunkName: "AreaRouter-AreaNewView" */ '@/views/areas/actions/AreaNewView')
const AreaEditView = () => import(/* webpackChunkName: "AreaRouter-AreaEditView" */ '@/views/areas/actions/AreaEditView')
const AreaView = () => import(/* webpackChunkName: "AreaRouter-AreaView" */ '@/views/AreaView')
const AreaInfoView = () => import(/* webpackChunkName: "AreaRouter-AreaInfoView" */ '@/views/areas/AreaInfoView')
const AreaCragsView = () => import(/* webpackChunkName: "AreaRouter-AreaCragsView" */ '@/views/areas/AreaCragsView')
const AddCragInAreaView = () => import(/* webpackChunkName: "AreaRouter-AddCragInAreaView" */ '@/views/areas/actions/AddCragInAreaView')
const AreaPhotosView = () => import(/* webpackChunkName: "AreaRouter-AreaPhotosView" */ '@/views/areas/AreaPhotosView')

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
