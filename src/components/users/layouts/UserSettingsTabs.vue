<template>
  <v-tabs
    height="30"
    show-arrows
  >
    <v-tab :to="user.currentUserPath('settings/general')">
      <v-icon left small>mdi-information</v-icon>
      {{ $t('components.user.settingTabs.general') }}
    </v-tab>
    <v-tab :to="user.currentUserPath('settings/partner')">
      <v-icon left small>mdi-map-marker-radius</v-icon>
      {{ $t('components.user.settingTabs.partner') }}
    </v-tab>
    <v-tab :to="user.currentUserPath('settings/privacy')">
      <v-icon left small>mdi-lock</v-icon>
      {{ $t('components.user.settingTabs.privacy') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'UserSettingsTabs',
  props: {
    user: Object
  }
}
</script>
