const VersionsView = () => import(/* webpackChunkName: "version-routes" */ '@/views/versions/VersionsView')

export default [
  {
    path: '/versions/:versionType/:versionId/changes',
    component: VersionsView,
    props: true
  }
]
