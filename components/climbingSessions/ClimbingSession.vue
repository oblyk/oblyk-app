<template>
  <div>
    <climbing-session-item
      v-for="(session, sessionIndex) in sessions"
      :key="`climbing-session-index-${sessionIndex}`"
      :climbing-session="session"
      :gym-references="gyms"
      :crag-references="crags"
      class="mb-7"
    />
    <loading-more
      class="mt-4"
      :loading-more="loadingMoreData"
      :no-more-data="noMoreDataToLoad"
      :get-function="getClimbingSessions"
    />
    <p
      v-if="sessions.length === 0 && !loadingClimbingSessions"
      class="text-center mt-4"
      v-html="$t('components.climbingSession.empty')"
    />
  </div>
</template>

<script>
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import LoadingMore from '~/components/layouts/LoadingMore.vue'
import ClimbingSessionApi from '~/services/oblyk-api/ClimbingSessionApi'
import ClimbingSession from '~/models/ClimbingSession'
import ClimbingSessionItem from '~/components/climbingSessions/ClimbingSessionItem.vue'
import Crag from '~/models/Crag'
import Gym from '~/models/Gym'

export default {
  name: 'ClimbingSession',
  components: { ClimbingSessionItem, LoadingMore },
  mixins: [LoadingMoreHelpers],

  props: {
    filters: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      sessions: [],
      loadingClimbingSessions: true,
      climbingSessionApi: new ClimbingSessionApi(this.$axios, this.$auth),
      crags: [],
      gyms: [],

      cragsAdded: [],
      gymsAdded: []
    }
  },

  mounted () {
    this.$root.$on('reloadClimbingSession', () => {
      this.reload()
    })
    this.getClimbingSessions()
  },

  beforeDestroy () {
    this.$root.$off('reloadClimbingSession')
  },

  methods: {
    reload () {
      this.page = 1
      this.sessions = []
      this.loadingClimbingSessions = true
      this.crags = []
      this.gyms = []
      this.noMoreDataToLoad = false
      this.cragsAdded = []
      this.gymsAdded = []
      this.getClimbingSessions()
    },

    getClimbingSessions () {
      this.moreIsBeingLoaded()

      this.climbingSessionApi
        .list(this.page, this.filters)
        .then((resp) => {
          // Parse climbing session
          for (const session of resp.data.sessions) {
            this.sessions.push(
              new ClimbingSession({ attributes: session })
            )
          }

          // Parse crags
          for (const crag of resp.data.references.crags) {
            if (this.cragsAdded.includes(crag.id)) { continue }
            this.crags.push(
              new Crag({ attributes: crag })
            )
            this.cragsAdded.push(crag.id)
          }

          // Parse gyms
          for (const gym of resp.data.references.gyms) {
            if (this.gymsAdded.includes(gym.id)) { continue }
            this.gyms.push(
              new Gym({ attributes: gym })
            )
            this.gymsAdded.push(gym.id)
          }
          this.page++
          if (resp.data.sessions.length < 25) { this.noMoreDataToLoad = true }
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingClimbingSessions = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
