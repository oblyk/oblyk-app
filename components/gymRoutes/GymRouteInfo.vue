<template>
  <div
    :class="$vuetify.breakpoint.mobile ? 'mobile-interface' : 'desktop-interface'"
  >
    <v-img
      v-if="gymRoute.hasPicture"
      class="rounded gym-route-picture"
      :class="fullHeightPicture ? '--full-height' : '--limited-height'"
      cover
      :src="gymRoute.pictureUrl"
      @click="fullHeightPicture = !fullHeightPicture"
    />

    <!-- Information, ascents, etc. -->
    <div class="pa-2">
      <!-- Title -->
      <v-row class="gym-route-title">
        <v-col align-self="center" class="tag-and-hold">
          <gym-route-tag-and-hold
            :size="40"
            :gym-route="gymRoute"
          />
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
            @click="closeGymRouteCard()"
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
              <note v-if="gymRoute.note !== null" :note="gymRoute.note" />
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
          >
            <template #content>
              <v-btn
                v-if="!showSpace"
                small
                text
                outlined
                @click="showSector"
              >
                {{ gymRoute.gym_sector.name }}
              </v-btn>
              <strong v-if="showSpace">
                {{ gymRoute.gym_sector.name }}
              </strong>
            </template>
          </description-line>
        </v-col>

        <!-- Space -->
        <v-col v-if="showSpace" cols="6">
          <description-line
            :icon="mdiMap"
            :item-title="$t('models.gymRoute.gym_space_id')"
          >
            <template #content>
              <nuxt-link :to="gymRoute.gymSpacePath">
                {{ gymRoute.gym_space.name }}
              </nuxt-link>
            </template>
          </description-line>
        </v-col>

        <!-- Route opener -->
        <v-col v-if="gymRoute.openers.length > 0" cols="6">
          <description-line
            :icon="mdiBolt"
            :item-title="$t('models.gymRoute.openers')"
            :item-value="gymRoute.openers.map(opener => opener.name).join(', ')"
          />
        </v-col>

        <!-- Route tags -->
        <v-col v-if="gym && gymRoute.hasStyles" cols="12">
          <description-line
            :icon="mdiPound"
            :item-title="$t('models.gymRoute.styles')"
          >
            <template #content>
              <gym-route-climbing-styles
                class="mt-2"
                :gym-route="gymRoute"
                :gym="gym"
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
          v-if="$auth.loggedIn && currentUserIsGymAdmin() && gymAuthCan(gymRoute.gym, 'manage_opening')"
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
          <br v-if="ascent.note !== null">
          <note v-if="ascent.note !== null" :note="ascent.note" />
          {{ $t('common.by') }}
          <nuxt-link :to="`/climbers/${ascent.user.slug_name}`">
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
  mdiPound,
  mdiMap
} from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import { DateHelpers } from '@/mixins/DateHelpers'
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteGradeAndPoint from '@/components/gymRoutes/partial/GymRouteGradeAndPoint'
import GymRouteAscent from '@/components/gymRoutes/GymRouteAscent'
import Note from '@/components/notes/Note'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import AscentGymRoute from '@/models/AscentGymRoute'
import DescriptionLine from '~/components/ui/DescriptionLine.vue'
import GymRouteActionBtn from '~/components/gymRoutes/partial/GymRouteActionBtn.vue'
import AddGymAscentBtn from '~/components/ascentGymRoutes/AddGymAscentBtn.vue'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import GymRouteClimbingStyles from '~/components/gymRoutes/partial/GymRouteClimbingStyles.vue'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymRouteInfo',
  components: {
    GymRouteClimbingStyles,
    AddGymAscentBtn,
    GymRouteActionBtn,
    DescriptionLine,
    Note,
    MarkdownText,
    GymRouteAscent,
    GymRouteGradeAndPoint,
    GymRouteTagAndHold
  },
  mixins: [SessionConcern, DateHelpers, GymRolesHelpers],
  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    showSpace: {
      type: Boolean,
      default: false
    },
    gym: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      loadingAscents: true,
      ascents: [],
      fullHeightPicture: false,

      mdiComment,
      mdiClose,
      mdiStarOutline,
      mdiCheckAll,
      mdiCalendar,
      mdiTextureBox,
      mdiBolt,
      mdiPound,
      mdiMap
    }
  },

  mounted () {
    this.getAscents()
  },

  methods: {
    closeGymRouteCard () {
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
    },

    showSector () {
      this.closeGymRouteCard()
      this.$root.$emit('setMapViewOnSector', this.gymRoute.gym_sector_id)
      this.$root.$emit('filterBySector', this.gymRoute.gym_sector_id, this.gymRoute.gym_sector.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.gym-route-picture {
  transition: max-height 0.3s;
  &.--full-height {
    max-height: calc(100vh - 64px);
  }
}
.mobile-interface {
  .gym-route-picture {
    &.--limited-height {
      height: calc(100vw - 60px);
      max-height: calc(100vw - 60px);
    }
  }
}
.desktop-interface {
  .gym-route-picture {
    &.--limited-height {
      height: 350px;
      max-height: 350px;
    }
  }
}
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
