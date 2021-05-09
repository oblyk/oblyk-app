const VideoNewView = () => import(/* webpackChunkName: "video-routes" */ '@/views/videos/actions/VideoNewView')
const VideoEditView = () => import(/* webpackChunkName: "video-routes" */ '@/views/videos/actions/VideoEditView')

export default [
  {
    path: '/videos/:viewableType/:viewableId/new',
    component: VideoNewView
  },
  {
    path: '/videos/:viewableType/:viewableId/:videoId/edit',
    component: VideoEditView
  }
]
