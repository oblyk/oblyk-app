import GuideBookPaperView from '@/views/GuideBookPaperView'
import GuideBookPaperInfoView from '@/views/guideBookPapers/GuideBookPaperInfoView'
import GuideBookPaperCragsView from '@/views/guideBookPapers/GuideBookPaperCragsView'
import GuideBookPaperCoverView from '@/views/guideBookPapers/actions/GuideBookPaperCoverView'
import GuideBookPaperPhotosView from '@/views/guideBookPapers/GuideBookPaperPhotosView'
import GuideBookPaperLinkView from '@/views/guideBookPapers/GuideBookPaperLinkView'
import GuideBookPaperMapView from '@/views/guideBookPapers/GuideBookPaperMapView'
import GuideBookPaperEditView from '@/views/guideBookPapers/actions/GuideBookPaperEditView'
import GuideBookPaperNewView from '@/views/guideBookPapers/actions/GuideBookPaperNewView'

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
      showAvatar: true
    },
    children: [
      {
        path: 'infos',
        component: GuideBookPaperInfoView,
        meta: {
          noPaddingTop: false,
          objectName: 'guideBookPaper',
          showAvatar: true
        }
      },
      {
        path: 'crags',
        component: GuideBookPaperCragsView,
        meta: {
          noPaddingTop: false,
          objectName: 'guideBookPaper',
          showAvatar: true
        }
      },
      {
        path: 'photos',
        component: GuideBookPaperPhotosView,
        meta: {
          noPaddingTop: false,
          objectName: 'guideBookPaper',
          showAvatar: true
        }
      },
      {
        path: 'links',
        component: GuideBookPaperLinkView,
        meta: {
          noPaddingTop: false,
          objectName: 'guideBookPaper',
          showAvatar: true
        }
      },
      {
        path: 'map',
        component: GuideBookPaperMapView,
        meta: {
          noPaddingTop: false,
          objectName: 'guideBookPaper',
          showAvatar: true
        }
      }
    ]
  }
]
