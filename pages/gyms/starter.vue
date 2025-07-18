<template>
  <div>
    <page-header
      title="Créer le topo de ma salle"
      back-to="/about/indoor"
    />
    <v-container>
      <h1 class="text-center mt-8 mb-8">
        Créer le topo de ma salle
      </h1>

      <!-- If not $auth.loggedIn -->
      <div v-if="!$auth.loggedIn">
        <v-card class="pb-5">
          <v-card-title>
            <span class="primary--text mr-1">Étape 1 :</span>
            Créez-vous un compte sur Oblyk
          </v-card-title>
          <v-card-text>
            <p>
              Le compte Oblyk vous permettra de vous connecter et vous donnera le droit d'administrer votre salle.
            </p>
            <p>
              <strong>Note :</strong> Créez un compte à votre nom propre et non au nom de la salle.
              Vous pourrez ensuite ajouter autant d'administrateur que vous voudrez sans avoir besoin de partager un compte.
            </p>
          </v-card-text>
          <v-row justify="center">
            <v-col cols="12" md="4" lg="3">
              <v-btn
                outlined
                color="primary"
                text
                block
                @click="showCreateCompte = true; showConnected = false"
              >
                <v-icon left>
                  {{ mdiAccountPlus }}
                </v-icon>
                {{ $t('actions.createMyAccount') }}
              </v-btn>
            </v-col>
            <v-col cols="12" md="4" lg="3">
              <v-btn
                outlined
                color="primary"
                text
                block
                @click="showConnected = true; showCreateCompte = false"
              >
                <v-icon left>
                  {{ mdiLogin }}
                </v-icon>
                {{ $t('actions.signIn') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-sheet
          v-if="showCreateCompte"
          rounded
          class="pa-4 mt-5"
        >
          <sign-up-form :redirect-to="$route.fullPath" />
        </v-sheet>

        <v-sheet
          v-if="showConnected"
          rounded
          class="pa-4 mt-5"
        >
          <sign-in-form :redirect-to="$route.fullPath" />
        </v-sheet>
      </div>

      <!-- Display loader if gym_id is in url -->
      <v-skeleton-loader
        v-if="$auth.loggedIn && loadingGymFromQuery"
        type="list-item-avatar"
      />

      <div v-if="$auth.loggedIn && !loadingGymFromQuery">
        <!-- Gym search -->
        <v-card v-if="!gym">
          <v-card-title>
            <span class="primary--text mr-1">Étape 1 :</span>
            Entrez le nom de votre salle
          </v-card-title>
          <v-card-text>
            <p class="mb-0">
              Oblyk référence les salles d'escalades de France <em>(et du monde)</em>, peut-être que votre salle existe déjà dans notre base de données.<br>
              Si c'est le cas vous n'aurez qu'à en prendre la gestion. Sinon créez-la.
            </p>
          </v-card-text>
          <div class="px-4">
            <gym-search-form
              :linkable-result="false"
              :callback="selectedGym"
              :used-callback="searchUsed"
            />
            <div v-if="addGymBtn" class="py-4">
              <p class="text-right text--disabled mb-1">
                {{ $t('components.ascentGymRoute.gymNotFound') }}
              </p>
              <div class="text-right">
                <v-btn
                  :to="`/gyms/new?redirect_to=${$route.fullPath}&name=${query}`"
                  color="primary"
                >
                  <v-icon left>
                    {{ mdiPlus }}
                  </v-icon>
                  {{ $t('actions.addGym') }}
                </v-btn>
              </div>
            </div>
          </div>
        </v-card>

        <!-- Gym Selected -->
        <div v-if="gym">
          <v-card>
            <v-card-title class="pb-2">
              <v-icon
                left
                color="primary"
              >
                {{ mdiCheckBold }}
              </v-icon>
              <span class="primary--text mr-1">Étape 1 :</span>
              Salle sélectionnée
            </v-card-title>
            <div class="px-4 pb-4">
              <gym-small-card
                :gym="gym"
                small
              />
            </div>
          </v-card>

          <v-card class="mt-4">
            <v-card-title>
              <v-icon
                v-if="requestSubmitted"
                left
                color="primary"
              >
                {{ mdiCheckBold }}
              </v-icon>
              <span class="primary--text mr-1">Étape 2 :</span>
              Faite votre demande d'administration
            </v-card-title>
            <div class="pa-4">
              <p class="mb-0">
                Afin de vérifier que vous êtes légitime pour prendre la gestion de <strong>{{ gym.name }}</strong>.
                Merci de nous fournir des éléments nous permettant de valider votre demande.
              </p>
              <p class="mb-3">
                <strong>Exemple :</strong>description de qui vous êtes, organigramme de l'association, adresse email correspondant au nom de la salle, etc.
              </p>
              <p class="mb-0">
                Nous traitons les demandes manuellement. Nous vous répondrons le plus rapidement possible suivant nos disponibilités.
              </p>
            </div>
            <div class="px-4 pb-4">
              <gym-administrator-request-form
                :gym="gym"
                method="post"
                :callback="submitCallback"
              />
            </div>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mdiLogin, mdiAccountPlus, mdiCheckBold, mdiPlus } from '@mdi/js'
import GymSearchForm from '~/components/gyms/forms/GymSearchForm.vue'
import SignUpForm from '~/components/sessions/SignUpForm.vue'
import SignInForm from '~/components/sessions/SignInForm.vue'
import GymSmallCard from '~/components/gyms/GymSmallCard.vue'
import GymAdministratorRequestForm from '~/components/gyms/forms/GymAdministratorRequestForm.vue'
import GymApi from '~/services/oblyk-api/GymApi'
import Gym from '~/models/Gym'
import PageHeader from '~/components/layouts/PageHeader.vue'

export default {
  components: {
    PageHeader,
    GymAdministratorRequestForm,
    GymSmallCard,
    SignInForm,
    SignUpForm,
    GymSearchForm
  },

  data () {
    return {
      showCreateCompte: false,
      showConnected: false,
      gym: null,
      requestSubmitted: false,
      query: null,
      addGymBtn: false,
      loadingGymFromQuery: false,

      mdiLogin,
      mdiAccountPlus,
      mdiCheckBold,
      mdiPlus
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Créer le topo de ma salle',
        metaDescription: "Créer le topo de votre salle d'escalade gratuitement en quelques minutes"
      },
      en: {
        metaTitle: 'Create a guidebook of my climbing gym',
        metaDescription: 'Create a free climbing gym guidebook in a few minutes'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/indoor/og-indoor-presentation-banner.webp` }
      ]
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.gymId = urlParams.get('gym_id')
    if (this.gymId) {
      this.getGym()
    }
  },

  methods: {
    getGym () {
      this.loadingGymFromQuery = true
      new GymApi(this.$axios, this.$auth)
        .find(this.gymId)
        .then((resp) => {
          this.gym = new Gym({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingGymFromQuery = false
        })
    },

    selectedGym (gym) {
      this.gym = gym
    },

    submitCallback () {
      this.requestSubmitted = true
    },

    searchUsed (query) {
      this.addGymBtn = true
      this.query = query
    }
  }
}
</script>
