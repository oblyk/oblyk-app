<template>
  <div
    class="text-center"
    v-if="!noMoreData"
  >
    <v-btn
      v-if="!loadingMore"
      v-intersect="onBottomPage"
      text
    >
      {{ $t('components.loadMore.loadMore') }}
    </v-btn>
    <spinner v-if="loadingMore" :full-height="false" />
  </div>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'LoadingMore',
  components: { Spinner },
  props: {
    initialPage: {
      type: Number,
      default: 1
    },
    getFunction: Function
  },

  data () {
    return {
      noMoreData: false,
      page: this.initialPage,
      loadingMore: false
    }
  },

  mounted () {
    this.$root.$on('moreIsLoaded', () => {
      this.loadingMore = false
    })
    this.$root.$on('nothingMoreToLoad', () => {
      this.noMoreData = true
    })
  },

  methods: {
    onBottomPage (entries, observer) {
      if (
        entries[0].isIntersecting &&
        !this.noMoreData &&
        !this.loadingMore
      ) {
        this.loadMore()
      }
    },

    loadMore: function () {
      this.loadingMore = true
      this.page++
      this.getFunction(this.page)
    }
  }
}
</script>
