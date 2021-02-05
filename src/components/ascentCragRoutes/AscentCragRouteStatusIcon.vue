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
  name: 'AscentCragRouteStatusIcon',
  mixins: [DateHelpers],
  props: {
    cragRoute: Object,
    ascentStatus: String
  },

  data () {
    return {
      ascentInLogBook: null
    }
  },

  computed: {
    cragRouteAscents: function () {
      return store.getters['auth/getAscentCragRoutes']
    }
  },

  watch: {
    cragRouteAscents: function () {
      this.findAscentInLogBook()
    }
  },

  created () {
    this.findAscentInLogBook()
  },

  methods: {
    findAscentInLogBook: function () {
      for (const ascent of this.cragRouteAscents) {
        if (this.cragRoute.id === ascent.crag_route_id) {
          this.ascentInLogBook = ascent
          return
        }
      }
      this.ascentInLogBook = null
    },

    icon: function () {
      const status = this.ascentStatus || this.ascentInLogBook.ascent_status
      if (status === 'project') {
        return 'mdi-crop-square'
      } else if (status === 'sent') {
        return 'mdi-checkbox-marked-circle'
      } else if (status === 'red_point') {
        return 'mdi-record-circle-outline'
      } else if (status === 'flash') {
        return 'mdi-flash'
      } else if (status === 'onsight') {
        return 'mdi-eye'
      } else if (status === 'repetition') {
        return 'mdi-autorenew'
      } else if (status === 'tick_list') {
        return 'mdi-code-brackets'
      }
    },

    title: function () {
      const status = this.$t(`models.ascentStatus.${this.ascentInLogBook.ascent_status}`)
      let date = ''
      if (this.ascentInLogBook.released_at) {
        date = this.humanizeDate(this.cragRouteAscents.released_at)
      }
      return `${date} : ${status}`
    }
  }
}
</script>
