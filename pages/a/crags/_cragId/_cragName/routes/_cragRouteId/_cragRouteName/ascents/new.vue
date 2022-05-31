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
  components: { AscentCragRouteForm },
  mixins: [CragRouteConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.ascentCragRoute.new')
    }
  }
}
</script>
