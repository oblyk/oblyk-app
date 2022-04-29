<template>
  <v-row>
    <v-col>
      <p
        v-if="ascents.length > 0"
        class="pl-3 mb-0"
      >
        <v-icon small class="mr-2">
          {{ mdiCheckBold }}
        </v-icon>
        <u>
          {{ $t('components.gymRoute.inMyLogBook') }}
        </u>
      </p>
      <div
        v-for="ascent in ascents"
        :key="`ascent-${ascent.id}`"
      >
        <ascent-gym-route-small-card
          :gym-route="gymRoute"
          :ascent-gym-route="ascent"
        />
      </div>
      <div class="text-right">
        <add-gym-ascent-btn
          :gym-route="gymRoute"
          :is-repetition="ascents.length > 0"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mdiCheckBold } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import AscentGymRoute from '@/models/AscentGymRoute'
import AscentGymRouteSmallCard from '@/components/ascentGymRoutes/AscentGymRouteSmallCard'
import AddGymAscentBtn from '@/components/ascentGymRoutes/AddGymAscentBtn'

export default {
  name: 'GymRouteAscent',
  components: { AddGymAscentBtn, AscentGymRouteSmallCard },
  mixins: [DateHelpers],
  props: {
    gymRoute: Object
  },

  data () {
    return {
      mdiCheckBold,
      loadingAscents: true,
      ascents: []
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
        .all(this.gymRoute.id)
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
