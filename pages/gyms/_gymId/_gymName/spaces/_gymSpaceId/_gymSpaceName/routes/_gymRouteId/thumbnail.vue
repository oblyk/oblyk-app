<template>
  <div>
    <spinner v-if="loadingGymRoute" />

    <v-container v-if="!loadingGymRoute">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            Définir la miniature
          </h2>
          <gym-route-thumbnail-form :gym-route="gymRoute" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GymRouteConcern } from '@/concerns/GymRouteConcern'
import Spinner from '@/components/layouts/Spiner'
import GymRouteThumbnailForm from '@/components/gymRoutes/forms/GymRouteThumbnailForm'

export default {
  meta: { orphanRoute: true },
  components: { GymRouteThumbnailForm, Spinner },
  mixins: [GymRouteConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Définir une miniature'
      },
      en: {
        metaTitle: 'Define thumbnail'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
