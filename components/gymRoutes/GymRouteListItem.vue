<template>
  <v-list-item
    v-model="activeRoute"
    color="primary"
    class="rounded-list-item gym-route-list-item"
    :class="itemListClass"
    @click="openGymRoute"
  >
    <v-list-item-avatar
      v-if="gymRoute.thumbnail"
      class="my-0"
      height="72"
      width="72"
      rounded
    >
      <v-img
        height="72"
        width="72"
        :src="gymRoute.thumbnailUrl"
      />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
        <gym-route-tag-and-hold :gym-route="gymRoute" />
        {{ gymRoute.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <v-chip
          v-if="showSector"
          outlined
          small
          color="primary"
          class="gym-route-sector-name font-weight-bold"
        >
          <v-icon
            x-small
            left
          >
            {{ mdiTextureBox }}
          </v-icon>
          {{ gymRoute.gym_sector.name }}
        </v-chip>
        <ascent-gym-route-status-icon
          v-if="$auth.loggedIn"
          :gym-route="gymRoute"
        />
        <note
          v-if="gymRoute.note !== null"
          :note="gymRoute.note"
        />
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <gym-route-grade-and-point :gym-route="gymRoute" />
      <span
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
      </span>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mdiCheckAll, mdiTextureBox } from '@mdi/js'
import GymRouteTagAndHold from '~/components/gymRoutes/partial/GymRouteTagAndHold.vue'
import Note from '~/components/notes/Note.vue'
import GymRouteGradeAndPoint from '~/components/gymRoutes/partial/GymRouteGradeAndPoint.vue'
import AscentGymRouteStatusIcon from '~/components/ascentGymRoutes/AscentGymRouteStatusIcon.vue'

export default {
  name: 'GymRouteListItem',
  components: {
    AscentGymRouteStatusIcon,
    GymRouteGradeAndPoint,
    Note,
    GymRouteTagAndHold
  },

  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    showSector: {
      type: Boolean,
      default: false
    },
    relativePath: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      mdiCheckAll,
      mdiTextureBox
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
  }
}
</script>
