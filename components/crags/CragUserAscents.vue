<template>
  <div>
    <v-card class="full-height rounded">
      <v-card-title>
        <h2 class="h2-title-in-card-title">
          <v-icon left>
            {{ mdiFormatListChecks }}
          </v-icon>
          {{ $t('components.logBook.myAscentsHere') }}
        </h2>
      </v-card-title>
      <v-card-text>
        <div v-if="loadingAscent">
          <v-skeleton-loader type="list-item-two-line" />
        </div>
        <div v-else>
          <v-row v-if="ascents.length">
            <v-col
              v-for="(ascent, routeIndex) in ascents"
              :key="`route-index-${routeIndex}`"
              class="pa-0"
              cols="12"
              md="6"
              lg="4"
            >
              <crag-route-small-line :route="ascent.CragRoute" />
            </v-col>
          </v-row>
          <div
            v-else
            class="text-center pb-2"
          >
            <p class="text--disabled mb-0">
              {{ $t('components.logBook.IHaveNoAscents') }}
            </p>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          right
          text
          class="black-btn-icon --with-border"
          :to="`/ascents/outdoor/new?crag_id=${crag.id}`"
        >
          <v-icon left>
            {{ mdiPlusBoxOutline }}
          </v-icon>
          {{ $t('components.layout.appBar.addCross') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <crag-route-drawer
      v-if="ascents.length > 0"
    />
  </div>
</template>

<script>
import { mdiFormatListChecks, mdiPlusBoxOutline } from '@mdi/js'
import LogBookOutdoorApi from '~/services/oblyk-api/LogBookOutdoorApi'
import AscentCragRoute from '~/models/AscentCragRoute'
import CragRouteSmallLine from '~/components/cragRoutes/CragRouteSmallLine'
const CragRouteDrawer = () => import('~/components/cragRoutes/CragRouteDrawer')

export default {
  name: 'CragUserAscents',
  components: { CragRouteDrawer, CragRouteSmallLine },
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingAscent: true,
      limit: 3,
      ascents: [],

      mdiFormatListChecks,
      mdiPlusBoxOutline
    }
  },

  mounted () {
    this.getUserAscents()
  },

  methods: {
    getUserAscents () {
      this.loadingAscent = true
      new LogBookOutdoorApi(this.$axios, this.$auth)
        .ascentsOfCrag(this.crag.id)
        .then((resp) => {
          this.ascents = []
          for (const ascent of resp.data) {
            this.ascents.push(new AscentCragRoute({ attributes: ascent }))
          }
        })
        .finally(() => {
          this.loadingAscent = false
        })
    }
  }
}
</script>
