<template>
  <v-icon
    small
    v-if="ascentInLogBook"
    :title="title()"
    color="amber darken-1"
  >
    {{ icon() }}
  </v-icon>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import store from '@/store'

export default {
  name: 'AscentGymRouteStatusIcon',
  mixins: [DateHelpers],
  props: {
    gymRoute: Object,
    ascentStatus: String
  },

  data () {
    return {
      ascentInLogBook: null
    }
  },

  computed: {
    gymRouteAscents: function () {
      return store.getters['auth/getAscentGymRoutes']
    }
  },

  watch: {
    gymRouteAscents: function () {
      this.findAscentInLogBook()
    }
  },

  created () {
    this.findAscentInLogBook()
  },

  methods: {
    findAscentInLogBook: function () {
      for (const ascent of this.gymRouteAscents) {
        if (this.gymRoute.id === ascent.gym_route_id) {
          this.ascentInLogBook = ascent
          return
        }
      }
      this.ascentInLogBook = null
    },

    status: function () {
      const tickStatus = this.inMyTickList ? 'tick_list' : null
      return this.ascentStatus || (this.ascentInLogBook || {}).ascent_status || tickStatus
    },

    icon: function () {
      if (this.status() === 'project') {
        return 'mdi-crop-square'
      } else if (this.status() === 'sent') {
        return 'mdi-checkbox-marked-circle'
      } else if (this.status() === 'red_point') {
        return 'mdi-record-circle-outline'
      } else if (this.status() === 'flash') {
        return 'mdi-flash'
      } else if (this.status() === 'onsight') {
        return 'mdi-eye'
      } else if (this.status() === 'repetition') {
        return 'mdi-autorenew'
      } else if (this.status() === 'tick_list') {
        return 'mdi-crop-free'
      }
    },

    title: function () {
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
