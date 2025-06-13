<template>
  <v-form @submit.prevent="submit()">
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
      required
    />
    <v-text-field
      v-model="data.affiliation"
      outlined
      :label="`${$t('models.contestParticipant.affiliation')} (optionnel)`"
    />
    <v-text-field
      v-model="data.email"
      outlined
      required
      hide-details
      :label="`${$t('models.contestParticipant.email')} (conseillé)`"
    />

    <!-- CATEGORY -->
    <p class="font-weight-bold mb-1 mt-4">
      Catégories : <strong class="red--text">*</strong>
    </p>
    <v-card
      v-for="(category, categoryIndex) in contestCategories"
      :key="`category-index-${categoryIndex}`"
      class="border mt-2 mb-4"
      :color="category.id === data.contest_category_id ? 'green lighten-5' : null"
      @click="data.contest_category_id = category.id"
    >
      <v-card-title class="px-3 pt-1 pb-0">
        {{ category.name }}
      </v-card-title>
      <v-card-text class="px-3 pb-2">
        <p
          v-if="category.description"
          class="mb-0"
        >
          {{ category.description }}
        </p>
        <v-slide-y-transition>
          <div
            v-if="category.waves.length > 0 && category.id === data.contest_category_id"
            class="mt-2"
          >
            <p class="text-decoration-underline font-weight-bold mb-1">
              Vague
            </p>
            <v-row>
              <v-col
                v-for="(wave, waveIndex) in category.waves"
                :key="`wave-index-${waveIndex}`"
              >
                <v-card
                  class="border px-3 pt-1 pb-2 rounded-sm"
                  :class="category.id === data.contest_category_id && wave.id === data.contest_wave_id ? 'elevation-3' : null"
                  @click="data.contest_wave_id = wave.id"
                >
                  <div class="subtitle-2">
                    <v-icon
                      v-if="category.id === data.contest_category_id && wave.id === data.contest_wave_id"
                      color="green"
                      small
                      left
                    >
                      {{ mdiCheck }}
                    </v-icon>
                    {{ wave.name }}
                  </div>
                  <ul class="pl-3">
                    <li
                      v-if="wave.remaining_places !== null"
                      :class="wave.remaining_places <= 0 ? 'red--text text--lighten-2' : null"
                    >
                      {{ wave.remaining_places }} places restantes
                    </li>
                    <li v-else>
                      {{ wave.participants_count }} places prises
                    </li>
                    <li>
                      Commence à {{ humanizeDate(wave.time_blocks[0].start_time, 'TIME_SIMPLE') }}
                    </li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-slide-y-transition>
      </v-card-text>
    </v-card>

    <!-- TEAM -->
    <div v-if="contest.team_contest">
      <p class="font-weight-bold mb-1 mt-4">
        Équipe : <strong class="red--text">*</strong>
      </p>
      <div v-if="!showNewTeam">
        <v-select
          v-model="data.contest_team_id"
          :items="filteredTeams"
          item-text="detail_name"
          item-value="id"
          label="Équipe"
          outlined
          small-chips
        >
          <template #prepend-item>
            <div
              class="d-flex px-2 align-center"
              @mousedown.prevent
            >
              <v-text-field
                v-model="teamQuery"
                hide-details
                dense
                outlined
                label="Chercher une équipe"
                class="flex-grow-1"
              />
              <v-btn
                outlined
                text
                class="flex-shrink-0 ml-2"
                @click="showAddNewTeam()"
              >
                <v-icon left>
                  {{ mdiPlus }}
                </v-icon>
                Nouvelle équipe
              </v-btn>
            </div>
            <v-divider class="mt-2" />
          </template>
        </v-select>
      </div>
      <div
        v-else
        class="border rounded pa-4 d-flex align-center mb-4"
      >
        <v-btn
          outlined
          text
          icon
          class="flex-shrink-0 mr-2"
          @click="showNewTeam = false"
        >
          <v-icon>
            {{ mdiClose }}
          </v-icon>
        </v-btn>
        <v-text-field
          v-model="newTeamName"
          outlined
          dense
          hide-details
          label="Nom de la nouvelle équipe"
          class="flex-grow-1"
        />
        <v-btn
          color="primary"
          elevation="0"
          class="flex-shrink-0 ml-2"
          :loading="loadingCreateNewTeam"
          @click="submitTeam"
        >
          {{ $t('actions.add') }}
        </v-btn>
      </div>
    </div>
    <submit-form
      :overlay="submitOverlay"
      :go-back-btn="false"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { mdiArrowRight, mdiEyeOff, mdiEye, mdiCheck, mdiPlus, mdiClose } from '@mdi/js'
import { FormHelpers } from '~/mixins/FormHelpers'
import { DateHelpers } from '~/mixins/DateHelpers'
import GenreInput from '~/components/forms/GenreInput'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'
import SubmitForm from '~/components/forms/SubmitForm'
import DateOfBirthSelectInput from '~/components/forms/DateOfBirthSelectInput'
import ContestTeamApi from '~/services/oblyk-api/ContestTeamApi'

export default {
  name: 'ContestParticipantForm',
  components: { DateOfBirthSelectInput, SubmitForm, GenreInput },
  mixins: [FormHelpers, DateHelpers],

  props: {
    contest: {
      type: Object,
      required: true
    },
    contestCategories: {
      type: Array,
      required: true
    },
    contestTeams: {
      type: Array,
      default: null
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
      subscribing: false,
      showNewTeam: false,
      teamQuery: null,
      newTeamName: null,
      loadingCreateNewTeam: false,
      loadingTeams: false,
      teams: this.contestTeams,
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
        contest_team_id: this.contestParticipant?.contest_team_id,
        contest_id: this.contest.id,
        gym_id: this.contest.gym_id
      },

      mdiArrowRight,
      mdiEyeOff,
      mdiEye,
      mdiCheck,
      mdiPlus,
      mdiClose
    }
  },

  computed: {
    filteredTeams () {
      if (this.teamQuery === null || this.teamQuery === '') {
        return this.teams
      }

      const teams = []
      for (const team of this.teams) {
        if (team.name.toLowerCase().includes(this.teamQuery.toLowerCase())) {
          teams.push(team)
        }
      }
      return teams
    }
  },

  watch: {
    contestParticipant () {
      this.data = {
        id: this.contestParticipant?.id,
        first_name: this.contestParticipant?.first_name,
        last_name: this.contestParticipant?.last_name,
        date_of_birth: this.contestParticipant?.date_of_birth,
        email: this.contestParticipant?.email,
        genre: this.contestParticipant?.genre,
        affiliation: this.contestParticipant?.affiliation,
        contest_category_id: this.contestParticipant?.contest_category_id,
        contest_wave_id: this.contestParticipant?.contest_wave_id,
        contest_team_id: this.contestParticipant?.contest_team_id,
        contest_id: this.contest.id,
        gym_id: this.contest.gym_id
      }
      this.teams = this.contestTeams
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ContestParticipantApi(this.$axios, this.$auth).update(this.data) : new ContestParticipantApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          this.callback(resp.data)
          this.data = {
            id: null,
            first_name: null,
            last_name: null,
            date_of_birth: null,
            email: null,
            genre: null,
            affiliation: null,
            contest_category_id: null,
            contest_wave_id: null,
            contest_team_id: null
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'contestParticipant')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    },

    showAddNewTeam () {
      this.showNewTeam = true
      this.newTeamName = this.teamQuery
    },

    async submitTeam () {
      await this.createTeam()
      await this.getTeams()
    },

    createTeam () {
      return new Promise((resolve, reject) => {
        this.loadingCreateNewTeam = true
        new ContestTeamApi(this.$axios, this.$auth)
          .create(
            {
              name: this.newTeamName,
              contest_id: this.contest.id,
              gym_id: this.contest.gym_id
            }
          )
          .then((resp) => {
            this.data.contest_team_id = resp.data.id
          })
          .finally(() => {
            this.showNewTeam = false
            this.loadingCreateNewTeam = false
            this.newTeamName = null
            this.teamQuery = null
            resolve()
          })
      })
    },

    getTeams () {
      return new Promise((resolve, reject) => {
        this.loadingTeams = true
        new ContestTeamApi(this.$axios, this.$auth)
          .all(this.contest.gym_id, this.contest.id)
          .then((resp) => {
            this.teams = resp.data
          })
          .finally(() => {
            this.loadingTeams = false
            resolve()
          })
      })
    }
  }
}
</script>
