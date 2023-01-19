<template>
  <v-container v-if="crag">
    <v-row justify="center">
      <v-col class="crag-route-form">
        <h2 class="mb-4">
          {{ $t('components.cragRoute.new') }}
        </h2>
        <crag-route-form
          :crag="crag"
          :crag-sector="cragSector"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CragConcern } from '~/concerns/CragConcern'
import CragRouteForm from '~/components/cragRoutes/forms/CragRouteForm'
import { CragSectorConcern } from '~/concerns/CragSectorConcern'

export default {
  meta: { orphanRoute: true },
  components: { CragRouteForm },
  mixins: [CragConcern, CragSectorConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter une ligne'
      },
      en: {
        metaTitle: 'Add crag route'
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

<style lang="scss" scoped>
.crag-route-form {
  max-width: 750px;
}
</style>
