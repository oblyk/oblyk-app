<template>
  <div>
    <v-card-title>
      <v-icon left>
        {{ mdiStore }}
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

        <client-only>
          <div
            v-if="$auth.loggedIn"
            class="text-right mt-3"
          >
            <v-btn
              :to="`${guideBookPaper.path}/place-of-sales/new?redirect_to=${$route.fullPath}`"
              text
              small
              color="primary"
            >
              <v-icon left small>
                {{ mdiStorePlus }}
              </v-icon>
              {{ $t('actions.addPlaceOfSale') }}
            </v-btn>
          </div>
        </client-only>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import { mdiStore, mdiStorePlus } from '@mdi/js'
import GuideBookPaperApi from '~/services/oblyk-api/GuideBookPaperApi'
import PlaceOfSale from '@/models/PlaceOfSale'
import PlaceOfSaleCard from '@/components/placeOfSales/PlaceOfSaleCard'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'GuideBookPaperPlaceOfSales',
  components: { Spinner, PlaceOfSaleCard },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiStore,
      mdiStorePlus,
      loadingPlaceOfSales: true,
      placeOfSales: []
    }
  },

  mounted () {
    this.getPlaceOfSales()
  },

  methods: {
    getPlaceOfSales () {
      this.loadingPlaceOfSales = true
      new GuideBookPaperApi(this.$axios, this.$auth)
        .placeOfSales(this.guideBookPaper.id)
        .then((resp) => {
          this.placeOfSales = []
          for (const placeOfSale of resp.data) {
            this.placeOfSales.push(new PlaceOfSale({ attributes: placeOfSale }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'placeOfSale')
        })
        .finally(() => {
          this.loadingPlaceOfSales = false
        })
    }
  }
}
</script>
