const VideoNewView = () => import(/* webpackChunkName: "VideoRouter-VideoNewView" */ '@/views/videos/actions/VideoNewView')
const VideoEditView = () => import(/* webpackChunkName: "VideoRouter-VideoEditView" */ '@/views/videos/actions/VideoEditView')

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
