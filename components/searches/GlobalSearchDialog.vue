<template>
  <v-dialog
    v-model="globalSearchDialog"
    fullscreen
  >
    <template #activator="{ on, attrs }">
      <!-- Icon activator -->
      <v-btn
        v-if="activator === 'icon'"
        icon
        aria-label="open oblyk search"
        :title="$t('components.layout.appDrawer.toolBar.search')"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon color="black">
          {{ mdiMagnify }}
        </v-icon>
      </v-btn>

      <!-- Text field activator -->
      <v-text-field
        v-if="activator === 'text-field'"
        v-model="query"
        class="search-on-oblyk-field"
        filled
        rounded
        hide-details
        dense
        :placeholder="$t('components.layout.appBar.searchPlaceHolder')"
        :append-icon="mdiMagnify"
        @keydown="searchingByEnter"
        @click:append="globalSearchDialog = true"
      />
    </template>
    <global-search
      v-if="globalSearchDialog === true"
      :global-search-dialog="globalSearchDialog"
      :close-dialogue="closeDialogue"
      :external-query="query"
    />
  </v-dialog>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
const GlobalSearch = () => import('~/components/searches/GlobalSearch')

export default {
  name: 'GlobalSearchDialog',
  components: {
    GlobalSearch
  },

  props: {
    activator: {
      type: String,
      default: 'icon'
    }
  },

  data () {
    return {
      globalSearchDialog: false,
      query: null,
      mdiMagnify
    }
  },

  methods: {
    closeDialogue () {
      this.globalSearchDialog = false
    },

    searchingByEnter (event) {
      if (event.key === 'Enter') {
        this.globalSearchDialog = true
        event.target.blur()
      }
    }
  }
}
</script>

<style lang="scss">
.search-on-oblyk-field {
  .v-input__control {
    border: solid 2px;
  }
  .v-input__slot {
    padding-right: 15px !important;
    .v-input__icon--append {
      color: black !important;
    }
  }
}
.theme--light {
  .search-on-oblyk-field {
    .v-input__control {
      border-color: rgb(215, 215, 225);
      .v-icon__svg {
        fill: black;
      }
    }
    .v-input__slot {
      background-color: rgb(240, 240, 245) !important;
    }
  }
}
.theme--dark {
  .search-on-oblyk-field {
    .v-input__control {
      border-color: rgb(50, 50, 50);
    }
  }
}
</style>
