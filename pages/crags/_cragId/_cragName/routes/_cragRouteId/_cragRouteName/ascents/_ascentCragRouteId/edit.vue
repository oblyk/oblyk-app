<template>
  <div>
    <v-container v-if="cragRoute && ascentCragRoute">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('components.ascentCragRoute.edit', { name: cragRoute.name }) }}
          </h2>
          <ascent-crag-route-form
            :ascent-crag-route="ascentCragRoute"
            :crag-route="cragRoute"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { CragRouteConcern } from '~/concerns/CragRouteConcern'
import AscentCragRouteForm from '~/components/ascentCragRoutes/forms/AscentCragRouteForm'
import { AscentCragRouteConcern } from '~/concerns/AscentCragRouteConcern'

export default {
  meta: { orphanRoute: true },
  components: { AscentCragRouteForm },
  mixins: [CragRouteConcern, AscentCragRouteConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Modifier ma croix'
      },
      en: {
        metaTitle: 'Edit my ascent'
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
