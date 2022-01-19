<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      :label="$t('models.gymGradeLine.name')"
      required
    />

    <v-text-field
      v-show="(gymGrade.use_grade_system)"
      v-model="data.grade_text"
      outlined
      :label="$t('models.gymGradeLine.grade_text')"
      :required="(gymGrade.use_grade_system)"
      :hint="$t('components.gymGradeLine.hints.grade')"
    />

    <v-text-field
      v-show="(gymGrade.use_point_system)"
      v-model="data.points"
      outlined
      :label="$t('models.gymGradeLine.points')"
      :required="(gymGrade.use_point_system)"
      :hint="$t('components.gymGradeLine.hints.points')"
    />

    <v-text-field
      v-model="data.order"
      outlined
      type="number"
      min="1"
      max="50"
      :label="$t('models.gymGradeLine.order')"
      required
    />

    <color-input
      v-show="gymGrade.needColor"
      v-model="data.colors"
      :label="$t(`components.gymGradeLine.colors.${gymGrade.colorFor}`)"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    >
      <v-btn
        v-if="isEditingForm()"
        outlined
        class="float-right mr-2"
        color="error"
        @click="deleteGradeLine()"
      >
        {{ $t('actions.delete') }}
      </v-btn>
    </submit-form>
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import GymGradeLineApi from '~/services/oblyk-api/GymGradeLineApi'
import CloseForm from '@/components/forms/CloseForm'
import ColorInput from '@/components/forms/ColorInput'

export default {
  name: 'GymGradeLineForm',
  components: { ColorInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    gymGrade: {
      type: Object,
      default: null
    },
    gymGradeLine: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: (this.gymGradeLine || {}).id,
        name: (this.gymGradeLine || {}).name,
        colors: (this.gymGradeLine || {}).colors,
        grade_text: (this.gymGradeLine || {}).grade_text,
        points: (this.gymGradeLine || {}).points,
        order: (this.gymGradeLine || {}).order || this.gymGrade.next_grade_lines_order || 1,
        gym_id: this.gymGrade.gym.id,
        gym_grade_id: this.gymGrade.id
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GymGradeLineApi(this.$axios, this.$auth).update(this.data) : new GymGradeLineApi(this.$axios, this.$auth).create(this.data)

      promise
        .then(() => {
          this.$router.push(this.gymGrade.path)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymGradeLine')
        }).then(() => {
          this.submitOverlay = false
        })
    },

    deleteGradeLine () {
      if (confirm(this.$t('actions.areYouSur'))) {
        this.submitOverlay = true
        new GymGradeLineApi(this.$axios, this.$auth)
          .delete(this.data)
          .then(() => {
            this.$router.push(this.gymGrade.path)
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'gymGradeLine')
          })
          .then(() => {
            this.submitOverlay = false
          })
      }
    }
  }
}
</script>
