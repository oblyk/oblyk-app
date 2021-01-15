import PlaceOfSaleNewView from '@/views/placeOfSales/actions/PlaceOfSaleNewView'
import PlaceOfSaleEditView from '@/views/placeOfSales/actions/PlaceOfSaleEditView'

export default [
  {
    path: '/guide-book-papers/:guideBookPaperId/:guideBookPaperSlug/place-of-sales/new',
    component: PlaceOfSaleNewView,
    meta: {
      requiresAuth: true,
      title: 'newPlaceOfSale',
      showTitle: false
    }
  },
  {
    path: '/guide-book-papers/:guideBookPaperId/:guideBookPaperSlug/place-of-sales/:placeOfSaleId/edit',
    component: PlaceOfSaleEditView,
    meta: {
      requiresAuth: true,
      objectName: 'link'
    }
  }
]
