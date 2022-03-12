<template>
  <v-tabs show-arrows >
    <v-tab :to="`${user.currentUserPath}/settings/general`">
      <v-icon left small>
        {{ mdiInformation }}
      </v-icon>
      {{ $t('components.user.settingTabs.general') }}
    </v-tab>
    <v-tab :to="`${user.currentUserPath}/settings/partner`">
      <v-icon left small>
        {{ mdiMapMarkerRadius }}
      </v-icon>
      {{ $t('components.user.settingTabs.partner') }}
    </v-tab>
    <v-tab :to="`${user.currentUserPath}/settings/privacy`">
      <v-icon left small>
        {{ mdiLock }}
      </v-icon>
      {{ $t('components.user.settingTabs.privacy') }}
    </v-tab>
    <v-tab :to="`${user.currentUserPath}/settings/notifications`">
      <v-icon left small>
        {{ mdiBell }}
      </v-icon>
      {{ $t('components.user.settingTabs.notifications') }}
    </v-tab>
    <v-tab :to="`${user.currentUserPath}/settings/others`">
      <v-icon left small>
        {{ mdiCog }}
      </v-icon>
      {{ $t('components.user.settingTabs.others') }}
    </v-tab>
  </v-tabs>
</template>

<script>
import { mdiInformation, mdiMapMarkerRadius, mdiLock, mdiBell, mdiCog } from '@mdi/js'

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
      mdiCog
    }
  }
}
</script>
