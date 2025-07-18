<template>
  <div>
    <p class="mb-1 font-weight-medium">
      <v-icon
        left
        color="primary"
      >
        {{ mdiTrendingUp }}
      </v-icon>
      Topo populaire
    </p>
    <guide-book-paper-small-card
      v-for="(guideBookPaper, guideBookPaperIndex) in guideBookPapers"
      :key="`guideBookPaper-index-${guideBookPaperIndex}`"
      small
      :guide-book-paper="guideBookPaper"
      class="mb-1"
    />
    <loading-more
      :get-function="getGuideBooks"
      :loading-more="loadingMoreData"
      :no-more-data="noMoreDataToLoad"
    />
  </div>
</template>

<script>
import { mdiTrendingUp } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import LoadingMore from '~/components/layouts/LoadingMore'
import GuideBookPaperSmallCard from '~/components/guideBookPapers/GuideBookPaperSmallCard'
import GuideBookPaperApi from '~/services/oblyk-api/GuideBookPaperApi'
import GuideBookPaper from '~/models/GuideBookPaper'

export default {
  name: 'GuideBookPapersByPopularity',
  components: { GuideBookPaperSmallCard, LoadingMore },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      loading: true,
      guideBookPapers: [],

      mdiTrendingUp
    }
  },

  mounted () {
    this.getGuideBooks()
  },

  methods: {
    getGuideBooks () {
      new GuideBookPaperApi(this.$axios, this.$auth)
        .all(null, this.page, null, { order: 'popularity' })
        .then((resp) => {
          for (const guideBook of resp.data) {
            this.guideBookPapers.push(new GuideBookPaper({ attributes: guideBook }))
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loading = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
