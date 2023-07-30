<template>
  <div class="full-height overflow-hidden">
    <div
      id="panzoom"
      :style="photo.description ? 'height: calc(100% - 35px)' : 'height: 100%'"
    >
      <v-img
        :key="url"
        :src="url"
        :lazy-src="thumbnailUrl"
        width="100%"
        height="100%"
        contain
      >
        <template #placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            />
          </v-row>
        </template>
      </v-img>
    </div>
    <div
      v-if="photo.description"
      class="text-center pa-1"
    >
      {{ photo.description }}
    </div>
  </div>
</template>

<script>
import * as panzoom from 'panzoom'

export default {
  name: 'PhotoViewerVImg',

  props: {
    photo: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      panzoom: null,
      initialTransform: null
    }
  },

  computed: {
    url () {
      return this.photo.pictureUrl
    },

    thumbnailUrl () {
      return this.photo.thumbnailUrl
    }
  },

  watch: {
    photo () {
      if (this.panzoom && this.photo) {
        this.panzoom.zoomAbs(0, 0, 1)
        this.panzoom.moveTo(0, 0)
      }
    }
  },

  mounted () {
    const image = document.querySelector('#panzoom')
    this.panzoom = panzoom(image, {
      minZoom: 1
    })
    this.panzoom.on('transform', this.recenterImage)
    this.initialTransform = { ...this.panzoom.getTransform() }
  },

  methods: {
    recenterImage () {
      const transform = { ...this.panzoom.getTransform() }
      if (transform.scale === 1) {
        this.panzoom.moveTo(0, 0)
      }
    }
  }
}
</script>
