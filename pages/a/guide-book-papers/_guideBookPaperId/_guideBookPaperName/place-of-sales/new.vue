<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addPlaceOfSale') }}
        </h2>
        <place-of-sale-form method="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlaceOfSaleForm from '~/components/placeOfSales/forms/PlaceOfSaleForm'

export default {
  components: { PlaceOfSaleForm },
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.placeOfSale.new')
    }
  }
}
</script>
