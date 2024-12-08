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
import CragRouteForm from '~/components/cragRoutes/forms/CragRouteForm'
import { CragSectorConcern } from '~/concerns/CragSectorConcern'
import CragApi from '~/services/oblyk-api/CragApi'
import Crag from '~/models/Crag'

export default {
  meta: { orphanRoute: true },
  components: { CragRouteForm },
  mixins: [CragSectorConcern],
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

  data () {
    return {
      crag: null
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  mounted () {
    this.getCrag()
  },

  methods: {
    getCrag () {
      new CragApi(this.$axios, this.$auth)
        .find(this.$route.params.cragId)
        .then((resp) => {
          this.crag = new Crag({ attributes: resp.data })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-route-form {
  max-width: 750px;
}
</style>
