<template>
  <v-tabs
    height="30"
    show-arrows
  >
    <v-tab :to="user.mePath('settings/general')">
      {{ $t('components.user.settingTabs.general') }}
    </v-tab>
    <v-tab :to="user.mePath('settings/partner')">
      {{ $t('components.user.settingTabs.partner') }}
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
