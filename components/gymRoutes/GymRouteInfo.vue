<template>
  <div>
    <!-- Gym route picture -->
    <gym-route-picture :gym-route="gymRoute" />

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
          <small
            v-if="gymRoute.anchor_number"
            class="text--disabled d-block mt-n1 font-weight-regular"
          >
            {{ $t('models.gymRoute.anchor_number') }}{{ gymRoute.anchor_number }}
          </small>
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
        class="px-3 pb-1 pt-4 my-2 font-italic back-app-color rounded-sm"
      >
        <markdown-text :text="gymRoute.description" />
      </v-sheet>

      <!-- Global information -->
      <v-row
        class="mb-2"
        no-gutters
      >
        <!-- Route real favorite -->
        <v-col
          v-if="gymRoute.likes_count && gymRoute.likes_count > 0"
          cols="6"
          class="my-1 px-1"
        >
          <description-line
            :icon="mdiHeart"
            icon-color="red"
            :item-title="$t('common.realFavorite')"
            :item-value="`${gymRoute.likes_count} ${$t('common.realFavorite')}`"
            class="back-app-color rounded-sm px-2 py-1"
          />
        </v-col>

        <!-- Route ascent count -->
        <v-col
          v-if="gymRoute.ascents_count || 0 > 0"
          cols="6"
          class="my-1 px-1"
        >
          <description-line
            :icon="mdiCheckAll"
            :item-title="$t('models.gymRoute.ascents')"
            :item-value="$tc('components.gymRoute.ascents', gymRoute.ascents_count, { count: gymRoute.ascents_count })"
            class="back-app-color rounded-sm px-2 py-1"
          />
        </v-col>

        <!-- Route opened_at -->
        <v-col
          v-if="gymRoute.opened_at"
          cols="6"
          class="my-1 px-1"
        >
          <description-line
            :icon="mdiCalendar"
            :item-title="$t('models.gymRoute.opened_at')"
            :item-value="humanizeDate(gymRoute.opened_at, 'DATE_MED')"
            class="back-app-color rounded-sm px-2 py-1"
          />
        </v-col>

        <!-- Sector -->
        <v-col
          cols="6"
          class="my-1 px-1"
        >
          <description-line
            :icon="mdiTextureBox"
            :item-title="$t('models.gymRoute.gym_sector_id')"
            class="back-app-color rounded-sm px-2 py-1"
          >
            <template #content>
              <a
                v-if="!showSpace"
                class="text-truncate d-block"
                @click="showSector"
              >
                {{ gymRoute.gym_sector.name }}
              </a>
              <strong
                v-if="showSpace"
                class="text-truncate d-block"
              >
                {{ gymRoute.gym_sector.name }}
              </strong>
            </template>
          </description-line>
        </v-col>

        <!-- Space -->
        <v-col
          v-if="showSpace"
          cols="6"
          class="my-1 px-1"
        >
          <description-line
            :icon="mdiMap"
            :item-title="$t('models.gymRoute.gym_space_id')"
            class="back-app-color rounded-sm px-2 py-1"
          >
            <template #content>
              <nuxt-link :to="gymRoute.gymSpacePath">
                {{ gymRoute.gym_space.name }}
              </nuxt-link>
            </template>
          </description-line>
        </v-col>

        <!-- Route opener -->
        <v-col
          v-if="gymRoute.openers.length > 0"
          cols="6"
          class="my-1 px-1"
        >
          <description-line
            :icon="mdiBolt"
            :item-title="$t('models.gymRoute.openers')"
            :item-value="gymRoute.openers.map(opener => opener.name).join(', ')"
            class="back-app-color rounded-sm px-2 py-1"
          />
        </v-col>

        <!-- Difficulty appreciation -->
        <v-col
          v-if="gymRoute.votes"
          cols="12"
          class="my-1 px-1"
        >
          <description-line
            :icon="mdiGauge"
            :item-title="$t('models.gymRoute.difficulty_appreciation')"
            class="back-app-color rounded-sm px-2 py-1"
          >
            <template #content>
              <v-chip
                v-if="gymRoute.votes.difficulty_appreciations.easy_for_the_grade"
                outlined
                :title="$t('models.hardnessStatus.easy_for_the_grade')"
              >
                😎 {{ gymRoute.votes.difficulty_appreciations.easy_for_the_grade.count }}
              </v-chip>
              <v-chip
                v-if="gymRoute.votes.difficulty_appreciations.this_grade_is_accurate"
                outlined
                :title="$t('models.hardnessStatus.this_grade_is_accurate')"
              >
                👌 {{ gymRoute.votes.difficulty_appreciations.this_grade_is_accurate.count }}
              </v-chip>
              <v-chip
                v-if="gymRoute.votes.difficulty_appreciations.sandbagged"
                outlined
                :title="$t('models.hardnessStatus.sandbagged')"
              >
                🥵 {{ gymRoute.votes.difficulty_appreciations.sandbagged.count }}
              </v-chip>
              <v-icon
                class="vertical-align-sub"
                left
                right
                small
              >
                {{ mdiArrowRight }}
              </v-icon>
              {{ $t(`components.difficulty.${difficultyAppreciationStatus}`) }}
            </template>
          </description-line>
        </v-col>

        <!-- Route tags -->
        <v-col
          v-if="gym && gymRoute.hasStyles"
          cols="12"
          class="my-1 px-1"
        >
          <description-line
            :icon="mdiPound"
            :item-title="$t('models.gymRoute.styles')"
            class="back-app-color rounded-sm px-2 pb-2 pt-1"
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

      <!-- Cross list and add in logbook btn -->
      <client-only>
        <div v-if="$auth.loggedIn">
          <gym-route-ascent :gym-route="gymRoute" />

          <!-- Edit and add to logbook -->
          <div
            v-if="!hideAscentBtn"
            class="text-right mt-2 mb-3"
          >
            <like-btn
              class="vertical-align-bottom"
              :likeable-id="gymRoute.id"
              likeable-type="GymRoute"
              :small="false"
            />
            <add-gym-ascent-btn :gym-route="gymRoute" />
          </div>

          <!-- Administration -->
          <div
            v-if="currentUserIsGymAdmin() && gymAuthCan(gymRoute.gym, 'manage_opening')"
            class="border-bottom border-top py-2 mb-2"
          >
            <small class="mr-2">
              {{ $t('components.gymAdmin.administration') }} :
            </small>
            <gym-route-action-btn :gym-route="gymRoute" />
          </div>
        </div>
        <div
          v-else
          class="pa-4 border rounded-sm mt-2 mb-3 text-center"
        >
          <p class="font-weight-bold">
            {{ $t('components.gymRoute.createCount') }}
          </p>
          <div class="text-center mt-2">
            <v-btn
              elevation="0"
              color="primary"
              :to="`/sign-up?redirect_to=${$route.fullPath}`"
            >
              {{ $t('actions.createMyAccount') }}
            </v-btn>
            <div>
              <v-btn
                small
                elevation="0"
                link
                :to="`/sign-in?redirect_to=${$route.fullPath}`"
              >
                {{ $t('actions.signIn') }}
              </v-btn>
            </div>
          </div>
        </div>
      </client-only>

      <!-- Climber ascent part -->
      <v-sheet
        v-if="ascents.length > 0"
        class="back-app-color rounded-sm px-2 pb-2 pt-1"
      >
        <description-line
          :item-title="$t('components.gymRoute.climbersComments')"
          :icon="mdiComment"
        >
          <template #content>
            <v-sheet
              v-for="(ascent, index) in ascents"
              :key="`gym-route-ascent-${index}`"
              class="rounded-sm px-2 py-1 mt-2"
            >
              <div>{{ ascent.comment }}</div>
              <small class="text--disabled">
                {{ $t('common.by') }}
                <nuxt-link :to="`/climbers/${ascent.user.slug_name}`">
                  {{ ascent.user.first_name }}
                </nuxt-link>
                le {{ humanizeDate(ascent.released_at) }}
              </small>
            </v-sheet>
          </template>
        </description-line>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import {
  mdiClose,
  mdiComment,
  mdiHeart,
  mdiCheckAll,
  mdiCalendar,
  mdiTextureBox,
  mdiBolt,
  mdiPound,
  mdiMap,
  mdiGauge,
  mdiArrowRight
} from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteGradeAndPoint from '@/components/gymRoutes/partial/GymRouteGradeAndPoint'
import GymRouteAscent from '@/components/gymRoutes/GymRouteAscent'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import AscentGymRoute from '@/models/AscentGymRoute'
import DescriptionLine from '~/components/ui/DescriptionLine'
import GymRouteActionBtn from '~/components/gymRoutes/partial/GymRouteActionBtn'
import AddGymAscentBtn from '~/components/ascentGymRoutes/AddGymAscentBtn'
import GymRouteClimbingStyles from '~/components/gymRoutes/partial/GymRouteClimbingStyles'
import LikeBtn from '~/components/forms/LikeBtn'
import GymRoutePicture from '~/components/gymRoutes/GymRoutePicture'

const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymRouteInfo',
  components: {
    GymRoutePicture,
    LikeBtn,
    GymRouteClimbingStyles,
    AddGymAscentBtn,
    GymRouteActionBtn,
    DescriptionLine,
    MarkdownText,
    GymRouteAscent,
    GymRouteGradeAndPoint,
    GymRouteTagAndHold
  },
  mixins: [DateHelpers, GymRolesHelpers],
  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    showSpace: {
      type: Boolean,
      default: false
    },
    hideAscentBtn: {
      type: Boolean,
      default: false
    },
    gym: {
      type: Object,
      default: null
    },
    closeCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      loadingAscents: true,
      ascents: [],
      fullHeightPicture: false,
      panzoom: null,
      initialTransform: null,

      mdiComment,
      mdiClose,
      mdiHeart,
      mdiCheckAll,
      mdiCalendar,
      mdiTextureBox,
      mdiBolt,
      mdiPound,
      mdiMap,
      mdiGauge,
      mdiArrowRight
    }
  },

  computed: {
    difficultyAppreciationStatus () {
      const appreciation = this.gymRoute.difficulty_appreciation
      if (appreciation >= 0.6) {
        return 'hard'
      } else if (appreciation >= 0.2) {
        return 'pretty_hard'
      } else if (appreciation >= -0.2) {
        return 'just'
      } else if (appreciation >= -0.6) {
        return 'pretty_soft'
      } else {
        return 'soft'
      }
    }
  },

  mounted () {
    this.getAscents()
  },

  methods: {
    closeGymRouteCard () {
      if (this.closeCallback) {
        this.closeCallback()
      } else {
        this.$router.push(
          {
            path: this.$route.path
          }
        )
      }
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
