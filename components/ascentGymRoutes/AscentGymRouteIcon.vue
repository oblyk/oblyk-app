<template>
  <v-chip
    v-if="ascentInLogBook || ascent"
    small
    dark
    :class="withLabel ? 'pl-1 pr-2' : 'px-1'"
  >
    <v-icon
      :small="size === null"
      :size="size"
      :color="statusColor()"
    >
      {{ statusIcon() }}
    </v-icon>
    <strong
      v-if="withLabel"
      class="pl-1"
    >
      {{ label() }}
    </strong>
  </v-chip>
</template>

<script>
import {
  mdiAutorenew,
  mdiCheckboxMarkedCircle,
  mdiCropFree,
  mdiCropSquare,
  mdiEye,
  mdiFlash,
  mdiRecordCircle
} from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'AscentGymRouteIcon',
  mixins: [DateHelpers],
  props: {
    gymRoute: {
      type: Object,
      default: null
    },
    ascent: {
      type: Object,
      default: null
    },
    size: {
      type: Number,
      default: null
    },
    color: {
      type: String,
      default: 'amber darken-1'
    },
    withLabel: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      ascentInLogBook: null,

      mdiCropSquare,
      mdiCheckboxMarkedCircle,
      mdiRecordCircle,
      mdiFlash,
      mdiEye,
      mdiAutorenew,
      mdiCropFree
    }
  },

  computed: {
    gymRouteAscents () {
      if (this.gymRoute) {
        return this.$auth.user.ascent_gym_routes
      } else {
        return null
      }
    }
  },

  watch: {
    gymRouteAscents () {
      if (this.gymRoute) {
        this.findAscentInLogBook()
      }
    }
  },

  created () {
    if (this.gymRoute) {
      this.findAscentInLogBook()
    }
  },

  methods: {
    findAscentInLogBook () {
      if (this.ascent) { return }
      if (!this.gymRouteAscents || this.gymRouteAscents.length === 0) { return }

      const statusOrder = ['onsight', 'flash', 'red_point', 'repetition', 'sent', 'project', 'tick_list']
      const ascents = this.gymRouteAscents.filter(gymRouteAscent => gymRouteAscent.gym_route_id === this.gymRoute.id)

      if (!ascents || ascents.length === 0) { return }

      this.ascentInLogBook = ascents.sort((a, b) => statusOrder.indexOf(a.ascent_status) - statusOrder.indexOf(b.ascent_status))[0]
    },

    ascentStatus () {
      const tickStatus = this.inMyTickList ? 'tick_list' : null
      return this.ascent?.ascent_status || this.ascentInLogBook?.ascent_status || tickStatus
    },

    ropingStatus () {
      if (this.ascent && (this.ascent.gym_route.climbing_type !== 'sport_climbing' || this.ascent.ascent_status === 'project')) {
        return null
      } else if (this.gymRoute && (this.gymRoute.climbing_type !== 'sport_climbing' || this.ascentStatus() === 'project')) {
        return null
      }
      return this.ascent?.roping_status || this.ascentInLogBook?.roping_status
    },

    statusIcon () {
      if (this.ascentStatus() === 'project') {
        return mdiCropSquare
      } else if (this.ascentStatus() === 'sent') {
        return mdiCheckboxMarkedCircle
      } else if (this.ascentStatus() === 'red_point') {
        return mdiRecordCircle
      } else if (this.ascentStatus() === 'flash') {
        return mdiFlash
      } else if (this.ascentStatus() === 'onsight') {
        return mdiEye
      } else if (this.ascentStatus() === 'repetition') {
        return mdiAutorenew
      } else if (this.ascentStatus() === 'tick_list') {
        return mdiCropFree
      }
    },

    statusColor () {
      if (this.ascentStatus() === 'project') {
        return null
      } else if (this.ascentStatus() === 'sent') {
        return 'green accent-1'
      } else if (this.ascentStatus() === 'red_point') {
        return 'red accent-1'
      } else if (this.ascentStatus() === 'flash') {
        return 'blue accent-1'
      } else if (this.ascentStatus() === 'onsight') {
        return 'amber accent-2'
      } else if (this.ascentStatus() === 'repetition') {
        return null
      } else if (this.ascentStatus() === 'tick_list') {
        return null
      }
    },

    label () {
      const label = [this.$t(`models.ascentStatus.${this.ascentStatus()}`)]
      if (this.ropingStatus()) {
        label.push(this.$t(`models.ropingStatus.${this.ropingStatus()}`))
      }
      return label.join(', ')
    }
  }
}
</script>
