const CragMapView = () => import(/* webpackChunkName: "CragRouter-CragMapView" */ '@/views/maps/CragMapView')
const CragView = () => import(/* webpackChunkName: "CragRouter-CragView" */ '@/views/CragView')
const CragInfoView = () => import(/* webpackChunkName: "CragRouter-CragInfoView" */ '@/views/crags/CragInfoView')
const CragPhotosView = () => import(/* webpackChunkName: "CragRouter-CragPhotosView" */ '@/views/crags/CragPhotosView')
const CragGuideBooksView = () => import(/* webpackChunkName: "CragRouter-CragGuideBooksView" */ '@/views/crags/CragGuideBooksView')
const CragMapDetailsView = () => import(/* webpackChunkName: "CragRouter-CragMapDetailsView" */ '@/views/crags/CragMapDetailsView')
const CragNewView = () => import(/* webpackChunkName: "CragRouter-CragNewView" */ '@/views/crags/actions/CragNewView')
const CragEditView = () => import(/* webpackChunkName: "CragRouter-CragEditView" */ '@/views/crags/actions/CragEditView')
const AddGuideBookOnCragView = () => import(/* webpackChunkName: "CragRouter-AddGuideBookOnCragView" */ '@/views/crags/actions/AddGuideBookOnCragView')
const GuideBookWebNewView = () => import(/* webpackChunkName: "CragRouter-GuideBookWebNewView" */ '@/views/guideBookWebs/actions/GuideBookWebNewView')
const GuideBookPdfNewView = () => import(/* webpackChunkName: "CragRouter-GuideBookPdfNewView" */ '@/views/guideBookPdfs/actions/GuideBookPdfNewView')
const CragLinkView = () => import(/* webpackChunkName: "CragRouter-CragLinkView" */ '@/views/crags/CragLinkView')
const AddAreaOnCragView = () => import(/* webpackChunkName: "CragRouter-AddAreaOnCragView" */ '@/views/crags/actions/AddAreaOnCragView')

export default [
  {
    path: '/maps/crags',
    component: CragMapView
  },
  {
    path: '/crags/new',
    component: CragNewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/edit',
    component: CragEditView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/add-on-guide-book',
    component: AddGuideBookOnCragView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/add-on-area',
    component: AddAreaOnCragView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/new-web-guide-book',
    component: GuideBookWebNewView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/crags/:cragId/:cragSlug/new-pdf-guide-book',
    component: GuideBookPdfNewView,
    props: true,
    meta: {
      requiresAuth: true
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
        path: '',
        component: CragInfoView,
        meta: {
          noPaddingTop: true,
          nestedPages: 'Crag'
        }
      },
      {
        path: 'photos',
        component: CragPhotosView,
        meta: {
          noPaddingTop: true,
          nestedPages: 'Crag'
        }
      },
      {
        path: 'links',
        component: CragLinkView,
        meta: {
          noPaddingTop: true,
          nestedPages: 'Crag'
        }
      },
      {
        path: 'guide-books',
        component: CragGuideBooksView,
        meta: {
          noPaddingTop: true,
          nestedPages: 'Crag'
        }
      },
      {
        path: 'maps',
        component: CragMapDetailsView,
        meta: {
          noPaddingTop: true,
          nestedPages: 'Crag'
        }
      }
    ]
  }
]
