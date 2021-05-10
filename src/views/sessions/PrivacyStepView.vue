<template>
  <div>
    <v-container class="common-page-container">
      <v-row
        justify="center"
        v-if="currentUser"
      >
        <v-col class="global-form-width" align-self="center">
          <h2 class="mb-4">
            {{ $t('components.session.privacyStep.title') }}
          </h2>

          <p class="mt-5 mb-10">
            {{ $t('components.session.privacyStep.explain') }}
          </p>

          <user-privacy-form
            :user="overRideUser()"
            :redirect-to="redirectTo"
            :go-back-btn="false"
          />
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import UserPrivacyForm from '@/components/users/forms/PrivacyForm'
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  name: 'PrivacyStepView',
  mixins: [SessionConcern, CurrentUserConcern],
  components: { AppFooter, UserPrivacyForm },

  metaInfo () {
    return {
      title: this.$t('meta.session.privacyStep')
    }
  },

  data () {
    return {
      redirectTo: null
    }
  },

  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to') || '/'
  },

  methods: {
    overRideUser: function () {
      const user = this.currentUser
      user.public_profile = true
      user.public_outdoor_ascents = true
      user.public_indoor_ascents = true
      return user
    }
  }
}
</script>
