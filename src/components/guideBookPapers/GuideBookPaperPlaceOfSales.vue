<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-store
      </v-icon>
      {{ $t('components.guideBookPaper.pointOfSale') }}
    </v-card-title>
    <v-card-text>
      <spinner v-if="loadingPlaceOfSales" :full-height="false" />
      <div v-if="!loadingPlaceOfSales">
        <place-of-sale-card
          v-for="placeOfSale in placeOfSales"
          :key="`place-of-sale-${placeOfSale.id}`"
          :place-of-sale="placeOfSale"
          class="mb-2"
          :get-place-of-sales="getPlaceOfSales"
        />

        <p
          v-if="placeOfSales.length === 0"
          class="text-center text--disabled"
        >
          {{ $t('components.placeOfSale.noPlace') }}
        </p>

        <div class="text-right mt-3">
          <v-btn
            :to="`${guideBookPaper.path('place-of-sales/new')}?redirect_to=${$route.fullPath}`"
            text
            small
            color="primary"
          >
            <v-icon left small>
              mdi-store-plus
            </v-icon>
            {{ $t('actions.addPlaceOfSale') }}
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import PlaceOfSale from '@/models/PlaceOfSale'
import PlaceOfSaleCard from '@/components/placeOfSales/PlaceOfSaleCard'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'GuideBookPaperPlaceOfSales',
  components: { Spinner, PlaceOfSaleCard },
  props: {
    guideBookPaper: Object
  },

  data () {
    return {
      loadingPlaceOfSales: true,
      placeOfSales: []
    }
  },

  mounted () {
    this.getPlaceOfSales()
  },

  methods: {
    getPlaceOfSales: function () {
      this.loadingPlaceOfSales = true
      GuideBookPaperApi
        .placeOfSales(this.guideBookPaper.id)
        .then(resp => {
          this.placeOfSales = []
          for (const placeOfSale of resp.data) {
            this.placeOfSales.push(new PlaceOfSale(placeOfSale))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'placeOfSale')
        })
        .finally(() => {
          this.loadingPlaceOfSales = false
        })
    }
  }
}
</script>
