<template>
  <div class="daily-ascent-crag">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template #activator="{ on, attrs }">
        <v-img
          :src="Crag.coverUrl"
          :lazy-src="Crag.thumbnailCoverUrl"
          class="hoverable"
          width="250"
          height="160"
          dark
          gradient="to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%"
          v-bind="attrs"
          v-on="on"
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
      </template>

      <v-card>
        <v-img
          height="160"
          :src="Crag.coverUrl"
          :lazy-src="Crag.thumbnailCoverUrl"
        />
        <v-card-title>
          {{ Crag.name }}
        </v-card-title>
        <v-card-subtitle
          v-html="$t('components.dailyCrosses.iMade', { count: part.ascents.length, ago: dateFromNow(part.date), date: humanizeDate(part.date) })"
        />

        <v-card-text>
          <crag-route-small-line
            v-for="(ascent, routeIndex) in part.ascents"
            :key="`route-index-${routeIndex}`"
            :route="cragRouteToObject(ascent.crag_route)"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            {{ $t('actions.close') }}
          </v-btn>
        </v-card-actions>
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
      dialog: false
    }
  },

  computed: {
    Crag () {
      return new Crag({ attributes: this.part.crag })
    }
  },

  methods: {
    cragRouteToObject (route) {
      return new CragRoute({ attributes: route })
    }
  }
}
</script>

<style lang="scss" scoped>
.daily-ascent-crag {
  position: relative;
  .v-image {
    border-radius: 8px;
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
