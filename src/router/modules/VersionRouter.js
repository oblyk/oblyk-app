const VersionsView = () => import(/* webpackChunkName: "VersionRouter-VersionsView" */ '@/views/versions/VersionsView')

export default [
  {
    path: '/versions/:versionType/:versionId/changes',
    component: VersionsView,
    props: true
  }
]
