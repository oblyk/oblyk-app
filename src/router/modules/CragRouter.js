const CragMapView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/maps/CragMapView')
const CragView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/CragView')
const CragInfoView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/crags/CragInfoView')
const CragRouteView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/crags/CragRouteView')
const CragPhotosView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/crags/CragPhotosView')
const CragGuideBooksView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/crags/CragGuideBooksView')
const CragMapDetailsView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/crags/CragMapDetailsView')
const CragNewView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/crags/actions/CragNewView')
const CragEditView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/crags/actions/CragEditView')
const AddGuideBookOnCragView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/crags/actions/AddGuideBookOnCragView')
const GuideBookWebNewView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/guideBookWebs/actions/GuideBookWebNewView')
const GuideBookPdfNewView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/guideBookPdfs/actions/GuideBookPdfNewView')
const CragLinkView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/crags/CragLinkView')
const AddAreaOnCragView = () => import(/* webpackChunkName: "crag-routes" */ '@/views/crags/actions/AddAreaOnCragView')

export default [
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
    path: '/crags/:cragId/:cragSlug/add-on-area',
    component: AddAreaOnCragView,
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
