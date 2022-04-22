<template>
  <div>
    <v-row>
      <v-col cols="12" md="9">
        <v-text-field
          v-model="query"
          class="mt-2"
          :label="$t('components.country.france.searchPlaceHolder')"
          outlined
          :loading="searching"
          clearable
          hide-details
          @keyup="search()"
          @click:clear="onSearch = false"
        />
      </v-col>
      <v-col cols="12" md="3" align-self="center" class="pt-5">
        <v-btn
          :loading="loadingLocalization"
          block
          large
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
      v-for="town in searchResults"
      :key="`result-${town.id}`"
    >
      <town-card
        :town="town"
        class="mt-2"
      />
    </div>
  </div>
</template>

<script>
import { mdiTarget } from '@mdi/js'
import TownCard from '~/components/towns/TownCard'
import TownApi from '~/services/oblyk-api/TownApi'
import Town from '~/models/Town'

export default {
  name: 'TownSearchForm',
  components: { TownCard },
  props: {
    linkableResult: {
      type: Boolean,
      required: false,
      default: true
    },

    callback: {
      type: Function,
      required: false,
      default: null
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
      townApi: null,
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
      this.townApi = this.townApi || new TownApi(this.$axios, this.$auth)

      this.townApi.cancelSearch()
      this.townApi
        .search(this.query)
        .then((resp) => {
          this.searchResults = []
          for (const town of resp.data) {
            this.searchResults.push(new Town({ attributes: town }))
          }
          this.previousQuery = this.query
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'town')
          }
        })
        .finally(() => {
          this.searching = false
        })
    },

    aroundMe () {
      this.localizationError = false
      this.loadingLocalization = true
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            new TownApi(this.$axios, this.$auth)
              .geoSearch(
                position.coords.latitude,
                position.coords.longitude
              )
              .then((resp) => {
                this.onSearch = true
                for (const town of resp.data) {
                  this.searchResults.push(new Town({ attributes: town }))
                }
              })
              .catch(() => {
                this.localizationError = true
              })
              .finally(() => {
                this.loadingLocalization = false
              })
          },
          () => {
            this.localizationError = true
            this.loadingLocalization = false
          }
        )
      } else {
        this.loadingLocalization = false
      }
    }
  }
}
</script>
