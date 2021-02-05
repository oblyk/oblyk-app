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
        <v-btn
          text
          color="primary"
          small
          :to="cragRoute.path('ascents/new')"
        >
          <v-icon left>
            mdi-check
          </v-icon>
          <span v-if="ascents.length > 0">
            {{ $t('actions.addRepetition') }}
          </span>
          <span v-if="ascents.length === 0">
            {{ $t('actions.addInMyLogbook') }}
          </span>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import AscentCragRouteApi from '@/services/oblyk-api/AscentCragRouteApi'
import AscentCragRoute from '@/models/AscentCragRoute'
import AscentCragRouteSmallCard from '@/components/ascentCragRoutes/AscentCragRouteSmallCard'

export default {
  name: 'CragRouteAscent',
  mixins: [DateHelpers],
  components: { AscentCragRouteSmallCard },
  props: {
    cragRoute: Object
  },

  data () {
    return {
      loadingAscents: true,
      ascents: []
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
    getAscents: function () {
      this.loadingAscents = true
      this.ascents = []
      AscentCragRouteApi
        .all(this.cragRoute.id)
        .then(resp => {
          for (const ascent of resp.data) {
            this.ascents.push(new AscentCragRoute(ascent))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'ascentCragRouteApi')
        })
        .then(() => {
          this.loadingAscents = false
        })
    }
  }
}
</script>
