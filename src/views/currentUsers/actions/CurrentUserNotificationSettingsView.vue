<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.user.notificationSetting') }}
        </h2>
        <newsletter-subscribe-switch-form :user="user" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewsletterSubscribeSwitchForm from '@/components/users/forms/NewsletterSubscribeSwitchForm'
export default {
  name: 'CurrentUserNotificationSettingsView',
  components: { NewsletterSubscribeSwitchForm },
  props: {
    user: Object
  }
}
</script>
