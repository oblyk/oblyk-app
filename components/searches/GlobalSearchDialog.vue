<template>
  <v-dialog
    v-model="globalSearchDialog"
    fullscreen
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        aria-label="open oblyk search"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>
    </template>
    <global-search
      v-if="globalSearchDialog === true"
      :global-search-dialog="globalSearchDialog"
      :close-dialogue="closeDialogue"
    />
  </v-dialog>
</template>

<script>
const GlobalSearch = () => import('~/components/searches/GlobalSearch')

export default {
  name: 'GlobalSearchDialog',
  components: {
    GlobalSearch
  },

  data () {
    return {
      globalSearchDialog: false
    }
  },

  methods: {
    closeDialogue () {
      this.globalSearchDialog = false
    }
  }
}
</script>
