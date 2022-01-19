<template>
  <div>
    <v-text-field
      v-model="query"
      :label="$t('components.crag.searchCrag')"
      outlined
      :loading="searching"
      clearable
      hide-details
      @keyup="search()"
      @click:clear="onSearch = false"
    />

    <div
      v-for="crag in searchResults"
      :key="crag.id"
    >
      <div @click="callback ? callback(crag) : null">
        <crag-small-card
          :crag="crag"
          :linkable="linkableResult"
          class="mt-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CragApi from '~/services/oblyk-api/CragApi'
import Crag from '@/models/Crag'
import CragSmallCard from '@/components/crags/CragSmallCard'

export default {
  name: 'CragSearchForm',
  components: { CragSmallCard },
  props: {
    linkableResult: {
      type: Boolean,
      required: false,
      default: true
    },

    callback: {
      type: Function,
      required: false
    }
  },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null,
      cragApi: null
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
      this.cragApi = this.cragApi || new CragApi(this.$axios, this.$auth)

      this.cragApi.cancelSearch()
      this.cragApi
        .search(this.query)
        .then((resp) => {
          this.searchResults = []
          for (const crag of resp.data) {
            this.searchResults.push(new Crag({ attributes: crag }))
          }
          this.previousQuery = this.query
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'crag')
          }
        })
        .finally(() => {
          this.searching = false
        })
    }
  }
}
</script>
