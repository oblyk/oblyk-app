import PlaceOfSale from '@/models/PlaceOfSale'

export const PlaceOfSaleConcern = {
  data () {
    return {
      placeOfSale: null,
      loadingPlaceOfSale: true
    }
  },

  created () {
    if (this.$route.params.placeOfSaleId) this.getPlaceOfSale()
  },

  methods: {
    getPlaceOfSale: function () {
      this.loadingPlaceOfSale = true
      new PlaceOfSale()
        .find(
          this.$route.params.guideBookPaperId,
          this.$route.params.placeOfSaleId
        )
        .then((resp) => {
          this.placeOfSale = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'placeOfSale')
        }).finally(() => {
          this.loadingPlaceOfSale = false
        })
    }
  }
}
