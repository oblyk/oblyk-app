export const LoadingMoreHelpers = {
  data () {
    return {
      noMoreDataToLoad: false,
      loadingMoreData: true,
      page: 1
    }
  },

  methods: {
    resetLoadMorePageNumber: function (page = 1) {
      this.page = page
    },

    moreIsBeingLoaded: function () {
      this.loadingMoreData = true
    },

    successLoadingMore: function (resp) {
      this.page++
      if (resp.data.length < 25) this.noMoreDataToLoad = true
    },

    failureToLoadingMore: function () {
      this.noMoreDataToLoad = true
    },

    finallyMoreIsLoaded: function () {
      this.loadingMoreData = false
    }
  }
}
