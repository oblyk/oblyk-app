<template>
  <div class="rounded pa-2 border">
    <h4>
      <v-icon color="primary" size="35" class="mr-2">
        {{ oblykFfmeVerticalSeries }}
      </v-icon>
      My Vertical Series
    </h4>
    <v-alert
      v-if="contestParticipant.synchronise_with_ffme_contest"
      text
      dense
      type="success"
      class="mb-0"
    >
      Vos résultats seront envoyé aux Vertical Series !
    </v-alert>
    <div v-else>
      <v-checkbox
        v-model="myCompetSynchronisation"
        label="Je souhaites participer au Vertical Series by FFME"
        @click="startVerticalSeriesSynchronisation"
      />
      <div v-if="myCompetSynchronisation">
        <!-- STEP 1 : CONNECTION -->
        <p
          class="mb-1"
          :class="step1.enabled ? null : 'text--disabled'"
        >
          <v-chip small v-text="1" />
          <u>Connectez-vous</u>
        </p>
        <div v-if="step1.showStepContent">
          <div
            v-if="!$auth.loggedIn"
            class="text-center"
          >
            <v-btn
              elevation="0"
              color="primary"
              @click="signInModal = true"
            >
              Me connecter
            </v-btn>
            <v-btn
              elevation="0"
              color="primary"
              :to="`/sign-up?redirect_to=${$route.fullPath}&back_to=${$route.fullPath}`"
            >
              Créer un compte
            </v-btn>
          </div>
          <v-alert v-else text dense type="success">
            Vous êtes connecté·e !
          </v-alert>
        </div>

        <!-- STEP 2 : LINK PARTICIPANT AND OBLYK ACCOUNT -->
        <p
          class="mb-1 mt-4"
          :class="step2.enabled ? null : 'text--disabled'"
        >
          <v-chip small v-text="2" />
          <u>Liez votre compte Oblyk à votre participation</u>
        </p>
        <div v-if="step2.showStepContent">
          <div v-if="!contestParticipant.linked_to_user">
            <p class="text--disabled">
              Pour synchroniser vos résultats avec la FFME nous devons liée votre participation à ce contest avec votre compte Oblyk :
              <strong>{{ $auth.user.first_name }} {{ $auth.user.last_name }}</strong>
            </p>
            <div class="text-right">
              <v-btn
                color="primary"
                elevation="0"
                :loading="loadingLinkToAuthUser"
                @click="linkToAuthUser"
              >
                Lier mon compte
              </v-btn>
            </div>
          </div>
          <v-alert v-else text dense type="success">
            Votre contest est liée à votre compte !
          </v-alert>
        </div>

        <!-- STEP 3 : ASSOCIATE MY COMPET AND OBLYK ACCOUNT -->
        <p
          class="mb-1 mt-4"
          :class="step3.enabled ? null : 'text--disabled'"
        >
          <v-chip small v-text="3" />
          <u>Associez votre compte à MyCompet</u>
        </p>
        <div v-if="step3.showStepContent">
          <div v-if="!haveMyCompetApp">
            <div
              v-if="loadingMyCompetApp"
              class="pl-1 pt-2"
            >
              <v-progress-circular
                indeterminate
                :size="10"
                :width="2"
                class="mr-2"
                color="#743ad5"
              />
              vérification association à la FFME ...
            </div>
            <div v-else>
              <user-application-my-compet-form
                submit-methode="post"
                :callback="ffmeAssociationCallback"
              />
            </div>
          </div>
          <v-alert v-else text dense type="success">
            Votre compte Oblyk est associé à MyCompet !
          </v-alert>
        </div>

        <!-- STEP 4 : FINISH ASSOCIATION -->
        <p
          class="mb-1 mt-4"
          :class="step4.enabled ? null : 'text--disabled'"
        >
          <v-chip small v-text="4" />
          <u>Finalisez la connexion</u>
        </p>
        <div v-if="step4.showStepContent">
          <div v-if="!contestParticipant.synchronise_with_ffme_contest">
            <p class="text--disabled">
              Nous avons tous les prérequis pour que vos résultats soient envoyés aux Vertical Series !
            </p>
            <p class="text--disabled">
              Validez votre inscription aux Vertical Series pour ce contest en cliquant sur le bouton <strong>(FINALISER)</strong> ci-dessous.
            </p>
            <div class="text-right">
              <v-btn
                color="primary"
                elevation="0"
                @click="synchroniseParticipantWithFfmeContest"
              >
                Finaliser
              </v-btn>
            </div>
          </div>
          <v-alert v-else text dense type="success">
            Vos résultats seront synchronisé avec MyCompet !
          </v-alert>
        </div>
      </div>
    </div>

    <!-- SIGN IN MODAL -->
    <v-dialog
      v-model="signInModal"
      width="500"
    >
      <v-card>
        <v-card-title>
          Me connecter
        </v-card-title>
        <div class="pa-4">
          <sign-in-form
            :callback="successSignIn"
            :go-back-btn="false"
          />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { oblykFfmeVerticalSeries } from '~/assets/oblyk-icons'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'
import SignInForm from '~/components/sessions/SignInForm.vue'
import UserApplicationMyCompetApi from '~/services/oblyk-api/UserApplicationMyCompetApi'
import UserApplicationMyCompetForm from '~/components/userApplication/forms/UserApplicationMyCompetForm'

export default {
  name: 'ContestMyVerticalSeries',
  components: { UserApplicationMyCompetForm, SignInForm },
  props: {
    contest: {
      type: Object,
      required: true
    },
    contestParticipant: {
      type: Object,
      required: true
    },
    updateParticipantCallback: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      myCompetSynchronisation: false,
      loadingLinkToAuthUser: false,
      loadingSynchroniseAuthUser: false,
      signInModal: false,
      loadingMyCompetApp: true,
      myCompet: null,

      oblykFfmeVerticalSeries
    }
  },

  computed: {
    haveMyCompetApp () {
      return this.myCompet && this.myCompet.ffme_licence_number !== null && this.myCompet.ffme_licence_number !== undefined
    },

    step1 () {
      return { enabled: true, showStepContent: true }
    },

    step2 () {
      return {
        enabled: this.$auth.loggedIn,
        showStepContent: this.$auth.loggedIn
      }
    },

    step3 () {
      return {
        enabled: this.$auth.loggedIn && this.contestParticipant.linked_to_user,
        showStepContent: this.$auth.loggedIn && this.contestParticipant.linked_to_user
      }
    },

    step4 () {
      return {
        enabled: this.$auth.loggedIn && this.contestParticipant.linked_to_user && this.haveMyCompetApp,
        showStepContent: this.$auth.loggedIn && this.contestParticipant.linked_to_user && this.haveMyCompetApp
      }
    }
  },

  methods: {
    startVerticalSeriesSynchronisation () {
      if (this.myCompetSynchronisation) {
        this.getMyCompet()
      }
    },

    linkToAuthUser () {
      this.loadingLinkToAuthUser = true
      new ContestParticipantApi(this.$axios, this.$auth)
        .linkToAuthUser(this.contest.gym_id, this.contest.id, this.contestParticipant.id)
        .then(() => {
          this.getMyParticipant()
        })
    },

    synchroniseParticipantWithFfmeContest () {
      this.loadingSynchroniseAuthUser = true
      new ContestParticipantApi(this.$axios, this.$auth)
        .synchroniseParticipantWithFfmeContest(this.contest.gym_id, this.contest.id, this.contestParticipant.id)
        .then(() => {
          this.getMyParticipant()
        })
    },

    getMyParticipant () {
      new ContestParticipantApi(this.$axios, this.$auth)
        .participant(
          this.contest.gym_id,
          this.contest.id,
          this.contestParticipant.token
        )
        .then((resp) => {
          this.updateParticipantCallback(resp.data)
        })
        .finally(() => {
          this.loadingLinkToAuthUser = false
          this.loadingSynchroniseAuthUser = false
        })
    },

    successSignIn () {
      this.signInModal = false
      this.getMyCompet()
    },

    getMyCompet () {
      if (!this.$auth.loggedIn) {
        return false
      }
      this.loadingMyCompetApp = true
      new UserApplicationMyCompetApi(this.$axios, this.$auth)
        .find()
        .then((resp) => {
          this.myCompet = resp.data
        })
        .finally(() => {
          setTimeout(() => {
            this.loadingMyCompetApp = false
          }, 700)
        })
    },

    ffmeAssociationCallback (myCompet) {
      this.myCompet = myCompet
    }
  }
}
</script>
