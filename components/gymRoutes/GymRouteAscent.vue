<template>
  <div v-if="ascents.length > 0">
    <p class="font-weight-bold mb-0 mt-4 pl-1">
      <v-icon
        size="20"
        color="amber darken-1"
        class="mr-1"
      >
        {{ mdiBookCheck }}
      </v-icon>
      {{ $t('components.gymRoute.inMyLogBook') }}
    </p>
    <v-sheet class="rounded-sm pa-2">
      <div
        v-for="(ascent, ascentIndex) in ascents"
        :key="`ascent-index-${ascentIndex}`"
        class="mb-2"
      >
        <ascent-gym-route-small-card
          :gym-route="gymRoute"
          :ascent-gym-route="ascent"
        />
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { mdiBookCheck } from '@mdi/js'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import AscentGymRoute from '@/models/AscentGymRoute'
import AscentGymRouteSmallCard from '@/components/ascentGymRoutes/AscentGymRouteSmallCard'

export default {
  name: 'GymRouteAscent',
  components: { AscentGymRouteSmallCard },
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

      mdiBookCheck
    }
  },

  computed: {
    gymRouteAscents () {
      return this.$auth.user.ascent_gym_routes
    }
  },

  watch: {
    gymRouteAscents () {
      this.getAscents()
    }
  },

  mounted () {
    this.getAscents()
  },

  methods: {
    getAscents () {
      const inLogbookAscents = this.gymRouteAscents.filter(gymRouteAscent => gymRouteAscent.gym_route_id === this.gymRoute.id)
      if (!inLogbookAscents || inLogbookAscents.length === 0) { return }

      this.loadingAscents = true
      new AscentGymRouteApi(this.$axios, this.$auth)
        .all({ gym_route_id: this.gymRoute.id })
        .then((resp) => {
          this.ascents = []
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
