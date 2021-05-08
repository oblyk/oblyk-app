const PhotoNewView = () => import(/* webpackChunkName: "photo-routes" */ '@/views/photos/actions/PhotoNewView')
const PhotoEditView = () => import(/* webpackChunkName: "photo-routes" */ '@/views/photos/actions/PhotoEditView')

export default [
  {
    path: '/photos/:illustrableType/:illustrableId/new',
    component: PhotoNewView,
    meta: {
      title: 'newPhoto',
      showTitle: false
    }
  },
  {
    path: '/photos/:illustrableType/:illustrableId/:photoId/edit',
    component: PhotoEditView,
    meta: {
      title: 'editPhoto',
      showTitle: false
    }
  }
]
