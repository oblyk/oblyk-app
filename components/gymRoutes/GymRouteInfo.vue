<template>
  <div>
    <!-- Gym route picture -->
    <gym-route-picture
      v-if="route.gym_route_cover.attachments.picture.attached"
      :gym-route="route"
      class="mb-2"
    />

    <!-- Title -->
    <div class="d-flex align-center">
      <gym-route-tag-and-hold
        :size="40"
        :gym-route="route"
      />
      <div class="pl-2">
        <div v-if="route.name || route.anchor_number">
          <h1 class="text-h6" style="line-height: 1em">
            {{ route.name }}
          </h1>
          <small
            v-if="route.anchor_number"
            class="text--disabled d-block mt-n1 font-weight-regular"
          >
            {{ $t('models.gymRoute.anchor_number') }}{{ route.anchor_number }}
          </small>
        </div>
        <gym-route-grade-and-point
          :gym-route="route"
          inline
          class="mr-1"
        />
      </div>
      <v-btn
        icon
        large
        class="ml-auto"
        @click="closeGymRouteCard()"
      >
        <v-icon large>
          {{ mdiClose }}
        </v-icon>
      </v-btn>
    </div>

    <!-- Dismount alert -->
    <v-alert
      v-if="route.dismounted_at"
      text
      type="error"
      class="mx-1 mt-3"
    >
      {{ $t('components.gymRoute.dismountedAt', { date: humanizeDate(route.dismounted_at) }) }}
    </v-alert>

    <!-- Comments and videos -->
    <v-tabs
      v-model="tab"
      color="#743ad5"
      class="border-bottom"
    >
      <v-tab>
        Info
      </v-tab>
      <v-tab>
        <v-badge
          :value="route.all_comments_count > 0"
          :content="route.all_comments_count"
          color="#743ad5"
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
      <!-- Information, ascents, etc. -->
      <v-tab-item class="pb-3" style="min-height: 500px">

        <!-- USER ASCENTS -->
        <client-only>
          <div
            v-if="$auth.loggedIn"
            class="border rounded pa-2 mt-2"
          >
            <gym-route-ascent :gym-route="route" />

            <!-- Edit and add to logbook -->
            <div
              v-if="!hideAscentBtn"
              class="text-right"
            >
              <like-btn
                class="vertical-align-bottom"
                :likeable-id="route.id"
                likeable-type="GymRoute"
                :small="false"
              />
              <add-gym-ascent-btn :gym-route="route" />
            </div>
          </div>
          <gym-create-your-account v-else />
        </client-only>

        <!-- ROUTE INFORMATIONS -->
        <div class="rounded pa-2 my-3 border">
          <p class="font-weight-bold mb-1">
            <v-icon small color="#743ad5" class="mr-1 vertical-align-text-top">
              {{ mdiInformation }}
            </v-icon>
            {{ $t('common.informations') }}
          </p>

          <!-- Route description -->
          <div
            v-if="route.description"
            class="pa-2 font-italic back-app-color rounded-sm"
          >
            <markdown-text :text="route.description" />
          </div>

          <v-row
            v-if="(route.likes_count && route.likes_count > 0) || (route.ascents_count || 0 > 0)"
            class="my-1"
            no-gutters
          >
            <!-- Route real favorite -->
            <v-col
              v-if="route.likes_count && route.likes_count > 0"
              cols="6"
            >
              <v-icon small left color="red" class="vertical-align-text-top">
                {{ mdiHeart }}
              </v-icon>
              {{ $tc('common.realFavoriteCount', route.likes_count, { count: route.likes_count }) }}
            </v-col>
            <v-col
              v-if="route.ascents_count || 0 > 0"
              cols="6"
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
              class="my-1"
            >
              <description-line
                :icon="mdiCalendar"
                :item-title="$t('models.gymRoute.opened_at')"
                :item-value="humanizeDate(route.opened_at, 'DATE_MED')"
                class="rounded-sm py-1"
              />
            </v-col>

            <!-- Sector -->
            <v-col
              cols="6"
              class="my-1"
            >
              <description-line
                :icon="mdiTextureBox"
                :item-title="$t('models.gymRoute.gym_sector_id')"
                class="rounded-sm py-1"
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
              class="my-1"
            >
              <description-line
                :icon="mdiMap"
                :item-title="$t('models.gymRoute.gym_space_id')"
                class="rounded-sm py-1"
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
              class="my-1"
            >
              <description-line
                :icon="mdiBolt"
                :item-title="$t('models.gymRoute.openers')"
                :item-value="route.openers.map(opener => opener.name).join(', ')"
                class="rounded-sm py-1"
              />
            </v-col>
          </v-row>

          <!-- Difficulty appreciation -->
          <description-line
            v-if="route.votes && route.votes.difficulty_appreciations"
            :icon="mdiGauge"
            :item-title="$t('models.gymRoute.difficulty_appreciation')"
            class="rounded-sm py-1"
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

          <!-- Route tags -->
          <description-line
            v-if="gym && route.hasStyles"
            :icon="mdiPound"
            :item-title="$t('models.gymRoute.styles')"
            class="rounded-sm pb-2 pt-1"
          >
            <template #content>
              <gym-route-climbing-styles
                class="mt-2"
                :gym-route="route"
                :gym="gym"
              />
            </template>
          </description-line>
        </div>

        <!-- Administration -->
        <client-only>
          <div
            v-if="$auth.loggedIn && currentUserIsGymAdmin() && gymAuthCan(route.gym, 'manage_opening')"
            class="border pa-2 mb-2 admin-background rounded"
          >
            <p class="font-weight-bold mb-1">
              <v-icon small color="#743ad5" class="mr-1 vertical-align-text-top">
                {{ mdiShield }}
              </v-icon>
              {{ $t('components.gymAdmin.administration') }}
            </p>
            <gym-route-action-btn
              :gym-route="route"
              :reload-route-callback="reloadGymRoute"
            />
          </div>
        </client-only>
      </v-tab-item>

      <!-- Comments -->
      <v-tab-item class="pb-3" style="min-height: calc(100vh - 65px)">
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

      <!-- Vidéos -->
      <v-tab-item class="pb-3" style="min-height: calc(100vh - 65px)">
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

    <!-- Gym Route Ascents-->
    <gym-route-ascents-dialog
      ref="gymRouteAscents"
      :gym-route="route"
      :gym="gym"
    />
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
  mdiArrowRight,
  mdiShield,
  mdiInformation
} from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import { GymRolesHelpers } from '@/mixins/GymRolesHelpers'
import GymRouteAscentsDialog from '@/components/gymRoutes/GymRouteAscentsDialog'
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteGradeAndPoint from '@/components/gymRoutes/partial/GymRouteGradeAndPoint'
import GymRouteAscent from '@/components/gymRoutes/GymRouteAscent'
import DescriptionLine from '@/components/ui/DescriptionLine'
import GymRouteActionBtn from '@/components/gymRoutes/partial/GymRouteActionBtn'
import AddGymAscentBtn from '@/components/ascentGymRoutes/AddGymAscentBtn'
import GymRouteClimbingStyles from '@/components/gymRoutes/partial/GymRouteClimbingStyles'
import LikeBtn from '@/components/forms/LikeBtn'
import GymRoutePicture from '@/components/gymRoutes/GymRoutePicture'
import GymCreateYourAccount from '~/components/gyms/GymCreateYourAccount'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '~/models/GymRoute'

const GymRouteVideoList = () => import('@/components/gymRoutes/GymRouteVideoList')
const CommentList = () => import('@/components/comments/CommentList')
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymRouteInfo',
  components: {
    GymCreateYourAccount,
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
      mdiArrowRight,
      mdiShield,
      mdiInformation
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
