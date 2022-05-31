<template>
  <v-container>
    <spinner v-if="loadingPlaceOfSale" />

    <v-row v-if="!loadingPlaceOfSale" justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.editPlaceOfSale') }}
        </h2>
        <place-of-sale-form
          submit-methode="put"
          :place-of-sale="placeOfSale"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { PlaceOfSaleConcern } from '~/concerns/PlaceOfSaleConcern'
import Spinner from '~/components/layouts/Spiner'
import PlaceOfSaleForm from '~/components/placeOfSales/forms/PlaceOfSaleForm'

export default {
  components: { PlaceOfSaleForm, Spinner },
  mixins: [PlaceOfSaleConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.placeOfSale.edit')
    }
  }
}
</script>
