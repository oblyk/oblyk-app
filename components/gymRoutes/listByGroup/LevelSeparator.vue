<template>
  <div class="rounded-pill py-1 pl-2 back-app-color mb-1 d-flex align-center">
    <v-icon
      v-for="(color, colorIndex) in colors"
      :key="`color-index-${colorIndex}`"
      left
      :color="color"
    >
      {{ mdiBookmark }}
    </v-icon>
  </div>
</template>

<script>
import { mdiBookmark } from '@mdi/js'
import { GradeMixin } from '~/mixins/GradeMixin'

export default {
  name: 'LevelSeparator',
  mixins: [GradeMixin],
  props: {
    colors: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      mdiBookmark
    }
  }
}
</script>
