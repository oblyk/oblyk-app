<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width" align-self="center">
        <h2 class="mb-4">
          {{ $t('components.session.newPassword') }}
        </h2>

        <new-password-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewPasswordForm from '@/components/sessions/NewPasswordForm'

export default {
  name: 'NewPasswordView',
  components: { NewPasswordForm }
}
</script>
