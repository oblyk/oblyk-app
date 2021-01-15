import VideoNewView from '@/views/videos/actions/VideoNewView'
import VideoEditView from '@/views/videos/actions/VideoEditView'

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
