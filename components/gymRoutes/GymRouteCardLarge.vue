<template>
  <div>
    <spinner v-if="loadingRoute" :full-height="false" />

    <v-card v-if="!loadingRoute" color="mt-5 mb-5">
      <v-img
        :height="gymRoute.hasPicture ? 550 : 60"
        :src="gymRoute.pictureUrl"
        gradient="to bottom, rgba(0, 0, 0, 0.5) 0%, transparent 100px"
      >
        <p class="pt-2 pr-2 pl-1">
          <gym-route-action-menu
            v-if="currentUserIsGymAdmin()"
            :get-space-routes="getSpaceRoutes"
            :gym-route="gymRoute"
          />

          <v-btn
            icon
            large
            dark
            class="float-right"
            @click="changeCardSize()"
          >
            <v-icon large>
              {{ mdiClose }}
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
          <gym-route-grade-and-point :gym-route="gymRoute" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pt-0">
          <div class="gym-route-more-information-row">
            <v-col>
              <!-- Tags -->
              <gym-route-tags :gym-route="gymRoute" />

              <!-- Route description -->
              <markdown-text
                v-if="gymRoute.description"
                class="mt-3"
                :text="gymRoute.description"
              />

              <!-- Other information -->
              <table class="gym-route-information mt-2">
                <tr v-if="gymRoute.note">
                  <th class="smallest-table-column">
                    {{ $t('models.gymRoute.note') }}
                  </th>
                  <td>
                    <note :note="gymRoute.note" />
                    <small class="grey--text ml-1">({{ gymRoute.note_count }})</small>
                  </td>
                </tr>
                <tr>
                  <th class="smallest-table-column">
                    {{ $t('models.gymRoute.ascents') }}
                  </th>
                  <td>{{ gymRoute.ascents_count || 0 }}</td>
                </tr>
                <tr v-if="gymRoute.opened_at">
                  <th class="smallest-table-column">
                    {{ $t('models.gymRoute.opened_at') }}
                  </th>
                  <td>{{ humanizeDate(gymRoute.opened_at) }}</td>
                </tr>
                <tr>
                  <th class="smallest-table-column">
                    {{ $t('models.gymRoute.gym_sector_id') }}
                  </th>
                  <td>{{ gymRoute.gym_sector.name }}</td>
                </tr>
                <tr v-if="gymRoute.openers">
                  <th class="smallest-table-column">
                    {{ $t('models.gymRoute.openers') }}
                  </th>
                  <td>{{ gymRoute.openers }}</td>
                </tr>
              </table>
            </v-col>
          </div>
        </v-col>
      </v-row>

      <div
        v-if="ascents.length > 0"
        class="pr-3 pl-3"
      >
        <p class="mb-0">
          <v-icon small class="mr-2">
            {{ mdiComment }}
          </v-icon>
          <u>
            {{ $t('components.gymRoute.climbersComments') }}
          </u>
        </p>
        <div
          v-for="(ascent, index) in ascents"
          :key="`gym-route-ascent-${index}`"
          class="mt-2 mb-5"
        >
          {{ ascent.comment }}
          <br v-if="ascent.note">
          <note :note="ascent.note" />
          {{ $t('common.by') }}
          <nuxt-link :to="ascent.User.userPath">
            {{ ascent.User.first_name }}
          </nuxt-link>
        </div>
      </div>

      <!-- Cross list and add in logbook btn -->
      <gym-route-ascent
        v-if="isLoggedIn"
        :gym-route="gymRoute"
      />
    </v-card>
  </div>
</template>
<script>
import { mdiClose, mdiComment } from '@mdi/js'
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteGradeAndPoint from '@/components/gymRoutes/partial/GymRouteGradeAndPoint'
import GymRouteActionMenu from '@/components/gymRoutes/partial/GymRouteActionMenu'
import Spinner from '@/components/layouts/Spiner'
import GymRoute from '@/models/GymRoute'
import { SessionConcern } from '@/concerns/SessionConcern'
import { DateHelpers } from '@/mixins/DateHelpers'
import GymRouteTags from '@/components/gymRoutes/partial/GymRouteTags'
import GymRouteAscent from '@/components/gymRoutes/GymRouteAscent'
import Note from '@/components/notes/Note'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import AscentGymRoute from '@/models/AscentGymRoute'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymRouteCardLarge',
  components: { Note, MarkdownText, GymRouteAscent, GymRouteTags, Spinner, GymRouteActionMenu, GymRouteGradeAndPoint, GymRouteTagAndHold },
  mixins: [SessionConcern, DateHelpers],
  props: {
    gymRouteProp: Object,
    changeCardSize: Function,
    getSpaceRoutes: Function
  },

  data () {
    return {
      mdiClose,
      mdiComment,
      loadingRoute: true,
      loadingAscents: true,
      gymRoute: null,
      ascents: []
    }
  },

  mounted () {
    this.getRoute()
    this.getAscents()
  },

  methods: {
    getRoute () {
      this.loadingRoute = true
      new GymRoute({ axios: this.$axios, auth: this.$auth })
        ._find(
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
    },

    getAscents () {
      this.loadingAscents = true
      new GymRouteApi(this.$axios, this.$auth)
        .routeAscents(this.gymRouteProp.gym.id, this.gymRouteProp.id)
        .then((resp) => {
          for (const ascent of resp.data) {
            if (ascent.note || ascent.comment) {
              this.ascents.push(new AscentGymRoute({ attributes: ascent }))
            }
          }
        })
        .finally(() => {
          this.loadingAscents = false
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
