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
        <v-text-field
          v-model="data.email"
          outlined
          required
          hide-details
          class="required-field"
          :label="$t('models.contestParticipant.email')"
        />
        <v-checkbox
          v-if="$auth.loggedIn"
          v-model="data.save_user"
          label="Enregistrer mon inscription sur mon compte Oblyk"
        />
        <v-checkbox
          v-if="!$auth.loggedIn && !needAuthentification"
          v-model="data.create_account"
          label="Me créer un compte sur Oblyk pour renseigner et consulter mes résultats plus facilement (facultatif)"
        />
        <div
          v-if="needAuthentification"
          class="border rounded pa-4 mt-5"
        >
          <p>
            <span class="red--text">Vous avez déjà un compte Oblyk à l'adresse <strong>{{ data.email }}</strong></span><br>
            👉 Connectez-vous pour lié votre participation à votre compte
          </p>
          <div class="text-center">
            <v-btn
              color="primary"
              elevation="0"
              @click="signInModal = true"
            >
              Me Connecter
            </v-btn>
          </div>
          <div class="text-center mt-4">
            <v-btn
              text
              outlined
              @click="noLinkedAccount"
            >
              <v-icon left>
                {{ mdiArrowLeft }}
              </v-icon>
              Retour
            </v-btn>
          </div>
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
        </div>

        <v-alert
          v-if="successAuthentification"
          text
          type="success"
        >
          Connexion réussi !<br>
          Cliquer sur <strong>M'INSCRIRE</strong> pour finaliser votre inscription au contest
        </v-alert>

        <div v-if="data.create_account && !needAuthentification && !$auth.loggedIn">
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
        <div
          v-if="!needAuthentification"
          class="text-right mt-2"
        >
          <v-btn
            color="primary"
            elevation="0"
            :loading="subscribing"
            @click="submit"
          >
            M'inscrire
          </v-btn>
        </div>
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
  mdiAccountMultiplePlus
} from '@mdi/js'
import GenreInput from '~/components/forms/GenreInput'
import { FormHelpers } from '~/mixins/FormHelpers'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'
import { DateHelpers } from '~/mixins/DateHelpers'
import DateOfBirthSelectInput from '~/components/forms/DateOfBirthSelectInput'
import SignInForm from '~/components/sessions/SignInForm'
import ContestTeamApi from '~/services/oblyk-api/ContestTeamApi'

export default {
  name: 'ContestSubscribeForm',
  components: { SignInForm, DateOfBirthSelectInput, GenreInput },
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
        create_account: false,
        save_user: true,
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
      mdiAccountMultiplePlus
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
    }
  },

  watch: {
    subscribeStep () {
      if (this.subscribeStep === 3) {
        this.getTeams()
      }
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

    noLinkedAccount () {
      this.needAuthentification = false
      this.data.create_account = false
      this.data.save_user = false
    },

    successSignIn () {
      this.needAuthentification = false
      this.successAuthentification = true
      this.data.create_account = false
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
