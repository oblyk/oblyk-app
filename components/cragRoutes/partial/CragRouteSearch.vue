<template>
  <v-text-field
    ref="cragRouteSearchInput"
    v-model="query"
    outlined
    :prepend-inner-icon="icon"
    :loading="searching"
    :hide-details="hideDetail"
    :tabindex="tabindex"
    clearable
    :label="$t(labelKey)"
    @keyup="search"
    @click:clear="clearSearch"
  />
</template>

<script>
import { mdiMagnify } from '@mdi/js'
import CragRoute from '@/models/CragRoute'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'

export default {
  name: 'CragRouteSearch',
  props: {
    value: String,
    crag: Object,
    cragSector: Object,
    labelKey: {
      type: String,
      default: 'components.cragRoute.searchRoute'
    },
    icon: {
      type: String,
      default: mdiMagnify
    },
    hideDetail: {
      type: Boolean,
      default: true
    },
    eventTrigger: {
      type: String,
      default: 'searchCragRoutesResults'
    },
    tabindex: Number
  },

  data () {
    return {
      mdiMagnify,
      query: this.value,
      searching: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null
    }
  },

  watch: {
    value () {
      this.query = this.value
    },

    query () {
      if (this.query === '' || this.query === null) {
        this.clearSearch()
      }
    }
  },

  mounted () {
    this.$root.$on('clearRouteSearchGiveFocus', () => {
      this.giveFocus()
    })
  },

  beforeDestroy () {
    this.$root.$off('clearRouteSearchGiveFocus')
  },

  methods: {
    giveFocus () {
      this.$refs.cragRouteSearchInput.focus()
    },

    clearSearch () {
      this.$root.$emit('reloadCragRouteList')
    },

    search () {
      this.$emit('input', this.query)

      if (this.previousQuery === this.query || this.query === '' || this.query === null) {
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
      let promise
      if (this.cragSector) {
        promise = new CragRouteApi(this.$axios, this.$auth).searchInSector(this.cragSector.id, this.query)
      } else {
        promise = new CragRouteApi(this.$axios, this.$auth).searchInCrag(this.crag.id, this.query)
      }

      promise
        .then((resp) => {
          this.searchResults = []
          for (const cragRoute of resp.data) {
            this.searchResults.push(new CragRoute({ attributes: cragRoute }))
          }
          this.previousQuery = this.query
          this.$root.$emit(this.eventTrigger, this.searchResults)
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'cragRoute')
          }
        })
        .finally(() => {
          this.searching = false
        })
    }
  }
}
</script>
