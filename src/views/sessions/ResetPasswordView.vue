<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width" align-self="center">
        <h2 class="mb-4">
          {{ $t('components.session.forgottenPassword') }}
        </h2>
        <reset-password-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ResetPasswordForm from '@/components/sessions/ResetPasswordForm'

export default {
  name: 'ResetPasswordView',
  components: { ResetPasswordForm }
}
</script>
