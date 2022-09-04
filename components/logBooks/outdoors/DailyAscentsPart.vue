<template>
  <div class="daily-ascent-crag">
    <v-img
      :src="Crag.coverUrl"
      :lazy-src="Crag.thumbnailCoverUrl"
      class="hoverable"
      width="250"
      height="160"
      dark
      gradient="to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%"
      @click="openDialogue()"
    >
      <div class="daily-ascent-crag-description">
        <p class="mb-n2">
          {{ Crag.name }}
        </p>
        <p class="mb-0">
          <small class="font-italic">
            {{ part.ascents.length }} {{ $t('common.crosses') }} {{ dateFromNow(part.date) }}
          </small>
        </p>
      </div>
    </v-img>

    <v-dialog
      v-model="dialog"
      :fullscreen="isMobile"
      width="500"
    >
      <v-card
        class="d-flex flex-column justify-space-between"
        :class="isMobile ? 'rounded-0' : ''"
      >
        <v-img
          class="flex-grow-0"
          height="160"
          :src="Crag.coverUrl"
          :lazy-src="Crag.thumbnailCoverUrl"
        />
        <div class="flex-grow-1 d-flex flex-column justify-space-between">
          <div class="flex-grow-0">
            <v-card-title>
              {{ Crag.name }}
            </v-card-title>
            <v-card-subtitle
              v-html="$t('components.dailyCrosses.iMade', { count: part.ascents.length, ago: dateFromNow(part.date), date: humanizeDate(part.date) })"
            />
          </div>

          <v-card-text
            class="flex-grow-1 overflow-y-auto"
          >
            <crag-route-small-line
              v-for="(ascent, routeIndex) in part.ascents"
              :key="`route-index-${routeIndex}`"
              :route="cragRouteToObject(ascent.crag_route)"
            />
          </v-card-text>

          <v-card-actions
            class="flex-grow-0"
          >
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="closeDialogue()"
            >
              {{ $t('actions.close') }}
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Crag from '~/models/Crag'
import { DateHelpers } from '~/mixins/DateHelpers'
import CragRoute from '~/models/CragRoute'
import CragRouteSmallLine from '~/components/cragRoutes/CragRouteSmallLine'

export default {
  name: 'DailyAscentsPart',
  components: { CragRouteSmallLine },
  mixins: [DateHelpers],

  props: {
    part: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isMobile: false,
      dialog: false
    }
  },

  computed: {
    Crag () {
      return new Crag({ attributes: this.part.crag })
    }
  },

  watch: {
    $route (newVal, oldVal) {
      if (oldVal.query?.dialog === 'true') {
        this.dialog = false
      }
    }
  },

  mounted () {
    this.isMobile = window.innerWidth < 600
  },

  methods: {
    cragRouteToObject (route) {
      return new CragRoute({ attributes: route })
    },

    openDialogue () {
      this.dialog = true
      this.$router.push(
        {
          path: this.$route.fullPath,
          query: {
            dialog: true
          }
        }
      )
    },

    closeDialogue () {
      this.dialog = false
      this.$router.push(
        {
          path: this.$route.path
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.daily-ascent-crag {
  position: relative;
  .v-image {
    border-radius: 15px;
  }
  .daily-ascent-crag-description {
    position: absolute;
    font-weight: bold;
    bottom: 0;
    width: 100%;
    padding: 5px 10px;
  }
}
</style>
