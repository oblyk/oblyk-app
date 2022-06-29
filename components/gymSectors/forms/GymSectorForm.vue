<template>
  <div>
    <spinner v-if="loadingGymGrades" :full-height="false" />

    <v-form
      v-if="!loadingGymGrades"
      @submit.prevent="submit()"
    >
      <v-text-field
        v-model="data.name"
        outlined
        :label="$t('models.gymSector.name')"
        required
      />

      <v-text-field
        v-model="data.group_sector_name"
        outlined
        :label="$t('models.gymSector.group_sector_name')"
        required
      />

      <v-text-field
        v-model="data.height"
        outlined
        type="number"
        min="0"
        :label="$t('models.gymSector.height')"
        required
      />

      <markdown-input
        v-model="data.description"
        :label="$t('models.gymSector.description')"
      />

      <v-checkbox
        v-model="data.can_be_more_than_one_pitch"
        :label="$t('models.gymSector.can_be_more_than_one_pitch')"
      />

      <v-subheader>
        {{ $t('components.gymSector.resultingParametersOf', { name: gymSpace.name }) }}
      </v-subheader>
      <v-divider class="mb-5" />
      <v-select
        v-model="data.climbing_type"
        :items="climbingGymList"
        item-text="text"
        item-value="value"
        :label="$t('models.gymSector.climbing_type')"
        outlined
      />

      <v-select
        v-model="data.gym_grade_id"
        :items="gymGrades"
        item-text="text"
        item-value="value"
        :label="$t('models.gymSector.gym_grade_id')"
        outlined
      />

      <close-form />
      <submit-form
        :overlay="submitOverlay"
        :submit-local-key="submitText()"
      />
    </v-form>
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import CloseForm from '@/components/forms/CloseForm'
import SubmitForm from '@/components/forms/SubmitForm'
import Spinner from '@/components/layouts/Spiner'
import GymGradeApi from '~/services/oblyk-api/GymGradeApi'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'
import MarkdownInput from '@/components/forms/MarkdownInput'

export default {
  name: 'GymSectorForm',
  components: { MarkdownInput, Spinner, SubmitForm, CloseForm },
  mixins: [FormHelpers],
  props: {
    gymSpace: {
      type: Object,
      default: null
    },
    gymSector: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      loadingGymGrades: true,
      data: {
        id: (this.gymSector || {}).id,
        name: (this.gymSector || {}).name,
        group_sector_name: (this.gymSector || {}).group_sector_name,
        height: (this.gymSector || {}).height,
        description: (this.gymSector || {}).description,
        can_be_more_than_one_pitch: (this.gymSector || {}).can_be_more_than_one_pitch,
        climbing_type: (this.gymSector || {}).climbing_type || this.gymSpace.climbing_type,
        gym_grade_id: (this.gymSector || {}).gym_grade_id || this.gymSpace.gym_grade_id,
        gym_space_id: this.gymSpace.id,
        gym_id: this.gymSpace.gym.id
      },
      climbingGymList: [
        { text: this.$t('models.climbs.sport_climbing'), value: 'sport_climbing' },
        { text: this.$t('models.climbs.bouldering'), value: 'bouldering' },
        { text: this.$t('models.climbs.fun_climbing'), value: 'fun_climbing' },
        { text: this.$t('models.climbs.training_space'), value: 'training_space' },
        { text: this.$t('models.climbs.pan'), value: 'pan' }
      ],
      gymGrades: []
    }
  },

  created () {
    this.getGymGrades()
  },

  methods: {
    submit () {
      this.overlay = true
      const promise = (this.isEditingForm()) ? new GymSectorApi(this.$axios, this.$auth).update(this.data) : new GymSectorApi(this.$axios, this.$auth).create(this.data)

      promise
        .then(() => {
          this.$router.push(`${this.gymSpace.path}/plan`)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSector')
        }).then(() => {
          this.overlay = false
        })
    },

    getGymGrades () {
      new GymGradeApi(this.$axios, this.$auth)
        .all(this.gymSpace.gym.id)
        .then((resp) => {
          for (const grade of resp.data) {
            this.gymGrades.push({ text: grade.name, value: grade.id })
          }
        }).finally(() => {
          this.loadingGymGrades = false
        })
    }
  }
}
</script>
