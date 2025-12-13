<template>
  <v-list-item
    v-model="activeRoute"
    class="rounded-list-item gym-route-list-item pl-1"
    :style="selected ? 'background-color: rgba(116, 58, 213, 0.1)' : null"
    :class="itemListClass"
    @touchstart="startLongPress"
    @click="openGymRoute"
    @mousedown="endLongPress"
    @mouseenter="onMouseEnter"
    @touchmove="endLongPress"
  >
    <v-list-item-action
      v-if="multipleSelection"
      class="ml-2 mr-3"
    >
      <v-checkbox
        v-model="selected"
        hide-details
        :disabled="gymRoute.sections.length > 1"
        class="mt-0"
        color="#743ad5"
        @click.stop
      />
    </v-list-item-action>
    <v-list-item-avatar rounded size="72" class="mr-2">
      <gym-route-avatar :gym-route="gymRoute" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title class="d-flex">
        <div class="mr-auto text-truncate">
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
          <ascent-gym-route-icon
            v-if="$auth.loggedIn"
            :gym-route="gymRoute"
            :size="18"
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
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import GymRouteGradeAndPoint from '~/components/gymRoutes/partial/GymRouteGradeAndPoint'
import AscentGymRouteIcon from '~/components/ascentGymRoutes/AscentGymRouteIcon'
import GymRouteAvatar from '~/components/gymRoutes/GymRouteAvatar'

export default {
  name: 'GymRouteListItem',
  components: {
    GymRouteAvatar,
    AscentGymRouteIcon,
    GymRouteGradeAndPoint
  },
  mixins: [ImageVariantHelpers],

  props: {
    value: {
      type: Array,
      default: null
    },
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
    },
    multipleSelection: {
      type: Boolean,
      default: false
    },
    switchMultiSelection: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      selected: this.value.includes(this.gymRoute.id),
      selectedRoutes: this.value,
      longPressTimeOut: null,
      activeMultiSelectedOnMouseUp: false,

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

  watch: {
    selected () {
      if (this.selected) {
        if (!this.value.includes(this.gymRoute.id)) {
          this.selectedRoutes.push(this.gymRoute.id)
        }
      } else {
        this.selectedRoutes = this.selectedRoutes.filter(id => id !== this.gymRoute.id)
      }
      this.$emit('input', this.selectedRoutes)
    },

    value () {
      this.selectedRoutes = this.value
      this.selected = this.value.includes(this.gymRoute.id)
    }
  },

  methods: {
    openGymRoute () {
      if (this.multipleSelection) {
        this.selected = this.gymRoute.sections.length > 1 ? false : !this.selected
      } else if (this.clickCallback) {
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
    },

    startLongPress () {
      clearTimeout(this.longPressTimeOut)
      this.longPressTimeOut = setTimeout(() => {
        clearTimeout(this.longPressTimeOut)
        if (this.multipleSelection === false) {
          this.switchMultiSelection()
          this.selected = true
        }
      }, 800)
    },

    endLongPress () {
      clearTimeout(this.longPressTimeOut)
    }
  }
}
</script>
