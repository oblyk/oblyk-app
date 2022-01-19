<template>
  <div
    v-if="!noMoreData"
    class="text-center"
  >
    <v-btn
      v-if="!loadingMore"
      v-intersect="onBottomPage"
      text
    >
      {{ $t('components.loadMore.loadMore') }}
    </v-btn>
    <v-skeleton-loader
      v-if="loadingMore"
      class="mx-auto"
      :type="skeletonType"
    />
  </div>
</template>

<script>
export default {
  name: 'LoadingMore',
  props: {
    getFunction: {
      type: Function,
      required: true
    },
    noMoreData: {
      type: Boolean,
      default: false
    },
    loadingMore: {
      type: Boolean,
      default: true
    },
    skeletonType: {
      type: String,
      default: 'list-item-avatar-two-line'
    }
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

    loadMore () {
      this.getFunction()
    }
  }
}
</script>
