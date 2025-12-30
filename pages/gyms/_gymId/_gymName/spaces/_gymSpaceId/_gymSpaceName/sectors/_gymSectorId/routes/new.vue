<template>
  <div>
    <spinner v-if="loadingGymSector" />
    <div v-else>
      <page-header
        :title="$t('components.gymRoute.addNew')"
        :back-to="gymSector.spacePath"
      />
      <v-container>
        <gym-route-form
          :gym-sector="gymSector"
          submit-methode="post"
        />
      </v-container>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'
import { GymSectorConcern } from '@/concerns/GymSectorConcern'
import GymRouteForm from '@/components/gymRoutes/forms/GymRouteForm'
import PageHeader from '~/components/layouts/PageHeader.vue'

export default {
  meta: { orphanRoute: true },
  components: { PageHeader, GymRouteForm, Spinner },
  mixins: [GymSectorConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter une ligne'
      },
      en: {
        metaTitle: 'Add a new route'
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
