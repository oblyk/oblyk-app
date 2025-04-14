<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          ref="GymSearchForm"
          v-model="query"
          :label="$t(label)"
          outlined
          :loading="searching"
          clearable
          hide-details
          @keyup="search()"
          @click:clear="onSearch = false"
          @focus="scrollToElement"
        />
      </v-col>
      <v-col
        v-if="aroundMeBtn"
        cols="12"
        md="6"
        lg="3"
      >
        <v-btn
          :loading="loadingLocalization"
          block
          x-large
          outlined
          color="primary"
          @click="aroundMe"
        >
          <v-icon left>
            {{ mdiTarget }}
          </v-icon>
          {{ $t('actions.aroundMe') }}
        </v-btn>
      </v-col>
    </v-row>

    <div
      v-for="gym in searchResults"
      :key="gym.id"
    >
      <div @click="callback ? callback(gym) : null">
        <gym-small-card
          :gym="gym"
          :linkable="linkableResult"
          class="mt-3"
          :small="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mdiTarget } from '@mdi/js'
import GymApi from '~/services/oblyk-api/GymApi'
import Gym from '@/models/Gym'
import GymSmallCard from '@/components/gyms/GymSmallCard'

export default {
  name: 'GymSearchForm',
  components: { GymSmallCard },
  props: {
    linkableResult: {
      type: Boolean,
      default: true
    },
    callback: {
      type: Function,
      default: null
    },
    usedCallback: {
      type: Function,
      default: null
    },
    aroundMeBtn: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'components.gym.searchGym'
    }
  },

  data () {
    return {
      query: null,
      searching: false,
      loadingLocalization: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null,
      gymApi: null,

      mdiTarget
    }
  },

  methods: {
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
          if (this.usedCallback !== null) {
            this.usedCallback(this.query)
          }
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'gym')
          }
        })
        .finally(() => {
          this.searching = false
        })
    },

    aroundMe () {
      this.loadingLocalization = true
      this.searchResults = []
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            new GymApi(this.$axios, this.$auth)
              .gymsAround(
                position.coords.latitude,
                position.coords.longitude
              )
              .then((resp) => {
                this.onSearch = true
                for (const gym of resp.data) {
                  this.searchResults.push(new Gym({ attributes: gym }))
                }
              })
              .finally(() => {
                this.loadingLocalization = false
              })
          },
          () => {
            this.loadingLocalization = false
          }
        )
      } else {
        this.loadingLocalization = false
      }
    },

    scrollToElement () {
      if (window.innerWidth < 600) {
        const element = this.$refs.GymSearchForm.$el
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>
