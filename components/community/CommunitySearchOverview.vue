<template>
  <div>
    <v-sheet class="community-search-overview-container-header border-bottom pa-2">
      <v-card
        class="community-gradient-search-overview-box rounded-pill mx-auto"
        ripple
      >
        <div style="width: 100%; height: 45px; display: flex; justify-content: center; align-items: center;">
          <svg style="width: 100%; height: 100%;">
            <defs>
              <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color: #007b8b;" />
                <stop offset="100%" style="stop-color: #23e6ff;" />
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
              color="#007b8b"
            >
              {{ oblykPartner }}
            </v-icon>
            <v-progress-circular
              v-else
              indeterminate
              color="#007b8b"
              size="19"
              width="3"
              class="mr-1"
            />
          </div>
          <input
            ref="searchField"
            v-model="query"
            :placeholder="$t('components.community.search')"
            type="text"
            class="flex-grow-1 query-search-input"
            @keyup="search()"
          >
          <v-btn
            v-show="query"
            icon
            @click="query = null"
          >
            <v-icon color="#23e6ff">
              {{ mdiClose }}
            </v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-sheet>
    <v-container class="community-search-container">
      <div
        v-show="!haveQuery"
        class="mt-n1 pr-1"
      >
        <div class="text-right">
          <small
            class="text--disabled"
            v-html="$tc('common.climbers.long', climbersCount, { count: climbersCount.toLocaleString() })"
          />
        </div>

        <!-- FIND IN ANOTHER WAY -->
        <p class="mb-1 font-weight-medium">
          <v-icon color="primary" left class="vertical-align-top">
            {{ mdiMapSearch }}
          </v-icon>
          {{ $t('common.findAnotherWay') }}
        </p>
        <div class="d-flex mb-4">
          <v-card
            to="/maps/climbers?back_to=/community/search"
            width="180"
            height="180"
            class="mr-2"
          >
            <v-img
              src="/images/climbers-map.jpg"
              alt="Carte des grimpeurs et grimpeuses"
              class="align-end"
              dark
              gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
            >
              <p class="ma-2 font-weight-bold text-truncate">
                <v-icon left>
                  {{ mdiAccountMultiple }}
                </v-icon>
                {{ $t('components.layout.appDrawer.mapClimber') }}
              </p>
            </v-img>
          </v-card>
        </div>

        <suggested-friends v-if="$auth.loggedIn" />
      </div>
      <div
        v-if="haveQuery"
        class="mt-3"
      >
        <div v-if="$auth.loggedIn">
          <user-small-card
            v-for="(user, userIndex) in searchResults"
            :key="`user-community-${userIndex}`"
            small
            :user="user"
            class="mb-1"
          />
        </div>
        <v-sheet
          v-else
          rounded
          class="pa-4 text-center"
        >
          <p class="text--disabled">
            Connectez-vous pour trouver des grimpeurs et grimpeuses !
          </p>
          <div>
            <v-btn
              to="/sign-up?back_to=/community/search"
              color="primary"
              elevation="0"
            >
              {{ $t('actions.signUp') }}
            </v-btn><br>
            <v-btn
              to="/sign-in?back_to=/community/search"
              color="primary"
              text
            >
              {{ $t('actions.signIn') }}
            </v-btn>
          </div>
        </v-sheet>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mdiAccountMultiple, mdiClose, mdiMapSearch } from '@mdi/js'
import SuggestedFriends from '~/components/users/SuggestedFriends'
import UserSmallCard from '~/components/users/UserSmallCard'
import { oblykPartner } from '~/assets/oblyk-icons'
import CommonApi from '~/services/oblyk-api/CommonApi'
import UserApi from '~/services/oblyk-api/UserApi'
import User from '~/models/User'

export default {
  name: 'CommunitySearchOverview',
  components: {
    UserSmallCard,
    SuggestedFriends
  },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null,
      userApi: null,
      climbersCount: '...',

      oblykPartner,
      mdiClose,
      mdiMapSearch,
      mdiAccountMultiple
    }
  },

  computed: {
    haveQuery () {
      return !(this.query === null || this.query === '')
    }
  },

  mounted () {
    this.giveFocus()
    this.getClimbersCount()
  },

  methods: {
    giveFocus () {
      this.$refs.searchField.focus()
    },

    getClimbersCount () {
      new CommonApi(this.$axios, this.$auth)
        .microStats(['climbers_count'])
        .then((resp) => {
          this.climbersCount = resp.data.climbers_count
        })
    },

    search () {
      if (this.previousQuery === this.query || !this.$auth.loggedIn) {
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
      this.userApi = this.userApi || new UserApi(this.$axios, this.$auth)

      this.userApi.cancelSearch()
      this.userApi
        .search(this.query)
        .then((resp) => {
          this.searchResults = []
          for (const user of resp.data) {
            this.searchResults.push(new User({ attributes: user }))
          }
          this.previousQuery = this.query
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'user')
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
.community-search-overview-container-header {
  position: sticky;
  top: 0;
  z-index: 1;
  .community-gradient-search-overview-box {
    max-width: 600px;
    height: 45px;
    .query-search-input {
      all: unset;
      caret-color: #007b8b;
      border-radius: 0 !important;
      margin-left: 5px;
    }
    .search-icon {
      width: 28px;
      text-align: center;
    }
  }
}
.community-search-container {
  padding-top: 0;
  max-width: 600px;
}
@media only screen and (max-width: 959px) {
  .community-search-overview-container-header {
    top: 64px;
  }
}
</style>
