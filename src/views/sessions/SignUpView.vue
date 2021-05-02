<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col class="global-form-width" align-self="center">
          <h2 class="mb-4">
            {{ $t('actions.signUp') }}
          </h2>

          <sign-up-form
            v-if="!isLoggedIn"
            :redirect-to="redirectTo"
          />

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
    <app-footer />
  </div>
</template>

<script>
import SignUpForm from '@/components/sessions/SignUpForm'
import { SessionConcern } from '@/concerns/SessionConcern'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  name: 'SignUpView',
  mixins: [SessionConcern],
  components: { AppFooter, SignUpForm },

  data () {
    return {
      redirectTo: null
    }
  },

  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  }
}
</script>
