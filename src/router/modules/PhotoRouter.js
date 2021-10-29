const PhotoNewView = () => import(/* webpackChunkName: "PhotoRouter-PhotoNewView" */ '@/views/photos/actions/PhotoNewView')
const PhotoEditView = () => import(/* webpackChunkName: "PhotoRouter-PhotoEditView" */ '@/views/photos/actions/PhotoEditView')

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
