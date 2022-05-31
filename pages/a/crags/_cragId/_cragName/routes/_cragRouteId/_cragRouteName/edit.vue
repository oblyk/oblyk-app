<template>
  <v-container v-if="cragRoute && crag">
    <v-row justify="center">
      <v-col class="crag-route-form">
        <h2 class="mb-4">
          {{ $t('actions.edit') }}
          {{ cragRoute.name }}
        </h2>
        <crag-route-form
          :crag-route="cragRoute"
          :crag="crag"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CragRouteForm from '~/components/cragRoutes/forms/CragRouteForm'
import CragRoute from '~/models/CragRoute'
import Crag from '~/models/Crag'

export default {
  components: { CragRouteForm },
  middleware: ['auth'],

  data () {
    return {
      crag: null,
      cragRoute: null
    }
  },

  async fetch () {
    this.cragRoute = await new CragRoute({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.cragId,
      this.$route.params.cragRouteId
    )

    this.crag = await new Crag({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.cragId
    )
  },

  head () {
    return {
      title: this.$t('meta.generics.edit', { name: (this.cragRoute || {}).name })
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-route-form {
  max-width: 750px;
}
</style>
