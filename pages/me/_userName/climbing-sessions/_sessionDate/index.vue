<template>
  <v-container>
    <v-btn
      text
      exact
      :to="`/me/${$auth.user.slug_name}/climbing-sessions`"
    >
      <v-icon class="mr-2">
        {{ mdiArrowLeft }}
      </v-icon>
      {{ $t('components.climbingSession.list') }}
    </v-btn>

    <div v-if="!climbingSession">
      <v-skeleton-loader
        class="mt-3"
        type="article"
      />
      <v-row class="mt-1">
        <v-col>
          <v-btn text>
            <v-icon class="mr-2">
              {{ mdiArrowLeft }}
            </v-icon>
            ...
          </v-btn>
        </v-col>
        <v-col class="text-right">
          <v-btn text>
            ...
            <v-icon class="ml-2">
              {{ mdiArrowRight }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div v-if="climbingSession">
      <v-card class="mt-5">
        <v-card-title>
          {{ $t('components.climbingSession.title', { date: humanizeDate(climbingSession.session_date) }) }}
        </v-card-title>
        <v-card-subtitle>
          {{ dateFromToday(climbingSession.session_date) }}
        </v-card-subtitle>
        <v-card-text>
          <!-- Climbing session description -->
          <div
            v-if="climbingSession.description"
            class="mt-2 mb-5"
          >
            <p class="mb-1">
              {{ $t('components.ascentCragRoute.myCommentaire') }}
            </p>
            <markdown-text
              :text="climbingSession.description"
              class="px-3 pt-2 pb-1 rounded-sm back-app-color"
            />
            <div class="text-right pt-1">
              <edit-climbing-session-btn
                :climbing-session="climbingSession"
                :callback="getClimbingSession"
              />
            </div>
          </div>

          <!-- Ascents -->
          <div class="mt-4">
            <p class="pb-1 mb-1">
              {{ $t('components.climbingSession.ascentsAt', { date: humanizeDate(climbingSession.session_date) }) }}
            </p>
            <v-row>
              <v-col
                v-for="(ascent, routeIndex) in cragAscents"
                :key="`route-index-${routeIndex}`"
                cols="12"
                md="6"
                lg="4"
              >
                <v-sheet
                  rounded
                  :class="ascent.comment ? 'px-2 pt-2 border' : 'pa-2 border'"
                >
                  <crag-route-small-line
                    :route="ascent.CragRoute"
                  />
                  <markdown-text
                    v-if="ascent.comment"
                    :text="ascent.comment"
                    class="px-2 pb-0 mb-0"
                  />
                </v-sheet>
              </v-col>
              <v-col
                v-for="(ascent, gymAscentIndex) in gymAscents"
                :key="`gym-ascent-route-index-${gymAscentIndex}`"
                cols="12"
                md="6"
                lg="4"
              >
                <v-sheet
                  v-if="ascent.gym_route"
                  rounded
                  class="border"
                >
                  <gym-route-list-item
                    :gym-route="ascent.GymRoute"
                    :relative-path="false"
                  />
                  <markdown-text
                    v-if="ascent.comment"
                    :text="ascent.comment"
                    class="px-3 mt-2"
                  />
                </v-sheet>
                <ascent-gym-route-line
                  v-if="!ascent.gym_route"
                  :ascent-gym-route="ascent"
                  :delete-callback="getClimbingSession"
                  :edit-callback="getClimbingSession"
                />
              </v-col>
            </v-row>
          </div>

          <!-- Crags and Gyms -->
          <div class="mt-10">
            <p class="pb-1 mb-1">
              {{ $t('components.climbingSession.climbingPlaces') }}
            </p>
            <v-row>
              <v-col
                v-for="(crag, cragIndex) in crags"
                :key="`crag-index-${cragIndex}`"
                cols="12"
                md="6"
                lg="4"
              >
                <crag-small-card
                  :crag="crag"
                  small
                  bordered
                />
              </v-col>
              <v-col
                v-for="(gym, gymIndex) in gyms"
                :key="`gym-index-${gymIndex}`"
                cols="12"
                md="6"
                lg="4"
              >
                <gym-small-card
                  :gym="gym"
                  small
                  bordered
                />
              </v-col>
            </v-row>
          </div>

          <!-- User ascents -->
          <div
            v-if="users.length > 0"
            class="mt-9"
          >
            <p class="pb-1 mb-0">
              {{ $t('components.climbingSession.climbingPartners') }}
            </p>
            <v-row>
              <v-col
                v-for="(user, userIndex) in users"
                :key="`user-index-${userIndex}`"
                cols="12"
                md="4"
                lg="3"
              >
                <user-small-card
                  :user="user"
                  :subscribable="false"
                  small
                  bordered
                />
              </v-col>
            </v-row>
          </div>
        </v-card-text>

        <v-card-actions v-if="!climbingSession.description">
          <v-spacer />
          <edit-climbing-session-btn
            :climbing-session="climbingSession"
            :callback="getClimbingSession"
          />
        </v-card-actions>
      </v-card>

      <!-- Previous and next climbing session -->
      <v-row class="mt-3">
        <v-col
          v-if="climbingSession.previous_climbing_session"
        >
          <v-btn
            text
            :to="`/me/${$auth.user.slug_name}/climbing-sessions/${climbingSession.previous_climbing_session}`"
          >
            <v-icon class="mr-2">
              {{ mdiArrowLeft }}
            </v-icon>
            {{ humanizeDate(climbingSession.previous_climbing_session) }}
          </v-btn>
        </v-col>
        <v-col
          v-if="climbingSession.next_climbing_session"
          class="text-right"
        >
          <v-btn
            :to="`/me/${$auth.user.slug_name}/climbing-sessions/${climbingSession.next_climbing_session}`"
            text
          >
            {{ humanizeDate(climbingSession.next_climbing_session) }}
            <v-icon class="ml-2">
              {{ mdiArrowRight }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <crag-route-drawer v-if="cragAscents.length > 0" />
    </div>
  </v-container>
</template>

<script>
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import { ClimbingSessionConcern } from '~/concerns/ClimbingSessionConcern'
import { GradeMixin } from '~/mixins/GradeMixin'
import MarkdownText from '~/components/ui/MarkdownText.vue'
import Crag from '~/models/Crag'
import Gym from '~/models/Gym'
import CragSmallCard from '~/components/crags/CragSmallCard.vue'
import GymSmallCard from '~/components/gyms/GymSmallCard.vue'
import CragRouteSmallLine from '~/components/cragRoutes/CragRouteSmallLine.vue'
import AscentCragRoute from '~/models/AscentCragRoute'
import AscentGymRoute from '~/models/AscentGymRoute'
import CragRouteDrawer from '~/components/cragRoutes/CragRouteDrawer.vue'
import User from '~/models/User'
import UserSmallCard from '~/components/users/UserSmallCard.vue'
import EditClimbingSessionBtn from '~/components/climbingSessions/EditClimbingSessionBtn.vue'
import ClimbingSessionApi from '~/services/oblyk-api/ClimbingSessionApi'
import ClimbingSession from '~/models/ClimbingSession'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem.vue'
import AscentGymRouteLine from '~/components/ascentGymRoutes/AscentGymRouteLine.vue'

export default {
  components: {
    AscentGymRouteLine,
    GymRouteListItem,
    EditClimbingSessionBtn,
    UserSmallCard,
    CragRouteDrawer,
    CragRouteSmallLine,
    GymSmallCard,
    CragSmallCard,
    MarkdownText
  },
  mixins: [
    ClimbingSessionConcern,
    DateHelpers,
    GradeMixin
  ],

  data () {
    return {
      mdiArrowLeft,
      mdiArrowRight
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ma session de grimpe du %{date}',
        metaDescription: "Les croix, lieux, grimpeurs et grimpeuses avec qui j'ai grimpé le %{date}"
      },
      en: {
        metaTitle: 'My climbing session on %{date}',
        metaDescription: 'My ascents, places, climbers with whom I climbed on %{date}'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { date: this.humanizeDate(this.climbingSession?.session_date) }),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('metaDescription', { date: this.humanizeDate(this.climbingSession?.session_date) }) },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle', { date: this.humanizeDate(this.climbingSession?.session_date) }) },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription', { date: this.humanizeDate(this.climbingSession?.session_date) }) },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  },

  computed: {
    crags () {
      const crags = []
      for (const crag of this.climbingSession.crags) {
        crags.push(new Crag({ attributes: crag }))
      }
      return crags
    },

    gyms () {
      const gyms = []
      for (const gym of this.climbingSession.gyms) {
        gyms.push(new Gym({ attributes: gym }))
      }
      return gyms
    },

    users () {
      const users = []
      for (const user of this.climbingSession.users) {
        users.push(new User({ attributes: user }))
      }
      return users
    },

    cragAscents () {
      const ascents = []
      for (const ascent of this.climbingSession.crag_ascents) {
        ascents.push(new AscentCragRoute({ attributes: ascent }))
      }
      return ascents
    },

    gymAscents () {
      const ascents = []
      for (const ascent of this.climbingSession.gym_ascents) {
        ascents.push(new AscentGymRoute({ attributes: ascent }))
      }
      return ascents
    }
  },

  methods: {
    getClimbingSession () {
      const sessionDate = this.climbingSession.session_date
      this.climbingSession = null
      new ClimbingSessionApi(this.$axios, this.$auth)
        .find(sessionDate)
        .then((resp) => {
          this.climbingSession = new ClimbingSession({ attributes: resp.data })
        })
    }
  }
}
</script>
