<template>
  <v-overlay
    ref="down-to-close-overlay"
    :value="overlay"
    :z-index="9"
    class="down-to-close-overlay align-start"
    @click="close"
  >
    <v-fab-transition>
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
            class="text-center"
          >
            <v-progress-circular indeterminate />
          </div>
          <slot v-else />
        </v-sheet>
      </div>
    </v-fab-transition>
  </v-overlay>
</template>

<script>
export default {
  name: 'DownToCloseDialog',
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
    value () {
      if (this.value) {
        this.animation('open')
      } else {
        this.animation('close')
      }
    }
  },

  beforeDestroy () {
    this.dialog = false
    this.overlay = false
    this.loading = true
    this.readyToClose = false
  },

  methods: {
    animation (type, callback = null, timeToClose = 100) {
      if (
        (type === 'close' && !this.dialog) ||
        (type === 'open' && this.dialog)
      ) {
        return false
      }

      if (type === 'open') {
        this.loading = true
        this.overlay = true
        this.dialog = true
        if (!this.waitSignal) {
          this.ready(callback)
        }
      } else {
        this.$refs['down-to-close-overlay'].$el.querySelector('.v-overlay__content').scrollTo({ behavior: 'smooth', top: 0 })
        setTimeout(() => {
          this.dialog = false
          this.overlay = false
          this.readyToClose = false
          if (typeof callback === 'function') { callback() }
        }, timeToClose)
      }
    },

    signal (callback = null) {
      setTimeout(() => {
        this.loading = false
        this.scroll(this.$refs['down-to-close-overlay'].$el)
        if (typeof callback === 'function') { callback() }
      }, 300)
    },

    topClose () {
      if (this.readyToClose) {
        this.animation('close', this.emitClose, 10)
      }
    },

    close () {
      this.animation('close', this.emitClose)
    },

    emitClose () {
      if (this.closeCallback) { this.closeCallback() }
      this.$emit('input', false)
    },

    scroll (el) {
      setTimeout(() => {
        el.querySelector('.v-overlay__content').scrollTo({ behavior: 'smooth', top: window.visualViewport.height - 150 })
        setTimeout(() => {
          this.readyToClose = true
        }, 100)
      }, 10)
    }
  }
}
</script>

<style lang="scss">
.down-to-close-overlay {
  .v-overlay__content {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    overscroll-behavior: none;
    .down-to-close-sheet {
      box-shadow: 0 7px 60px 20px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);
      margin-top: calc(100vh - 77px);
      width: 100vw;
    }
  }
  .down-to-close-intersect {
    height: 5px;
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
