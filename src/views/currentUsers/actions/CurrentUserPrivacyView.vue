<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.user.privacyParameters') }}
        </h2>
        <user-privacy-form :user="user" submit-methode="put" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserPrivacyForm from '@/components/users/forms/PrivacyForm'

export default {
  name: 'CurrentUserPrivacyView',
  components: { UserPrivacyForm },
  props: {
    user: Object
  }
}
</script>
