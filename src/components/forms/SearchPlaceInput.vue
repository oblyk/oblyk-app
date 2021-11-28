<template>
  <div>
    <v-text-field
      prepend-inner-icon="mdi-map-search"
      :label="$t('components.searchPlace.placeholder')"
      :loading="searching"
      filled
      rounded
      dense
      hide-details
      @keyup="search()"
      @click:clear="onSearch = false"
      v-model="query"
    />

    <v-list
      class="rounded-xl mt-3"
      rounded
      v-if="results.length > 0 && resultVisible"
    >
      <v-list-item-group>
        <v-list-item
          dense
          v-for="(result, index) in results"
          :key="`results-${index}`"
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
import OsmNominatim from '@/services/osm-nominatim'

export default {
  name: 'SearchPlaceLocalisation',

  props: {
    value: Object
  },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      resultVisible: true,
      previousQuery: null,
      results: []
    }
  },

  methods: {
    search: function () {
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
        OsmNominatim
          .search(this.query)
          .then(resp => {
            this.resultVisible = true
            this.previousQuery = this.query
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
      }, 200)
    },

    emitObject: function (result) {
      this.resultVisible = false
      this.$emit('input', result)
    }
  }
}
</script>
