<template>
  <div>
    <!-- Gym route picture -->
    <gym-route-picture
      v-if="route.gym_route_cover.attachments.picture.attached"
      :gym-route="route"
    />

    <!-- Information, ascents, etc. -->
    <div class="pa-2">
      <!-- Title -->
      <v-row class="gym-route-title">
        <v-col align-self="center" class="tag-and-hold">
          <gym-route-tag-and-hold
            :size="40"
            :gym-route="route"
          />
        </v-col>
        <v-col align-self="center" class="name-and-grade">
          <gym-route-grade-and-point
            :gym-route="route"
            inline
            class="mr-1"
          />
          {{ route.name }}
          <small
            v-if="route.anchor_number"
            class="text--disabled d-block mt-n1 font-weight-regular"
          >
            {{ $t('models.gymRoute.anchor_number') }}{{ route.anchor_number }}
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

      <v-alert
        v-if="route.dismounted_at"
        text
        type="error"
        class="mx-1 mt-2"
      >
        {{ $t('components.gymRoute.dismountedAt', { date: humanizeDate(route.dismounted_at) }) }}
      </v-alert>

      <!-- Route description -->
      <v-sheet
        v-if="route.description"
        class="px-3 pb-1 pt-4 my-2 font-italic back-app-color rounded-sm"
      >
        <markdown-text :text="route.description" />
      </v-sheet>

      <v-row
        v-if="(route.likes_count && route.likes_count > 0) || (route.ascents_count || 0 > 0)"
        class="my-1"
        no-gutters
      >
        <!-- Route real favorite -->
        <v-col
          v-if="route.likes_count && route.likes_count > 0"
          cols="6"
          class="my-1 font-weight-bold text-no-wrap pl-2"
        >
          <v-icon small color="red">
            {{ mdiHeart }}
          </v-icon>
          {{ $tc('common.realFavoriteCount', route.likes_count, { count: route.likes_count }) }}
        </v-col>
        <v-col
          v-if="route.ascents_count || 0 > 0"
          cols="6"
          class="my-1 font-weight-bold text-no-wrap pl-2"
        >
          <v-btn small outlined text @click="openGymRouteAscents()">
            <v-icon small left>
              {{ mdiCheckAll }}
            </v-icon>
            {{ $tc('components.gymRoute.ascents', route.ascents_count, { count: route.ascents_count }) }}
          </v-btn>
        </v-col>
      </v-row>

      <!-- Global information -->
      <v-row
        class="mb-2"
        no-gutters
      >
        <!-- Route opened_at -->
        <v-col
          v-if="route.opened_at"
          cols="6"
          class="my-1 px-1"
        >
          <description-line
            :icon="mdiCalendar"
            :item-title="$t('models.gymRoute.opened_at')"
            :item-value="humanizeDate(route.opened_at, 'DATE_MED')"
            class="rounded-sm px-2 py-1"
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
            class="rounded-sm px-2 py-1"
          >
            <template #content>
              <a
                v-if="!showSpace"
                class="text-truncate d-block"
                @click="showSector"
              >
                {{ route.gym_sector.name }}
              </a>
              <strong
                v-if="showSpace"
                class="text-truncate d-block"
              >
                {{ route.gym_sector.name }}
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
            class="rounded-sm px-2 py-1"
          >
            <template #content>
              <nuxt-link :to="route.gymSpacePath">
                {{ route.gym_space.name }}
              </nuxt-link>
            </template>
          </description-line>
        </v-col>

        <!-- Route opener -->
        <v-col
          v-if="route.openers.length > 0"
          cols="6"
          class="my-1 px-1"
        >
          <description-line
            :icon="mdiBolt"
            :item-title="$t('models.gymRoute.openers')"
            :item-value="route.openers.map(opener => opener.name).join(', ')"
            class="rounded-sm px-2 py-1"
          />
        </v-col>

        <!-- Difficulty appreciation -->
        <v-col
          v-if="route.votes && route.votes.difficulty_appreciations"
          cols="12"
          class="my-1 px-1"
        >
          <description-line
            :icon="mdiGauge"
            :item-title="$t('models.gymRoute.difficulty_appreciation')"
            class="rounded-sm px-2 py-1"
          >
            <template #content>
              <v-chip
                v-if="route.votes.difficulty_appreciations.easy_for_the_grade"
                outlined
                :title="$t('models.hardnessStatus.easy_for_the_grade')"
              >
                😎 {{ route.votes.difficulty_appreciations.easy_for_the_grade.count }}
              </v-chip>
              <v-chip
                v-if="route.votes.difficulty_appreciations.this_grade_is_accurate"
                outlined
                :title="$t('models.hardnessStatus.this_grade_is_accurate')"
              >
                👌 {{ route.votes.difficulty_appreciations.this_grade_is_accurate.count }}
              </v-chip>
              <v-chip
                v-if="route.votes.difficulty_appreciations.sandbagged"
                outlined
                :title="$t('models.hardnessStatus.sandbagged')"
              >
                🥵 {{ route.votes.difficulty_appreciations.sandbagged.count }}
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
          v-if="gym && route.hasStyles"
          cols="12"
          class="my-1 px-1"
        >
          <description-line
            :icon="mdiPound"
            :item-title="$t('models.gymRoute.styles')"
            class="rounded-sm px-2 pb-2 pt-1"
          >
            <template #content>
              <gym-route-climbing-styles
                class="mt-2"
                :gym-route="route"
                :gym="gym"
              />
            </template>
          </description-line>
        </v-col>
      </v-row>

      <!-- Cross list and add in logbook btn -->
      <client-only>
        <div v-if="$auth.loggedIn">
          <gym-route-ascent :gym-route="route" />

          <!-- Edit and add to logbook -->
          <div
            v-if="!hideAscentBtn"
            class="text-right mt-2 mb-3"
          >
            <like-btn
              class="vertical-align-bottom"
              :likeable-id="route.id"
              likeable-type="GymRoute"
              :small="false"
            />
            <add-gym-ascent-btn :gym-route="route" />
          </div>

          <!-- Administration -->
          <div
            v-if="currentUserIsGymAdmin() && gymAuthCan(route.gym, 'manage_opening')"
            class="border-bottom border-top py-2 mb-2"
          >
            <small class="mr-2">
              {{ $t('components.gymAdmin.administration') }} :
            </small>
            <gym-route-action-btn
              :gym-route="route"
              :reload-route-callback="reloadGymRoute"
            />
          </div>
        </div>
        <div
          v-else
          class="pa-4 border rounded-sm mt-2 mb-7 text-center"
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

      <!-- Comments and videos -->
      <v-tabs v-model="tab">
        <v-tab>
          <v-badge
            :value="route.all_comments_count > 0"
            :content="route.all_comments_count"
          >
            {{ $t('common.comments') }}
          </v-badge>
        </v-tab>
        <v-tab>
          <v-badge
            :value="route.videos_count > 0"
            :content="route.videos_count"
          >
            {{ $t('common.videos') }}
          </v-badge>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item class="pb-3">
          <div v-intersect="loadCommentsList">
            <comment-list
              v-if="commentList"
              commentable-type="GymRoute"
              :commentable-id="route.id"
              :gym-route-options="{ gymId: gym.id, gymRouteId: route.id }"
              :comments-count="route.all_comments_count"
            />
            <p
              v-else
              class="text-center text--disabled my-5"
            >
              {{ $t('common.loadingCommentModule') }}
            </p>
          </div>
        </v-tab-item>
        <v-tab-item class="pb-3">
          <div v-intersect="loadVideosList">
            <gym-route-video-list
              v-if="videoList"
              :gym-route="route"
              :gym="gym"
            />
            <p
              v-else
              class="text-center text--disabled my-5"
            >
              {{ $t('common.loadingVideoModule') }}
            </p>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <gym-route-ascents-dialog ref="gymRouteAscents" :gym-route="route" :gym="gym" />
  </div>
</template>

<script>
import {
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
} from '@mdi/js'
import GymRouteAscentsDialog from '@/components/gymRoutes/GymRouteAscentsDialog.vue'
import { DateHelpers } from '@/mixins/DateHelpers'
import { GymRolesHelpers } from '@/mixins/GymRolesHelpers'
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteGradeAndPoint from '@/components/gymRoutes/partial/GymRouteGradeAndPoint'
import GymRouteAscent from '@/components/gymRoutes/GymRouteAscent'
import DescriptionLine from '@/components/ui/DescriptionLine'
import GymRouteActionBtn from '@/components/gymRoutes/partial/GymRouteActionBtn'
import AddGymAscentBtn from '@/components/ascentGymRoutes/AddGymAscentBtn'
import GymRouteClimbingStyles from '@/components/gymRoutes/partial/GymRouteClimbingStyles'
import LikeBtn from '@/components/forms/LikeBtn'
import GymRoutePicture from '@/components/gymRoutes/GymRoutePicture'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '~/models/GymRoute'

const GymRouteVideoList = () => import('@/components/gymRoutes/GymRouteVideoList')
const CommentList = () => import('@/components/comments/CommentList')
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymRouteInfo',
  components: {
    GymRouteVideoList,
    CommentList,
    GymRoutePicture,
    LikeBtn,
    GymRouteClimbingStyles,
    AddGymAscentBtn,
    GymRouteActionBtn,
    DescriptionLine,
    MarkdownText,
    GymRouteAscent,
    GymRouteGradeAndPoint,
    GymRouteTagAndHold,
    GymRouteAscentsDialog
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
      commentList: false,
      videoList: false,
      route: this.gymRoute,
      tab: 0,

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
      const appreciation = this.route.difficulty_appreciation
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

    showSector () {
      this.closeGymRouteCard()
      this.$root.$emit('setMapViewOnSector', this.route.gym_sector_id)
      this.$root.$emit('filterBySector', this.route.gym_sector_id, this.route.gym_sector.name)
    },

    loadCommentsList (entries, observer) {
      if (entries[0].isIntersecting) {
        this.commentList = true
      }
    },

    loadVideosList (entries, observer) {
      if (entries[0].isIntersecting) {
        this.videoList = true
      }
    },

    openGymRouteAscents () {
      this.$refs.gymRouteAscents.open()
    },

    reloadGymRoute () {
      new GymRouteApi(this.$axios, this.$auth)
        .find(this.route.gym.id, this.route.gym_space.id, this.route.id)
        .then((resp) => {
          this.$localforage.gymRoutes.setItem(resp.data.id, resp.data)
          this.route = new GymRoute({ attributes: resp.data })
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
