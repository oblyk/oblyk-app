const CommentNewView = () => import(/* webpackChunkName: "CommentRouter-CommentNewView" */ '@/views/comments/actions/CommentNewView')
const CommentEditView = () => import(/* webpackChunkName: "CommentRouter-CommentEditView" */ '@/views/comments/actions/CommentEditView')

export default [
  {
    path: '/comments/:commentableType/:commentableId/new',
    component: CommentNewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/comments/:commentId/edit',
    component: CommentEditView,
    meta: {
      requiresAuth: true
    }
  }
]
