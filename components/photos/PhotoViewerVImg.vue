<template>
  <div class="full-height">
    <v-img
      width="100%"
      height="100%"
      contain
      :src="url"
      :lazy-src="thumbnailUrl"
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

  computed: {
    url () {
      return this.photo.pictureUrl
    },

    thumbnailUrl () {
      return this.photo.thumbnailUrl
    }
  }
}
</script>
