const ArticleView = () => import(/* webpackChunkName: "article-routes" */ '@/views/articles/ArticleView')
const ArticleEditView = () => import(/* webpackChunkName: "article-routes" */ '@/views/articles/actions/ArticleEditView')
const ArticleCoverView = () => import(/* webpackChunkName: "article-routes" */ '@/views/articles/actions/ArticleCoverView')
const ArticleListView = () => import(/* webpackChunkName: "article-routes" */ '@/views/articles/ArticleListView')
const ArticleNewView = () => import(/* webpackChunkName: "article-routes" */ '@/views/articles/actions/ArticleNewView')
const ArticlePhotoListView = () => import(/* webpackChunkName: "article-routes" */ '@/views/articles/ArticlePhotoListView')
const AddCragInArticleView = () => import(/* webpackChunkName: "article-routes" */ '@/views/articles/actions/AddCragInArticleView')
const AddGuideBookInArticleView = () => import(/* webpackChunkName: "article-routes" */ '@/views/articles/actions/AddGuideBookInArticleView')

export default [
  {
    path: '/articles',
    component: ArticleListView,
    meta: {
      title: 'articles',
      showTitle: true
    }
  },
  {
    path: '/articles/new',
    component: ArticleNewView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true,
      title: 'articles',
      showTitle: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug',
    component: ArticleView,
    meta: {
      objectName: 'article',
      noPaddingTop: true,
      showAvatar: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/edit',
    component: ArticleEditView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true,
      title: 'editArticle',
      showTitle: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/add-crags',
    component: AddCragInArticleView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true,
      title: 'editArticle',
      showTitle: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/add-guide-books',
    component: AddGuideBookInArticleView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true,
      title: 'editArticle',
      showTitle: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/cover',
    component: ArticleCoverView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true,
      title: 'editArticle',
      showTitle: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/photos',
    component: ArticlePhotoListView,
    meta: {
      requiresAuth: true,
      requiresSuperAdmin: true,
      title: 'articlePhotos',
      showTitle: true
    }
  }
]
