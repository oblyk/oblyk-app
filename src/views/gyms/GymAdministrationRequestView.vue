<template>
  <v-container
    class="global-form-width"
    v-if="gym"
  >
    <v-row>

      <!-- If is already administered -->
      <v-col v-if="gym.administered">
        <p class="text-center text--disabled mt-10">
          {{ $t('components.gymAdministrationRequest.isAlreadyAdministered') }}
        </p>
      </v-col>

      <!-- If not administered -->
      <v-col v-if="!gym.administered">

        <!-- If not connected -->
        <div v-if="!isLoggedIn">
          <p class="text-center">
            {{ $t('components.gymAdministrationRequest.needAccount') }}
          </p>
          <p class="text-center mb-10 mt-10">
            <v-btn
              outlined
              color="primary"
              :to="`/sign-up?redirect_to=${$route.path}`"
            >
              {{ $t('actions.signUp') }}
            </v-btn>
            <br>
            <v-btn
              text
              small
              class="mt-3"
              color="primary"
              :to="`/sign-in?redirect_to=${$route.path}&alert=false`"
            >
              {{ $t('actions.signIn') }}
            </v-btn>
          </p>
        </div>

        <!-- If connected -->
        <div v-if="isLoggedIn">
          <p>
            <strong>
              {{ $t('components.gymAdministrationRequest.helloName', { name: loggedInUser.name }) }}
            </strong>
          </p>
          <p>
            {{ $t('components.gymAdministrationRequest.explainJustification') }}
          </p>

          <gym-administrator-request-form :gym="gym"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import { GymConcern } from '@/concerns/GymConcern'
import GymAdministratorRequestForm from '@/components/gyms/forms/GymAdministratorRequestForm'

export default {
  name: 'GymAdministrationRequestView',
  components: { GymAdministratorRequestForm },
  mixins: [SessionConcern, GymConcern],

  computed: {
    adminRequestMetaTitle: function () {
      return this.$t('meta.gym.administratorRequestTitle', { name: (this.gym || {}).name })
    },

    adminRequestMetaDescription: function () {
      return this.$t('meta.gym.administratorRequestDescription', { name: (this.gym || {}).name })
    },

    adminRequestMetaUrl: function () {
      if (this.gym) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gym.path('administration-request')}`
      }
      return ''
    }
  },

  metaInfo () {
    return {
      title: this.adminRequestMetaTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.adminRequestMetaDescription },
        { vmid: 'og-title', property: 'og:title', content: this.adminRequestMetaTitle },
        { vmid: 'og-description', property: 'og:description', content: this.adminRequestMetaDescription },
        { vmid: 'og-url', property: 'og:url', content: this.adminRequestMetaUrl }
      ]
    }
  }
}
</script>
