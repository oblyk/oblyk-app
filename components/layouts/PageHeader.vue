<template>
  <v-sheet class="page-header-sheet">
    <div class="page-header-sheet-back-btn">
      <v-btn
        exact-path
        icon
        large
        :to="backTo"
      >
        <v-icon color="primary">
          {{ mdiArrowLeft }}
        </v-icon>
      </v-btn>
    </div>
    <div class="page-header-sheet-content">
      <div
        class="page-header-sheet-title"
        :class="links ? '--with-links' : null"
      >
        <h1 class="text-h6 text-truncate">
          {{ title }}
        </h1>
      </div>
      <div
        v-if="links"
        class="page-header-sheet-btn-list"
      >
        <v-btn
          v-for="(link, linkIndex) in links"
          :key="`link-index-${linkIndex}`"
          :to="link.to"
          exact-path
          text
          small
        >
          <v-icon left small>
            {{ link.icon }}
          </v-icon>
          {{ link.title }}
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    backTo: {
      type: String,
      required: true
    },
    links: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      mdiArrowLeft
    }
  }
}
</script>
