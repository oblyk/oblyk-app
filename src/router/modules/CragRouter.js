import CragMapboxView from '@/views/maps/CragMapboxView'
import CragMapView from '@/views/maps/CragMapView'
import CragView from '@/views/CragView'
import CragInfoView from '@/views/crags/CragInfoView'
import CragRouteView from '@/views/crags/CragRouteView'
import CragPhotosView from '@/views/crags/CragPhotosView'
import CragGuideBooksView from '@/views/crags/CragGuideBooksView'
import CragMapDetailsView from '@/views/crags/CragMapDetailsView'
import CragNewView from '@/views/crags/actions/CragNewView'
import CragEditView from '@/views/crags/actions/CragEditView'
import AddGuideBookOnCragView from '@/views/crags/actions/AddGuideBookOnCragView'
import GuideBookWebNewView from '@/views/guideBookWebs/actions/GuideBookWebNewView'
import GuideBookPdfNewView from '@/views/guideBookPdfs/actions/GuideBookPdfNewView'
import CragLinkView from '@/views/crags/CragLinkView'

export default [
  {
    path: '/maps/3d/crags',
    component: CragMapboxView,
    meta: {
      title: 'cragMap',
      showTitle: true
    }
  },
  {
    path: '/maps/crags',
    component: CragMapView,
    meta: {
      title: 'cragMap',
      showTitle: true
    }
  },
  {
    path: '/crags/new',
    component: CragNewView,
    meta: {
      requiresAuth: true,
      title: 'newCrag',
      showTitle: false
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/edit',
    component: CragEditView,
    meta: {
      requiresAuth: true,
      objectName: 'crag',
      showAvatar: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/add-on-guide-book',
    component: AddGuideBookOnCragView,
    meta: {
      requiresAuth: true,
      objectName: 'crag',
      showAvatar: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/new-web-guide-book',
    component: GuideBookWebNewView,
    props: true,
    meta: {
      requiresAuth: true,
      objectName: 'crag',
      showAvatar: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/new-pdf-guide-book',
    component: GuideBookPdfNewView,
    props: true,
    meta: {
      requiresAuth: true,
      objectName: 'crag',
      showAvatar: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug',
    component: CragView,
    props: true,
    meta: {
      noPaddingTop: true
    },
    children: [
      {
        path: 'infos',
        component: CragInfoView,
        meta: {
          noPaddingTop: true,
          objectName: 'crag'
        }
      },
      {
        path: 'routes',
        component: CragRouteView,
        meta: {
          noPaddingTop: true,
          objectName: 'crag'
        }
      },
      {
        path: 'photos',
        component: CragPhotosView,
        meta: {
          noPaddingTop: true,
          objectName: 'crag'
        }
      },
      {
        path: 'links',
        component: CragLinkView,
        meta: {
          noPaddingTop: true,
          objectName: 'crag'
        }
      },
      {
        path: 'guide-books',
        component: CragGuideBooksView,
        meta: {
          noPaddingTop: true,
          objectName: 'crag'
        }
      },
      {
        path: 'maps',
        component: CragMapDetailsView,
        meta: {
          noPaddingTop: true,
          objectName: 'crag'
        }
      }
    ]
  }
]
