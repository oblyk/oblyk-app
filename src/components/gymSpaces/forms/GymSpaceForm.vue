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
        :label="$t('models.gymSpace.name')"
        required
      />

      <v-text-field
        outlined
        v-model="data.order"
        type="number"
        :label="$t('models.gymSpace.order')"
      />

      <markdown-input
        v-model="data.description"
        :label="$t('models.gymSpace.description')"
      />

      <v-select
        v-model="data.climbing_type"
        :items="climbingGymList"
        item-text="text"
        item-value="value"
        :label="$t('models.gymSpace.climbing_type')"
        outlined
      ></v-select>

      <v-select
        v-model="data.gym_grade_id"
        :items="gymGrades"
        item-text="text"
        item-value="value"
        :label="$t('models.gymSpace.gym_grade_id')"
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
import GymGradeApi from '@/services/oblyk-api/GymGradeApi'
import GymSpaceApi from '@/services/oblyk-api/GymSpaceApi'
import GymSpace from '@/models/GymSpace'
import MarkdownInput from '@/components/forms/MarkdownInput'

export default {
  name: 'GymSpaceForm',
  components: { MarkdownInput, Spinner, SubmitForm, CloseForm },
  mixins: [FormHelpers],
  props: {
    gymId: String,
    gymSpace: Object
  },

  data () {
    return {
      loadingGymGrades: true,
      data: {
        id: (this.gymSpace || {}).id,
        name: (this.gymSpace || {}).name,
        order: (this.gymSpace || {}).order,
        description: (this.gymSpace || {}).description,
        climbing_type: (this.gymSpace || {}).climbing_type,
        gym_grade_id: (this.gymSpace || {}).gym_grade_id,
        gym_id: (this.gymSpace || {}).gym_id || this.gymId
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
      const promise = (this.isEditingForm()) ? GymSpaceApi.update(this.data) : GymSpaceApi.create(this.data)

      promise
        .then((resp) => {
          const gymSpace = new GymSpace(resp.data)
          this.$router.push(gymSpace.path())
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).then(() => {
          this.overlay = false
        })
    },

    getGymGrades: function () {
      GymGradeApi
        .all(this.gymId)
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
