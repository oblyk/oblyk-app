<template>
  <div>
    <v-img
      v-if="gymRoute.hasPicture"
      :class="!$vuetify.breakpoint.mobile ? 'rounded' : ''"
      dark
      contain
      :src="gymRoute.pictureUrl"
    />

    <!-- Information, ascents, etc. -->
    <div class="pa-2">
      <!-- Title -->
      <v-row class="gym-route-title">
        <v-col align-self="center" class="tag-and-hold">
          <gym-route-tag-and-hold :gym-route="gymRoute" />
        </v-col>
        <v-col align-self="center" class="name-and-grade">
          <gym-route-grade-and-point
            :gym-route="gymRoute"
            inline
            class="mr-1"
          />
          {{ gymRoute.name }}
        </v-col>
        <v-col align-self="center" class="close-btn">
          <v-btn
            icon
            large
            class="float-right"
            @click="closeGymCard()"
          >
            <v-icon large>
              {{ mdiClose }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Route description -->
      <v-sheet
        v-if="gymRoute.description"
        rounded
        class="px-3 pb-1 pt-4 my-2 font-italic"
      >
        <markdown-text :text="gymRoute.description" />
      </v-sheet>

      <!-- Global information -->
      <v-row class="my-2">
        <!-- Route note -->
        <v-col v-if="gymRoute.note" cols="6">
          <description-line
            :icon="mdiStarOutline"
            :item-title="$t('models.gymRoute.note')"
          >
            <template #content>
              <note :note="gymRoute.note" />
              <small class="grey--text ml-1">({{ gymRoute.note_count }})</small>
            </template>
          </description-line>
        </v-col>

        <!-- Route ascent count -->
        <v-col v-if="gymRoute.ascents_count || 0 > 0" cols="6">
          <description-line
            :icon="mdiCheckAll"
            :item-title="$t('models.gymRoute.ascents')"
            :item-value="$tc('components.gymRoute.ascents', gymRoute.ascents_count, { count: gymRoute.ascents_count })"
          />
        </v-col>

        <!-- Route opened_at -->
        <v-col v-if="gymRoute.opened_at" cols="6">
          <description-line
            :icon="mdiCalendar"
            :item-title="$t('models.gymRoute.opened_at')"
            :item-value="humanizeDate(gymRoute.opened_at)"
          />
        </v-col>

        <!-- Sector -->
        <v-col cols="6">
          <description-line
            :icon="mdiTextureBox"
            :item-title="$t('models.gymRoute.gym_sector_id')"
            :item-value="gymRoute.gym_sector.name"
          />
        </v-col>

        <!-- Route opener -->
        <v-col v-if="gymRoute.openers" cols="6">
          <description-line
            :icon="mdiBolt"
            :item-title="$t('models.gymRoute.openers')"
            :item-value="gymRoute.openers"
          />
        </v-col>

        <!-- Route tags -->
        <v-col v-if="gymRoute.hasTags" cols="12">
          <description-line
            :icon="mdiPound"
            :item-title="$t('models.gymRoute.tags')"
          >
            <template #content>
              <gym-route-tags
                class="mt-2"
                :gym-route="gymRoute"
              />
            </template>
          </description-line>
        </v-col>
      </v-row>

      <!-- Edit and add to logbook -->
      <div class="text-right mt-2 mb-3">
        <add-gym-ascent-btn
          v-if="$auth.loggedIn"
          :gym-route="gymRoute"
        />

        <gym-route-action-btn
          v-if="$auth.loggedIn && currentUserIsGymAdmin()"
          :gym-route="gymRoute"
        />
      </div>

      <!-- Climber ascent part -->
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
          <nuxt-link :to="`/users/${ascent.user.uuid}/${ascent.user.slug_name}`">
            {{ ascent.user.first_name }}
          </nuxt-link>
        </div>
      </div>

      <!-- Cross list and add in logbook btn -->
      <gym-route-ascent
        v-if="isLoggedIn"
        :gym-route="gymRoute"
      />
    </div>
  </div>
</template>

<script>
import {
  mdiClose,
  mdiComment,
  mdiStarOutline,
  mdiCheckAll,
  mdiCalendar,
  mdiTextureBox,
  mdiBolt,
  mdiPound
} from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import { DateHelpers } from '@/mixins/DateHelpers'
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteGradeAndPoint from '@/components/gymRoutes/partial/GymRouteGradeAndPoint'
import GymRouteTags from '@/components/gymRoutes/partial/GymRouteTags'
import GymRouteAscent from '@/components/gymRoutes/GymRouteAscent'
import Note from '@/components/notes/Note'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import AscentGymRoute from '@/models/AscentGymRoute'
import DescriptionLine from '~/components/ui/DescriptionLine.vue'
import GymRouteActionBtn from '~/components/gymRoutes/partial/GymRouteActionBtn.vue'
import AddGymAscentBtn from '~/components/ascentGymRoutes/AddGymAscentBtn.vue'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymRouteInfo',
  components: {
    AddGymAscentBtn,
    GymRouteActionBtn,
    DescriptionLine,
    Note,
    MarkdownText,
    GymRouteAscent,
    GymRouteTags,
    GymRouteGradeAndPoint,
    GymRouteTagAndHold
  },
  mixins: [SessionConcern, DateHelpers],
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

      mdiComment,
      mdiClose,
      mdiStarOutline,
      mdiCheckAll,
      mdiCalendar,
      mdiTextureBox,
      mdiBolt,
      mdiPound
    }
  },

  mounted () {
    this.getAscents()
  },

  methods: {
    closeGymCard () {
      this.$router.push(
        {
          path: this.$route.path
        }
      )
    },
    getAscents () {
      this.loadingAscents = true
      new GymRouteApi(this.$axios, this.$auth)
        .routeAscents(this.gymRoute.gym.id, this.gymRoute.id)
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
.gym-route-title {
  .tag-and-hold {
    max-width: 65px;
    white-space: nowrap;
  }
  .name-and-grade {
    font-size: 1.1em;
    font-weight: bold;
  }
  .close-btn {
    max-width: 30px;
    text-align: center;
  }
}
</style>