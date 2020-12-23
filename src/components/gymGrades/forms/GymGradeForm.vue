<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      :label="$t('models.gymGrade.name')"
      required
    />

    <v-radio-group v-model="data.difficulty_system">
      <template v-slot:label>
        <div>
          {{ $t('components.gymGrade.whichSystem') }}
        </div>
      </template>

      <v-radio
        class="mt-3"
        value="hold_color"
        :label="$t('components.gymGrade.gradeSystem.hold_color')"
      />

      <v-radio
        class="mt-3"
        value="tag_color"
        :label="$t('components.gymGrade.gradeSystem.tag_color')"
      />

      <v-radio
        class="mt-3"
        value="grade"
        :label="$t('components.gymGrade.gradeSystem.grade')"
      />

      <v-radio
        class="mt-3"
        value="pan"
        :label="$t('components.gymGrade.gradeSystem.pan')"
      />
    </v-radio-group>

    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import GymGradeApi from '@/services/oblyk-api/gymGradeApi'
import GymGrade from '@/models/GymGrade'

export default {
  name: 'GymGradeForm',
  components: { SubmitForm },
  mixins: [FormHelpers],
  props: {
    gymId: null,
    gymGrade: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      data: {
        id: (this.gymGrade || {}).id,
        name: (this.gymGrade || {}).name,
        gym_id: this.gymId,
        difficulty_system: (this.gymGrade || {}).difficulty_system
      }
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? GymGradeApi.update(this.data) : GymGradeApi.create(this.data)

      promise
        .then((resp) => {
          const gymGrade = new GymGrade(resp.data)
          this.$router.push(gymGrade.url())
        })
        .catch((err) => {
          console.error(err)
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
