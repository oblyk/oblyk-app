<template>
  <v-overlay
    ref="down-to-close-overlay"
    :value="overlay"
    :z-index="9"
    class="down-to-close-overlay align-start"
    @click="close"
  >
    <div>
      <div
        v-intersect="topClose"
        class="down-to-close-intersect"
      />
      <v-sheet
        v-if="dialog"
        :light="!$vuetify.theme.dark"
        rounded
        class="pb-4 rounded-bl-0 rounded-br-0 mx-auto down-to-close-sheet"
        :class="paddingX"
        :style="`max-width: ${width}px;`"
        @click.stop
      >
        <div class="close-indicator text-center">
          <div />
        </div>
        <div
          v-if="loading"
          class="text-center pt-2 pb-4"
        >
          <animate-oblyk-logo
            animate
            :color="environmentColor()"
          />
        </div>
        <slot v-else />
      </v-sheet>
    </div>
  </v-overlay>
</template>

<script>
// Offset (in px) left at the top when the sheet is open
import AnimateOblykLogo from '~/components/layouts/AnimateOblykLogo.vue'

const TOP_GAP = 50
// Distance (in px) traveled by the sheet when it opens
const SLIDE = 150
// The distance (in px) by which the sheet moves back down before disappearing
const NUDGE = 20
// Color by environment
const ENVIRONMENT_COLORS = {
  community: '#007b8b',
  outdoor: '#31994e',
  indoor: '#743ad5'
}

export default {
  name: 'DownToCloseDialog',
  components: { AnimateOblykLogo },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 600
    },
    waitSignal: {
      type: Boolean,
      default: false
    },
    paddingX: {
      type: String,
      default: 'px-4'
    },
    closeCallback: {
      type: Function,
      default: null
    },
    environment: {
      type: String,
      default: 'outdoor'
    }
  },

  data () {
    return {
      dialog: false,
      overlay: false,
      loading: true,
      readyToClose: false
    }
  },

  watch: {
    value (val) {
      if (val) {
        this.open()
      } else {
        this.hide(false)
      }
    }
  },

  created () {
    this.runId = 0
    this.pendingSignal = false
  },

  beforeDestroy () {
    this.runId++
  },

  methods: {
    environmentColor () {
      return ENVIRONMENT_COLORS[this.environment]
    },

    getScroller () {
      const overlay = this.$refs['down-to-close-overlay']
      return overlay && overlay.$el
        ? overlay.$el.querySelector('.v-overlay__content')
        : null
    },

    nextFrame () {
      return new Promise(resolve => requestAnimationFrame(() => resolve()))
    },

    waitScrollEnd (scroller, max = 600) {
      return new Promise((resolve) => {
        let idle = null
        let cap = null
        const done = () => {
          clearTimeout(idle)
          clearTimeout(cap)
          scroller.removeEventListener('scroll', onScroll)
          resolve()
        }
        const onScroll = () => {
          clearTimeout(idle)
          idle = setTimeout(done, 80)
        }
        scroller.addEventListener('scroll', onScroll, { passive: true })
        cap = setTimeout(done, max)
        idle = setTimeout(done, 120)
      })
    },

    smoothScrollTo (scroller, top, max) {
      scroller.scrollTo({ top, behavior: 'smooth' })
      return this.waitScrollEnd(scroller, max)
    },

    reveal (scroller) {
      const max = scroller.scrollHeight - scroller.clientHeight
      const final = Math.max(0, Math.min(scroller.clientHeight - TOP_GAP, max))
      scroller.scrollTo({ top: Math.max(0, final - SLIDE), behavior: 'auto' })
      return this.smoothScrollTo(scroller, final)
    },

    async open () {
      const id = ++this.runId
      this.readyToClose = false
      this.loading = true
      this.overlay = true
      this.dialog = true

      await this.$nextTick()
      if (id !== this.runId) { return }

      if (!this.waitSignal || this.pendingSignal) {
        await this.signal()
        return
      }

      const scroller = this.getScroller()
      if (scroller) { this.reveal(scroller) }
    },

    async signal (callback = null) {
      if (!this.dialog) {
        this.pendingSignal = true
        return
      }
      this.pendingSignal = false
      const id = this.runId

      this.loading = false
      await this.$nextTick()

      if (id !== this.runId) { return }
      await this.nextFrame()

      if (id !== this.runId) { return }

      const scroller = this.getScroller()
      if (!scroller) { return }

      await this.reveal(scroller)
      if (id !== this.runId) { return }

      this.readyToClose = true
      if (typeof callback === 'function') { callback() }
    },

    close () {
      this.hide(true)
    },

    async hide (emit) {
      if (!this.dialog) { return }
      const id = ++this.runId
      this.readyToClose = false
      this.pendingSignal = false

      const scroller = this.getScroller()
      if (scroller && scroller.scrollTop > 1) {
        await this.smoothScrollTo(scroller, Math.max(0, scroller.scrollTop - NUDGE), 180)
        if (id !== this.runId) { return }
      }

      this.dialog = false
      this.overlay = false
      if (emit) { this.emitClose() }
    },

    topClose (entries, observer, isIntersecting) {
      const visible = entries && entries.length
        ? entries[entries.length - 1].isIntersecting
        : isIntersecting
      if (visible && this.readyToClose) {
        this.hide(true)
      }
    },

    emitClose () {
      if (this.closeCallback) { this.closeCallback() }
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss">
.down-to-close-overlay {
  .v-overlay__content {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    overflow-y: auto;
    overscroll-behavior: none;
    .down-to-close-sheet {
      box-shadow: 0 7px 60px 20px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);
      margin-top: 100vh;
      margin-top: 100dvh;
      width: 100vw;
    }
  }
  .down-to-close-intersect {
    height: 1px;
    width: 100%;
  }
  .close-indicator {
    div {
      display: inline-block;
      height: 5px;
      width: 50px;
      border-radius: 5px;
      background-color: rgb(200, 200, 200);
    }
  }
}
.theme--dark {
  .down-to-close-overlay {
    .close-indicator {
      div {
        background-color: rgb(100, 100, 100)
      }
    }
  }
}
</style>
