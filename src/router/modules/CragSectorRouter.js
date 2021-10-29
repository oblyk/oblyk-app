const CragSectorNewView = () => import(/* webpackChunkName: "CragSectorRouter-CragSectorNewView" */ '@/views/cragSectors/actions/CragSectorNewView')
const CragSectorEditView = () => import(/* webpackChunkName: "CragSectorRouter-CragSectorEditView" */ '@/views/cragSectors/actions/CragSectorEditView')
const CragSectorInfoView = () => import(/* webpackChunkName: "CragSectorRouter-CragSectorInfoView" */ '@/views/cragSectors/CragSectorInfoView')
const CragSectorView = () => import(/* webpackChunkName: "CragSectorRouter-CragSectorView" */ '@/views/CragSectorView')
const CragSectorPhotosView = () => import(/* webpackChunkName: "CragSectorRouter-CragSectorPhotosView" */ '@/views/cragSectors/CragSectorPhotosView')
const CragSectorMapView = () => import(/* webpackChunkName: "CragSectorRouter-CragSectorMapView" */ '@/views/cragSectors/CragSectorMapView')
const CragRouteNewView = () => import(/* webpackChunkName: "CragSectorRouter-CragRouteNewView" */ '@/views/cragRoutes/actions/CragRouteNewView')

export default [
  {
    path: '/crags/:cragId/:cragSlug/sectors/new',
    component: CragSectorNewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/sectors/:cragSectorId/:cragSectorSlug/edit',
    component: CragSectorEditView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/sectors/:cragSectorId/:cragSectorSlug/routes/new',
    component: CragRouteNewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/sectors/:cragSectorId/:cragSectorSlug',
    component: CragSectorView,
    children: [
      {
        path: 'infos',
        component: CragSectorInfoView
      },
      {
        path: 'photos',
        component: CragSectorPhotosView
      },
      {
        path: 'maps',
        component: CragSectorMapView
      }
    ]
  }
]
