<template>
  <v-icon
    v-if="ascentInLogBook || ascentStatus"
    small
    :title="title()"
    color="amber darken-1"
  >
    {{ icon() }}
  </v-icon>
</template>

<script>
import { mdiCropSquare, mdiCheckboxMarkedCircle, mdiRecordCircle, mdiFlash, mdiEye, mdiAutorenew, mdiCropFree } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'AscentGymRouteStatusIcon',
  mixins: [DateHelpers],
  props: {
    gymRoute: {
      type: Object,
      default: null
    },
    ascentStatus: {
      type: String,
      default: null
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
      if (!this.gymRouteAscents || this.gymRouteAscents.length === 0) { return }

      const statusOrder = ['repetition', 'onsight', 'flash', 'red_point', 'sent', 'project', 'tick_list']
      const ascents = this.gymRouteAscents.filter(gymRouteAscent => gymRouteAscent.gym_route_id === this.gymRoute.id)

      if (!ascents || ascents.length === 0) { return }

      this.ascentInLogBook = ascents.sort((a, b) => statusOrder.indexOf(a.ascent_status) - statusOrder.indexOf(b.ascent_status))[0]
    },

    status () {
      const tickStatus = this.inMyTickList ? 'tick_list' : null
      return this.ascentStatus || (this.ascentInLogBook || {}).ascent_status || tickStatus
    },

    icon () {
      if (this.status() === 'project') {
        return mdiCropSquare
      } else if (this.status() === 'sent') {
        return mdiCheckboxMarkedCircle
      } else if (this.status() === 'red_point') {
        return mdiRecordCircle
      } else if (this.status() === 'flash') {
        return mdiFlash
      } else if (this.status() === 'onsight') {
        return mdiEye
      } else if (this.status() === 'repetition') {
        return mdiAutorenew
      } else if (this.status() === 'tick_list') {
        return mdiCropFree
      }
    },

    title () {
      const status = this.$t(`models.ascentStatus.${this.status()}`)
      let date = ''
      if (this.ascentInLogBook?.released_at) {
        date = `${this.humanizeDate(this.gymRouteAscents.released_at)} :`
      }
      return `${date} ${status}`
    }
  }
}
</script>
