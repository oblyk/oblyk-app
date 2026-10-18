<template>
  <v-sheet
    rounded="sm"
    class="border px-2 py-1 d-flex align-center"
    style="border-color: #7C4DFF; border-width: 2px; background-color: rgba(124, 77, 255, 0.1)"
  >
    <v-progress-circular
      v-if="inProgress"
      size="15"
      width="3"
      color="#743ad5"
      class="mr-2"
      indeterminate
    />
    <div class="text--disabled mx-1">
      {{ $t(`components.sprayWallPipeline.status.${sprayWallPipeline.status}`) }}
    </div>
    <div
      v-if="inProgress"
      class="ml-auto text--disabled"
    >
      {{ elapsedSeconds }} s
    </div>
  </v-sheet>
</template>

<script>
import { mdiCreation } from '@mdi/js'

export default {
  name: 'SprayWallPipelineCard',
  props: {
    sprayWall: {
      type: Object,
      required: true
    },
    sprayWallPipeline: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      timer: null,
      now: Date.now(),

      mdiCreation
    }
  },

  computed: {
    startTime () {
      return new Date(this.sprayWallPipeline.start_at).getTime()
    },

    elapsedSeconds () {
      return Math.max(0, Math.floor((this.now - this.startTime) / 1000))
    },

    inProgress () {
      return !['completed', 'failed'].includes(this.sprayWallPipeline.status)
    }
  },

  mounted () {
    this.timer = setInterval(() => {
      this.now = Date.now()
    }, 1000)
  },

  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
