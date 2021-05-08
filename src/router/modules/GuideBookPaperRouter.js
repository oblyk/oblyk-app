const GuideBookPaperView = () => import(/* webpackChunkName: "guide-book-paper-routes" */ '@/views/GuideBookPaperView')
const GuideBookPaperInfoView = () => import(/* webpackChunkName: "guide-book-paper-routes" */ '@/views/guideBookPapers/GuideBookPaperInfoView')
const GuideBookPaperCragsView = () => import(/* webpackChunkName: "guide-book-paper-routes" */ '@/views/guideBookPapers/GuideBookPaperCragsView')
const GuideBookPaperCoverView = () => import(/* webpackChunkName: "guide-book-paper-routes" */ '@/views/guideBookPapers/actions/GuideBookPaperCoverView')
const GuideBookPaperPhotosView = () => import(/* webpackChunkName: "guide-book-paper-routes" */ '@/views/guideBookPapers/GuideBookPaperPhotosView')
const GuideBookPaperLinkView = () => import(/* webpackChunkName: "guide-book-paper-routes" */ '@/views/guideBookPapers/GuideBookPaperLinkView')
const GuideBookPaperMapView = () => import(/* webpackChunkName: "guide-book-paper-routes" */ '@/views/guideBookPapers/GuideBookPaperMapView')
const GuideBookPaperEditView = () => import(/* webpackChunkName: "guide-book-paper-routes" */ '@/views/guideBookPapers/actions/GuideBookPaperEditView')
const GuideBookPaperNewView = () => import(/* webpackChunkName: "guide-book-paper-routes" */ '@/views/guideBookPapers/actions/GuideBookPaperNewView')

export default [
  {
    path: '/guide-book-papers/new',
    component: GuideBookPaperNewView,
    meta: {
      requiresAuth: true,
      title: 'newCrag',
      showTitle: false
    }
  },
  {
    path: '/guide-book-papers/:guideBookPaperId/:guideBookPaperSlug/edit',
    component: GuideBookPaperEditView,
    meta: {
      requiresAuth: true,
      objectName: 'guideBookPaper',
      showAvatar: true
    }
  },
  {
    path: '/guide-book-papers/:guideBookPaperId/:guideBookPaperSlug/cover',
    component: GuideBookPaperCoverView,
    meta: {
      requiresAuth: true,
      objectName: 'guideBookPaper',
      showAvatar: true
    }
  },
  {
    path: '/guide-book-papers/:guideBookPaperId/:guideBookPaperSlug',
    component: GuideBookPaperView,
    props: true,
    meta: {
      noPaddingTop: false,
      objectName: 'guideBookPaper',
      showTitle: true,
      showAvatar: false
    },
    children: [
      {
        path: 'infos',
        component: GuideBookPaperInfoView,
        meta: {
          noPaddingTop: false,
          objectName: 'guideBookPaper',
          showTitle: true,
          showAvatar: false
        }
      },
      {
        path: 'crags',
        component: GuideBookPaperCragsView,
        meta: {
          noPaddingTop: false,
          objectName: 'guideBookPaper',
          showTitle: true,
          showAvatar: false
        }
      },
      {
        path: 'photos',
        component: GuideBookPaperPhotosView,
        meta: {
          noPaddingTop: false,
          objectName: 'guideBookPaper',
          showTitle: true,
          showAvatar: false
        }
      },
      {
        path: 'links',
        component: GuideBookPaperLinkView,
        meta: {
          noPaddingTop: false,
          objectName: 'guideBookPaper',
          showTitle: true,
          showAvatar: false
        }
      },
      {
        path: 'map',
        component: GuideBookPaperMapView,
        meta: {
          noPaddingTop: false,
          objectName: 'guideBookPaper',
          showTitle: true,
          showAvatar: false
        }
      }
    ]
  }
]
