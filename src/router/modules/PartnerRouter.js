const PartnerMapView = () => import(/* webpackChunkName: "partner-routes" */ '@/views/maps/PartnerMapView')

export default [
  {
    path: '/maps/climbers',
    component: PartnerMapView
  }
]
