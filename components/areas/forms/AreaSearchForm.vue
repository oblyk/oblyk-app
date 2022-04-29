<template>
  <div>
    <v-text-field
      v-model="query"
      :label="$t('components.area.searchArea')"
      outlined
      :loading="searching"
      clearable
      hide-details
      @keyup="search()"
      @click:clear="onSearch = false"
    />

    <div
      v-for="area in searchResults"
      :key="area.id"
    >
      <div @click="callback ? callback(area) : null">
        <area-small-card
          :area="area"
          :linkable="linkableResult"
          class="mt-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AreaApi from '~/services/oblyk-api/AreaApi'
import Area from '@/models/Area'
import AreaSmallCard from '@/components/areas/AreaSmallCard'

export default {
  name: 'AreaSearchForm',
  components: { AreaSmallCard },
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
      onSearch: false,
      searchResults: [],
      previousQuery: null,
      areaApi: null
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
      this.areaApi = this.areaApi || new AreaApi(this.$axios, this.$auth)

      this.areaApi.cancelSearch()
      this.areaApi
        .search(this.query)
        .then((resp) => {
          this.searchResults = []
          for (const area of resp.data) {
            this.searchResults.push(new Area({ attributes: area }))
          }
          this.previousQuery = this.query
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'area')
          }
        })
        .finally(() => {
          this.searching = false
        })
    }
  }
}
</script>
