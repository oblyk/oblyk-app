const CommentNewView = () => import(/* webpackChunkName: "comment-routes" */ '@/views/comments/actions/CommentNewView')
const CommentEditView = () => import(/* webpackChunkName: "comment-routes" */ '@/views/comments/actions/CommentEditView')

export default [
  {
    path: '/comments/:commentableType/:commentableId/new',
    component: CommentNewView,
    meta: {
      requiresAuth: true,
      title: 'newComment',
      showTitle: false
    }
  },
  {
    path: '/comments/:commentId/edit',
    component: CommentEditView,
    meta: {
      requiresAuth: true,
      objectName: 'comment'
    }
  }
]
