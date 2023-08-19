<template>
  <v-container
    v-if="gym"
    class="global-form-width"
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
        <div v-if="!$auth.loggedIn">
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
        <client-only>
          <div v-if="$auth.loggedIn">
            <p>
              <strong>
                {{ $t('components.gymAdministrationRequest.helloName', { name: $auth.user.first_name }) }}
              </strong>
            </p>
            <p>
              {{ $t('components.gymAdministrationRequest.explainJustification') }}
            </p>

            <gym-administrator-request-form :gym="gym" />
          </div>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymConcern } from '~/concerns/GymConcern'
import GymAdministratorRequestForm from '~/components/gyms/forms/GymAdministratorRequestForm'

export default {
  meta: { orphanRoute: true },
  components: { GymAdministratorRequestForm },
  mixins: [GymConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: "Demande d'administration de %{name}",
        metaDescription: "Administrez la salle d'escalade de %{name} pour créer votre topo indoor et animer votre communauté"
      },
      en: {
        metaTitle: 'Request for administration of %{name}',
        metaDescription: 'Manage the %{name} climbing gym to create your indoor topo and animate your community'
      }
    }
  },

  head () {
    return {
      title: this.adminRequestMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.adminRequestMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.adminRequestMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.adminRequestMetaDescription },
        { hid: 'og:url', property: 'og:url', content: this.adminRequestMetaUrl }
      ]
    }
  },

  computed: {
    adminRequestMetaTitle () {
      return this.$t('metaTitle', { name: this.gym?.name })
    },

    adminRequestMetaDescription () {
      return this.$t('metaDescription', { name: this.gym?.name })
    },

    adminRequestMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gym?.path}/administration-request`
    }
  }
}
</script>
