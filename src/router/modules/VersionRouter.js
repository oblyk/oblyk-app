import VersionsView from '@/views/versions/VersionsView'

export default [
  {
    path: '/versions/:versionType/:versionId/changes',
    component: VersionsView,
    props: true,
    meta: {
      title: 'version'
    }
  }
]
