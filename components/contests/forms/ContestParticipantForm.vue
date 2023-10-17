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
    <date-of-birth-input
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
      class="required-field"
      :label="$t('models.contestParticipant.email')"
    />

    <p class="font-weight-bold mb-1 mt-4">
      Catégories :
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
                    <li v-if="wave.remaining_places">
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
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { mdiArrowRight, mdiEyeOff, mdiEye, mdiCheck } from '@mdi/js'
import { FormHelpers } from '~/mixins/FormHelpers'
import { DateHelpers } from '~/mixins/DateHelpers'
import DateOfBirthInput from '~/components/forms/DateOfBirthInput'
import GenreInput from '~/components/forms/GenreInput'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'
import SubmitForm from '~/components/forms/SubmitForm'

export default {
  name: 'ContestParticipantForm',
  components: { SubmitForm, GenreInput, DateOfBirthInput },
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
        contest_id: this.contest.id,
        gym_id: this.contest.gym_id
      },

      mdiArrowRight,
      mdiEyeOff,
      mdiEye,
      mdiCheck
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
        contest_id: this.contest.id,
        gym_id: this.contest.gym_id
      }
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
            contest_wave_id: null
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'contestParticipant')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
