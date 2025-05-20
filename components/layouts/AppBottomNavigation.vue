<template>
  <v-bottom-navigation
    app
    grow
    :height="isIOS ? 70 : 60"
    class="oblyk-bottom-navigation border-top"
    :class="isIOS ? 'ios-bottom-navigation' : 'android-bottom-navigation'"
  >
    <v-btn
      aria-label="Open menu"
      value="menu"
      @click="inverseDrawer"
    >
      <span>
        {{ $t('components.layout.appBar.menu') }}
      </span>
      <v-icon>
        {{ mdiMenu }}
      </v-icon>
    </v-btn>
    <v-menu
      v-if="$auth.loggedIn"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          aria-label="Add cross"
          :title="$t('components.layout.appBar.addCross')"
          v-bind="attrs"
          v-on="on"
        >
          <span>
            {{ $t('actions.add') }}
          </span>
          <v-icon>
            {{ mdiPlusBoxOutline }}
          </v-icon>
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

    <v-btn
      :to="$auth.loggedIn ? '/home' : '/'"
      value="home"
      @click="clicHome"
    >
      <span>
        {{ $t('components.layout.appDrawer.home') }}
      </span>
      <svg
        class="oblyk-bottom-navigation-logo"
        :class="oblykLogoClass"
        viewBox="0 0 10.054166 10.054166"
        height="27"
        width="35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 4.4298964,4.2390636 6.4357839,2.2107931 9.2531882,5.0281974 6.4357839,7.8456017 2.6792446,4.0890607 0.80097503,5.9673303 2.6792446,7.8456017 3.7579684,6.7668798"
          style="fill:none;fill-rule:evenodd;stroke-width:0.8;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1"
        />
      </svg>
    </v-btn>
    <global-search-dialog icon-with-title />
    <v-menu
      :position-y="0"
      bottom
      left
    >
      <template #activator="{ on, attrs }">
        <v-btn
          aria-label="open user menu"
          :class="haveNewNotification ? 'new-notification-badge' : ''"
          :title="$t('components.layout.appDrawer.toolBar.account')"
          v-bind="attrs"
          v-on="on"
        >
          <span>
            {{ $t('components.layout.appBar.account') }}
          </span>
          <v-icon>
            {{ mdiAccountCircleOutline }}
          </v-icon>
        </v-btn>
      </template>

      <v-list>
        <lazy-hydrate on-interaction>
          <app-bar-profil />
        </lazy-hydrate>
        <login-logout-btn />
      </v-list>
    </v-menu>
  </v-bottom-navigation>
</template>

<script>
import {
  mdiMenu,
  mdiPlusBoxOutline,
  mdiAccountCircleOutline,
  mdiTerrain,
  mdiOfficeBuildingMarker
} from '@mdi/js'
import LazyHydrate from 'vue-lazy-hydration'
import GlobalSearchDialog from '~/components/searches/GlobalSearchDialog'
import AppBarProfil from '~/components/layouts/partial/AppBarProfile'
import LoginLogoutBtn from '~/components/layouts/partial/LoginLogoutBtn'

export default {
  name: 'AppBottomNavigation',
  components: {
    LoginLogoutBtn,
    AppBarProfil,
    GlobalSearchDialog,
    LazyHydrate
  },
  props: {
    inverseDrawer: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      oblykLogoClass: 'oblyk-white',

      mdiMenu,
      mdiPlusBoxOutline,
      mdiAccountCircleOutline,
      mdiTerrain,
      mdiOfficeBuildingMarker
    }
  },

  computed: {
    haveNewNotification () {
      return this.$store.state.notification.newNotification
    },

    isIOS () {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    }
  },

  methods: {
    clicHome () {
      this.oblykLogoClass = 'oblyk-green'
      setTimeout(() => { this.oblykLogoClass = 'stroke-transition oblyk-white' }, 100)
      setTimeout(() => { this.oblykLogoClass = 'oblyk-white' }, 2100)
    }
  }
}
</script>

<style lang="scss">
.theme--dark.oblyk-bottom-navigation {
  background-color: #121212;
  border-top-color: rgb(30,30,30);
  .oblyk-bottom-navigation-logo {
    &.oblyk-white path {
      stroke: white;
    }
  }
  .v-btn {
    span {
      color: white !important;
    }
  }
}
.theme--light.oblyk-bottom-navigation {
  .oblyk-bottom-navigation-logo {
    &.oblyk-white path {
      stroke: black;
    }
  }
  .v-btn {
    span {
      color: black !important;
    }
  }
}
.android-bottom-navigation {
  .v-btn {
    padding-bottom: 5px !important;
  }
}
.ios-bottom-navigation {
  .v-btn {
    padding-bottom: 15px !important;
  }
}
.oblyk-bottom-navigation {
  box-shadow: none !important;
  z-index: 5 !important;
  .v-btn {
    min-width: 65px !important;
    span {
      color: white !important;
    }
  }
  .oblyk-bottom-navigation-logo {
    margin-top: -3px;
    path {
      will-change: stroke;
    }
    &.oblyk-green path {
      stroke: #31994e
    }
    &.stroke-transition path {
      transition: stroke 2s;
    }
  }
  .new-notification-badge {
    .v-icon {
      &:before {
        content: '';
        height: 9px;
        width: 9px;
        background-color: rgb(244, 67, 54);
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
