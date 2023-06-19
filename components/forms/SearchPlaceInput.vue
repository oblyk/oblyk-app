<template>
  <div>
    <v-text-field
      ref="searchPlaceInput"
      v-model="query"
      :prepend-inner-icon="mdiMapSearchOutline"
      :label="$t('components.searchPlace.placeholder')"
      :loading="searching"
      :filled="!soloStyle"
      :solo="soloStyle"
      :rounded="!soloStyle"
      dense
      hide-details
      clearable
      @keyup="search()"
      @click:clear="clearSearch()"
      @focus="scrollToElement"
    />

    <v-list
      v-if="results.length > 0 && resultVisible"
      class="mt-3"
      rounded
    >
      <v-list-item-group>
        <v-list-item
          v-for="(result, index) in results"
          :key="`results-${index}`"
          dense
          @click="emitObject(result)"
        >
          <v-list-item-content>
            <v-list-item-title class="text-truncate">
              <strong>{{ result.city }}</strong> -
              <span v-if="result.postCode">{{ result.postCode }},</span> {{ result.regions }} {{ result.country }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mdiMapSearchOutline } from '@mdi/js'
import OsmNominatim from '~/services/osm-nominatim'

export default {
  name: 'SearchPlaceInput',

  props: {
    value: {
      type: Object,
      default: null
    },

    soloStyle: {
      type: Boolean,
      default: false
    },

    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      resultVisible: true,
      previousQuery: null,
      results: [],
      osmApi: null,

      mdiMapSearchOutline
    }
  },

  methods: {
    search () {
      const query = this.query?.trim()

      if (query === '' || query === null) {
        this.clearSearch()
        return
      }
      if (this.previousQuery === query) { return }

      this.osmApi = new OsmNominatim(this.$axios) || this.osmApi
      // Cancel old request
      this.osmApi.cancelSearch()

      this.previousQuery = query
      this.onSearch = true
      this.searching = true

      if (this.searchTimeOut) {
        clearTimeout(this.searchTimeOut)
        this.searchTimeOut = null
      }

      this.searchTimeOut = setTimeout(() => {
        this.osmApi
          .search(query)
          .then((resp) => {
            this.resultVisible = true
            this.results = []
            for (const result of resp.data) {
              this.results.push({
                lat: result.lat,
                lng: result.lon,
                city: result.address.city || result.address.landuse || result.address.village || result.address.town || result.address.municipality || result.address.county || result.address.country,
                regions: result.address.county || result.address.state || result.address.region,
                postCode: result.address.postcode,
                country: result.address.country
              })
            }
          })
          .finally(() => {
            this.searching = false
          })
      }, 500)
    },

    clearSearch () {
      this.results = []
      clearTimeout(this.searchTimeOut)
      this.searching = false
    },

    emitObject (result) {
      this.previousQuery = result.city
      this.query = result.city
      this.resultVisible = false
      if (this.callback) {
        this.callback(result)
      }
      this.$emit('input', result)
    },

    scrollToElement () {
      if (window.innerWidth < 600) {
        const element = this.$refs.searchPlaceInput.$el
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>
