<template>
  <v-icon
    v-if="ascentInLogBook"
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
    gymRoute: Object,
    ascentStatus: String
  },

  data () {
    return {
      mdiCropSquare,
      mdiCheckboxMarkedCircle,
      mdiRecordCircle,
      mdiFlash,
      mdiEye,
      mdiAutorenew,
      mdiCropFree,
      ascentInLogBook: null
    }
  },

  computed: {
    gymRouteAscents () {
      return this.$auth.user.ascent_gym_routes
    }
  },

  watch: {
    gymRouteAscents () {
      this.findAscentInLogBook()
    }
  },

  created () {
    this.findAscentInLogBook()
  },

  methods: {
    findAscentInLogBook () {
      for (const ascent of this.gymRouteAscents) {
        if (this.gymRoute.id === ascent.gym_route_id) {
          this.ascentInLogBook = ascent
          return
        }
      }
      this.ascentInLogBook = null
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
      if ((this.ascentInLogBook || {}).released_at) {
        date = `${this.humanizeDate(this.gymRouteAscents.released_at)} :`
      }
      return `${date} ${status}`
    }
  }
}
</script>
