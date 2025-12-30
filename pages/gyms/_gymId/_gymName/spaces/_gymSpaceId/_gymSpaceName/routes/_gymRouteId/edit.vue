<template>
  <div>
    <spinner v-if="loadingGymRoute" />
    <div v-else>
      <page-header
        :title="$t('components.gymRoute.editRoute')"
        :back-to="gymRoute.pathInSpace"
      />
      <v-container>
        <gym-route-form
          :gym-sector="gymRoute.GymSector"
          :gym-route="gymRoute"
          submit-methode="put"
        />
      </v-container>
    </div>
  </div>
</template>

<script>
import { GymRouteConcern } from '@/concerns/GymRouteConcern'
import Spinner from '@/components/layouts/Spiner'
import GymRouteForm from '@/components/gymRoutes/forms/GymRouteForm'
import PageHeader from '~/components/layouts/PageHeader.vue'

export default {
  meta: { orphanRoute: true },
  components: { PageHeader, GymRouteForm, Spinner },
  mixins: [GymRouteConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Modifier la ligne'
      },
      en: {
        metaTitle: 'Edit route'
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
