<template>
  <div>
    <spinner v-if="loadingGymRoute" />

    <v-container v-if="!loadingGymRoute">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            Ajouter une photo
          </h2>
          <gym-route-picture-form
            :gym-route="gymRoute"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GymRouteConcern } from '@/concerns/GymRouteConcern'
import Spinner from '@/components/layouts/Spiner'
import GymRoutePictureForm from '@/components/gymRoutes/forms/GymRoutePictureForm'

export default {
  meta: { orphanRoute: true },
  components: { GymRoutePictureForm, Spinner },
  mixins: [GymRouteConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Définir une photo'
      },
      en: {
        metaTitle: 'Define the picture'
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
