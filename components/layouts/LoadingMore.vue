<template>
  <div
    v-if="!noMoreData"
    :class="skeletonType !== 'photos' ? 'text-center' : 'text-left'"
  >
    <v-btn
      v-if="!loadingMore"
      v-intersect="onBottomPage"
      text
    >
      <span v-if="skeletonType !== 'photos'">
        {{ $t('components.loadMore.loadMore') }}
      </span>
    </v-btn>
    <div v-if="skeletonType === 'photos'" class="mt-3">
      <v-skeleton-loader
        v-for="index in 3"
        :key="`photo-list-${index}`"
        type="image"
        class="d-inline-block mr-4"
        height="180"
        width="180"
      />
    </div>
    <div v-else>
      <v-skeleton-loader
        v-if="loadingMore"
        class="mx-auto"
        :type="skeletonType"
      />
    </div>
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
