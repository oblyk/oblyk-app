<template>
  <div>
    <spinner v-if="loadingGymGrades" :full-height="false" />

    <v-form
      v-if="!loadingGymGrades"
      @submit.prevent="submit()"
    >
      <v-text-field
        outlined
        v-model="data.name"
        :label="$t('models.gymSector.name')"
        required
      />

      <v-text-field
        outlined
        v-model="data.group_sector_name"
        :label="$t('models.gymSector.groupSectorName')"
        required
      />

      <v-text-field
        outlined
        v-model="data.height"
        type="number"
        min="0"
        :label="$t('models.gymSector.height')"
        required
      />

      <v-textarea
        outlined
        v-model="data.description"
        :label="$t('models.gymSector.description')"
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
        :label="$t('models.gymSector.climbingType')"
        outlined
      ></v-select>

      <v-select
        v-model="data.gym_grade_id"
        :items="gymGrades"
        item-text="text"
        item-value="value"
        :label="$t('models.gymSector.gymGradeId')"
        outlined
      ></v-select>

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
import GymGradeApi from '@/services/oblyk-api/gymGradeApi'
import GymSectorApi from '@/services/oblyk-api/gymSectorApi'

export default {
  name: 'GymSectorForm',
  components: { Spinner, SubmitForm, CloseForm },
  mixins: [FormHelpers],
  props: {
    gymSpace: Object,
    gymSector: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      loadingGymGrades: true,
      data: {
        id: (this.gymSector || {}).id,
        name: (this.gymSector || {}).name,
        group_sector_name: (this.gymSector || {}).groupSectorName,
        height: (this.gymSector || {}).height,
        description: (this.gymSector || {}).description,
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
    submit: function () {
      this.overlay = true
      const promise = (this.isEditingForm()) ? GymSectorApi.update(this.data) : GymSectorApi.create(this.data)

      promise
        .then(() => {
          this.$router.push(this.gymSpace.url())
        })
        .catch(err => {
          console.error(err)
        }).then(() => {
          this.overlay = false
        })
    },

    getGymGrades: function () {
      GymGradeApi
        .all(this.gymSpace.gym.id)
        .then(resp => {
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
