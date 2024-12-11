<template>
  <v-icon
    v-if="ascentInLogBook || inMyTickList"
    small
    :title="title()"
    :color="color()"
  >
    {{ icon() }}
  </v-icon>
</template>

<script>
import { mdiCropSquare, mdiCheckboxMarkedCircle, mdiRecordCircle, mdiFlash, mdiEye, mdiAutorenew, mdiCropFree } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'AscentCragRouteStatusIcon',
  mixins: [DateHelpers],
  props: {
    cragRoute: {
      type: Object,
      required: true
    },
    ascentStatus: {
      type: String,
      default: null
    },
    ascentRopeStatus: {
      type: String,
      default: null
    }
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
    cragRouteAscents () {
      return this.$auth.user.ascent_crag_routes
    },

    inMyTickList () {
      const tickList = this.$auth.user.tick_list || []
      return (tickList.includes(this.cragRoute.id))
    }
  },

  watch: {
    cragRouteAscents () {
      this.findAscentInLogBook()
    }
  },

  created () {
    this.findAscentInLogBook()
  },

  methods: {
    findAscentInLogBook () {
      this.ascentInLogBook = null
      for (const ascent of (this.cragRouteAscents || [])) {
        if (this.cragRoute.id === ascent.crag_route_id) {
          this.ascentInLogBook = ascent
          if (!(ascent.ascent_status === 'project') && !(ascent.ascent_status === 'tick_list') &&
            (ascent.roping_status.includes('lead'))) { // TODO-now si plusieurs voies en lead classer selon ascent status among  sent red_point flash onsight repetition
            return
          }
        }
      }
    },

    status () {
      const tickStatus = this.inMyTickList ? 'tick_list' : null
      return this.ascentStatus || (this.ascentInLogBook || {}).ascent_status || tickStatus
    },

    ropingStatus () {
      return this.ascentRopeStatus || (this.ascentInLogBook || {}).roping_status
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

    color () {
      if (this.ropingStatus() != null && this.ropingStatus().includes('lead')) {
        return 'amber darken-1'
      } else {
        return 'brown darken-1'
      }
    },

    title () {
      const status = this.$t(`models.ascentStatus.${this.status()}`)
      let date = ''
      if ((this.ascentInLogBook || {}).released_at) {
        date = `${this.humanizeDate(this.ascentInLogBook.released_at)} :`
      }
      return `${date} ${status}`
    }
  }
}
</script>
