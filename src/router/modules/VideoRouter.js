const VideoNewView = () => import(/* webpackChunkName: "video-routes" */ '@/views/videos/actions/VideoNewView')
const VideoEditView = () => import(/* webpackChunkName: "video-routes" */ '@/views/videos/actions/VideoEditView')

export default [
  {
    path: '/videos/:viewableType/:viewableId/new',
    component: VideoNewView,
    meta: {
      title: 'newVideo',
      showTitle: false
    }
  },
  {
    path: '/videos/:viewableType/:viewableId/:videoId/edit',
    component: VideoEditView,
    meta: {
      title: 'editVideo',
      showTitle: false
    }
  }
]
