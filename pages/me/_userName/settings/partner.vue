<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.user.partnerSearch') }}
        </h2>
        <enable-localization :user="user" />
        <partner-form :user="user" submit-methode="put" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PartnerForm from '@/components/users/forms/PartnerForm'
import EnableLocalization from '@/components/users/notificationCard/EnableLocalization'

export default {
  name: 'CurrentUserPartnerSettingsView',
  components: { EnableLocalization, PartnerForm },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  head () {
    return {
      title: this.$t('meta.currentUser.partnerSetting')
    }
  }
}
</script>
