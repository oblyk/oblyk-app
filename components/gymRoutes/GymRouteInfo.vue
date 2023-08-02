<template>
  <div
    :class="$vuetify.breakpoint.mobile ? 'mobile-interface' : 'desktop-interface'"
  >
    <v-img
      v-if="gymRoute.hasPicture"
      ref="gymRoutePicture"
      class="rounded gym-route-picture"
      :class="fullHeightPicture ? `--full-height ${landscapePicture ? '--landscape' : '--portrait' }` : `--limited-height ${landscapePicture ? '--landscape' : '--portrait' }`"
      cover
      :src="gymRoute.pictureUrl"
      @click="fullHeightPicture = !fullHeightPicture"
    >
      <div
        v-if="gymRoute.thumbnail_position"
        class="gym-route-thumbnail-position"
        :style="`height: ${thbPos.h}%; width: ${thbPos.w}%; top: calc(50% - ${thbPos.dy}%); left: calc(50% - ${thbPos.dx}%)`"
      >
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="GymRouteGradient" x1="0" x2="100%" y1="0" y2="0">
              <stop
                v-for="(gradiant, gradiantIndex) in thumbnailGradiant"
                :key="`gradiant-index-${gradiantIndex}`"
                :stop-color="gradiant.color"
                :offset="`${gradiant.offset}%`"
              />
            </linearGradient>
          </defs>
          <rect
            x="4"
            y="4"
            height="100%"
            width="100%"
            style="width:calc(100% - 8px);height:calc(100% - 8px)"
            rx="50%"
            ry="50%"
            stroke-width="8"
            fill="transparent"
            stroke="url(#GymRouteGradient)"
          />
        </svg>
      </div>
      <v-btn
        v-if="!landscapePicture"
        icon
        style="position: absolute; bottom: 10px; right: 10px"
        @click.stop="fullHeightPicture = !fullHeightPicture"
      >
        <v-icon>
          {{ fullHeightPicture ? mdiArrowCollapse : mdiArrowExpand }}
        </v-icon>
      </v-btn>
    </v-img>

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
            :item-value="humanizeDate(gymRoute.opened_at, 'll')"
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
      <gym-route-ascent
        v-if="$auth.loggedIn"
        :gym-route="gymRoute"
      />

      <!-- Edit and add to logbook -->
      <div class="text-right mt-2 mb-3">
        <like-btn
          class="vertical-align-bottom"
          :likeable-id="gymRoute.id"
          likeable-type="GymRoute"
          :small="false"
        />
        <add-gym-ascent-btn
          v-if="$auth.loggedIn"
          :gym-route="gymRoute"
        />
      </div>
      <div
        v-if="$auth.loggedIn && currentUserIsGymAdmin() && gymAuthCan(gymRoute.gym, 'manage_opening')"
        class="border-bottom border-top py-2 mb-2"
      >
        <small class="mr-2">
          {{ $t('components.gymAdmin.administration') }} :
        </small>
        <gym-route-action-btn :gym-route="gymRoute" />
      </div>

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
  mdiArrowExpand,
  mdiArrowCollapse,
  mdiGauge,
  mdiArrowRight
} from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import { DateHelpers } from '@/mixins/DateHelpers'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteGradeAndPoint from '@/components/gymRoutes/partial/GymRouteGradeAndPoint'
import GymRouteAscent from '@/components/gymRoutes/GymRouteAscent'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import AscentGymRoute from '@/models/AscentGymRoute'
import DescriptionLine from '~/components/ui/DescriptionLine.vue'
import GymRouteActionBtn from '~/components/gymRoutes/partial/GymRouteActionBtn.vue'
import AddGymAscentBtn from '~/components/ascentGymRoutes/AddGymAscentBtn.vue'
import GymRouteClimbingStyles from '~/components/gymRoutes/partial/GymRouteClimbingStyles.vue'
import LikeBtn from '~/components/forms/LikeBtn.vue'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymRouteInfo',
  components: {
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
      mdiHeart,
      mdiCheckAll,
      mdiCalendar,
      mdiTextureBox,
      mdiBolt,
      mdiPound,
      mdiMap,
      mdiArrowExpand,
      mdiArrowCollapse,
      mdiGauge,
      mdiArrowRight
    }
  },

  computed: {
    landscapePicture () {
      if (this.gymRoute.calculated_thumbnail_position === null) { return null }

      return this.gymRoute.calculated_thumbnail_position.img_w > this.gymRoute.calculated_thumbnail_position.img_h
    },

    thbPos () {
      if (this.gymRoute.calculated_thumbnail_position === null) { return null }

      const thbP = this.gymRoute.calculated_thumbnail_position
      const isLandscape = thbP.img_w > thbP.img_h
      return {
        h: this.fullHeightPicture || isLandscape ? thbP.h : thbP.h / 350 * thbP.img_h,
        w: thbP.w,
        dx: thbP.delta_x,
        dy: this.fullHeightPicture || isLandscape ? thbP.delta_y : thbP.delta_y / 350 * thbP.img_h
      }
    },

    thumbnailGradiant () {
      if (this.gymRoute.calculated_thumbnail_position === null) { return null }

      const colors = this.gymRoute.tag_colors && this.gymRoute.tag_colors.length > 0 ? this.gymRoute.tag_colors : this.gymRoute.hold_colors
      const numberOfColor = colors.length
      const gradiant = []
      if (numberOfColor === 1) {
        gradiant.push({ color: colors[0], offset: 0 })
        gradiant.push({ color: colors[0], offset: 1 })
      } else {
        let index = 0
        for (const color of colors) {
          gradiant.push({ color, offset: 100 / (numberOfColor - 1) * index })
          index++
        }
      }
      return gradiant
    },

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
      max-height: 350px;
      &.--portrait {
        height: 350px;
      }
    }
  }
}
.gym-route-thumbnail-position {
  box-sizing: border-box;
  position: absolute;
  border-color: rgba(255, 255, 255, 0.5);
  border-width: 2px;
  border-radius: 50%;
  border-style: solid;
  svg {
    opacity: 0.5;
    width:100%;
    height:100%;
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
