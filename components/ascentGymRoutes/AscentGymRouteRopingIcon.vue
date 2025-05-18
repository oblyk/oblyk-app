<template>
  <v-icon
    v-if="ascentInLogBook || ropingStatus"
    :small="size === null"
    :size="size"
    :title="title()"
    :color="color"
  >
    {{ icon() }}
  </v-icon>
</template>

<script>
import {
  oblykRopingStatusTopRope,
  oblykRopingStatusLeadClimbMultiPitchAlternateLead,
  oblykRopingStatusLeadClimb,
  oblykRopingStatusMultiPitchSecond,
  oblykRopingStatusMultiPitchLeader
} from '~/assets/oblyk-icons'
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'AscentGymRouteRopingIcon',
  mixins: [DateHelpers],
  props: {
    gymRoute: {
      type: Object,
      default: null
    },
    ropingStatus: {
      type: String,
      default: null
    },
    size: {
      type: Number,
      default: null
    },
    color: {
      type: String,
      default: 'amber darken-1'
    }
  },

  data () {
    return {
      ascentInLogBook: null,

      oblykRopingStatusLeadClimb,
      oblykRopingStatusTopRope,
      oblykRopingStatusLeadClimbMultiPitchAlternateLead,
      oblykRopingStatusMultiPitchSecond,
      oblykRopingStatusMultiPitchLeader
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
      if (!this.gymRouteAscents || this.gymRouteAscents.length === 0) { return }

      const statusOrder = ['repetition', 'onsight', 'flash', 'red_point', 'sent', 'project', 'tick_list']
      const ascents = this.gymRouteAscents.filter(gymRouteAscent => gymRouteAscent.gym_route_id === this.gymRoute.id)

      if (!ascents || ascents.length === 0) { return }

      this.ascentInLogBook = ascents.sort((a, b) => statusOrder.indexOf(a.ascent_status) - statusOrder.indexOf(b.ascent_status))[0]
    },

    status () {
      return this.ropingStatus || this.ascentInLogBook?.roping_status
    },

    icon () {
      if (this.status() === 'lead_climb') {
        return oblykRopingStatusLeadClimb
      } else if (this.status() === 'top_rope') {
        return oblykRopingStatusTopRope
      } else if (this.status() === 'multi_pitch_leader') {
        return oblykRopingStatusMultiPitchLeader
      } else if (this.status() === 'multi_pitch_second') {
        return oblykRopingStatusMultiPitchSecond
      } else if (this.status() === 'multi_pitch_alternate_lead') {
        return oblykRopingStatusLeadClimbMultiPitchAlternateLead
      }
    },

    title () {
      const status = this.$t(`models.ropingStatus.${this.status()}`)
      let date = ''
      if (this.ascentInLogBook?.released_at) {
        date = `${this.humanizeDate(this.ascentInLogBook.released_at)} :`
      }
      return `${date} ${status}`
    }
  }
}
</script>
