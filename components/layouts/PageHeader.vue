<template>
  <v-sheet class="page-header-sheet border-bottom">
    <div class="page-header-sheet-back-btn">
      <v-btn
        exact-path
        icon
        large
        :to="URLBackTo ? URLBackTo : backTo"
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
      <v-tabs
        v-if="links"
        class="page-header-sheet-tabs"
        height="30"
      >
        <v-tab
          v-for="(link, linkIndex) in links"
          :key="`link-index-${linkIndex}`"
          :to="link.to"
          exact-path
        >
          <v-icon
            v-if="link.icon"
            left
            small
          >
            {{ link.icon }}
          </v-icon>
          {{ link.title }}
          <v-chip
            v-if="link.badge"
            small
            color="primary"
            class="ml-1 px-1"
          >
            {{ link.badge }}
          </v-chip>
        </v-tab>
      </v-tabs>
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
      URLBackTo: null,

      mdiArrowLeft
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.URLBackTo = urlParams.get('back_to')
    if (this.URLBackTo) {
      const url = new URL(window.location.href)
      url.searchParams.delete('back_to')
      window.history.replaceState({}, '', url.toString())
    }
  }
}
</script>
