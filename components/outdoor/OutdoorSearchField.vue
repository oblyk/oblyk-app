<template>
  <v-card
    ripple
    class="rounded-pill outdoor-search-box"
    @click="$refs.searchField.focus()"
  >
    <div style="width: 100%; height: 45px; display: flex; justify-content: center; align-items: center;">
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
    <div class="d-flex pl-3 pr-2 align-center full-height" style="margin-top: -45px">
      <div class="search-icon">
        <v-icon
          v-if="!searching"
          color="#31994e"
        >
          {{ searchIcon[searchType] }}
        </v-icon>
        <v-progress-circular
          v-else
          indeterminate
          color="#31994e"
          size="19"
          width="3"
          class="mr-1"
        />
      </div>
      <input
        ref="searchField"
        v-model="query"
        :placeholder="searchPlaceHolder[searchType]"
        type="text"
        class="flex-grow-1 query-search-input"
        @keyup="search()"
      >
      <v-btn
        v-show="query"
        icon
        @click="clear()"
      >
        <v-icon color="#51fd8b">
          {{ mdiClose }}
        </v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mdiTerrain, mdiBookshelf, mdiSourceBranch, mdiClose } from '@mdi/js'

export default {
  name: 'OutdoorSearchField',
  props: {
    searching: {
      type: Boolean,
      default: false
    },
    searchType: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      showClearBtn: false,
      query: null,

      searchIcon: {
        crag: mdiTerrain,
        guideBook: mdiBookshelf,
        cragRoute: mdiSourceBranch
      },
      searchPlaceHolder: {
        crag: this.$t('components.crag.searchCrag'),
        guideBook: this.$t('components.guideBookPaper.searchGuideBookPaper'),
        cragRoute: this.$t('components.cragRoute.searchRoute')
      },

      mdiClose
    }
  },

  mounted () {
    this.giveFocus()
  },

  methods: {
    giveFocus () {
      this.$refs.searchField.focus()
    },

    search () {
      this.$emit('input', this.query)
    },

    clear () {
      this.query = null
      this.$emit('input', null)
    }
  }
}
</script>

<style>
.outdoor-search-box {
  max-width: 600px !important;
  height: 45px;
  .query-search-input {
    all: unset;
    caret-color: #31994e;
    border-radius: 0 !important;
    margin-left: 5px;
  }
  .search-icon {
    width: 28px;
    text-align: center;
  }
}
</style>
