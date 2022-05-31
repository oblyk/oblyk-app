<template>
  <v-container>
    <v-row v-if="crag" justify="center">
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
import CragRouteForm from '~/components/cragRoutes/forms/CragRouteForm'
import Crag from '~/models/Crag'
import CragSector from '~/models/CragSector'

export default {
  components: { CragRouteForm },
  middleware: ['auth'],

  data () {
    return {
      cragSector: null,
      crag: null
    }
  },

  async fetch () {
    this.crag = await new Crag({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.cragId
    )

    if (this.$route.params.cragSectorId) {
      this.cragSector = await new CragSector({
        axios: this.$axios,
        auth: this.$auth
      })._find(
        this.$route.params.cragSectorId
      )
    } else {
      this.cragSector = null
    }
  },

  head () {
    return {
      title: this.$t('meta.cragRoute.new')
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-route-form {
  max-width: 750px;
}
</style>
