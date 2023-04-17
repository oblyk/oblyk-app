export const LoadingMoreHelpers = {
  data () {
    return {
      noMoreDataToLoad: false,
      loadingMoreData: true,
      page: 1
    }
  },

  methods: {
    resetLoadMorePageNumber (page = 1) {
      this.page = page
      this.noMoreDataToLoad = false
    },

    moreIsBeingLoaded () {
      this.loadingMoreData = true
    },

    successLoadingMore (resp) {
      this.page++
      if (resp.data.length < 25) { this.noMoreDataToLoad = true }
    },

    failureToLoadingMore () {
      this.noMoreDataToLoad = true
    },

    finallyMoreIsLoaded () {
      this.loadingMoreData = false
    }
  }
}
