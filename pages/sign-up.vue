<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col class="global-form-width" align-self="center">
          <v-alert
            v-if="climbersMap"
            color="info"
            class="mb-10"
          >
            {{ $t('components.session.createAccountForWatch', { name: partnerName }) }}
          </v-alert>

          <h1 class="mb-4 text-h5 font-weight-bold">
            {{ $t('actions.signUp') }}
          </h1>

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
import { SessionConcern } from '@/concerns/SessionConcern'
import SignUpForm from '@/components/sessions/SignUpForm'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter, SignUpForm },
  mixins: [SessionConcern],

  data () {
    return {
      redirectTo: null,
      climbersMap: false
    }
  },

  head () {
    return {
      title: this.$t('meta.session.signUpTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.session.signUpDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.session.signUpTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.session.signUpDescription') },
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/sign-in` }
      ]
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
    this.climbersMap = urlParams.get('partner_request') === 'true'
  }
}
</script>
