<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width" align-self="center">
        <h2 class="mb-4">
          {{ $t('actions.signUp') }}
        </h2>

        <sign-up-form v-if="!isLoggedIn"/>

        <p v-if="isLoggedIn">
          <v-alert
            outlined
            type="info"
          >
            {{ $t('components.session.alreadyConnected') }}
          </v-alert>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignUpForm from '@/components/sessions/SignUpForm'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'SignUpView',
  mixins: [SessionConcern],
  components: { SignUpForm }
}
</script>
