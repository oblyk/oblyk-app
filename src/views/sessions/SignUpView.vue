<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col class="global-form-width" align-self="center">

          <v-alert
            color="info"
            class="mb-10"
            v-if="climbersMap"
          >
            {{ $t('components.session.createAccountForWatch', { name: partnerName }) }}
          </v-alert>

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
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'SignUpView',
  mixins: [SessionConcern],
  components: { AppFooter, SignUpForm },

  metaInfo () {
    return {
      title: this.$t('meta.session.signUpTitle'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.session.signUpDescription') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.session.signUpTitle') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.session.signUpDescription') },
        { vmid: 'og-url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/sign-in` }
      ]
    }
  },

  data () {
    return {
      redirectTo: null,
      climbersMap: false
    }
  },

  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
    this.climbersMap = urlParams.get('partner_request') === 'true'
    this.partnerName = urlParams.get('partner_name')
  }
}
</script>
