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
    getFunction: {
      type: Function,
      required: true
    },
    noMoreData: {
      type: Boolean,
      default: false,
      required: true
    },
    loadingMore: {
      type: Boolean,
      default: true,
      required: true
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

    loadMore: function () {
      this.getFunction()
    }
  }
}
</script>
