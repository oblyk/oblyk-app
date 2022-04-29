<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      :label="$t('models.gymGrade.name')"
    />

    <p class="subtitle-2 mt-1">
      {{ $t('components.gymGrade.whichSystem') }}
    </p>

    <v-radio-group v-model="data.difficulty_system">
      <v-radio
        value="hold_color"
      >
        <template #label>
          <span v-html="$t('components.gymGrade.gradeSystem.hold_color')" />
        </template>
      </v-radio>

      <v-radio
        class="mt-3"
        value="tag_color"
      >
        <template #label>
          <span v-html="$t('components.gymGrade.gradeSystem.tag_color')" />
        </template>
      </v-radio>

      <v-radio
        class="mt-3"
        value="pan"
      >
        <template #label>
          <span v-html="$t('components.gymGrade.gradeSystem.pan')" />
        </template>
      </v-radio>

      <v-radio
        class="mt-3"
        value="grade"
      >
        <template #label>
          <span v-html="$t('components.gymGrade.gradeSystem.grade')" />
        </template>
      </v-radio>
    </v-radio-group>

    <p class="subtitle-2 mt-6">
      {{ $t('components.gymGrade.whichGradeSystem') }}
    </p>

    <v-checkbox
      v-model="data.use_grade_system"
    >
      <template #label>
        <span v-html="$t('models.gymGrade.use_grade_system')" />
      </template>
    </v-checkbox>

    <v-checkbox
      v-model="data.use_point_system"
      @change="uncheckDivisionPoint()"
    >
      <template #label>
        <span v-html="$t('models.gymGrade.use_point_system')" />
      </template>
    </v-checkbox>

    <v-checkbox
      v-model="data.use_point_division_system"
      @change="uncheckPoint()"
    >
      <template #label>
        <span v-html="$t('models.gymGrade.use_point_division_system')" />
      </template>
    </v-checkbox>

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import GymGradeApi from '~/services/oblyk-api/GymGradeApi'
import GymGrade from '@/models/GymGrade'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GymGradeForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    gymId: {
      type: [Number, String],
      default: null
    },
    gymGrade: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: (this.gymGrade || {}).id,
        name: (this.gymGrade || {}).name,
        gym_id: this.gymId,
        difficulty_system: (this.gymGrade || {}).difficulty_system,
        use_grade_system: (this.gymGrade || {}).use_grade_system || false,
        use_point_system: (this.gymGrade || {}).use_point_system || false,
        use_point_division_system: (this.gymGrade || {}).use_point_division_system || false
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GymGradeApi(this.$axios, this.$auth).update(this.data) : new GymGradeApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const gymGrade = new GymGrade({ attributes: resp.data })
          this.$router.push(gymGrade.path)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymGrade')
        }).then(() => {
          this.submitOverlay = false
        })
    },

    uncheckDivisionPoint () {
      if (this.data.use_point_system) { this.data.use_point_division_system = false }
    },

    uncheckPoint () {
      if (this.data.use_point_division_system) { this.data.use_point_system = false }
    }
  }
}
</script>
