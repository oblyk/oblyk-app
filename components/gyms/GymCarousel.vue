<template>
  <div class="gym-carousel">
    <div
      ref="gymsList"
      class="gym-carousel-list"
    >
      <div
        v-for="(gym, gymIndex) in gyms"
        :key="`gym-index-${gymIndex}`"
        class="gym-carousel-item"
      >
        <nuxt-link :to="gymPath(gym)">
          <v-img
            class="rounded"
            :src="imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
            height="170"
            :alt="gym.name"
          >
            <div class="gym-carousel-item-description d-flex">
              <v-avatar>
                <v-img :src="imageVariant(gym.attachments.logo, { fit: 'scale-down', width: 100, height: 100 })" />
              </v-avatar>
              <div class="flex-grow-1 gym-carousel-item-description-text">
                <p class="mb-n1 text-truncate font-weight-bold">
                  {{ gym.name }}
                </p>
                <p class="mb-0 text-truncate">
                  <v-btn
                    v-if="gym.have_guide_book"
                    x-small
                    elevation="0"
                    class="px-1 font-weight-medium"
                    color="primary"
                  >
                    <v-icon
                      x-small
                      class="mr-1"
                    >
                      {{ mdiSourceBranch }}
                    </v-icon>
                    TOPO
                  </v-btn>
                  <small>
                    {{ gym.city }}
                  </small>
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
        class="gym-carousel-item"
        height="170"
        min-width="250"
      />
    </div>
    <v-btn
      class="gym-carousel-scroll-to-right"
      fab
      small
      color="primary"
      elevation="0"
      :loading="loading"
      @click="scrollLastObjectsList('gymsList')"
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

export default {
  name: 'GymCarousel',
  mixins: [ImageVariantHelpers],
  props: {
    gyms: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    goToSpaces: {
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
      const scrollOffset = this.$refs.gymsList.offsetWidth > 520 ? 520 : 260
      this.$refs.gymsList.scrollTo({
        left: this.$refs.gymsList.scrollLeft + scrollOffset,
        behavior: 'smooth'
      })
    },

    gymPath (gym) {
      if (this.goToSpaces) {
        return gym.guideBookPath
      } else {
        return gym.path
      }
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
.gym-carousel {
  position: relative;
  .gym-carousel-list {
    position: relative;
    white-space: nowrap;
    overflow-x: auto;
  }
  .gym-carousel-item {
    position: relative;
    vertical-align: top;
    display: inline-block;
    width: 250px;
    margin-right: 10px;
    .gym-carousel-item-description {
      position: absolute;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
      height: 100px;
      padding: 46px 5px 5px;
      bottom: 0;
      width: 100%;
      color: white;
      text-decoration: none;
      .gym-carousel-item-description-text {
        padding-left: 5px;
        max-width: calc(100% - 50px);
      }
    }
  }
  .gym-carousel-scroll-to-right {
    position: absolute;
    right: -20px;
    top: 64px
  }
}

@media screen and (max-width: 960px) {
  .gym-carousel .gym-carousel-scroll-to-right {
    right: -8px;
  }
}
</style>
