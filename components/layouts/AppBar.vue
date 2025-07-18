<template>
  <v-app-bar
    app
    class="custom-app-bar"
  >
    <v-app-bar-nav-icon
      aria-label="open app drawer"
      @click.stop="inverseDrawer"
    />

    <v-spacer />

    <!-- Search on Oblyk -->
    <client-only>
      <div style="width: 400px">
        <community-global-search
          v-if="oblykEnvironnement === 'community'"
          :short-cut-butons="false"
          mode="dialog"
        />
        <indoor-global-search
          v-else-if="oblykEnvironnement === 'indoor'"
          mode="dialog"
        />
        <outdoor-global-search
          v-else
          mode="dialog"
        />
      </div>

      <!-- Add cross -->
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            v-if="$auth.loggedIn"
            aria-label="Add cross"
            class="add-cross-btn ml-3"
            rounded
            color="rgba(0,0,0,0)"
            elevation="0"
            :title="$t('components.layout.appBar.addCross')"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon
              left
              size="33"
            >
              {{ mdiPlusBoxOutline }}
            </v-icon>
            {{ $t('actions.addAAscents') }} ...
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/ascents/outdoor/new">
            <v-list-item-icon>
              <v-icon>
                {{ mdiTerrain }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title
              v-html="$t('components.layout.appDrawer.user.ascents.addOutdoorAscents')"
            />
          </v-list-item>
          <v-list-item to="/ascents/indoor/new">
            <v-list-item-icon>
              <v-icon>
                {{ mdiOfficeBuildingMarker }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title
              v-html="$t('components.layout.appDrawer.user.ascents.addIndoorAscents')"
            />
          </v-list-item>
        </v-list>
      </v-menu>
    </client-only>
    <v-spacer />
  </v-app-bar>
</template>

<script>
import { mdiPlusBoxOutline, mdiTerrain, mdiOfficeBuildingMarker } from '@mdi/js'
import { oblykPartner, oblykIndoor } from '~/assets/oblyk-icons'
const OutdoorGlobalSearch = () => import('~/components/outdoor/OutdoorGlobalSearch')
const IndoorGlobalSearch = () => import('~/components/indoor/IndoorGlobalSearch')
const CommunityGlobalSearch = () => import('~/components/community/CommunityGlobalSearch')

export default {
  name: 'AppBar',
  components: {
    OutdoorGlobalSearch,
    IndoorGlobalSearch,
    CommunityGlobalSearch
  },

  props: {
    inverseDrawer: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      searchIcons: {
        indoor: oblykIndoor,
        community: oblykPartner,
        outdoor: mdiTerrain
      },

      mdiPlusBoxOutline,
      mdiTerrain,
      mdiOfficeBuildingMarker
    }
  },

  computed: {
    oblykEnvironnement () {
      return this.$store.getters['oblykEnvironment/getOblykEnvironnement']
    }
  }
}
</script>

<style lang="scss">
.v-application {
  .add-cross-btn {
    padding-left: 7px !important;
    .v-icon {
      border-radius: 50%;
      padding: 4px;
      color: white;
    }
  }
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
        .v-icon {
          background-color: black;
        }
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
</style>
