const PlaceOfSaleNewView = () => import(/* webpackChunkName: "PlaceOfSaleRouter-PlaceOfSaleNewView" */ '@/views/placeOfSales/actions/PlaceOfSaleNewView')
const PlaceOfSaleEditView = () => import(/* webpackChunkName: "PlaceOfSaleRouter-PlaceOfSaleEditView" */ '@/views/placeOfSales/actions/PlaceOfSaleEditView')

export default [
  {
    path: '/guide-book-papers/:guideBookPaperId/:guideBookPaperSlug/place-of-sales/new',
    component: PlaceOfSaleNewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/guide-book-papers/:guideBookPaperId/:guideBookPaperSlug/place-of-sales/:placeOfSaleId/edit',
    component: PlaceOfSaleEditView,
    meta: {
      requiresAuth: true
    }
  }
]
