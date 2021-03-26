import ArticleView from '@/views/articles/ArticleView'
import ArticleEditView from '@/views/articles/actions/ArticleEditView'
import ArticleCoverView from '@/views/articles/actions/ArticleCoverView'
import ArticleListView from '@/views/articles/ArticleListView'
import ArticleNewView from '@/views/articles/actions/ArticleNewView'
import ArticlePhotoListView from '@/views/articles/ArticlePhotoListView'
import AddCragInArticleView from '@/views/articles/actions/AddCragInArticleView'
import AddGuideBookInArticleView from '@/views/articles/actions/AddGuideBookInArticleView'

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
