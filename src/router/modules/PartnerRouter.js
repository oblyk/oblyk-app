const PartnerMapView = () => import(/* webpackChunkName: "PartnerRouter-PartnerMapView" */ '@/views/maps/PartnerMapView')

export default [
  {
    path: '/maps/climbers',
    component: PartnerMapView
  }
]
