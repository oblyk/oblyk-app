import {
  mdiAutorenew,
  mdiCheckboxMarkedCircle,
  mdiCropFree,
  mdiCropSquare,
  mdiEye,
  mdiFlash,
  mdiRecordCircle
} from '@mdi/js'
import { oblykRopingStatusLeadClimb, oblykRopingStatusTopRope } from '~/assets/oblyk-icons'

const MDMyAscentStatusAttributes = {
  project: { value: 'project', icon: mdiCropSquare, colors: [244, 143, 177] },
  sent: { value: 'sent', icon: mdiCropSquare, colors: [255, 138, 128] },
  red_point: { value: 'red_point', icon: mdiRecordCircle, colors: [255, 138, 128] },
  flash: { value: 'flash', icon: mdiFlash, colors: [130, 170, 255] },
  onsight: { value: 'onsight', icon: mdiEye, colors: [255, 215, 64] },
  repetition: { value: 'repetition', icon: mdiAutorenew, colors: [150, 150, 150] },
  tick_list: { value: 'tick_list', icon: mdiCropFree, colors: null }
}
const MDMyAscentRopingStatusAttributes = {
  lead_climb: { value: 'lead_climb', icon: oblykRopingStatusLeadClimb },
  top_rope: { value: 'top_rope', icon: oblykRopingStatusTopRope }
}

export const MyAscentStatusMixin = {
  data () {
    return {
      MD_myAscents: this.gymRoute?.my_ascents,
      MD_myAscentStatus: null,
      MD_myAscentRopingStatus: null,
      MD_myAscentRepetitionCount: 0,

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
    MC_storeAscents () {
      if (this.gymRoute) {
        return this.$store.getters['ascentsPusher/gymRoutesAscents']
      } else {
        return null
      }
    }
  },

  watch: {
    MC_storeAscents: {
      handler () {
        const storeAscents = this.$store.getters['ascentsPusher/gymRoutesAscents']
        if (storeAscents && storeAscents[this.gymRoute.id]) {
          this.MD_myAscents = storeAscents[this.gymRoute.id]
          this.MM_setAscentAttributes()
        }
      },
      deep: true
    }
  },

  mounted () {
    this.MM_setAscentAttributes()
  },

  methods: {
    MM_setAscentAttributes () {
      if (this.MD_myAscents && this.MD_myAscents.length > 0) {
        const ascent = this.MD_myAscents[0]

        // Set ascent status
        this.MD_myAscentStatus = MDMyAscentStatusAttributes[ascent.ascent_status]

        // Set roping status
        if (ascent.roping_status !== null && ascent.ascent_status !== 'project') {
          this.MD_myAscentRopingStatus = MDMyAscentRopingStatusAttributes[ascent.roping_status]
        } else {
          this.MD_myAscentRopingStatus = null
        }

        // Set repetition Count
        for (const ascent of this.MD_myAscents) {
          if (ascent.ascent_status === 'repetition') {
            this.MD_myAscentRepetitionCount += 1
          }
        }
      } else {
        this.MD_myAscentStatus = null
        this.MD_myAscentRopingStatus = null
        this.MD_myAscentRepetitionCount = 0
      }
    },

    MM_myAscentColorBuilder (alpha = 1) {
      if (this.MD_myAscentStatus.colors === null) {
        return 'rgba(0,0,0,0)'
      }

      return `rgba(${this.MD_myAscentStatus.colors.join(',')}, ${alpha})`
    }
  }
}
