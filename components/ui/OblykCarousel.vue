<template>
  <div
    ref="oblykCarousel"
    class="oblyk-carousel"
    @resize="initCarousel"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      class="oblyk-carousel-items"
      @scroll="onScrollEnd"
    >
      <slot />
    </div>
    <div v-if="slidesCount > 1">
      <v-slide-x-transition>
        <v-btn
          v-if="currentSlide > 1 && arrow"
          class="oblyk-carousel-btn --btn-prev"
          dark
          icon
          @click="prevSlide"
        >
          <v-icon>
            {{ mdiArrowLeft }}
          </v-icon>
        </v-btn>
      </v-slide-x-transition>
      <v-slide-x-reverse-transition>
        <v-btn
          v-if="currentSlide < slidesCount && arrow"
          class="oblyk-carousel-btn --btn-next"
          dark
          icon
          @click="nextSlide"
        >
          <v-icon>
            {{ mdiArrowRight }}
          </v-icon>
        </v-btn>
      </v-slide-x-reverse-transition>
      <v-chip
        small
        class="oblyk-carousel-slide-count px-2 font-weight-medium"
        dark
        color="rgba(0, 0, 0, 0.5)"
      >
        {{ currentSlide }} / {{ slidesCount }}
      </v-chip>
    </div>
    <div
      v-if="showDots && slidesCount > 1"
      class="text-center oblyk-carousel-dots"
    >
      <template v-for="dotIndex in slidesCount">
        <v-icon
          v-if="currentSlide + 4 > dotIndex && currentSlide - 4 < dotIndex"
          :key="`dot-index-${dotIndex}`"
          :class="dotIndex === currentSlide ? '--active-bot' : '--inactive-bot'"
          :color="dotIndex === currentSlide ? 'blue' : 'primary'"
          :size="currentSlide + 3 > dotIndex && currentSlide - 3 < dotIndex ? 8 : 4"
        >
          {{ mdiCircle }}
        </v-icon>
      </template>
    </div>
  </div>
</template>

<script>
import { mdiArrowLeft, mdiArrowRight, mdiCircle } from '@mdi/js'
export default {
  name: 'OblykCarousel',
  props: {
    showArrow: {
      type: Boolean,
      default: true
    },
    showArrowsOnHover: {
      type: Boolean,
      default: false
    },
    showDots: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      arrow: this.showArrowsOnHover ? false : this.showArrow,
      slidesCount: 0,
      currentSlide: 1,
      itemWidth: 0,
      allItemsWidth: 0,
      itemsElements: null,

      mdiArrowLeft,
      mdiArrowRight,
      mdiCircle
    }
  },

  mounted () {
    this.initCarousel()
  },

  methods: {
    initCarousel () {
      this.slidesCount = this.$refs.oblykCarousel.querySelectorAll('.oblyk-carousel-item').length
      this.itemWidth = this.$refs.oblykCarousel.querySelector('.oblyk-carousel-items').offsetWidth
      this.allItemsWidth = this.slidesCount * this.itemWidth
      this.itemsElements = this.$refs.oblykCarousel.querySelector('.oblyk-carousel-items')
      this.currentSlide = Math.round(this.itemsElements.scrollLeft / this.itemWidth) + 1
    },

    onScrollEnd () {
      this.currentSlide = Math.round(this.itemsElements.scrollLeft / this.itemWidth) + 1
    },

    nextSlide () {
      this.itemsElements.scrollTo({ left: this.currentSlide * this.itemWidth, behavior: 'smooth' })
    },

    prevSlide () {
      this.itemsElements.scrollTo({ left: (this.currentSlide - 2) * this.itemWidth, behavior: 'smooth' })
    },

    onMouseEnter () {
      if (this.showArrowsOnHover) {
        this.arrow = true
      }
    },
    onMouseLeave () {
      if (this.showArrowsOnHover) {
        this.arrow = false
      }
      if (this.arrow) {
        this.arrow = true
      }
    }
  }
}
</script>

<style lang="scss">
.oblyk-carousel {
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
  .oblyk-carousel-dots {
    .v-icon {
      &.--inactive-bot {
        opacity: 0.3;
      }
      margin-left: 2px;
      margin-right: 2px;
    }
  }
  .oblyk-carousel-btn {
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: calc(50% - 18px);
    &.--btn-prev {
      left: 5px;
    }
    &.--btn-next {
      right: 5px;
    }
  }
  .oblyk-carousel-slide-count {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .oblyk-carousel-items {
    border-radius: 10px;
    scroll-snap-type: x mandatory;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    max-width: 100%;
    .oblyk-carousel-item {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      scroll-snap-align: start;
    }
  }
}
</style>
