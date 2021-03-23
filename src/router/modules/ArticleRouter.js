import ArticleView from '@/views/ArticleView'

export default [
  {
    path: '/articles/:articleId/:articleSlug',
    component: ArticleView,
    meta: {
      title: 'article',
      noPaddingTop: true,
      showTitle: false
    }
  }
]
