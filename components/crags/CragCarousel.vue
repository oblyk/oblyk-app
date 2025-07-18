<template>
  <div class="crag-carousel">
    <div
      ref="cragsList"
      class="crag-carousel-list"
    >
      <div
        v-for="(crag, cragIndex) in crags"
        :key="`crag-index-${cragIndex}`"
        class="crag-carousel-item"
      >
        <nuxt-link :to="crag.path">
          <v-img
            class="rounded"
            :src="imageVariant(crag.attachments.cover, { fit: 'scale-down', width: 720, height: 720 })"
            height="170"
            dark
            :alt="crag.name"
          >
            <div class="crag-carousel-item-description">
              <div class="crag-carousel-item-description-text">
                <p class="mb-n1 text-truncate font-weight-bold">
                  {{ crag.name }}
                </p>
                <p class="mb-0 text-truncate text-subtitle-2">
                  <crag-climb-icons
                    :crag="crag"
                    class="vertical-align-text-bottom"
                  />
                  | {{ crag.city }} - <cite>{{ crag.country }}</cite>
                </p>
              </div>
            </div>
          </v-img>
        </nuxt-link>
      </div>
      <v-skeleton-loader
        v-if="!noMoreData"
        v-intersect="lastItem"
        type="image"
        class="crag-carousel-item"
        height="170"
        min-width="250"
      />
    </div>
    <v-btn
      class="crag-carousel-scroll-to-right"
      fab
      small
      color="primary"
      elevation="0"
      :loading="loading"
      @click="scrollLastObjectsList('cragsList')"
    >
      <v-icon>
        {{ mdiArrowRight }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mdiArrowRight, mdiSourceBranch } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import CragClimbIcons from '@/components/crags/CragClimbIcons.vue'

export default {
  name: 'CragCarousel',
  components: { CragClimbIcons },
  mixins: [ImageVariantHelpers],
  props: {
    crags: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
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
    }
  },

  data () {
    return {
      mdiArrowRight,
      mdiSourceBranch
    }
  },

  methods: {
    scrollLastObjectsList () {
      const scrollOffset = this.$refs.cragsList.offsetWidth > 520 ? 520 : 260
      this.$refs.cragsList.scrollTo({
        left: this.$refs.cragsList.scrollLeft + scrollOffset,
        behavior: 'smooth'
      })
    },

    lastItem (entries, observer) {
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

<style lang="scss" scoped>
.crag-carousel {
  position: relative;
  .crag-carousel-list {
    position: relative;
    white-space: nowrap;
    overflow-x: auto;
  }
  .crag-carousel-item {
    position: relative;
    vertical-align: top;
    display: inline-block;
    width: 250px;
    margin-right: 10px;
    .crag-carousel-item-description {
      position: absolute;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
      height: 92px;
      padding: 46px 5px 5px;
      bottom: 0;
      width: 100%;
      color: white;
      text-decoration: none;
    }
  }
  .crag-carousel-scroll-to-right {
    position: absolute;
    right: -20px;
    top: 64px
  }
}

@media screen and (max-width: 960px) {
  .crag-carousel .crag-carousel-scroll-to-right {
    right: -8px;
  }
}
</style>
