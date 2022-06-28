<template>
  <div>
    <v-app-bar
      app
      class="custom-app-bar"
    >
      <v-app-bar-nav-icon
        aria-label="open app drawer"
        @click.stop="drawer = !drawer"
      />

      <v-spacer />

      <!-- Search on Oblyk -->
      <client-only>
        <global-search-dialog activator="text-field" />
      </client-only>

      <v-spacer />

      <!-- Add cross -->
      <client-only>
        <v-btn
          v-if="$auth.loggedIn"
          icon
          aria-label="Add cross"
          class="add-cross-btn"
          :title="$t('components.layout.appBar.addCross')"
          to="/a/ascents/new"
        >
          <v-icon>
            {{ mdiPlusBoxOutline }}
          </v-icon>
        </v-btn>
      </client-only>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      class="oblyk-navigation-drawer"
      app
      dark
      width="300"
    >
      <lazy-hydrate
        never
        :trigger-hydration="drawer"
      >
        <app-drawer />
      </lazy-hydrate>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mdiPlusBoxOutline } from '@mdi/js'
import LazyHydrate from 'vue-lazy-hydration'
import GlobalSearchDialog from '~/components/searches/GlobalSearchDialog'
const AppDrawer = () => import('@/components/layouts/AppDrawer')

export default {
  name: 'AppBar',
  components: {
    GlobalSearchDialog,
    AppDrawer,
    LazyHydrate
  },

  data () {
    return {
      drawer: false,

      mdiPlusBoxOutline
    }
  }
}
</script>

<style lang="scss">
.v-application {
  &.theme--dark {
    .custom-app-bar {
      background-color: #121212 !important;
      border-bottom-style: solid;
      border-color: rgb(50,50,50);
      border-width: 1px;
    }
  }
  &.theme--light {
    .custom-app-bar {
      background-color: white !important;
      border-bottom-style: solid;
      border-color: rgba(0, 0, 0, 0.12);
      border-width: 1px;
      .add-cross-btn {
        color: black;
      }
      .v-app-bar__nav-icon {
        color: black;
      }
    }
  }
}

.custom-app-bar {
  box-shadow: none !important;
  z-index: 6 !important;
}

.oblyk-app-title {
  font-size: 1.2rem !important;
}

.oblyk-navigation-drawer {
  .v-navigation-drawer__content {
    background-color: #121212;
  }
}
</style>
