<template>
  <div>
    <div
      v-if="sessionDetail.description"
      class="mt-2 mb-5"
    >
      <p class="mb-1 subtitle-2">
        <v-icon left small color="primary" class="vertical-align-text-top">
          {{ mdiText }}
        </v-icon>
        {{ $t('components.ascentCragRoute.myCommentaire') }}
      </p>
      <markdown-text
        :text="sessionDetail.description"
        class="px-3 pt-2 pb-1 rounded-sm back-app-color"
      />
      <div class="text-right pt-1">
        <edit-climbing-session-btn
          :climbing-session="sessionDetail"
          :callback="getClimbingSession"
        />
      </div>
    </div>
    <div v-if="!sessionDetail.description">
      <edit-climbing-session-btn
        :climbing-session="climbingSession"
        :callback="getClimbingSession"
      />
    </div>

    <!-- Ascents -->
    <div class="mt-4">
      <p class="pb-1 mb-1 subtitle-2">
        <v-icon left small color="primary" class="vertical-align-text-top">
          {{ mdiCheckAll }}
        </v-icon>
        {{ $t('components.climbingSession.ascentsAt', { date: humanizeDate(sessionDetail.session_date) }) }}
      </p>

      <!-- Crag Ascents -->
      <v-sheet
        v-for="(ascent, routeIndex) in cragAscents"
        :key="`route-index-${routeIndex}`"
        rounded
        class="mb-1"
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

      <!-- Gym ascents -->
      <div
        v-for="(ascent, gymAscentIndex) in gymAscents"
        :key="`gym-ascent-route-index-${gymAscentIndex}`"
        class="mb-1"
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
      </div>
    </div>

    <!-- Crags and Gyms -->
    <div class="mt-10">
      <p class="pb-1 mb-1 subtitle-2">
        <v-icon left small color="primary" class="vertical-align-text-top">
          {{ mdiMapMarker }}
        </v-icon>
        {{ $t('components.climbingSession.climbingPlaces') }}
      </p>
      <crag-small-card
        v-for="(crag, cragIndex) in crags"
        :key="`crag-index-${cragIndex}`"
        :crag="crag"
        small
        bordered
        class="mb-1"
      />

      <gym-small-card
        v-for="(gym, gymIndex) in gyms"
        :key="`gym-index-${gymIndex}`"
        :gym="gym"
        small
        bordered
        class="mb-1"
      />
    </div>

    <!-- User ascents -->
    <div
      v-if="users.length > 0"
      class="mt-9"
    >
      <p class="pb-1 mb-0 subtitle-2">
        <v-icon left small color="primary" class="vertical-align-text-top">
          {{ mdiAccountMultiple }}
        </v-icon>
        {{ $t('components.climbingSession.climbingPartners') }}
      </p>
      <v-row>
        <v-col
          v-for="(user, userIndex) in users"
          :key="`user-index-${userIndex}`"
          cols="12"
          md="6"
          lg="4"
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
    <crag-route-drawer v-if="cragAscents.length > 0" />
  </div>
</template>

<script>
import { mdiAccountMultiple, mdiMapMarker, mdiCheckAll, mdiText } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import GymSmallCard from '~/components/gyms/GymSmallCard.vue'
import UserSmallCard from '~/components/users/UserSmallCard.vue'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem.vue'
import CragSmallCard from '~/components/crags/CragSmallCard.vue'
import MarkdownText from '~/components/ui/MarkdownText.vue'
import AscentGymRouteLine from '~/components/ascentGymRoutes/AscentGymRouteLine.vue'
import EditClimbingSessionBtn from '~/components/climbingSessions/EditClimbingSessionBtn.vue'
import CragRouteSmallLine from '~/components/cragRoutes/CragRouteSmallLine.vue'
import Crag from '~/models/Crag'
import Gym from '~/models/Gym'
import User from '~/models/User'
import AscentCragRoute from '~/models/AscentCragRoute'
import AscentGymRoute from '~/models/AscentGymRoute'
import ClimbingSessionApi from '~/services/oblyk-api/ClimbingSessionApi'
import ClimbingSession from '~/models/ClimbingSession'
const CragRouteDrawer = () => import('~/components/cragRoutes/CragRouteDrawer.vue')

export default {
  name: 'ClimbingSessionDetail',
  components: {
    CragRouteDrawer,
    CragRouteSmallLine,
    EditClimbingSessionBtn,
    AscentGymRouteLine,
    MarkdownText,
    CragSmallCard,
    GymRouteListItem,
    UserSmallCard,
    GymSmallCard
  },
  mixins: [DateHelpers],

  props: {
    climbingSession: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      sessionDetail: this.climbingSession,

      mdiAccountMultiple,
      mdiMapMarker,
      mdiCheckAll,
      mdiText
    }
  },

  computed: {
    crags () {
      const crags = []
      for (const crag of this.sessionDetail.crags) {
        crags.push(new Crag({ attributes: crag }))
      }
      return crags
    },

    gyms () {
      const gyms = []
      for (const gym of this.sessionDetail.gyms) {
        gyms.push(new Gym({ attributes: gym }))
      }
      return gyms
    },

    users () {
      const users = []
      for (const user of this.sessionDetail.users) {
        users.push(new User({ attributes: user }))
      }
      return users
    },

    cragAscents () {
      const ascents = []
      for (const ascent of this.sessionDetail.crag_ascents) {
        ascents.push(new AscentCragRoute({ attributes: ascent }))
      }
      return ascents
    },

    gymAscents () {
      const ascents = []
      for (const ascent of this.sessionDetail.gym_ascents) {
        ascents.push(new AscentGymRoute({ attributes: ascent }))
      }
      return ascents
    }
  },

  methods: {
    getClimbingSession () {
      const sessionDate = this.sessionDetail.session_date
      new ClimbingSessionApi(this.$axios, this.$auth)
        .find(sessionDate)
        .then((resp) => {
          this.sessionDetail = new ClimbingSession({ attributes: resp.data })
        })
    }
  }
}
</script>
