<template>
  <div>
    <spinner v-if="loadingGymRoute" />

    <v-container v-if="!loadingGymRoute">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2>
            {{ $t('actions.defineThumbnail') }}
          </h2>
          <p class="text--disabled mb-4">
            {{ $t('components.gymRoute.thumbnailPictureExplain') }}
          </p>
          <client-only>
            <gym-route-thumbnail-form :gym-route="gymRoute" />
          </client-only>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GymRouteConcern } from '@/concerns/GymRouteConcern'
import Spinner from '@/components/layouts/Spiner'
const GymRouteThumbnailForm = () => import('@/components/gymRoutes/forms/GymRouteThumbnailForm')

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
