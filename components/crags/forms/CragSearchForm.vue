<template>
  <div>
    <v-row>
      <v-col>
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
      v-for="crag in searchResults"
      :key="crag.id"
    >
      <div @click="callback ? callback(crag) : null">
        <crag-small-card
          :crag="crag"
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
import CragApi from '~/services/oblyk-api/CragApi'
import Crag from '@/models/Crag'
import CragSmallCard from '@/components/crags/CragSmallCard'

export default {
  name: 'CragSearchForm',
  components: { CragSmallCard },
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
      cragApi: null,

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
          if (this.usedCallback !== null) {
            this.usedCallback(this.query)
          }
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'crag')
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
            new CragApi(this.$axios, this.$auth)
              .cragsAround(
                position.coords.latitude,
                position.coords.longitude
              )
              .then((resp) => {
                this.onSearch = true
                for (const crag of resp.data) {
                  this.searchResults.push(new Crag({ attributes: crag }))
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
    }
  }
}
</script>
