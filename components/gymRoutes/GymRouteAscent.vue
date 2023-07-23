<template>
  <v-sheet
    v-if="ascents.length > 0"
    class="back-app-color rounded-sm pa-2"
  >
    <description-line
      :item-title="$t('components.gymRoute.inMyLogBook')"
      :icon="mdiBookCheckOutline"
    >
      <template #content>
        <div
          v-for="ascent in ascents"
          :key="`ascent-${ascent.id}`"
        >
          <ascent-gym-route-small-card
            :gym-route="gymRoute"
            :ascent-gym-route="ascent"
          />
        </div>
      </template>
    </description-line>
  </v-sheet>
</template>

<script>
import { mdiBookCheckOutline } from '@mdi/js'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import AscentGymRoute from '@/models/AscentGymRoute'
import AscentGymRouteSmallCard from '@/components/ascentGymRoutes/AscentGymRouteSmallCard'
import DescriptionLine from '~/components/ui/DescriptionLine.vue'

export default {
  name: 'GymRouteAscent',
  components: { DescriptionLine, AscentGymRouteSmallCard },
  props: {
    gymRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingAscents: true,
      ascents: [],

      mdiBookCheckOutline
    }
  },

  watch: {
    gymRoute () {
      this.ascents = []
      this.getAscents()
    }
  },

  mounted () {
    this.$root.$on('reloadAscentGymRoute', () => {
      this.getAscents()
    })
    this.getAscents()
  },

  beforeDestroy () {
    this.$root.$off('reloadAscentGymRoute')
  },

  methods: {
    getAscents () {
      this.loadingAscents = true
      this.ascents = []
      new AscentGymRouteApi(this.$axios, this.$auth)
        .all({ gym_route_id: this.gymRoute.id })
        .then((resp) => {
          for (const ascent of resp.data) {
            this.ascents.push(new AscentGymRoute({ attributes: ascent }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'ascentGymRouteApi')
        })
        .then(() => {
          this.loadingAscents = false
        })
    }
  }
}
</script>
