<template>
  <div>
    <v-text-field
      :label="$t(labelKey)"
      outlined
      :loading="searching"
      clearable
      hide-details
      @keyup="search()"
      @click:clear="onSearch = false"
      v-model="query"
    />

    <div
      v-for="guideBookPaper in searchResults"
      :key="guideBookPaper.id"
    >
      <div @click="callback ? callback(guideBookPaper) : null">
        <guide-book-paper-small-card
          :guideBookPaper="guideBookPaper"
          :linkable="linkableResult"
          class="mt-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import GuideBookPaper from '@/models/GuideBookPaper'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'

export default {
  name: 'GuideBookPaperSearchForm',
  components: { GuideBookPaperSmallCard },
  props: {
    linkableResult: {
      type: Boolean,
      required: false,
      default: true
    },

    callback: {
      type: Function,
      required: false
    },

    labelKey: {
      type: String,
      default: 'components.guideBookPaper.searchGuideBookPaper'
    }
  },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null
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
      GuideBookPaperApi.cancelSearch()

      GuideBookPaperApi
        .search(this.query)
        .then(resp => {
          this.searchResults = []
          for (const guideBookPaper of resp.data) {
            this.searchResults.push(new GuideBookPaper(guideBookPaper))
          }
          this.previousQuery = this.query
        })
        .catch(err => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'guideBookPaper')
          }
        })
        .finally(() => {
          this.searching = false
        })
    }
  }
}
</script>
