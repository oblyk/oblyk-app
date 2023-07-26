<template>
  <div class="full-height overflow-auto">
    <v-img
      :key="url"
      :src="url"
      :lazy-src="thumbnailUrl"
      width="100%"
      :height="fullWidth ? 'auto' : (photo.description ? 'calc(100% - 35px)' : '100%')"
      :contain="!fullWidth"
      :style="`cursor: ${fullWidth ? 'zoom-out' : 'zoom-in'}`"
      @click="fullWidth = !fullWidth"
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
    <div
      v-if="photo.description"
      class="text-center pa-1"
    >
      {{ photo.description }}
    </div>
  </div>
</template>

<script>
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
      fullWidth: false
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
      this.fullWidth = false
    }
  }
}
</script>
