<template>
  <div>
    <!-- SPRAY WALL ROUTE VIEWER -->
    <div style="height: 400px">
      <spray-wall-route-viewer
        class="rounded"
        :gym="gym"
        :spray-wall="sprayWallRoute.spray_wall"
        :spray-wall-route="sprayWallRoute"
      />
    </div>

    <!-- TITLE -->
    <div class="d-flex mt-2 align-center">
      <v-avatar
        rounded="pill"
        size="65"
        class="mt-0 mb-0"
        :class="$vuetify.theme.dark ? 'theme--dark' : 'theme--light'"
        :style="itemStyle"
      >
        <spray-wall-route-avatar
          :spray-wall-route="sprayWallRoute"
          :spray-wall="sprayWallRoute.spray_wall"
        />
      </v-avatar>
      <div class="ml-2">
        <div class="text-truncate font-weight-medium">
          {{ sprayWallRoute.name }}
        </div>
        <div class="text--disabled mt-n1">
          Proposé par
          <v-chip
            pill
            small
            @click="pushSprayWallRoutesClimberFilter"
          >
            <v-avatar max-height="24" max-width="24" left>
              <v-img max-height="24" max-width="24" :src="imageVariant(sprayWallRoute.user.attachments.avatar, { fit: 'crop', height: 100, width: 100 })" />
            </v-avatar>
            {{ sprayWallRoute.user.first_name }}
          </v-chip>
        </div>
      </div>
      <div class="pt-1 text-no-wrap ml-auto">
        <gym-route-grade-and-point
          :gym-route="sprayWallRoute"
          inline
        />
        <gym-route-sub-level
          v-if="sprayWallRoute.sub_level"
          class="ml-1"
          :gym-route="sprayWallRoute"
        />
      </div>
    </div>

    <!-- TABS -->
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
          :value="sprayWallRoute.all_comments_count > 0"
          :content="sprayWallRoute.all_comments_count"
          color="#743ad5"
        >
          {{ $t('common.comments') }}
        </v-badge>
      </v-tab>
      <v-tab>
        <v-badge
          :value="sprayWallRoute.videos_count > 0"
          :content="sprayWallRoute.videos_count"
        >
          {{ $t('common.videos') }}
        </v-badge>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <!-- Information, ascents, etc. -->
      <v-tab-item class="pb-3" style="min-height: 500px">
        <!-- Route description -->
        <div
          v-if="sprayWallRoute.comment"
          class="pa-2 font-italic back-app-color rounded-sm mt-2"
        >
          <markdown-text :text="sprayWallRoute.comment" />
        </div>

        <v-row
          v-if="(sprayWallRoute.likes_count && sprayWallRoute.likes_count > 0) || (sprayWallRoute.ascents_count || 0 > 0)"
          class="my-1"
          no-gutters
        >
          <!-- Route real favorite -->
          <v-col
            v-if="sprayWallRoute.likes_count && sprayWallRoute.likes_count > 0"
            cols="6"
          >
            <v-icon small left color="red" class="vertical-align-text-top">
              {{ mdiHeart }}
            </v-icon>
            {{ $tc('common.realFavoriteCount', sprayWallRoute.likes_count, { count: sprayWallRoute.likes_count }) }}
          </v-col>
          <v-col
            v-if="sprayWallRoute.ascents_count || 0 > 0"
            cols="6"
          >
            <v-btn small outlined text @click="openSprayWallRouteAscents()">
              <v-icon small left>
                {{ mdiCheckAll }}
              </v-icon>
              {{ $tc('components.gymRoute.ascents', sprayWallRoute.ascents_count, { count: sprayWallRoute.ascents_count }) }}
            </v-btn>
          </v-col>
        </v-row>

        <!-- Global information -->
        <v-row
          class="mb-2"
          no-gutters
        >
          <v-col
            cols="6"
            class="my-1"
          >
            <description-line
              :icon="mdiCalendar"
              :item-title="$t('models.gymRoute.opened_at')"
              :item-value="humanizeDate(sprayWallRoute.created_at, 'DATE_MED')"
              class="rounded-sm py-1"
            />
          </v-col>

          <!-- Route sub level -->
          <v-col
            v-if="sprayWallRoute.sub_level > 0"
            cols="6"
            class="my-1"
          >
            <description-line
              :icon="mdiChiliMild"
              :item-title="$t('models.gymRoute.intensity')"
              class="rounded-sm py-1"
            >
              <template #content>
                <gym-route-sub-level-scale :gym-route="sprayWallRoute" />
              </template>
            </description-line>
          </v-col>
        </v-row>

        <!-- Difficulty appreciation -->
        <description-line
          v-if="sprayWallRoute.votes && sprayWallRoute.votes.difficulty_appreciations"
          :icon="mdiGauge"
          :item-title="$t('models.gymRoute.difficulty_appreciation')"
          class="rounded-sm py-1"
        >
          <template #content>
            <v-chip
              v-if="sprayWallRoute.votes.difficulty_appreciations.easy_for_the_grade"
              outlined
              :title="$t('models.hardnessStatus.easy_for_the_grade')"
            >
              😎 {{ sprayWallRoute.votes.difficulty_appreciations.easy_for_the_grade.count }}
            </v-chip>
            <v-chip
              v-if="sprayWallRoute.votes.difficulty_appreciations.this_grade_is_accurate"
              outlined
              :title="$t('models.hardnessStatus.this_grade_is_accurate')"
            >
              👌 {{ sprayWallRoute.votes.difficulty_appreciations.this_grade_is_accurate.count }}
            </v-chip>
            <v-chip
              v-if="sprayWallRoute.votes.difficulty_appreciations.sandbagged"
              outlined
              :title="$t('models.hardnessStatus.sandbagged')"
            >
              {{ sprayWallRoute.votes.difficulty_appreciations.sandbagged.count }}
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
          v-if="gym && sprayWallRoute.styles.length > 0"
          :icon="mdiPound"
          :item-title="$t('models.gymRoute.styles')"
          class="rounded-sm pb-2 pt-1"
        >
          <template #content>
            <spray-wall-route-climbing-styles
              class="mt-2"
              :spray-wall-route="sprayWallRoute"
              :gym="gym"
              :push-style-filter-callback="pushStyleFilter"
            />
          </template>
        </description-line>

        <!-- ACTION -->
        <div
          v-if="sprayWallRoute.current_user.can_be_edit"
          class="text-right mt-3"
        >
          <v-btn
            :to="`${sprayWallRoute.app_path}/edit`"
            elevation="0"
            outlined
            color="deep-purple accent-4"
          >
            {{ $t('actions.edit') }}
          </v-btn>
        </div>
      </v-tab-item>

      <!-- Comments -->
      <v-tab-item class="pb-3" style="min-height: 500px">
        <p class="text-center mt-10 text--disabled">
          Work in progress
        </p>
      </v-tab-item>

      <!-- Videos -->
      <v-tab-item class="pb-3" style="min-height: 500px">
        <p class="text-center mt-10 text--disabled">
          Work in progress
        </p>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import {
  mdiHeart,
  mdiCheckAll,
  mdiCalendar,
  mdiChiliMild,
  mdiPound,
  mdiArrowLeft,
  mdiArrowRight,
  mdiGauge
} from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import SprayWallRouteViewer from '~/components/sprayWallRoutes/SprayWallRouteViewer'
import SprayWallRouteAvatar from '~/components/sprayWallRoutes/SprayWallRouteAvatar'
import GymRouteGradeAndPoint from '~/components/gymRoutes/partial/GymRouteGradeAndPoint'
import GymRouteSubLevel from '~/components/gymRoutes/GymRouteSubLevel'
import MarkdownText from '~/components/ui/MarkdownText'
import DescriptionLine from '~/components/ui/DescriptionLine'
import GymRouteSubLevelScale from '~/components/gymRoutes/GymRouteSubLevelScale'
import SprayWallRouteClimbingStyles from '~/components/sprayWallRoutes/SprayWallRouteClimbingStyles'

export default {
  name: 'SprayWallRouteInfo',
  components: {
    SprayWallRouteClimbingStyles,
    GymRouteSubLevelScale,
    DescriptionLine,
    MarkdownText,
    GymRouteSubLevel,
    GymRouteGradeAndPoint,
    SprayWallRouteAvatar,
    SprayWallRouteViewer
  },
  mixins: [DateHelpers, ImageVariantHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    sprayWallRoute: {
      type: Object,
      required: true
    },
    pushFilterCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      tab: 0,

      mdiHeart,
      mdiCheckAll,
      mdiCalendar,
      mdiChiliMild,
      mdiPound,
      mdiArrowLeft,
      mdiArrowRight,
      mdiGauge
    }
  },

  computed: {
    itemStyle () {
      const color = this.sprayWallRoute.level_index ? this.sprayWallRoute.level_color : this.sprayWallRoute.grade_color
      return `border-style: solid; border-width: 5px; border-color: ${color}`
    }
  },

  methods: {
    openSprayWallRouteAscents () {
      // TODO
    },

    pushStyleFilter (filter) {
      this.pushFilterCallback(filter)
      this.$router.push({ path: this.$route.path })
    },

    pushSprayWallRoutesClimberFilter () {
      this.pushFilterCallback(
        {
          type: 'user',
          value: this.sprayWallRoute.user.id,
          text: this.sprayWallRoute.user.full_name,
          icon: this.imageVariant(this.sprayWallRoute.user.attachments.avatar, { fit: 'crop', height: 100, width: 100 })
        }
      )
      this.$router.push({ path: this.$route.path })
    }
  }
}
</script>
