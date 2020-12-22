import CragMapView from '@/views/maps/CragMapView'
import CragView from '@/views/CragView'
import CragInfoView from '@/views/crags/CragInfoView'
import CragRouteView from '@/views/crags/CragRouteView'
import CragPhotosView from '@/views/crags/CragPhotosView'
import CragGuideBooksView from '@/views/crags/CragGuideBooksView'
import CragMapDetailsView from '@/views/crags/CragMapDetailsView'

export default [
  {
    path: '/maps/crags',
    name: 'CragMapView',
    component: CragMapView,
    meta: {
      title: 'Carte des falaises'
    }
  },
  {
    path: '/crags/:cragId/:slug',
    name: 'CragView',
    component: CragView,
    props: true,
    meta: {
      title: 'Infos site'
    },
    children: [
      {
        path: 'infos',
        component: CragInfoView,
        meta: {
          title: 'Infos site'
        }
      },
      {
        path: 'routes',
        component: CragRouteView,
        meta: {
          title: 'Les lignes'
        }
      },
      {
        path: 'photos',
        component: CragPhotosView,
        meta: {
          title: 'Photos & Vidéos'
        }
      },
      {
        path: 'guide-books',
        component: CragGuideBooksView,
        meta: {
          title: 'Les topos'
        }
      },
      {
        path: 'maps',
        component: CragMapDetailsView,
        meta: {
          title: 'Carte'
        }
      }
    ]
  }
]
