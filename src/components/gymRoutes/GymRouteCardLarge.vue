<template>
  <div>
    <spinner v-if="loadingRoute" :full-height="false" />

    <v-card color="mt-5 mb-5" v-if="!loadingRoute">
      <v-img
        :height="gymRoute.hasPicture ? 550 : 60"
        :src="gymRoute.pictureUrl()"
        gradient="to bottom, rgba(0, 0, 0, 0.5) 0%, transparent 100px"
      >
        <p class="pt-2 pr-2 pl-1">
          <gym-route-action-menu
            v-if="currentUserIsGymAdmin()"
            :get-space-routes="getSpaceRoutes"
            :gym-route="gymRoute"
          />

          <v-btn
            @click="changeCardSize()"
            icon
            large
            dark
            class="float-right"
          >
            <v-icon large>
              mdi-close
            </v-icon>
          </v-btn>
        </p>
      </v-img>
      <v-row>
        <v-col class="gym-tag-large-col pr-0">
          <gym-route-tag-and-hold :gym-route="gymRoute" />
        </v-col>
        <v-col>
          <strong>
            {{ gymRoute.name }}
          </strong>
        </v-col>
        <v-col class="gym-grade-large-col text-center pl-0">
          <gym-route-grade-and-point :gym-route="gymRoute"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0">
          <div class="gym-route-more-information-row">
            <v-col>

              <!-- Tags -->
              <gym-route-tags :gym-route="gymRoute" />

              <!-- Other information -->
              <table class="gym-route-information mt-2">
                <tr>
                  <th class="smallest-table-column">{{ $t('models.gymRoute.ascents') }}</th>
                  <td>{{ gymRoute.ascents_count || 0 }}</td>
                </tr>
                <tr v-if="gymRoute.opened_at">
                  <th class="smallest-table-column">{{ $t('models.gymRoute.opened_at') }}</th>
                  <td>{{ humanizeDate(gymRoute.opened_at) }}</td>
                </tr>
                <tr>
                  <th class="smallest-table-column">{{ $t('models.gymRoute.gym_sector_id') }}</th>
                  <td>{{ gymRoute.gym_sector.name }}</td>
                </tr>
                <tr v-if="gymRoute.openers">
                  <th class="smallest-table-column">{{ $t('models.gymRoute.openers') }}</th>
                  <td>{{ gymRoute.openers }}</td>
                </tr>
              </table>
            </v-col>
          </div>
        </v-col>
      </v-row>

      <!-- Cross list and add in logbook btn -->
      <gym-route-ascent :gym-route="gymRoute" />
    </v-card>
  </div>
</template>
<script>
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteGradeAndPoint from '@/components/gymRoutes/partial/GymRouteGradeAndPoint'
import GymRouteActionMenu from '@/components/gymRoutes/partial/GymRouteActionMenu'
import Spinner from '@/components/layouts/Spiner'
import GymRoute from '@/models/GymRoute'
import { SessionConcern } from '@/concerns/SessionConcern'
import { DateHelpers } from '@/mixins/DateHelpers'
import GymRouteTags from '@/components/gymRoutes/partial/GymRouteTags'
import GymRouteAscent from '@/components/gymRoutes/GymRouteAscent'

export default {
  name: 'GymRouteCardLarge',
  components: { GymRouteAscent, GymRouteTags, Spinner, GymRouteActionMenu, GymRouteGradeAndPoint, GymRouteTagAndHold },
  mixins: [SessionConcern, DateHelpers],
  props: {
    gymRouteProp: Object,
    changeCardSize: Function,
    getSpaceRoutes: Function
  },
  data () {
    return {
      loadingRoute: true,
      gymRoute: null
    }
  },

  mounted () {
    this.getRoute()
  },

  methods: {
    getRoute () {
      this.loadingRoute = true
      new GymRoute()
        .find(
          this.gymRouteProp.gym.id,
          this.gymRouteProp.gym_space.id,
          this.gymRouteProp.id
        )
        .then((resp) => {
          this.gymRoute = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        }).finally(() => {
          this.loadingRoute = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.gym-route-more-information-row {
  border-top-style: solid;
  border-width: 1px;
}
.gym-tag-large-col {
  max-width: 75px;
}
.gym-grade-large-col {
  border-left-style: solid;
  border-width: 1px;
  max-width: 100px;
}
.gym-route-information {
  width: 100%;
  .smallest-table-column {
    font-weight: lighter;
    text-align: right;
    padding-right: 0.5em;
  }
}
.v-application {
  &.theme--dark {
    .gym-grade-large-col, .gym-route-more-information-row {
      border-color: #4b4b4b;
    }
  }
  &.theme--light {
    .gym-grade-large-col, .gym-route-more-information-row {
      border-color: #e0e0e0;
    }
  }
}
</style>
