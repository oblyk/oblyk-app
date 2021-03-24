import AuthorEditView from '@/views/authors/actions/AuthorEditView'
import AuthorCoverView from '@/views/authors/actions/AuthorCoverView'

export default [
  {
    path: '/authors/:authorId/edit',
    component: AuthorEditView,
    meta: {
      title: 'editAuthor',
      showTitle: false
    }
  },
  {
    path: '/authors/:authorId/cover',
    component: AuthorCoverView,
    meta: {
      title: 'editAuthor',
      showTitle: false
    }
  }
]
