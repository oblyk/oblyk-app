const PhotoNewView = () => import(/* webpackChunkName: "photo-routes" */ '@/views/photos/actions/PhotoNewView')
const PhotoEditView = () => import(/* webpackChunkName: "photo-routes" */ '@/views/photos/actions/PhotoEditView')

export default [
  {
    path: '/photos/:illustrableType/:illustrableId/new',
    component: PhotoNewView
  },
  {
    path: '/photos/:illustrableType/:illustrableId/:photoId/edit',
    component: PhotoEditView
  }
]
