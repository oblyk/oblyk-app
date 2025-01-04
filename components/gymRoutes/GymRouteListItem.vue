<template>
  <v-list-item
    v-model="activeRoute"
    color="primary"
    class="rounded-list-item gym-route-list-item"
    :class="itemListClass"
    @click="openGymRoute"
    @mouseenter="onMouseEnter"
  >
    <v-list-item-avatar
      v-if="gymRoute.attachments.thumbnail.attached"
      class="my-0"
      height="72"
      width="72"
      rounded
    >
      <v-img
        height="72"
        width="72"
        :src="imageVariant(gymRoute.attachments.thumbnail, { fit: 'crop', height: 100, width: 100 })"
      />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title class="d-flex">
        <div class="mr-auto text-truncate">
          <gym-route-tag-and-hold :gym-route="gymRoute" />
          {{ gymRoute.name }}
        </div>
        <div class="pt-1">
          <gym-route-grade-and-point :gym-route="gymRoute" />
        </div>
      </v-list-item-title>
      <v-list-item-subtitle class="d-flex">
        <div class="mr-auto">
          <small
            v-if="gymRoute.dismounted_at !== null"
            class="font-weight-bold red--text"
          >
            {{ $t('components.gymRoute.dismounted') }}
          </small>
          <ascent-gym-route-status-icon
            v-if="$auth.loggedIn"
            :gym-route="gymRoute"
            :size="22"
          />
          <small v-if="gymRoute.anchor_number">
            {{ $t('models.gymRoute.anchor_number') }}{{ gymRoute.anchor_number }}
          </small>
        </div>
        <div>
          <!-- Likes -->
          <strong v-if="gymRoute.likes_count && gymRoute.likes_count > 0">
            <v-icon
              class="vertical-align-text-bottom"
              color="red"
              small
            >
              {{ mdiHeart }}
            </v-icon>
            {{ gymRoute.likes_count }}
          </strong>

          <!-- videos -->
          <strong
            v-if="gymRoute.videos_count || 0 !== 0"
            class="text--disabled"
          >
            <v-icon
              small
              class="ml-2 text--disabled vertical-align-top"
            >
              {{ mdiPlayBox }}
            </v-icon>
            {{ gymRoute.videos_count || 0 }}
          </strong>

          <!-- comments -->
          <strong
            v-if="gymRoute.all_comments_count || 0 !== 0"
            class="text--disabled"
          >
            <v-icon
              small
              class="ml-2 text--disabled"
            >
              {{ mdiComment }}
            </v-icon>
            {{ gymRoute.all_comments_count || 0 }}
          </strong>

          <!-- Ascents -->
          <strong
            v-if="gymRoute.ascents_count || 0 !== 0"
            class="text--disabled"
          >
            <v-icon
              small
              class="ml-2 text--disabled"
            >
              {{ mdiCheckAll }}
            </v-icon>
            {{ gymRoute.ascents_count || 0 }}
          </strong>
        </div>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mdiCheckAll, mdiHeart, mdiComment, mdiPlayBox } from '@mdi/js'
import GymRouteTagAndHold from '~/components/gymRoutes/partial/GymRouteTagAndHold.vue'
import GymRouteGradeAndPoint from '~/components/gymRoutes/partial/GymRouteGradeAndPoint.vue'
import AscentGymRouteStatusIcon from '~/components/ascentGymRoutes/AscentGymRouteStatusIcon.vue'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'GymRouteListItem',
  components: {
    AscentGymRouteStatusIcon,
    GymRouteGradeAndPoint,
    GymRouteTagAndHold
  },
  mixins: [ImageVariantHelpers],

  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    relativePath: {
      type: Boolean,
      default: true
    },
    clickCallback: {
      type: Function,
      default: null
    },
    highlightSectors: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      mdiCheckAll,
      mdiHeart,
      mdiComment,
      mdiPlayBox
    }
  },

  computed: {
    activeGymRouteId () {
      return this.$route.query.route
    },

    activeRoute () {
      return parseInt(this.activeGymRouteId) === this.gymRoute.id
    },

    itemListClass () {
      const klass = []
      if (this.bordered) {
        klass.push('border')
      }
      if (this.gymRoute.thumbnail) {
        klass.push('pl-0')
      }
      return klass.join(' ')
    }
  },

  methods: {
    openGymRoute () {
      if (this.clickCallback) {
        this.clickCallback(this.gymRoute)
      } else {
        const query = {}
        if (!this.activeRoute) { query.route = this.gymRoute.id }
        const path = this.relativePath ? this.$route.path : this.gymRoute.gymSpacePath
        this.$router.push(
          {
            path,
            query
          }
        )
      }
    },

    onMouseEnter () {
      if (this.highlightSectors) {
        this.$root.$emit('activeSector', this.gymRoute.gym_sector.id)
      }
    }
  }
}
</script>
