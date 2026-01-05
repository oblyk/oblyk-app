<template>
  <v-stepper
    v-model="subscribeStep"
  >
    <v-stepper-header>
      <v-stepper-step
        :complete="subscribeStep > 1"
        step="1"
        @click="subscribeStep = 1"
      >
        Moi
      </v-stepper-step>
      <v-divider />
      <v-stepper-step
        :complete="subscribeStep > 2"
        step="2"
        @click="subscribeStep > 2 ? subscribeStep = 2 : null"
      >
        Catégorie
      </v-stepper-step>
      <v-divider />
      <v-stepper-step
        v-if="contest.team_contest"
        :complete="subscribeStep > 3"
        step="3"
        @click="subscribeStep > 3 ? subscribeStep = 3 : null"
      >
        Équipe
      </v-stepper-step>
      <v-divider v-if="contest.team_contest" />
      <v-stepper-step
        :complete="subscribeStep > 4"
        step="4"
      >
        Contact
      </v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content
        step="1"
        :class="$vuetify.breakpoint.mobile ? 'pa-2 pt-3' : null"
      >
        <p class="font-weight-bold text-decoration-underline">
          Mes informations principales :
        </p>
        <v-text-field
          v-model="data.first_name"
          outlined
          required
          class="required-field"
          :label="$t('models.contestParticipant.first_name')"
        />
        <v-text-field
          v-model="data.last_name"
          outlined
          required
          class="required-field"
          :label="$t('models.contestParticipant.last_name')"
        />
        <date-of-birth-select-input
          v-model="data.date_of_birth"
          required
        />
        <genre-input
          v-model="data.genre"
          :with-undefined="false"
          :required="!contest.optional_gender"
          :clearable="contest.optional_gender"
        />
        <p class="font-weight-bold text-decoration-underline mb-1">
          Si vous le souhaitez vous pouvez ajouter le nom de votre club ou de votre salle préférée.
        </p>
        <v-text-field
          v-model="data.affiliation"
          outlined
          :label="`${$t('models.contestParticipant.affiliation')} (optionnel)`"
        />
        <div class="text-right">
          <v-btn
            elevation="0"
            color="primary"
            :disabled="!canGoToStep2"
            @click="subscribeStep += 1"
          >
            Suivant
            <v-icon right>
              {{ mdiArrowRight }}
            </v-icon>
          </v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="2">
        <p class="font-weight-bold text-decoration-underline mb-0">
          Dans quelle catégorie voulez-vous vous inscrire ?
        </p>
        <p
          v-if="participantAge"
          class="text--disabled"
        >
          Vous aurez <strong>{{ participantAge }} ans</strong> le jour du contest.
        </p>
        <v-card
          v-for="(category, categoryIndex) in contest.contest_categories"
          :key="`category-index-${categoryIndex}`"
          class="border mt-2"
          :disabled="!canSubscribe(category)"
          :color="category.id === data.contest_category_id ? `green ${$vuetify.theme.dark ? 'darken' : 'lighten'}-5` : null"
          @click="chooseCategory(category.id, category)"
        >
          <v-card-title class="px-3 pt-2 pb-0">
            <v-icon
              v-if="!canSubscribe(category)"
              left
              small
            >
              {{ mdiLock }}
            </v-icon>
            {{ category.name }}
          </v-card-title>
          <v-card-text class="px-3 pb-2">
            <p
              v-if="category.description"
              class="mb-0"
            >
              {{ category.description }}
            </p>
            <p
              v-if="!remainingPlaceCheck(category) && category.parity"
              class="font-weight-bold mb-0 mt-1 font-italic"
            >
              Il n'y pas plus de place disponible dans cette catégorie, la parité a été atteinte.
            </p>
            <v-slide-y-transition>
              <div
                v-if="category.waves.length > 0 && !category.auto_distribute && category.id === data.contest_category_id"
                class="mt-2"
              >
                <p class="text-decoration-underline font-weight-bold mb-1">
                  Dans quelle vagues voulez-vous vous inscrire ?
                </p>
                <v-row>
                  <v-col
                    v-for="(wave, waveIndex) in category.waves"
                    :key="`wave-index-${waveIndex}`"
                  >
                    <v-card
                      class="border px-3 pt-1 pb-2 rounded-sm full-height"
                      :color="category.id === data.contest_category_id && wave.id === data.contest_wave_id ? `green ${$vuetify.theme.dark ? 'darken' : 'lighten'}-5` : null"
                      :disabled="wave.remaining_places <= 0"
                      @click="chooseWave(wave.id)"
                    >
                      <div class="subtitle-2">
                        <v-icon
                          v-if="category.id === data.contest_category_id && wave.id === data.contest_wave_id"
                          :color="$vuetify.theme.dark ? 'white' : 'green'"
                          small
                          left
                        >
                          {{ mdiCheck }}
                        </v-icon>
                        {{ wave.name }}
                      </div>
                      <ul
                        v-if="wave.remaining_places === null || wave.remaining_places > 0"
                        class="pl-3"
                      >
                        <li v-if="wave.remaining_places">
                          {{ wave.remaining_places }} place restantes
                        </li>
                        <li v-else>
                          {{ wave.participants_count }} participants
                        </li>
                        <li v-if="contest.one_day_event">
                          Commence à {{ humanizeDate(wave.time_blocks[0].start_time, 'TIME_SIMPLE') }}
                        </li>
                        <li v-else>
                          Commence le {{ humanizeDate(wave.time_blocks[0].start_date, 'DATE_SHORT') }} à {{ humanizeDate(wave.time_blocks[0].start_time, 'TIME_SIMPLE') }}
                        </li>
                      </ul>
                      <p
                        v-else
                        class="text-center mt-2 mb-0 font-weight-black red--text text--lighten-2"
                      >
                        COMPLET
                      </p>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-slide-y-transition>
          </v-card-text>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="3">
        <div v-if="!createTeamForm">
          <p class="font-weight-bold text-decoration-underline mb-3">
            Choisissez ou ajoutez votre équipe !
          </p>
          <v-text-field
            v-model="teamQuery"
            label="Cherchez votre équipe"
            dense
            outlined
            hide-details
            :prepend-inner-icon="mdiMagnify"
            class="mb-4"
          />
          <div class="rounded border d-flex flex-column">
            <div
              style="height: 40vh; overflow-y: auto"
              class="flex-grow-1"
            >
              <p
                v-if="loadingTeams"
                class="text-center text--disabled mt-6"
              >
                <v-progress-circular
                  size="12"
                  width="2"
                  class="mr-1"
                  indeterminate
                />
                Chargement des équipes ...
              </p>
              <div>
                <p
                  v-if="!loadingTeams && filteredTeams.length === 0 && teams.length === 0"
                  class="text--disabled text-center"
                >
                  Il n'y pas encore d'équipe créée sur ce contest, ajouter la votre !
                </p>
                <p
                  v-if="!loadingTeams && filteredTeams.length === 0 && teams.length > 0"
                  class="text--disabled text-center mt-5"
                >
                  Pas d'équipe trouvées pour <strong>"{{ teamQuery }}"</strong>
                </p>
              </div>
              <v-list
                v-if="!loadingTeams"
                rounded
              >
                <v-list-item-group
                  v-model="data.contest_team_id"
                >
                  <v-list-item
                    v-for="(team, teamIndex) in filteredTeams"
                    :key="`team-index-${teamIndex}`"
                    :value="team.id"
                    :disabled="team.remaining_places === 0"
                    class="pl-2"
                  >
                    <v-list-item-icon class="mr-4 mb-0 mt-2">
                      <v-icon :size="32">
                        {{ data.contest_team_id === team.id ? mdiRadioboxMarked : mdiRadioboxBlank }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content class="py-0">
                      <v-list-item-title>
                        {{ team.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ $tc('common.remainingPlaces', team.remaining_places, { count: team.remaining_places }) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
            <div class="flex-shrink-0 border-top">
              <v-list-item @click="showCreateTeamForm()">
                <v-list-item-icon>
                  <v-icon
                    size="30"
                    color="primary"
                  >
                    {{ mdiAccountMultiplePlus }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    Créer mon équipe ?
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </div>
          <div class="text-right mt-4">
            <v-btn
              elevation="0"
              color="primary"
              :disabled="disabledNextFormTeam"
              @click="subscribeStep += 1"
            >
              Suivant
              <v-icon right>
                {{ mdiArrowRight }}
              </v-icon>
            </v-btn>
          </div>
        </div>
        <div v-else>
          <p class="font-weight-bold text-decoration-underline mb-3">
            Choisissez un nom pour votre équipe :
          </p>
          <v-text-field
            v-model="newTeamName"
            outlined
            placeholder="Exemple : Les Gibbons"
            hide-details
          />
          <div class="d-flex justify-space-between mt-4">
            <v-btn
              icon
              :disabled="loadingCreateTeam"
              @click="closeCreateTeamForm()"
            >
              <v-icon>
                {{ mdiArrowLeft }}
              </v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              color="primary"
              :loading="loadingCreateTeam"
              :disabled="newTeamName === null || newTeamName === ''"
              @click="addTeam()"
            >
              Créer mon équipe
            </v-btn>
          </div>
        </div>
      </v-stepper-content>
      <v-stepper-content step="4">
        <p class="font-weight-bold text-decoration-underline mb-3">
          Pour finir, votre contact :
        </p>

        <!-- EMAIL FIELD -->
        <v-text-field
          v-model="data.email"
          outlined
          required
          hide-details
          class="required-field"
          :label="$t('models.contestParticipant.email')"
        />

        <!-- CONNECT USER -->
        <div class="border rounded pa-2 pt-1 mt-4">
          <v-checkbox
            v-model="data.save_user"
            class="mt-0"
            hide-details
            :label="$auth.loggedIn ? 'Enregistrer mon inscription sur mon compte Oblyk' : 'Me créer un compte sur Oblyk pour renseigner et consulter mes résultats plus facilement'"
          />
          <div
            v-if="data.save_user && !$auth.loggedIn"
            class="text-center mt-2"
          >
            <v-btn
              color="primary"
              elevation="0"
              @click="signUpModal = true"
            >
              Créer un compte
            </v-btn>
            <v-btn
              color="primary"
              elevation="0"
              @click="signInModal = true"
            >
              Me Connecter
            </v-btn>
          </div>
          <div
            v-if="data.save_user && $auth.loggedIn"
            class="green--text pt-1"
          >
            <v-icon left color="green" class="vertical-align-text-bottom">
              {{ mdiCheckBold }}
            </v-icon>
            Vous êtes connecté·e
          </div>
        </div>

        <!-- FFME CONTEST -->
        <div
          v-if="contest.ffme_contest_id"
          class="rounded border pa-2 pt-1 mt-4"
        >
          <v-checkbox
            v-model="data.synchronise_with_ffme_contest"
            :disabled="!$auth.loggedIn || !data.save_user"
            :hide-details="$auth.loggedIn && data.save_user"
            class="mt-0"
            hint="Vous devez valider la case précédente pour participer aux Vertical Series"
            persistent-hint
            @click="getMyCompet"
          >
            <template #label>
              Je souhaites participer aux
              <v-chip class="pa-1 px-2 mx-1" small>
                <img
                  :src="$vuetify.theme.dark ? '/images/vertical_series_white.png' : '/images/vertical_series_black.png'"
                  height="12"
                  alt="Logo Vertical Series"
                  class="mr-1"
                >
                Vertical Series
              </v-chip>
              par la FFME
            </template>
          </v-checkbox>
          <div v-if="data.synchronise_with_ffme_contest">
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
              <div v-if="myCompet" class="green--text pt-1">
                <v-icon left color="green" class="vertical-align-text-bottom">
                  {{ mdiCheckBold }}
                </v-icon>
                Association FFME <strong>ok</strong>, licence {{ myCompet.ffme_licence_number }}
              </div>
              <div
                v-else
                class="pt-2"
              >
                <user-application-my-compet-form
                  submit-methode="post"
                  :callback="ffmeAssociationCallback"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- FINAL SUBSCRIBE BTN -->
        <div class="text-right mt-2">
          <v-btn
            color="primary"
            elevation="0"
            :disabled="!canFinalize"
            :loading="subscribing"
            @click="submit"
          >
            M'inscrire
          </v-btn>
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
                :suggest-email="data.email"
                :suggest-password="data.password"
                :go-back-btn="false"
              />
            </div>
          </v-card>
        </v-dialog>

        <!-- SIGN UP MODAL -->
        <v-dialog
          v-model="signUpModal"
          width="500"
        >
          <v-card>
            <v-card-title>
              Créer un compte
            </v-card-title>
            <div class="pa-4">
              <v-text-field
                v-model="data.email"
                outlined
                required
                class="required-field"
                :label="$t('models.contestParticipant.email')"
              />
              <v-text-field
                v-model="data.password"
                outlined
                :label="$t('models.user.password')"
                :type="showPassword ? 'text' : 'password'"
                required
                :append-icon="showPassword ? mdiEyeOff : mdiEye"
                class="required-field"
                :hint="$t('models.password.rules')"
                persistent-hint
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                v-model="data.password_confirmation"
                outlined
                :label="$t('models.user.confirm_password')"
                :type="showPasswordConfirmation ? 'text' : 'password'"
                required
                :append-icon="showPasswordConfirmation ? mdiEyeOff : mdiEye"
                class="required-field"
                @click:append="showPasswordConfirmation = !showPasswordConfirmation"
              />
            </div>
            <v-card-actions>
              <v-btn
                text
                @click="signUpModal = false"
              >
                Annuler
              </v-btn>
              <v-btn
                color="primary"
                :loading="loadingCreateAccount"
                elevation="0"
                :disabled="data.password === null || data.password !== data.password_confirmation"
                class="ml-auto"
                @click="createAccount"
              >
                Créer mon compte
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import {
  mdiArrowRight,
  mdiArrowLeft,
  mdiEyeOff,
  mdiEye,
  mdiCheck,
  mdiLock,
  mdiMagnify,
  mdiRadioboxBlank,
  mdiRadioboxMarked,
  mdiAccountMultiplePlus,
  mdiCheckBold
} from '@mdi/js'
import { FormHelpers } from '~/mixins/FormHelpers'
import { DateHelpers } from '~/mixins/DateHelpers'
import GenreInput from '~/components/forms/GenreInput'
import SessionApi from '~/services/oblyk-api/SessionApi'
import ContestTeamApi from '~/services/oblyk-api/ContestTeamApi'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'
import UserApplicationMyCompetApi from '~/services/oblyk-api/UserApplicationMyCompetApi'
import SignInForm from '~/components/sessions/SignInForm'
import DateOfBirthSelectInput from '~/components/forms/DateOfBirthSelectInput'
import UserApplicationMyCompetForm from '~/components/userApplication/forms/UserApplicationMyCompetForm'

export default {
  name: 'ContestSubscribeForm',
  components: { UserApplicationMyCompetForm, SignInForm, DateOfBirthSelectInput, GenreInput },
  mixins: [FormHelpers, DateHelpers],

  props: {
    contest: {
      type: Object,
      required: true
    },
    contestParticipant: {
      type: Object,
      default: null
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      subscribeStep: 1,
      showPassword: false,
      showPasswordConfirmation: false,
      subscribing: false,
      needAuthentification: false,
      signInModal: false,
      successAuthentification: false,
      loadingTeams: true,
      teams: [],
      teamQuery: null,
      createTeamForm: false,
      newTeamName: null,
      loadingCreateTeam: false,
      loadingMyCompetApp: false,
      myCompet: null,
      signUpModal: false,
      loadingCreateAccount: false,
      data: {
        id: this.contestParticipant?.id,
        first_name: this.contestParticipant?.first_name,
        last_name: this.contestParticipant?.last_name,
        date_of_birth: this.contestParticipant?.date_of_birth,
        email: this.contestParticipant?.email,
        genre: this.contestParticipant?.genre,
        affiliation: this.contestParticipant?.affiliation,
        contest_category_id: this.contestParticipant?.contest_category_id,
        contest_wave_id: this.contestParticipant?.contest_wave_id,
        contest_team_id: this.contestParticipant?.contest_team_id || null,
        save_user: false,
        synchronise_with_ffme_contest: false,
        password: null,
        password_confirmation: null,
        contest_id: this.contest.id,
        gym_id: this.contest.gym_id
      },

      mdiArrowRight,
      mdiArrowLeft,
      mdiEyeOff,
      mdiEye,
      mdiCheck,
      mdiLock,
      mdiMagnify,
      mdiRadioboxBlank,
      mdiRadioboxMarked,
      mdiAccountMultiplePlus,
      mdiCheckBold
    }
  },

  computed: {
    canGoToStep2 () {
      return this.data.first_name && this.data.last_name && this.data.date_of_birth && (this.contest.optional_gender || this.data.genre)
    },

    disabledNextFormTeam () {
      return this.data.contest_team_id === null || this.data.contest_team_id === '' || this.data.contest_team_id === undefined
    },

    participantAge () {
      if (!this.data.date_of_birth) {
        return null
      }
      return this.ageAt(
        new Date(this.data.date_of_birth),
        new Date(this.contest.start_date)
      )
    },

    filteredTeams () {
      const teams = []
      for (const team of this.teams) {
        if (
          (this.teamQuery === null || this.teamQuery === '') ||
          team.name.toLowerCase().includes(this.teamQuery.toLowerCase())
        ) {
          teams.push(team)
        }
      }
      return teams
    },

    canFinalize () {
      if (this.data.email === null || this.data.email === '' || this.data.email === undefined) {
        return false
      }
      if (this.data.save_user && !this.$auth.loggedIn) {
        return false
      }
      if (this.contest.ffme_contest_id && this.data.synchronise_with_ffme_contest && this.myCompet === null) {
        return false
      }
      return true
    }
  },

  watch: {
    subscribeStep () {
      if (this.subscribeStep === 3) {
        this.getTeams()
      }
    },

    data: {
      handler () {
        if (this.data.save_user === false || this.data.save_user === null) {
          this.data.synchronise_with_ffme_contest = false
        }
      },
      deep: true
    }
  },

  beforeMount () {
    if (this.$auth.loggedIn) {
      const user = this.$auth.user
      this.data.first_name ||= user.first_name
      this.data.last_name ||= user.last_name
      this.data.date_of_birth ||= user.date_of_birth
      this.data.genre ||= user.genre
      this.data.email ||= user.email
      this.data.save_user = true
    }
  },

  methods: {
    chooseCategory (categoryId, category) {
      this.data.contest_category_id = categoryId
      if (category.auto_distribute || category.waves.length === 0) {
        this.nextStepFromCategory()
      }
    },

    showCreateTeamForm () {
      this.data.contest_team_id = null
      this.newTeamName = this.teamQuery
      this.createTeamForm = true
    },

    closeCreateTeamForm () {
      this.getTeams()
      this.data.contest_team_id = null
      this.newTeamName = null
      this.createTeamForm = false
    },

    chooseWave (waveId) {
      this.data.contest_wave_id = waveId
      this.nextStepFromCategory()
    },

    nextStepFromCategory () {
      if (this.contest.team_contest) {
        this.subscribeStep = 3
      } else {
        this.subscribeStep = 4
      }
    },

    submit () {
      this.subscribing = true
      new ContestParticipantApi(this.$axios, this.$auth)
        .subscribe(this.data)
        .then((resp) => {
          this.callback(resp.data.token)
        })
        .catch((err) => {
          if (err.response?.data?.error === 'need_authentification') {
            this.needAuthentification = true
          } else {
            this.$root.$emit('alertFromApiError', err, 'contestParticipant')
          }
        })
        .finally(() => {
          this.subscribing = false
        })
    },

    canSubscribe (category) {
      return this.registrationObligationCheck(category) && this.remainingPlaceCheck(category)
    },

    registrationObligationCheck (category) {
      const age = this.participantAge
      const betweenAge = category.registration_obligation === 'between_age'
      if (category.registration_obligation === null) {
        return true
      } else if (betweenAge && category.min_age && !category.max_age) {
        // example : 18 years old or more
        return age >= category.min_age
      } else if (betweenAge && !category.min_age && category.max_age) {
        // example : 12 years old or less
        return age <= category.max_age
      } else if (betweenAge && category.min_age && category.max_age) {
        // example : more than 12 years old and less than 18 years old
        return age >= category.min_age && age <= category.max_age
      } else if (!betweenAge) {
        const myYearAge = new Date(this.contest.start_date).getFullYear() - new Date(this.data.date_of_birth).getFullYear()
        return myYearAge >= category.over_age && myYearAge < category.under_age
      }
      return false
    },

    remainingPlaceCheck (category) {
      if (category.capacity === null) {
        return true
      } else if (category.contest_participants_count >= category.capacity) {
        return false
      } else if (category.parity) {
        const maxByGenre = category.capacity / 2
        if (this.data.genre === 'male' && (category.contest_participants_male_count + 1) > maxByGenre) {
          return false
        }
        if (this.data.genre === 'female' && (category.contest_participants_female_count + 1) > maxByGenre) {
          return false
        }
      }
      return true
    },

    successSignIn () {
      this.data.email = this.$auth.user.email
      this.signInModal = false
      this.data.save_user = true
    },

    getTeams () {
      this.loadingTeams = true
      new ContestTeamApi(this.$axios, this.$auth)
        .all(this.contest.gym_id, this.contest.id)
        .then((resp) => {
          this.teams = []
          for (const team of resp.data) {
            this.teams.push(team)
          }
        })
        .finally(() => {
          this.loadingTeams = false
        })
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
    },

    createAccount () {
      this.loadingCreateAccount = true
      new SessionApi(this.$axios, this.$auth)
        .signUp({
          email: this.data.email,
          first_name: this.data.first_name,
          last_name: this.data.last_name,
          password: this.data.password,
          password_confirmation: this.data.password_confirmation,
          date_of_birth: this.data.date_of_birth,
          genre: this.data.genre
        })
        .then(() => {
          this.$auth.loginWith('local', {
            data: {
              email: this.data.email,
              password: this.data.password,
              oblyk_full_name: null
            }
          }).then(() => {
            // Connect to Notification Channel
            this.$cable.subscribe({ channel: 'NotificationChannel' })
            this.$cable.subscribe({ channel: 'FetchUserChannel' })
            this.loadingCreateAccount = false
            this.signUpModal = false
            this.data.save_user = true
          })
        })
        .catch((err) => {
          this.loadingCreateAccount = false
          this.$root.$emit('alertFromApiError', err, 'user')
        })
    },

    addTeam () {
      this.loadingCreateTeam = true
      new ContestTeamApi(this.$axios, this.$auth)
        .create({
          gym_id: this.contest.gym_id,
          contest_id: this.contest.id,
          name: this.newTeamName
        })
        .then((resp) => {
          this.data.contest_team_id = resp.data.id
          this.subscribeStep += 1
        })
        .finally(() => {
          this.loadingCreateTeam = false
        })
    }
  }
}
</script>
