<template>
  <v-row>
    <v-col>
      <div
        v-for="ascent in ascents"
        :key="`ascent-${ascent.id}`"
        class="mb-3"
      >
        <ascent-crag-route-small-card
          :crag-route="cragRoute"
          :ascent-crag-route="ascent"
        />
      </div>
      <div class="text-right">
        <add-in-tick-list-btn
          v-if="ascents.length === 0"
          :crag-route="cragRoute"
        />
        <remove-from-tick-list-btn
          v-if="ascents.length === 0"
          :crag-route="cragRoute"
        />
        <add-crag-ascent-btn
          :crag-route="cragRoute"
          :is-repetition="ascents.length > 0"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import AscentCragRouteSmallCard from '@/components/ascentCragRoutes/AscentCragRouteSmallCard'
import AddCragAscentBtn from '@/components/ascentCragRoutes/AddCragAscentBtn'
import AddInTickListBtn from '@/components/tickLists/forms/AddInTickListBtn'
import RemoveFromTickListBtn from '@/components/tickLists/forms/RemoveFromTickListBtn'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'CragRouteAscent',
  components: { RemoveFromTickListBtn, AddInTickListBtn, AddCragAscentBtn, AscentCragRouteSmallCard },
  mixins: [DateHelpers],
  props: {
    cragRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingAscents: true,
      ascents: []
    }
  },

  watch: {
    cragRoute () {
      this.ascents = []
      this.getAscents()
    }
  },

  mounted () {
    this.$root.$on('reloadAscentCragRoute', () => {
      this.getAscents()
    })
    this.getAscents()
  },

  beforeDestroy () {
    this.$root.$off('reloadAscentCragRoute')
  },

  methods: {
    getAscents () {
      this.loadingAscents = true
      this.ascents = []
      new OblykApi(this.$axios, this.$auth)
        .get('/ascent_crag_routes', { crag_route_id: this.cragRoute.id })
        .then((resp) => {
          this.ascents = resp.data
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'ascentCragRouteApi')
        })
        .finally(() => {
          this.loadingAscents = false
        })
    }
  }
}
</script>
