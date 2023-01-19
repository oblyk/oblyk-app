<template>
  <div>
    <v-container v-if="cragRoute">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('components.ascentCragRoute.new', { name: cragRoute.name }) }}
          </h2>
          <ascent-crag-route-form
            :crag-route="cragRoute"
            submit-methode="post"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { CragRouteConcern } from '~/concerns/CragRouteConcern'
import AscentCragRouteForm from '~/components/ascentCragRoutes/forms/AscentCragRouteForm'

export default {
  meta: { orphanRoute: true },
  components: { AscentCragRouteForm },
  mixins: [CragRouteConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter à mon carnet'
      },
      en: {
        metaTitle: 'Add to my logbook'
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
