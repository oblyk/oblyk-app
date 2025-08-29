<template>
  <div>
    <v-sheet class="indoor-search-container-header border-bottom pa-2">
      <v-card
        class="indoor-gradient-search-box rounded-pill mx-auto"
        ripple
      >
        <div style="width: 100%; height: 45px; display: flex; justify-content: center; align-items: center;">
          <svg style="width: 100%; height: 100%;">
            <defs>
              <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#743ad5;" />
                <stop offset="100%" style="stop-color:#d53a9d;" />
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
              color="#743ad5"
              class="vertical-align-sub"
            >
              {{ oblykIndoor }}
            </v-icon>
            <v-progress-circular
              v-else
              indeterminate
              color="#743ad5"
              size="19"
              width="3"
              class="mr-1"
            />
          </div>
          <input
            ref="searchField"
            v-model="query"
            :placeholder="$t('components.gym.searchGym')"
            type="text"
            class="flex-grow-1 query-search-input"
            @keyup="search()"
          >
          <v-btn
            v-show="query"
            icon
            @click="query = null"
          >
            <v-icon color="#d53a9d">
              {{ mdiClose }}
            </v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-sheet>

    <v-container class="indoor-search-container">
      <div
        v-show="!haveQuery"
        class="mt-n1 pr-1"
      >
        <div class="text-right">
          <small
            class="text--disabled"
            v-html="$tc('components.gym.gymCount', gymsCount, { count: gymsCount })"
          />
        </div>
        <gyms-by-popularity />
      </div>
      <div
        v-if="haveQuery"
        class="mt-3"
      >
        <gym-cover-card
          v-for="(gym, gymIndex) in searchResults"
          :key="`gym-indoor-${gymIndex}`"
          :gym="gym"
          class="mb-1"
        />
      </div>
    </v-container>
  </div>
</template>
<script>
import { mdiClose } from '@mdi/js'
import { oblykIndoor } from '~/assets/oblyk-icons'
import GymsByPopularity from '~/components/gyms/GymsByPopularity'
import GymCoverCard from '~/components/gyms/GymCoverCard'
import CommonApi from '~/services/oblyk-api/CommonApi'
import GymApi from '~/services/oblyk-api/GymApi'
import Gym from '~/models/Gym'

export default {
  name: 'IndoorSearchOverview',
  components: { GymCoverCard, GymsByPopularity },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null,
      gymApi: null,
      gymsCount: '...',

      oblykIndoor,
      mdiClose
    }
  },

  computed: {
    haveQuery () {
      return !(this.query === null || this.query === '')
    }
  },

  mounted () {
    this.giveFocus()
    this.getGymsCount()
  },

  methods: {
    giveFocus () {
      this.$refs.searchField.focus()
    },

    getGymsCount () {
      new CommonApi(this.$axios, this.$auth)
        .microStats(['gyms_count'])
        .then((resp) => {
          this.gymsCount = resp.data.gyms_count
        })
    },

    search () {
      if (this.previousQuery === this.query) {
        this.searching = false
        return
      }

      this.onSearch = true
      this.searching = true

      if (this.searchTimeOut) {
        clearTimeout(this.searchTimeOut)
        this.searchTimeOut = null
      }
      this.searchTimeOut = setTimeout(() => {
        this.apiSearch()
      }, 500)
    },

    apiSearch () {
      this.gymApi = this.gymApi || new GymApi(this.$axios, this.$auth)

      this.gymApi.cancelSearch()
      this.gymApi
        .search(this.query)
        .then((resp) => {
          this.searchResults = []
          for (const gym of resp.data) {
            this.searchResults.push(new Gym({ attributes: gym }))
          }
          this.previousQuery = this.query
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'gym')
          }
        })
        .finally(() => {
          this.searching = false
        })
    }
  }
}
</script>

<style lang="scss">
.indoor-search-container-header {
  position: sticky;
  top: 0;
  z-index: 1;
  .indoor-gradient-search-box {
    max-width: 600px;
    height: 45px;
    .query-search-input {
      all: unset;
      caret-color: #743ad5;
      border-radius: 0 !important;
      margin-left: 5px;
    }
    .search-icon {
      width: 28px;
      text-align: center;
    }
  }
}
.indoor-search-container {
  padding-top: 0;
  max-width: 600px;
}
@media only screen and (max-width: 959px) {
  .indoor-search-container-header {
    top: 64px;
  }
}
</style>
