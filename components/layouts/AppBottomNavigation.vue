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
      :class="haveNewNotification ? 'new-notification-badge' : null"
      @click="inverseDrawer"
    >
      <span>
        {{ $t('components.layout.appBar.menu') }}
      </span>
      <v-icon>
        {{ mdiMenu }}
      </v-icon>
    </v-btn>
    <v-btn
      :to="$route.path === '/indoor' ? '/indoor/search' : '/indoor'"
      value="indoor"
      class="indoor-btn"
    >
      <span>
        Indoor
      </span>
      <v-icon :color="oblykEnvironnement === 'indoor' ? '#743ad5' : 'primary'">
        {{ oblykIndoor }}
      </v-icon>
    </v-btn>

    <v-btn
      :to="$route.path === '/outdoor' ? '/outdoor/search/crags' : '/outdoor'"
      value="outdoor"
      class="outdoor-btn"
    >
      <span>
        Outdoor
      </span>
      <v-icon :color="oblykEnvironnement === 'outdoor' ? '#31994e' : 'primary'">
        {{ mdiTerrain }}
      </v-icon>
    </v-btn>

    <v-btn
      :to="$route.path === '/community' ? '/community/search' : '/community'"
      value="community"
      class="community-btn"
    >
      <span>
        Commu'
      </span>
      <v-icon :color="oblykEnvironnement === 'community' ? '#007b8b' : 'primary'">
        {{ oblykPartner }}
      </v-icon>
    </v-btn>

    <v-btn
      :to="$auth.loggedIn ? '/home' : '/'"
      value="home"
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
  </v-bottom-navigation>
</template>

<script>
import { mdiMenu, mdiTerrain, mdiCircle } from '@mdi/js'
import { oblykIndoor, oblykPartner } from '~/assets/oblyk-icons'

export default {
  name: 'AppBottomNavigation',
  props: {
    inverseDrawer: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      oblykLogoClass: 'oblyk-white',

      mdiCircle,
      mdiMenu,
      mdiTerrain,
      oblykIndoor,
      oblykPartner
    }
  },

  computed: {
    oblykEnvironnement () {
      return this.$store.getters['oblykEnvironment/getOblykEnvironnement']
    },

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
    span:not(.v-icon) {
      color: white !important;
    }
  }
  .new-notification-badge {
    .v-icon {
      &:before {
        border-color: #121212;
      }
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
    span:not(.v-icon) {
      color: black !important;
    }
  }
  .new-notification-badge {
    .v-icon {
      &:before {
        border-color: #ffffff;
      }
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
    span:not(.v-icon) {
      color: white !important;
    }
  }
  .oblyk-bottom-navigation-logo {
    margin-top: -3px;
  }
  .new-notification-badge {
    .v-icon {
      &:before {
        content: '';
        height: 16px;
        width: 16px;
        background-color: rgb(244, 67, 54);
        border-style: solid;
        border-width: 3px;
        border-radius: 50%;
        position: absolute;
        top: -3px;
        right: -6px;
        animation: notification-pulse-animation 3s infinite;
      }
    }
  }
}
@keyframes notification-pulse-animation {
  0% {
    transform: scale(100%);
    background-color: rgb(244, 67, 54);
  }
  25% {
    transform: scale(120%);
    background-color: rgb(255, 99, 89);
  }
  100% {
    transform: scale(100%);
    background-color: rgb(244, 67, 54);
  }
}
</style>
