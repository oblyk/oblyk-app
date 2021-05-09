const AuthorEditView = () => import(/* webpackChunkName: "author-routes" */ '@/views/authors/actions/AuthorEditView')
const AuthorCoverView = () => import(/* webpackChunkName: "author-routes" */ '@/views/authors/actions/AuthorCoverView')

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
