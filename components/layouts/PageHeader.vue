<template>
  <v-sheet
    class="page-header-sheet border-bottom"
    :class="`page-header-sheet-${oblykEnvironnement}`"
  >
    <div
      class="page-header-container"
      :class="fluidContainer ? '--fluid-container' : null"
    >
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
      <div class="page-header-sheet-content flex-grow-1">
        <div
          class="page-header-sheet-title"
          :class="links ? '--with-links' : null"
        >
          <slot
            v-if="hasTitleSlot"
            name="title"
          />
          <h1
            v-else
            class="text-h6 font-weight-black text-no-wrap"
          >
            {{ title }}
          </h1>
        </div>
        <v-tabs
          v-if="links"
          class="page-header-sheet-tabs"
          height="30"
          :color="iconColors[oblykEnvironnement] || 'primary'"
        >
          <v-tab
            v-for="(link, linkIndex) in links"
            :key="`link-index-${linkIndex}`"
            :to="link.to"
            :exact-path="link.exactPath === null || link.exactPath === undefined ? true : link.exactPath"
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
              dark
              :color="iconColors[oblykEnvironnement] || 'primary'"
              class="ml-1 px-2 font-weight-bold"
            >
              {{ link.badge }}
            </v-chip>
          </v-tab>
        </v-tabs>
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
    },
    fluidContainer: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      URLBackTo: null,
      iconColors: {
        community: '#007b8b',
        outdoor: '#31994e',
        indoor: '#743ad5'
      },

      mdiArrowLeft
    }
  },

  computed: {
    hasTitleSlot () {
      return !!this.$slots.title
    },

    oblykEnvironnement () {
      return this.$store.getters['oblykEnvironment/getOblykEnvironnement'] || 'no-environnement'
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
