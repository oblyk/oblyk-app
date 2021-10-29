const AuthorEditView = () => import(/* webpackChunkName: "AuthorRouter-AuthorEditView" */ '@/views/authors/actions/AuthorEditView')
const AuthorCoverView = () => import(/* webpackChunkName: "AuthorRouter-AuthorCoverView" */ '@/views/authors/actions/AuthorCoverView')

export default [
  {
    path: '/authors/:authorId/edit',
    component: AuthorEditView
  },
  {
    path: '/authors/:authorId/cover',
    component: AuthorCoverView
  }
]
