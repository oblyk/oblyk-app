<template>
  <div>
    <v-card
      :to="mode === 'link' ? '/outdoor/search/crags' : null"
      class="rounded-pill rounded-focus"
      @click="openDialog('Crag')"
    >
      <div class="full-width d-flex justify-center align-center" style="height: 45px;">
        <svg style="width: 100%; height: 100%;">
          <defs>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#31994e;" />
              <stop offset="100%" style="stop-color:#51fd8b;" />
            </linearGradient>
          </defs>
          <rect
            x="1"
            y="1"
            width="calc(100% - 3px)"
            height="42"
            fill="none"
            stroke="url(#borderGradient)"
            stroke-width="2"
            rx="22"
          />
        </svg>
      </div>
      <div class="d-flex align-center" style="margin-top: -45px; height: 45px">
        <div class="pl-4">
          <v-icon
            color="#31994e"
            class="vertical-align-sub"
          >
            {{ mdiTerrain }}
          </v-icon>
        </div>
        <div class="flex-grow-1 text--disabled pl-3">
          {{ $t('components.search.title') }}
          <v-chip
            :to="mode === 'link' ? '/outdoor/search/crags' : null"
            small
            @click.stop="openDialog('Crag')"
          >
            {{ $t('components.search.type.aCrag') }}
          </v-chip>
          <v-chip
            :to="mode === 'link' ? '/outdoor/search/guide-books' : null"
            small
            @click.stop="openDialog('GuideBook')"
          >
            {{ $t('components.search.type.aGuideBook') }}
          </v-chip>
          <v-chip
            :to="mode === 'link' ? '/outdoor/search/crag-routes' : null"
            small
            @click.stop="openDialog('CragRoute')"
          >
            {{ $t('components.search.type.aCragRoute') }}
          </v-chip>
        </div>
      </div>
    </v-card>
    <v-dialog
      v-model="dialog"
      fullscreen
    >
      <v-card>
        <v-card-title class="d-flex">
          <div>
            {{ $t('components.search.title') }}
            <v-chip
              small
              :color="searchType === 'Crag' ? '#31994e' : null"
              :outlined="searchType === 'Crag'"
              @click.stop="openDialog('Crag')"
            >
              {{ $t('components.search.type.aCrag') }}
            </v-chip>
            <v-chip
              small
              :color="searchType === 'GuideBook' ? '#31994e' : null"
              :outlined="searchType === 'GuideBook'"
              @click.stop="openDialog('GuideBook')"
            >
              {{ $t('components.search.type.aGuideBook') }}
            </v-chip>
            <v-chip
              small
              :color="searchType === 'CragRoute' ? '#31994e' : null"
              :outlined="searchType === 'CragRoute'"
              @click.stop="openDialog('CragRoute')"
            >
              {{ $t('components.search.type.aCragRoute') }}
            </v-chip>
          </div>
          <v-btn
            icon
            class="ml-auto"
            @click="dialog = false"
          >
            <v-icon>
              {{ mdiClose }}
            </v-icon>
          </v-btn>
        </v-card-title>
        <outdoor-search-crag-overview
          v-if="mode === 'dialog' && searchType === 'Crag'"
          ref="outdoorSearchCragOverview"
        />
        <outdoor-search-guide-book-overview
          v-if="mode === 'dialog' && searchType === 'GuideBook'"
          ref="outdoorSearchGuideBookOverview"
        />
        <outdoor-search-crag-route-overview
          v-if="mode === 'dialog' && searchType === 'CragRoute'"
          ref="outdoorSearchCragRouteBookOverview"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiTerrain, mdiClose } from '@mdi/js'
const OutdoorSearchCragOverview = () => import('~/components/outdoor/OutdoorSearchCragOverview')
const OutdoorSearchGuideBookOverview = () => import('~/components/outdoor/OutdoorSearchGuideBookOverview')
const OutdoorSearchCragRouteOverview = () => import('~/components/outdoor/OutdoorSearchCragRouteOverview')

export default {
  name: 'OutdoorGlobalSearch',
  components: { OutdoorSearchCragRouteOverview, OutdoorSearchGuideBookOverview, OutdoorSearchCragOverview },

  props: {
    mode: {
      type: String,
      default: 'link'
    }
  },

  data () {
    return {
      dialog: false,
      searchType: 'Crag',

      searchDialogTitle: {
        Crag: this.$t('components.crag.searchCrag'),
        GuideBook: this.$t('components.guideBookPaper.searchGuideBookPaper'),
        CragRoute: this.$t('components.cragRoute.searchRoute')
      },

      mdiTerrain,
      mdiClose
    }
  },

  watch: {
    '$route' () {
      this.dialog = false
    }
  },

  methods: {
    openDialog (searchType) {
      if (this.mode === 'link') {
        return false
      } else {
        this.searchType = searchType
        this.dialog = true
        setTimeout(() => {
          this.$refs[`outdoorSearch${this.searchType}Overview`].giveFocus()
        }, 500)
      }
    }
  }
}
</script>
