import ArticleView from '@/views/articles/ArticleView'
import ArticleEditView from '@/views/articles/actions/ArticleEditView'
import ArticleCoverView from '@/views/articles/actions/ArticleCoverView'
import ArticleListView from '@/views/articles/ArticleListView'
import ArticleNewView from '@/views/articles/actions/ArticleNewView'
import ArticlePhotoListView from '@/views/articles/ArticlePhotoListView'

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
      title: 'articles',
      showTitle: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug',
    component: ArticleView,
    meta: {
      title: 'article',
      noPaddingTop: true,
      showTitle: false
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/edit',
    component: ArticleEditView,
    meta: {
      title: 'editArticle',
      showTitle: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/cover',
    component: ArticleCoverView,
    meta: {
      title: 'editArticle',
      showTitle: true
    }
  },
  {
    path: '/articles/:articleId/:articleSlug/photos',
    component: ArticlePhotoListView,
    meta: {
      title: 'editArticle',
      showTitle: true
    }
  }
]
