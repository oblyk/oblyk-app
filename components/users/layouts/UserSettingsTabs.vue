<template>
  <v-tabs
    class="border-bottom"
    show-arrows
  >
    <!-- General information -->
    <v-tab :to="`${user.currentUserPath}/settings/general`">
      <v-icon left small>
        {{ mdiInformation }}
      </v-icon>
      {{ $t('components.user.settingTabs.general') }}
    </v-tab>

    <!-- Partner settings -->
    <v-tab
      v-if="!$auth.user.minor"
      :to="`${user.currentUserPath}/settings/partner`"
    >
      <v-icon left small>
        {{ mdiMapMarkerRadius }}
      </v-icon>
      {{ $t('components.user.settingTabs.partner') }}
    </v-tab>

    <!-- Email & password -->
    <v-tab :to="`${user.currentUserPath}/settings/connection`">
      <v-icon left small>
        {{ mdiLastpass }}
      </v-icon>
      {{ $t('components.user.settingTabs.connection') }}
    </v-tab>

    <!-- Privacy parameters -->
    <v-tab :to="`${user.currentUserPath}/settings/privacy`">
      <v-icon left small>
        {{ mdiLock }}
      </v-icon>
      {{ $t('components.user.settingTabs.privacy') }}
    </v-tab>

    <!-- Notification -->
    <v-tab :to="`${user.currentUserPath}/settings/notifications`">
      <v-icon left small>
        {{ mdiBell }}
      </v-icon>
      {{ $t('components.user.settingTabs.notifications') }}
    </v-tab>

    <!-- Delete account, export ascents, etc. -->
    <v-tab :to="`${user.currentUserPath}/settings/others`">
      <v-icon left small>
        {{ mdiCog }}
      </v-icon>
      {{ $t('components.user.settingTabs.others') }}
    </v-tab>
  </v-tabs>
</template>

<script>
import {
  mdiInformation,
  mdiLastpass,
  mdiMapMarkerRadius,
  mdiLock,
  mdiBell,
  mdiCog
} from '@mdi/js'

export default {
  name: 'UserSettingsTabs',
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiInformation,
      mdiMapMarkerRadius,
      mdiLock,
      mdiBell,
      mdiCog,
      mdiLastpass
    }
  }
}
</script>
