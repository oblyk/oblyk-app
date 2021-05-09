const CragSectorNewView = () => import(/* webpackChunkName: "crag-sector-routes" */ '@/views/cragSectors/actions/CragSectorNewView')
const CragSectorEditView = () => import(/* webpackChunkName: "crag-sector-routes" */ '@/views/cragSectors/actions/CragSectorEditView')
const CragSectorInfoView = () => import(/* webpackChunkName: "crag-sector-routes" */ '@/views/cragSectors/CragSectorInfoView')
const CragSectorView = () => import(/* webpackChunkName: "crag-sector-routes" */ '@/views/CragSectorView')
const CragSectorPhotosView = () => import(/* webpackChunkName: "crag-sector-routes" */ '@/views/cragSectors/CragSectorPhotosView')
const CragSectorMapView = () => import(/* webpackChunkName: "crag-sector-routes" */ '@/views/cragSectors/CragSectorMapView')
const CragRouteNewView = () => import(/* webpackChunkName: "crag-sector-routes" */ '@/views/cragRoutes/actions/CragRouteNewView')

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
