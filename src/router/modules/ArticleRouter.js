const ArticleView = () => import(/* webpackChunkName: "ArticleRouter-ArticleView" */ '@/views/articles/ArticleView')
const ArticleEditView = () => import(/* webpackChunkName: "ArticleRouter-ArticleEditView" */ '@/views/articles/actions/ArticleEditView')
const ArticleCoverView = () => import(/* webpackChunkName: "ArticleRouter-ArticleCoverView" */ '@/views/articles/actions/ArticleCoverView')
const ArticleListView = () => import(/* webpackChunkName: "ArticleRouter-ArticleListView" */ '@/views/articles/ArticleListView')
const ArticleNewView = () => import(/* webpackChunkName: "ArticleRouter-ArticleNewView" */ '@/views/articles/actions/ArticleNewView')
const ArticlePhotoListView = () => import(/* webpackChunkName: "ArticleRouter-ArticlePhotoListView" */ '@/views/articles/ArticlePhotoListView')
const AddCragInArticleView = () => import(/* webpackChunkName: "ArticleRouter-AddCragInArticleView" */ '@/views/articles/actions/AddCragInArticleView')
const AddGuideBookInArticleView = () => import(/* webpackChunkName: "ArticleRouter-AddGuideBookInArticleView" */ '@/views/articles/actions/AddGuideBookInArticleView')

export default [
  {
    path: '/articles',
    component: ArticleListView
  },
  {
    path: '/articles/new',
    component: ArticleNewView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug',
    component: ArticleView,
    meta: {
      noPaddingTop: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/edit',
    component: ArticleEditView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/add-crags',
    component: AddCragInArticleView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/add-guide-books',
    component: AddGuideBookInArticleView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/cover',
    component: ArticleCoverView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/photos',
    component: ArticlePhotoListView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true
    }
  }
]
